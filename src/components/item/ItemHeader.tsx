import ActionButtons from "@/components/ui/ActionButtons";
import type { Item } from "@/lib/models/Item";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import TypeBubble from "../ui/TypeBubble";
import MegaBubble from "../ui/MegaBubble";
import StyleBubble from "../ui/StyleBubble";

interface ItemHeaderProps {
  item: Item;
  onSave: () => void;
  onReset: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

const ItemHeader = ({
  item,
  onSave,
  onReset,
  onDelete,
  onSetDefault,
}: ItemHeaderProps) => {
  const { getMoveDataById } = usePokedexContext();

  const moveData = item.move && getMoveDataById(item.move);

  const MoveBubble = (
    moveData && (
      <TypeBubble type={moveData.type || "Normal"} overrideText={moveData.name} />
    )
  )

  return (
    <div className="p-6 h-25 bg-slate-800 border-b-3 border-slate-700 shadow-sm">
      <div className="flex h-full items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <div className="flex items-center gap-4 mt-1">
            {/* Handle bubbles */}
              {(item.flags && (item.flags.includes("MegaRing")) && <MegaBubble text="MEGA RING"/>)}
              {(item.flags && (item.flags.includes("MegaStone")) && <MegaBubble text="MEGA STONE"/>)}
              {((item.fieldUse == "TM" || item.fieldUse == "TR" || item.fieldUse == "HM") && MoveBubble)}
              {(item.flags && (item.flags.includes("KeyItem")) && <StyleBubble text="KEY ITEM" color="yellow"/>)}
          </div>
        </div>
        <ActionButtons
          onSetDefault={onSetDefault}
          onSave={onSave}
          onReset={onReset}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default ItemHeader;
