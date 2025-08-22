import { X } from "lucide-react";
import type { PokemonMove } from "../../lib/models/Pokemon";
import CustomAutocomplete from "../Base/CustomAutocomplete";
import { usePokedexContext } from "../../lib/providers/PokedexProvider";

interface MoveEntryProps {
  move: PokemonMove;
  onMoveChange: (move: string) => void;
  onLevelChange: (level: number) => void;
  onRemove: () => void;
  useLevel?: boolean;
}

const MoveEntry = ({
  move,
  onMoveChange,
  onLevelChange,
  onRemove,
  useLevel = true,
}: MoveEntryProps) => {
  const { moves } = usePokedexContext();

  return (
    <div
      tabIndex={-1}
      className="flex items-center gap-1 p-1 py-2 shadow-md rounded-sm bg-slate-700/50 text-sm min-w-0"
    >
      {useLevel && (
        <div className="w-10 flex-shrink-0">
          <input
            type="number"
            value={move.level || ""}
            onChange={(e) => {
              onLevelChange(parseInt(e.target.value) || 0);
            }}
            className="w-full px-1 py-2.5 border-b border-slate-500 text-xs focus:outline-none text-center focus:ring-transparent focus:border-blue-300"
            min="0"
            max="100"
            placeholder="0"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <CustomAutocomplete
          value={move.name || ""}
          onChange={onMoveChange}
          options={moves.map((m) => m.id)}
          placeholder="Move..."
          className="text-xs text-slate-300"
          inputClassName="border-slate-500 rounded-none border-l-0 border-r-0 border-t-0 focus:ring-transparent focus:border-blue-300"
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
