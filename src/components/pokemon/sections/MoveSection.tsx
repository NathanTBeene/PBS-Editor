import { Plus } from "lucide-react";
import MoveEntry from "@/components/pokemon/MoveEntry";
import type { Pokemon } from "@/lib/models/Pokemon";

interface MoveSectionProps {
  title: string;
  pokemon: Pokemon;
  setPokemon: (updater: (prev: Pokemon | null) => Pokemon | null) => void;
  type: "moves" | "tutor" | "egg";
}

const MoveSection = ({
  title,
  pokemon,
  setPokemon,
  type,
}: MoveSectionProps) => {
  const handleAddMove = () => {
    setPokemon((prev) => {
      if (!prev) return null;

      const newMove = { name: "", level: type === "moves" ? 0 : undefined };
      return {
        ...prev,
        [type]: [...prev[type as "moves" | "tutorMoves" | "eggMoves"], newMove],
      };
    });
  };

  const handleRemoveMove = (index: number) => {
    setPokemon((prev) => {
      if (!prev) return null;

      const currentMoves = prev[type as "moves" | "tutorMoves" | "eggMoves"];
      const newMoves = currentMoves.filter((_, i) => i !== index);

      return {
        ...prev,
        [type]: newMoves,
      };
    });
  };

  const handleChangeMove = (index: number, value: string | number) => {
    // If string we are changing the name
    if (typeof value === "string") {
      setPokemon((prev) => {
        if (!prev) return null;

        const currentMoves = prev[type as "moves" | "tutorMoves" | "eggMoves"];
        const newMoves = currentMoves.map((move, i) =>
          i === index ? { ...move, name: value } : move
        );

        return {
          ...prev,
          [type]: newMoves,
        };
      });
    } else {
      // If number we are changing the level
      setPokemon((prev) => {
        if (!prev) return null;

        const currentMoves = prev[type as "moves" | "tutorMoves" | "eggMoves"];
        const newMoves = currentMoves.map((move, i) =>
          i === index ? { ...move, level: value } : move
        );

        return {
          ...prev,
          [type]: newMoves,
        };
      });
    }
  };

  const levelMoves =
    pokemon.moves.length > 0 ? (
      pokemon.moves.map((move, index) => (
        <div key={`level-move-${move.name}`} className="w-full">
          <MoveEntry
            move={move}
            onMoveChange={(value) => handleChangeMove(index, value)}
            onLevelChange={(value) => handleChangeMove(index, value)}
            onRemove={() => handleRemoveMove(index)}
            useLevel={true}
          />
        </div>
      ))
    ) : (
      <div className="col-span-full">
        <p className="text-slate-500 italic py-4 text-center">
          No level-up moves added yet
        </p>
      </div>
    );

  const tutorMoves =
    pokemon.tutorMoves.length > 0 ? (
      pokemon.tutorMoves.map((move, index) => (
        <div key={`tutor-move-${move.name}`} className="w-full">
          <MoveEntry
            move={move}
            onMoveChange={(value) => handleChangeMove(index, value)}
            onLevelChange={() => {}}
            onRemove={() => handleRemoveMove(index)}
            useLevel={false}
          />
        </div>
      ))
    ) : (
      <div className="col-span-full">
        <p className="text-slate-500 italic py-4 text-center">
          No tutor moves added yet
        </p>
      </div>
    );

  const eggMoves =
    pokemon.eggMoves.length > 0 ? (
      pokemon.eggMoves.map((move, index) => (
        <div key={`egg-move-${move.name}`} className="w-full">
          <MoveEntry
            move={move}
            onMoveChange={(value) => handleChangeMove(index, value)}
            onLevelChange={() => {}}
            onRemove={() => handleRemoveMove(index)}
            useLevel={false}
          />
        </div>
      ))
    ) : (
      <div className="col-span-full">
        <p className="text-slate-500 italic py-4 text-center">
          No egg moves added yet
        </p>
      </div>
    );

  return (
    <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={handleAddMove}
          className="px-3 py-1 text-sm border border-slate-500 rounded-md text-slate-500 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors flex items-center gap-1"
        >
          <Plus className="w-3 h-3" />
          Add Move
        </button>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2`}>
        {type === "tutor" ? tutorMoves : type === "egg" ? eggMoves : levelMoves}
      </div>
    </section>
  );
};

export default MoveSection;
