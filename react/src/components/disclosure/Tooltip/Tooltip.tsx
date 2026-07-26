import type { HTMLAttributes } from "react";
import "./Tooltip.css";

export type TooltipProps = {
  text?: string;
} & HTMLAttributes<HTMLDivElement>;

/** Figma: Tooltip (node 8558:23555) — single component. */
export function Tooltip({
  text = "台灣山林不會保存您完整的信用卡資訊，購票流程完全符合PCI-DSS 國際安全認證。",
  className,
  ...rest
}: TooltipProps) {
  return (
    <div className={["tmads-tooltip", className].filter(Boolean).join(" ")} role="tooltip" {...rest}>
      <p className="tmads-tooltip__text">{text}</p>
    </div>
  );
}
