import type { Pokemon } from "@/lib/models/Pokemon";
import React from "react";
import TypeBubble from "../ui/TypeBubble";

interface PokemonListItemProps {
  pokemon: Pokemon;
  selectedPokemon: Pokemon | null;
  pokemonRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  selectAndScrollToPokemon: (pokemon: Pokemon) => void;
}

const PokemonListItem = ({
  pokemon,
  selectedPokemon,
  pokemonRefs,
  selectAndScrollToPokemon,
}: PokemonListItemProps) => {
  return (
    <div
      key={pokemon.id}
      ref={(el) => {
        pokemonRefs.current[pokemon.id] = el;
      }}
      className={`p-3 border-b border-slate-500 bg-gradient-to-r from-slate-800/10 to-slate-800 cursor-pointer transition-colors ${
        selectedPokemon?.id === pokemon.id
          ? "bg-blue-600/20 border-l-4 border-l-blue-600/40"
          : "hover:bg-slate-600/40"
      }`}
      onClick={() => {
        selectAndScrollToPokemon(pokemon);
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-md font-bold">
          #{pokemon.dexNumber}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">
            {pokemon.name}
            {pokemon.formName && (
              <span className="text-slate-300 text-sm ml-1">
                ({pokemon.formName})
              </span>
            )}
          </div>
          <div className="flex gap-1 mt-1">
            {pokemon.types.map((type) => (
              <TypeBubble key={type} type={type} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PokemonListItem);
