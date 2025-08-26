import { Plus } from "lucide-react";
import { useState } from "react";
import MoveEntry from "./MoveEntry";

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
  // Track which moves are currently being edited (focused)
  const [editingIndices, setEditingIndices] = useState<Set<number>>(new Set());

  // Create array with original indices to track after sorting
  const movesWithIndices = moves
    ? moves.map((move, originalIndex) => ({ ...move, originalIndex }))
    : [];

  // Separate moves into stable (not being edited) and unstable (being edited or empty)
  const stableMoves = movesWithIndices.filter(
    (move) =>
      !editingIndices.has(move.originalIndex) &&
      move.name &&
      move.name.trim() !== ""
  );
  const unstableMoves = movesWithIndices.filter(
    (move) =>
      editingIndices.has(move.originalIndex) ||
      !move.name ||
      move.name.trim() === ""
  );

  // Only sort stable moves
  const sortedStableMoves = stableMoves.sort((a, b) => {
    if (sortBy === "level") {
      return (a.level || 0) - (b.level || 0);
    }
    return a.name.localeCompare(b.name);
  });

  // Combine sorted stable moves with unstable moves at the end
  const finalMoves = [...sortedStableMoves, ...unstableMoves];

  const handleMoveEditStart = (originalIndex: number) => {
    setEditingIndices((prev) => new Set([...prev, originalIndex]));
  };

  const handleMoveEditEnd = (originalIndex: number) => {
    setEditingIndices((prev) => {
      const newSet = new Set(prev);
      newSet.delete(originalIndex);
      return newSet;
    });
  };

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
        {finalMoves.length > 0 ? (
          finalMoves.map((move) => (
            <div key={move.originalIndex} className="w-full">
              <MoveEntry
                move={move}
                onMoveChange={(value) =>
                  onMoveChange(move.originalIndex, "name", value)
                }
                onLevelChange={
                  useLevel
                    ? (value) =>
                        onMoveChange(move.originalIndex, "level", value)
                    : () => {}
                }
                onRemove={() => onRemoveMove(move.originalIndex)}
                useLevel={useLevel}
                onFocus={() => handleMoveEditStart(move.originalIndex)}
                onBlur={() => handleMoveEditEnd(move.originalIndex)}
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
