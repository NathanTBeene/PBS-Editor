import TypeBubble from "@/components/TypeBubble";
import ActionButtons from "@/components/ui/ActionButtons";
import type { Move } from "@/lib/models/Move";
import React from "react";

interface MoveHeaderProps {
  move: Move;
  onSave: () => void;
  onReset: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

const MoveHeader: React.FC<MoveHeaderProps> = ({
  move,
  onSave,
  onReset,
  onDelete,
  onSetDefault,
}) => {
  return (
    <div className="p-6 h-25 bg-slate-800 border-b-3 border-slate-700 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{move.name}</h1>
          <div className="flex items-center gap-4 mt-1">
            <TypeBubble type={move.type} />
            <p className="text-slate-300">{move.category}</p>
            <span className="text-slate-400">•</span>
            <p className="text-slate-300">Power: {move.power || "—"}</p>
            <span className="text-slate-400">•</span>
            <p className="text-slate-300">Accuracy: {move.accuracy}%</p>
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

export default MoveHeader;
