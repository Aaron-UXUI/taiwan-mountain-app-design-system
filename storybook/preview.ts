import type { Preview } from "@storybook/react";
import "../react/src/tokens.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      // Without this the sidebar follows the stories glob, which is
      // filesystem order — so `src/style/` landed after `src/components/**`
      // and the tokens sat at the bottom. Style comes first: it is what the
      // components are built out of, and it mirrors the Figma file, where the
      // Style Guide precedes the component sections.
      //
      // Inside Style, the order matches the Style Guide's own sequence rather
      // than alphabetical. `*` takes everything not named here, so component
      // sections keep their existing relative order and new ones need no
      // change.
      storySort: {
        order: ["Style", ["Typography", "Color", "Elevation", "Radius", "Spacing"], "*"],
      },
    },
  },
};

export default preview;
