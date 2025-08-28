import { Plus } from "lucide-react";
import MoveEntry from "@/components/pokemon/MoveEntry";
import type { Pokemon, PokemonMove } from "@/lib/models/Pokemon";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import { useEffect, useState } from "react";

interface MoveSectionProps {
  title: string;
  pokemon: Pokemon;
  type: "level" | "tutor" | "egg";
}

const MoveSection = ({ title, pokemon, type }: MoveSectionProps) => {
  const { addPokemonMove, removePokemonMove, updatePokemonMove } =
    usePokedexContext();

  const [moves, setMoves] = useState<PokemonMove[]>([]);

  useEffect(() => {
    switch (type) {
      case "level":
        setMoves(pokemon.moves.sort((a, b) => (a.level || 0) - (b.level || 0)));
        break;
      case "tutor":
        setMoves(
          pokemon.tutorMoves.sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "egg":
        setMoves(pokemon.eggMoves.sort((a, b) => a.name.localeCompare(b.name)));
        break;
    }
  }, [pokemon.moves, pokemon.tutorMoves, pokemon.eggMoves, type]);

  const handleAddMove = () => {
    switch (type) {
      case "level":
        addPokemonMove("moves");
        break;
      case "tutor":
        addPokemonMove("tutorMoves");
        break;
      case "egg":
        addPokemonMove("eggMoves");
        break;
    }
  };

  const handleRemoveMove = (index: number) => {
    switch (type) {
      case "level":
        removePokemonMove("moves", index);
        break;
      case "tutor":
        removePokemonMove("tutorMoves", index);
        break;
      case "egg":
        removePokemonMove("eggMoves", index);
        break;
    }
  };

  const handleChangeMove = (index: number, value: string | number) => {
    const newMove: Partial<PokemonMove> = {};

    if (typeof value === "string") {
      newMove.name = value;
    } else {
      newMove.level = value;
    }

    switch (type) {
      case "level":
        updatePokemonMove("moves", index, newMove);
        break;
      case "tutor":
        updatePokemonMove("tutorMoves", index, newMove);
        break;
      case "egg":
        updatePokemonMove("eggMoves", index, newMove);
    }
  };

  const movesExport =
    moves.length > 0 ? (
      moves.map((move, index) => (
        <div
          key={`${type}-move-${move.name}-${move.level}-${index}`}
          className="w-full"
        >
          <MoveEntry
            move={move}
            onMoveChange={(value) => handleChangeMove(index, value)}
            onRemove={() => handleRemoveMove(index)}
            useLevel={type == "level" ? true : false}
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

  // const tutorMoves =
  //   moves.length > 0 ? (
  //     moves.map((move, index) => (
  //       <div
  //         key={`tutor-move-${move.name}-${move.level}-${index}`}
  //         className="w-full"
  //       >
  //         <MoveEntry
  //           move={move}
  //           onMoveChange={(value) => handleChangeMove(index, value)}
  //           onLevelChange={() => {}}
  //           onRemove={() => handleRemoveMove(index)}
  //           useLevel={false}
  //           onBlur={handleOnBlur}
  //         />
  //       </div>
  //     ))
  //   ) : (
  //     <div className="col-span-full">
  //       <p className="text-slate-500 italic py-4 text-center">
  //         No tutor moves added yet
  //       </p>
  //     </div>
  //   );

  // const eggMoves =
  //   pokemon.eggMoves.length > 0 ? (
  //     pokemon.eggMoves.map((move, index) => (
  //       <div
  //         key={`egg-move-${move.name}-${move.level}-${index}`}
  //         className="w-full"
  //       >
  //         <MoveEntry
  //           move={move}
  //           onMoveChange={(value) => handleChangeMove(index, value)}
  //           onLevelChange={() => {}}
  //           onRemove={() => handleRemoveMove(index)}
  //           useLevel={false}
  //           onBlur={handleOnBlur}
  //         />
  //       </div>
  //     ))
  //   ) : (
  //     <div className="col-span-full">
  //       <p className="text-slate-500 italic py-4 text-center">
  //         No egg moves added yet
  //       </p>
  //     </div>
  //   );

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
        {/* {type === "tutor" ? tutorMoves : type === "egg" ? eggMoves : levelMoves} */}
        {movesExport}
      </div>
    </section>
  );
};

export default MoveSection;
