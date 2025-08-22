import { Plus } from "lucide-react";
import MoveEntry from "./MoveEntry";
import { type Pokemon } from "../lib/models/Pokemon";

interface MoveSectionProps {
  title: string;
  moves: Array<{ name: string; level?: number }>;
  useLevel: boolean;
  onAddMove: () => void;
  onMoveChange: (index: number, field: string, value: string | number) => void;
  onRemoveMove: (index: number) => void;
  gridCols?: string;
  sortBy?: "level" | "name";
}

const MoveSection = ({
  title,
  moves,
  useLevel,
  onAddMove,
  onMoveChange,
  onRemoveMove,
  gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5",
  sortBy = "name",
}: MoveSectionProps) => {
  const sortedMoves = moves ? [...moves].sort((a, b) => {
    if (sortBy === "level") {
      return (a.level || 0) - (b.level || 0);
    }
    return a.name.localeCompare(b.name);
  }) : [];

  return (
    <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={onAddMove}
          className="px-3 py-1 text-sm border border-slate-500 rounded-md text-slate-500 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors flex items-center gap-1"
        >
          <Plus className="w-3 h-3" />
          Add Move
        </button>
      </div>

      <div className={`grid ${gridCols} gap-2`}>
        {sortedMoves.length > 0 ? (
          sortedMoves.map((move, index) => (
            <div
              key={`${sortBy === "level" ? move.level : ""}${move.name}-${index}`}
              className="w-full"
            >
              <MoveEntry
                move={move}
                onMoveChange={(value) => onMoveChange(index, "name", value)}
                onLevelChange={
                  useLevel
                    ? (value) => onMoveChange(index, "level", value)
                    : () => {}
                }
                onRemove={() => onRemoveMove(index)}
                useLevel={useLevel}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <p className="text-slate-500 italic py-4 text-center">
              No {title.toLowerCase()} added yet
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MoveSection;