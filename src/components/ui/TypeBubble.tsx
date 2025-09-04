import { usePokedexContext } from "../../lib/providers/PokedexProvider";

const TypeBubble = ({ type }: { type: string }) => {
  const { getTypeColor } = usePokedexContext();

  return (
    <span
      key={type}
      style={{
        backgroundColor: getTypeColor(type),
      }}
      className={`px-2 py-0.5 rounded text-xs font-medium flex items-center justify-center text-center`}
    >
      {type}
    </span>
  );
};

export default TypeBubble;
