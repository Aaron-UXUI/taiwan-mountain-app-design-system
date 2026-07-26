#!/usr/bin/env node
// One-off generator for PreviewApp.xcodeproj/project.pbxproj.
// Run: node generate-pbxproj.mjs  (writes PreviewApp.xcodeproj/project.pbxproj)
import { writeFileSync, readFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const swiftuiRoot = path.resolve(here, "..");

let counter = 0x100000;
function uuid() {
  counter += 1;
  return counter.toString(16).toUpperCase().padStart(24, "0");
}

function listSwiftFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...listSwiftFiles(full));
    else if (entry.endsWith(".swift")) out.push(full);
  }
  return out;
}

// ---- gather sources, relative to PreviewApp.xcodeproj (i.e. relative to `here`) ----
const dsPaths = listSwiftFiles(path.join(swiftuiRoot, "Sources/DesignSystemKit")).sort();
const galleryPathsOriginal = listSwiftFiles(path.join(swiftuiRoot, "Sources/GalleryKit")).sort();
const previewAppSwift = path.join(here, "PreviewApp/PreviewApp.swift");
const assetsPath = path.join(here, "PreviewApp/Assets.xcassets");

// This verification project compiles DesignSystemKit + GalleryKit as ONE
// flat target (no local-package-reference machinery to hand-author), so
// GalleryKit's own `import DesignSystemKit` line would fail to resolve —
// there's no separate DesignSystemKit module in this build. Since editing
// the real, shipped Sources/GalleryKit/*.swift files isn't acceptable just
// to make this throwaway verification project build, generate stripped
// copies under GeneratedSources/ instead and reference those.
const generatedGalleryDir = path.join(here, "GeneratedSources/GalleryKit");
const galleryRoot = path.join(swiftuiRoot, "Sources/GalleryKit");
const galleryPaths = galleryPathsOriginal.map((abs) => {
  const rel = path.relative(galleryRoot, abs);
  const dest = path.join(generatedGalleryDir, rel);
  mkdirSync(path.dirname(dest), { recursive: true });
  const stripped = readFileSync(abs, "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "import DesignSystemKit")
    .join("\n");
  writeFileSync(dest, stripped);
  return dest;
});

const allSourcePaths = [...dsPaths, ...galleryPaths, previewAppSwift];

// group by directory for a readable Xcode navigator tree
function groupTree(paths, rootLabel, rootAbsDir) {
  // returns { name, children: [...], fileRefUUIDs: [...] } recursively — but we just need a flat
  // per-directory bucket here since Xcode groups are directory-shaped anyway.
  const buckets = new Map(); // relDir -> [absPath...]
  for (const p of paths) {
    const rel = path.relative(rootAbsDir, path.dirname(p));
    if (!buckets.has(rel)) buckets.set(rel, []);
    buckets.get(rel).push(p);
  }
  return buckets;
}

const fileRefs = []; // {uuid, absPath, relPathFromProj}
const buildFiles = []; // {uuid, fileRefUUID}
for (const abs of allSourcePaths) {
  const fr = uuid();
  const bf = uuid();
  fileRefs.push({ uuid: fr, abs, name: path.basename(abs) });
  buildFiles.push({ uuid: bf, fileRefUUID: fr });
}

// Asset catalogs bundled into the app: PreviewApp's own, plus the design
// system's DSIcons.xcassets (the real Figma icon + motion artwork). The
// latter normally reaches consumers as an SPM resource via Bundle.module,
// but this project compiles the sources directly with no SwiftPM involved,
// so it has to be added to the app bundle explicitly — see DSResources.swift.
const ASSET_CATALOGS = [
  { name: "Assets.xcassets", relPath: "PreviewApp/Assets.xcassets" },
  { name: "DSIcons.xcassets", relPath: "../Sources/DesignSystemKit/Resources/DSIcons.xcassets" },
].map((c) => ({ ...c, fileRef: uuid(), buildFile: uuid() }));

const appProductUUID = uuid();
const targetUUID = uuid();
const projectUUID = uuid();
const mainGroupUUID = uuid();
const productsGroupUUID = uuid();
const dsGroupUUID = uuid();
const galleryGroupUUID = uuid();
const previewAppGroupUUID = uuid();

const sourcesPhaseUUID = uuid();
const resourcesPhaseUUID = uuid();
const frameworksPhaseUUID = uuid();

const projectConfigListUUID = uuid();
const projectDebugConfigUUID = uuid();
const projectReleaseConfigUUID = uuid();
const targetConfigListUUID = uuid();
const targetDebugConfigUUID = uuid();
const targetReleaseConfigUUID = uuid();

// ---- build subgroup structure for DesignSystemKit and GalleryKit (mirrors folders) ----
function buildGroupsForRoot(rootAbsDir, rootLabel, rootGroupUUID) {
  // Build a map dir(absolute) -> groupUUID, creating PBXGroup objects for every
  // directory level under rootAbsDir, and attach fileRefs whose dirname matches.
  const dirGroupUUID = new Map();
  dirGroupUUID.set(rootAbsDir, rootGroupUUID);
  const objectsText = [];

  function ensureGroup(dirAbs) {
    if (dirGroupUUID.has(dirAbs)) return dirGroupUUID.get(dirAbs);
    const parent = path.dirname(dirAbs);
    const parentUUID = ensureGroup(parent);
    const gUUID = uuid();
    dirGroupUUID.set(dirAbs, gUUID);
    pendingChildren.push({ parentUUID, childUUID: gUUID, isGroup: true, dirAbs });
    return gUUID;
  }

  const pendingChildren = [];
  // seed file entries
  for (const fr of fileRefs) {
    if (!fr.abs.startsWith(rootAbsDir + path.sep)) continue;
    const dirAbs = path.dirname(fr.abs);
    const gUUID = ensureGroup(dirAbs);
    pendingChildren.push({ parentUUID: gUUID, childUUID: fr.uuid, isGroup: false, fr });
  }

  // Build children lists per group
  const groupChildren = new Map(); // groupUUID -> [{uuid,isGroup,label}]
  for (const c of pendingChildren) {
    if (!groupChildren.has(c.parentUUID)) groupChildren.set(c.parentUUID, []);
    if (c.isGroup) {
      groupChildren.get(c.parentUUID).push({ uuid: c.childUUID, isGroup: true, label: path.basename(c.dirAbs) });
    } else {
      groupChildren.get(c.parentUUID).push({ uuid: c.childUUID, isGroup: false, label: c.fr.name });
    }
  }

  // Emit PBXGroup objects for every dir (including root) using groupChildren.
  // These are *virtual* groups (name only, no `path`) — each file reference
  // already carries its own full path relative to the .xcodeproj, so a
  // group-level `path` here would compound with it and double the prefix.
  for (const [dirAbs, gUUID] of dirGroupUUID.entries()) {
    const children = groupChildren.get(gUUID) || [];
    const label = dirAbs === rootAbsDir ? rootLabel : path.basename(dirAbs);
    objectsText.push(
      `\t\t${gUUID} /* ${label} */ = {\n` +
      `\t\t\tisa = PBXGroup;\n` +
      `\t\t\tchildren = (\n` +
      children.map((c) => `\t\t\t\t${c.uuid} /* ${c.label} */,\n`).join("") +
      `\t\t\t);\n` +
      `\t\t\tname = ${label};\n` +
      `\t\t\tsourceTree = "<group>";\n` +
      `\t\t};\n`
    );
  }

  return objectsText.join("");
}

const dsGroupsText = buildGroupsForRoot(path.join(swiftuiRoot, "Sources/DesignSystemKit"), "DesignSystemKit", dsGroupUUID);
const galleryGroupsText = buildGroupsForRoot(generatedGalleryDir, "GalleryKit", galleryGroupUUID);

// ---- PBXFileReference / PBXBuildFile text ----
let fileRefText = "";
for (const fr of fileRefs) {
  // Group-relative ("<group>") paths resolve against the directory that
  // *contains* the .xcodeproj (i.e. `here`), not the .xcodeproj bundle path
  // itself — passing the bundle path as the `from` arg here would add one
  // spurious extra "../".
  const relFromProj = path.relative(here, fr.abs);
  fileRefText +=
    `\t\t${fr.uuid} /* ${fr.name} */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; name = "${fr.name}"; path = "${relFromProj}"; sourceTree = "<group>"; };\n`;
}
for (const c of ASSET_CATALOGS) {
  fileRefText += `\t\t${c.fileRef} /* ${c.name} */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; name = ${c.name}; path = "${c.relPath}"; sourceTree = "<group>"; };\n`;
}
fileRefText += `\t\t${appProductUUID} /* PreviewApp.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = PreviewApp.app; sourceTree = BUILT_PRODUCTS_DIR; };\n`;

let buildFileText = "";
for (const bf of buildFiles) {
  const fr = fileRefs.find((f) => f.uuid === bf.fileRefUUID);
  buildFileText += `\t\t${bf.uuid} /* ${fr.name} in Sources */ = {isa = PBXBuildFile; fileRef = ${fr.uuid} /* ${fr.name} */; };\n`;
}
for (const c of ASSET_CATALOGS) {
  buildFileText += `\t\t${c.buildFile} /* ${c.name} in Resources */ = {isa = PBXBuildFile; fileRef = ${c.fileRef} /* ${c.name} */; };\n`;
}

// ---- PreviewApp group (own files) ----
const previewAppSwiftUUID = fileRefs.find((f) => f.abs === previewAppSwift).uuid;
const previewAppGroupText =
  `\t\t${previewAppGroupUUID} /* PreviewApp */ = {\n` +
  `\t\t\tisa = PBXGroup;\n` +
  `\t\t\tchildren = (\n` +
  `\t\t\t\t${previewAppSwiftUUID} /* PreviewApp.swift */,\n` +
  ASSET_CATALOGS.map((c) => `\t\t\t\t${c.fileRef} /* ${c.name} */,\n`).join("") +
  `\t\t\t);\n` +
  `\t\t\tname = PreviewApp;\n` +
  `\t\t\tsourceTree = "<group>";\n` +
  `\t\t};\n`;

// ---- Sources build phase ----
const sourcesFiles = buildFiles.map((bf) => `\t\t\t\t${bf.uuid} /* in Sources */,\n`).join("");

const pbx = `// !$*UTF8*$!
{
\tarchiveVersion = 1;
\tclasses = {
\t};
\tobjectVersion = 56;
\tobjects = {

/* Begin PBXBuildFile section */
${buildFileText}/* End PBXBuildFile section */

/* Begin PBXFileReference section */
${fileRefText}/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
\t\t${frameworksPhaseUUID} /* Frameworks */ = {
\t\t\tisa = PBXFrameworksBuildPhase;
\t\t\tbuildActionMask = 2147483647;
\t\t\tfiles = (
\t\t\t);
\t\t\trunOnlyForDeploymentPostprocessing = 0;
\t\t};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
\t\t${mainGroupUUID} = {
\t\t\tisa = PBXGroup;
\t\t\tchildren = (
\t\t\t\t${dsGroupUUID} /* DesignSystemKit */,
\t\t\t\t${galleryGroupUUID} /* GalleryKit */,
\t\t\t\t${previewAppGroupUUID} /* PreviewApp */,
\t\t\t\t${productsGroupUUID} /* Products */,
\t\t\t);
\t\t\tsourceTree = "<group>";
\t\t};
\t\t${productsGroupUUID} /* Products */ = {
\t\t\tisa = PBXGroup;
\t\t\tchildren = (
\t\t\t\t${appProductUUID} /* PreviewApp.app */,
\t\t\t);
\t\t\tname = Products;
\t\t\tsourceTree = "<group>";
\t\t};
${previewAppGroupText}${dsGroupsText}${galleryGroupsText}/* End PBXGroup section */

/* Begin PBXNativeTarget section */
\t\t${targetUUID} /* PreviewApp */ = {
\t\t\tisa = PBXNativeTarget;
\t\t\tbuildConfigurationList = ${targetConfigListUUID} /* Build configuration list for PBXNativeTarget "PreviewApp" */;
\t\t\tbuildPhases = (
\t\t\t\t${sourcesPhaseUUID} /* Sources */,
\t\t\t\t${frameworksPhaseUUID} /* Frameworks */,
\t\t\t\t${resourcesPhaseUUID} /* Resources */,
\t\t\t);
\t\t\tbuildRules = (
\t\t\t);
\t\t\tdependencies = (
\t\t\t);
\t\t\tname = PreviewApp;
\t\t\tproductName = PreviewApp;
\t\t\tproductReference = ${appProductUUID} /* PreviewApp.app */;
\t\t\tproductType = "com.apple.product-type.application";
\t\t};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
\t\t${projectUUID} /* Project object */ = {
\t\t\tisa = PBXProject;
\t\t\tattributes = {
\t\t\t\tBuildIndependentTargetsInParallel = 1;
\t\t\t\tLastSwiftUpdateCheck = 1620;
\t\t\t\tLastUpgradeCheck = 1620;
\t\t\t};
\t\t\tbuildConfigurationList = ${projectConfigListUUID} /* Build configuration list for PBXProject "PreviewApp" */;
\t\t\tcompatibilityVersion = "Xcode 14.0";
\t\t\tdevelopmentRegion = en;
\t\t\thasScannedForEncodings = 0;
\t\t\tknownRegions = (
\t\t\t\ten,
\t\t\t\tBase,
\t\t\t);
\t\t\tmainGroup = ${mainGroupUUID};
\t\t\tproductRefGroup = ${productsGroupUUID} /* Products */;
\t\t\tprojectDirPath = "";
\t\t\tprojectRoot = "";
\t\t\ttargets = (
\t\t\t\t${targetUUID} /* PreviewApp */,
\t\t\t);
\t\t};
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
\t\t${resourcesPhaseUUID} /* Resources */ = {
\t\t\tisa = PBXResourcesBuildPhase;
\t\t\tbuildActionMask = 2147483647;
\t\t\tfiles = (
${ASSET_CATALOGS.map((c) => `\t\t\t\t${c.buildFile} /* ${c.name} in Resources */,`).join("\n")}
\t\t\t);
\t\t\trunOnlyForDeploymentPostprocessing = 0;
\t\t};
/* End PBXResourcesBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
\t\t${sourcesPhaseUUID} /* Sources */ = {
\t\t\tisa = PBXSourcesBuildPhase;
\t\t\tbuildActionMask = 2147483647;
\t\t\tfiles = (
${sourcesFiles}\t\t\t);
\t\t\trunOnlyForDeploymentPostprocessing = 0;
\t\t};
/* End PBXSourcesBuildPhase section */

/* Begin XCBuildConfiguration section */
\t\t${projectDebugConfigUUID} /* Debug */ = {
\t\t\tisa = XCBuildConfiguration;
\t\t\tbuildSettings = {
\t\t\t\tALWAYS_SEARCH_USER_PATHS = NO;
\t\t\t\tCLANG_ENABLE_MODULES = YES;
\t\t\t\tCLANG_ENABLE_OBJC_ARC = YES;
\t\t\t\tCOPY_PHASE_STRIP = NO;
\t\t\t\tDEBUG_INFORMATION_FORMAT = dwarf;
\t\t\t\tENABLE_STRICT_OBJC_MSGSEND = YES;
\t\t\t\tENABLE_TESTABILITY = YES;
\t\t\t\tGCC_C_LANGUAGE_STANDARD = gnu17;
\t\t\t\tGCC_DYNAMIC_NO_PIC = NO;
\t\t\t\tGCC_OPTIMIZATION_LEVEL = 0;
\t\t\t\tGCC_PREPROCESSOR_DEFINITIONS = (
\t\t\t\t\t"DEBUG=1",
\t\t\t\t\t"$(inherited)",
\t\t\t\t);
\t\t\t\tIPHONEOS_DEPLOYMENT_TARGET = 17.0;
\t\t\t\tMTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
\t\t\t\tONLY_ACTIVE_ARCH = YES;
\t\t\t\tSDKROOT = iphoneos;
\t\t\t\tSWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG;
\t\t\t\tSWIFT_OPTIMIZATION_LEVEL = "-Onone";
\t\t\t\tSWIFT_VERSION = 5.0;
\t\t\t};
\t\t\tname = Debug;
\t\t};
\t\t${projectReleaseConfigUUID} /* Release */ = {
\t\t\tisa = XCBuildConfiguration;
\t\t\tbuildSettings = {
\t\t\t\tALWAYS_SEARCH_USER_PATHS = NO;
\t\t\t\tCLANG_ENABLE_MODULES = YES;
\t\t\t\tCLANG_ENABLE_OBJC_ARC = YES;
\t\t\t\tCOPY_PHASE_STRIP = NO;
\t\t\t\tDEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
\t\t\t\tENABLE_NS_ASSERTIONS = NO;
\t\t\t\tENABLE_STRICT_OBJC_MSGSEND = YES;
\t\t\t\tGCC_C_LANGUAGE_STANDARD = gnu17;
\t\t\t\tIPHONEOS_DEPLOYMENT_TARGET = 17.0;
\t\t\t\tMTL_ENABLE_DEBUG_INFO = NO;
\t\t\t\tSDKROOT = iphoneos;
\t\t\t\tSWIFT_COMPILATION_MODE = wholemodule;
\t\t\t\tSWIFT_VERSION = 5.0;
\t\t\t\tVALIDATE_PRODUCT = YES;
\t\t\t};
\t\t\tname = Release;
\t\t};
\t\t${targetDebugConfigUUID} /* Debug */ = {
\t\t\tisa = XCBuildConfiguration;
\t\t\tbuildSettings = {
\t\t\t\tASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
\t\t\t\tASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = "";
\t\t\t\tCODE_SIGN_STYLE = Automatic;
\t\t\t\tCURRENT_PROJECT_VERSION = 1;
\t\t\t\tGENERATE_INFOPLIST_FILE = YES;
\t\t\t\tINFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
\t\t\t\tINFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
\t\t\t\tINFOPLIST_KEY_UILaunchScreen_Generation = YES;
\t\t\t\tINFOPLIST_KEY_UISupportedInterfaceOrientations = "UIInterfaceOrientationPortrait UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
\t\t\t\tINFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
\t\t\t\tLD_RUNPATH_SEARCH_PATHS = (
\t\t\t\t\t"$(inherited)",
\t\t\t\t\t"@executable_path/Frameworks",
\t\t\t\t);
\t\t\t\tMARKETING_VERSION = 1.0;
\t\t\t\tPRODUCT_BUNDLE_IDENTIFIER = "tw.taiwanmountain.previewapp";
\t\t\t\tPRODUCT_NAME = "$(TARGET_NAME)";
\t\t\t\tSWIFT_EMIT_LOC_STRINGS = YES;
\t\t\t\tTARGETED_DEVICE_FAMILY = "1,2";
\t\t\t};
\t\t\tname = Debug;
\t\t};
\t\t${targetReleaseConfigUUID} /* Release */ = {
\t\t\tisa = XCBuildConfiguration;
\t\t\tbuildSettings = {
\t\t\t\tASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
\t\t\t\tASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = "";
\t\t\t\tCODE_SIGN_STYLE = Automatic;
\t\t\t\tCURRENT_PROJECT_VERSION = 1;
\t\t\t\tGENERATE_INFOPLIST_FILE = YES;
\t\t\t\tINFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
\t\t\t\tINFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
\t\t\t\tINFOPLIST_KEY_UILaunchScreen_Generation = YES;
\t\t\t\tINFOPLIST_KEY_UISupportedInterfaceOrientations = "UIInterfaceOrientationPortrait UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
\t\t\t\tINFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
\t\t\t\tLD_RUNPATH_SEARCH_PATHS = (
\t\t\t\t\t"$(inherited)",
\t\t\t\t\t"@executable_path/Frameworks",
\t\t\t\t);
\t\t\t\tMARKETING_VERSION = 1.0;
\t\t\t\tPRODUCT_BUNDLE_IDENTIFIER = "tw.taiwanmountain.previewapp";
\t\t\t\tPRODUCT_NAME = "$(TARGET_NAME)";
\t\t\t\tSWIFT_EMIT_LOC_STRINGS = YES;
\t\t\t\tTARGETED_DEVICE_FAMILY = "1,2";
\t\t\t};
\t\t\tname = Release;
\t\t};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
\t\t${projectConfigListUUID} /* Build configuration list for PBXProject "PreviewApp" */ = {
\t\t\tisa = XCConfigurationList;
\t\t\tbuildConfigurations = (
\t\t\t\t${projectDebugConfigUUID} /* Debug */,
\t\t\t\t${projectReleaseConfigUUID} /* Release */,
\t\t\t);
\t\t\tdefaultConfigurationIsVisible = 0;
\t\t\tdefaultConfigurationName = Release;
\t\t};
\t\t${targetConfigListUUID} /* Build configuration list for PBXNativeTarget "PreviewApp" */ = {
\t\t\tisa = XCConfigurationList;
\t\t\tbuildConfigurations = (
\t\t\t\t${targetDebugConfigUUID} /* Debug */,
\t\t\t\t${targetReleaseConfigUUID} /* Release */,
\t\t\t);
\t\t\tdefaultConfigurationIsVisible = 0;
\t\t\tdefaultConfigurationName = Release;
\t\t};
/* End XCConfigurationList section */
\t};
\trootObject = ${projectUUID} /* Project object */;
}
`;

writeFileSync(path.join(here, "PreviewApp.xcodeproj/project.pbxproj"), pbx);
console.log("Wrote PreviewApp.xcodeproj/project.pbxproj");
console.log(`Sources: ${allSourcePaths.length} swift files + Assets.xcassets`);
