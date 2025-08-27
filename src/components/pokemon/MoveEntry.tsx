import { X } from "lucide-react";
import type { PokemonMove } from "../../lib/models/Pokemon";
import { usePokedexContext } from "../../lib/providers/PokedexProvider";
import Autocomplete from "../ui/Autocomplete";
import { useEffect, useState } from "react";

interface MoveEntryProps {
  move: PokemonMove;
  onMoveChange: (move: string) => void;
  onLevelChange: (level: number) => void;
  onRemove: () => void;
  useLevel?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const MoveEntry = ({
  move,
  onMoveChange,
  onLevelChange,
  onRemove,
  useLevel = true,
}: MoveEntryProps) => {
  const { moves } = usePokedexContext();
  const [moveName, setMoveName] = useState(move.name);
  const [moveLevel, setMoveLevel] = useState(move.level || 0);

  const handleDoneEditing = () => {
    // Logic to handle when editing is done
    console.log("Done editing");
    console.log(`Move: ${moveName}, Level: ${moveLevel}`);
    onMoveChange(moveName);
    onLevelChange(moveLevel);
  };

  useEffect(() => {
    setMoveName(move.name);
    setMoveLevel(move.level || 0);
  }, [move]);

  return (
    <div
      tabIndex={-1}
      className="flex items-center gap-1 p-1 py-2 shadow-md rounded-sm bg-slate-700/50 text-sm min-w-0"
    >
      {useLevel && (
        <div className="w-10 flex-shrink-0">
          <input
            type="number"
            value={moveLevel || ""}
            onChange={(e) => {
              setMoveLevel(parseInt(e.target.value) || 0);
            }}
            className="w-full px-1 py-2.5 border-b border-slate-500 text-xs focus:outline-none text-center focus:ring-transparent focus:border-blue-300"
            min="0"
            max="100"
            placeholder="0"
            onBlur={handleDoneEditing}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <Autocomplete
          value={moveName}
          onValueChange={setMoveName}
          options={moves.map((m) => m.id)}
          placeholder="Enter move..."
          inputClass="rounded-none border-b border-t-0 border-l-0 border-r-0 focus:ring-transparent focus:border-blue-300"
          onBlur={handleDoneEditing}
        />
      </div>
      <button
        onClick={onRemove}
        className="p-0.5 text-rose-300 hover:text-rose-500 flex-shrink-0 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MoveEntry;
