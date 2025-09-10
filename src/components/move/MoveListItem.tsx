import type { Move } from "@/lib/models/Move";
import React from "react";
import TypeBubble from "../ui/TypeBubble";

interface MoveListItemProps {
  move: Move;
  selectedMove: Move | null;
  moveRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  selectAndScrollToMove: (move: Move) => void;
}

const MoveListItem = ({
  move,
  selectedMove,
  moveRefs,
  selectAndScrollToMove,
}: MoveListItemProps) => {
  return (
    <div
      key={move.id}
      ref={(el) => {
        moveRefs.current[move.id] = el;
      }}
      className={`p-3 pl-5 border-b border-slate-500 bg-gradient-to-r from-slate-800/10 to-slate-800 cursor-pointer transition-colors ${
        selectedMove?.id === move.id
          ? "bg-blue-600/20 border-l-4 border-l-blue-600/40"
          : "hover:bg-slate-600/40"
      }`}
      onClick={() => {
        selectAndScrollToMove(move);
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate text-sm">{move.name}</div>
          <div className="flex items-center gap-2 mt-1">
            <TypeBubble type={move.type} />
            <span className="text-xs text-slate-400">{move.category}</span>
          </div>
          <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
            <span>Power: {move.power || "—"}</span>
            <span>Acc: {move.accuracy}%</span>
            <span>PP: {move.pp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveListItem;
