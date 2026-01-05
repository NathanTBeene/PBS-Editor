import { usePokedexContext } from "../../lib/providers/PokedexProvider";
import InfoTooltip from "./InfoTooltip";

interface TypeBubbleProps {
  type: string;
  overrideText?: string;
}

const TypeBubble = ({ type, overrideText }: TypeBubbleProps) => {
  const { getTypeColor, types } = usePokedexContext();

  const isValidType = Object.keys(types).includes(type);

  return (
    <span
      key={type}
      style={{
        backgroundColor: getTypeColor(type),
      }}
      className={`px-2 py-0.5 rounded text-xs font-medium flex items-center justify-center text-center
        ${!isValidType ? "opacity-80 italic bg-red-400! gap-2" : "text-white"}`}
    >
      {overrideText || type}
      {!isValidType && (
        <InfoTooltip
          description={
            "This type has not been implemented. Please add it to the constants for it to appear valid."
          }
        />
      )}
    </span>
  );
};

export default TypeBubble;
