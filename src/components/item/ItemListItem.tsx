import React from "react";
import type { Item } from "@/lib/models/Item";
import MegaBubble from "../ui/MegaBubble";
import StyleBubble from "../ui/StyleBubble";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import TypeBubble from "../ui/TypeBubble";

interface ItemListItemProps {
  item: Item;
  selectedItem: Item | null;
  itemRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  selectAndScrollToItem: (item: Item) => void;
}

const ItemListItem = ({
  item,
  selectedItem,
  itemRefs,
  selectAndScrollToItem,
}: ItemListItemProps) => {

  const { getMoveDataById } = usePokedexContext();

  const moveData = item.move && getMoveDataById(item.move);

  const MoveBubble = (
    moveData && (
      <TypeBubble type={moveData.type || "Normal"} overrideText={moveData.name} />
    )
  )

  return (
    <div
      key={item.id}
      ref={(el) => {
        itemRefs.current[item.id] = el;
      }}
      className={`p-3 pl-6 border-b border-slate-500 bg-gradient-to-r from-slate-800/10 to-slate-800 cursor-pointer transition-colors ${
        selectedItem?.id === item.id
          ? "bg-blue-600/20 border-l-4 border-l-blue-600/40"
          : "hover:bg-slate-600/40"
      }`}
      onClick={() => {
        selectAndScrollToItem(item);
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="font-medium truncate">{item.name}</div>
            {/* Handle bubbles */}
              {(item.flags && (item.flags.includes("MegaRing")) && <MegaBubble text="MEGA RING"/>)}
              {(item.flags && (item.flags.includes("MegaStone")) && <MegaBubble text="MEGA STONE"/>)}
              {((item.fieldUse == "TM" || item.fieldUse == "TR" || item.fieldUse == "HM") && MoveBubble)}
              {(item.flags && (item.flags.includes("KeyItem")) && <StyleBubble text="KEY ITEM" color="yellow"/>)}
          </div>
          <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
            <span>Pocket: {item.pocket}</span>
            <span>Price: {item.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ItemListItem);
