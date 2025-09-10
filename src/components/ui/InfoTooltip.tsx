import { Info } from "lucide-react";
import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

interface TooltipData {
  title?: string;
  description: string;
  link?: string;
}

const InfoTooltip = ({ title, description, link }: TooltipData) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Root open={open} onOpenChange={setOpen} delayDuration={100}>
      <Tooltip.Trigger>
        <Info
          onClick={() => {
            if (link) {
              window.open(link, "_blank");
            }
          }}
          className={`${link ? "cursor-pointer" : ""}`}
          width={16}
          height={16}
        />
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="z-50 TooltipContent"
          align="start"
          sideOffset={5}
          alignOffset={10}
        >
          {title && (
            <div className="mb-1 border-b border-slate-700 pb-1 text-sm font-semibold text-slate-200">
              {title}
            </div>
          )}
          <div className="max-w-xs rounded-md border border-slate-700 bg-slate-800 p-3 text-sm text-slate-300 shadow-lg">
            {description}
          </div>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export default InfoTooltip;
