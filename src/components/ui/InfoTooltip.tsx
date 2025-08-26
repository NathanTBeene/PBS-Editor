import { Info } from "lucide-react";
import { useState } from "react";

interface TooltipData {
  title?: string;
  description: string;
  link?: string;
}

const InfoTooltip = ({ title, description, link }: TooltipData) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <Info
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`w-4 h-4 text-slate-300 ${link ? "cursor-pointer" : ""}`}
        onClick={() => {
          if (link) {
            window.open(link, "_blank");
          }
        }}
      />
      {hovered && (
        <div className="absolute top-0 -translate-y-[50%] left-full ml-2 z-10 w-55 p-4 text-sm text-white bg-slate-700 rounded-md shadow-lg">
          {title && (
            <div className="font-bold mb-1">{title || "InfoTooltip"}</div>
          )}
          <div className="">
            {description || "Additional information goes here."}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
