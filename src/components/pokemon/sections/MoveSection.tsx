import { Plus } from "lucide-react";
import MoveEntry from "@/components/pokemon/MoveEntry";
import type { Pokemon, PokemonMove } from "@/lib/models/Pokemon";
import { useMemo } from "react";
import React from "react";

interface MoveSectionProps {
  title: string;
  pokemon: Pokemon;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  type: "level" | "tutor" | "egg";
}

const MoveSection = ({
  title,
  pokemon,
  setPokemon,
  type,
}: MoveSectionProps) => {
  let field: string = "";

  switch (type) {
    case "level":
      field = "moves";
      break;
    case "tutor":
      field = "tutorMoves";
      break;
    case "egg":
      field = "eggMoves";
      break;
  }

  const moves = useMemo(() => {
    switch (type) {
      case "level":
        return pokemon.moves.sort((a, b) => (a.level || 0) - (b.level || 0));
      case "tutor":
        return pokemon.tutorMoves.sort((a, b) => a.name.localeCompare(b.name));
      case "egg":
        return pokemon.eggMoves.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return [];
    }
  }, [pokemon.moves, pokemon.tutorMoves, pokemon.eggMoves, type]);

  const handleAddMove = () => {
    const newMove: PokemonMove = {
      name: "",
      level: type === "level" ? 0 : undefined,
    };
    setPokemon((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: [...(prev as any)[field], newMove],
      };
    });
  };

  const handleRemoveMove = (index: number) => {
    setPokemon((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: (prev as any)[field].filter(
          (_: PokemonMove, i: number) => i !== index
        ),
      };
    });
  };

  const handleChangeMove = (index: number, move: PokemonMove) => {
    console.log(
      `Setting move at index ${index} for type ${type} to ${JSON.stringify(
        move
      )}`
    );

    setPokemon((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: (prev as any)[field].map((m: PokemonMove, i: number) =>
          i === index ? { ...m, ...move } : m
        ),
      };
    });
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
            onMoveChange={(move) => handleChangeMove(index, move)}
            onRemove={() => handleRemoveMove(index)}
            useLevel={type == "level" ? true : false}
          />
        </div>
      ))
    ) : (
      <div className="col-span-full">
        <p className="text-slate-500 italic py-4 text-center">
          No {type} moves added yet
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
        {movesExport}
      </div>
    </section>
  );
};

const areEqual = (prevProps: MoveSectionProps, nextProps: MoveSectionProps) => {
  if (prevProps.type !== nextProps.type) return false;
  switch (nextProps.type) {
    case "level":
      return prevProps.pokemon.moves === nextProps.pokemon.moves;
    case "tutor":
      return prevProps.pokemon.tutorMoves === nextProps.pokemon.tutorMoves;
    case "egg":
      return prevProps.pokemon.eggMoves === nextProps.pokemon.eggMoves;
    default:
      return true;
  }
};

export default React.memo(MoveSection, areEqual);
