import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { type Pokemon } from "@/lib/models/Pokemon";
import TypeBubble from "@/components/TypeBubble";
import NewPokemonForm from "@/components/forms/NewPokemonForm";
import { usePokedexContext } from "@/lib/providers/PokedexProvider";
import PokemonListItem from "../PokemonListItem";

interface PokemonListProps {
  selectedPokemon: Pokemon | null;
  onPokemonSelect: (pokemon: Pokemon) => void;
  onAddPokemon: () => void;
}

const PokemonList = ({
  selectedPokemon,
  onPokemonSelect,
}: PokemonListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasScrolledToSelected, setHasScrolledToSelected] = useState(false);

  const { pokemon } = usePokedexContext();

  const filteredPokemon = useMemo(() => {
    return pokemon.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.includes(searchTerm)
    );
  }, [pokemon, searchTerm]);

  const pokemonRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Initial scroll to selected pokemon when component mounts or selected pokemon changes
  useEffect(() => {
    if (selectedPokemon && !hasScrolledToSelected) {
      // Use setTimeout to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        scrollToPokemon(selectedPokemon.id, false); // false = instant scroll for initial positioning
        setHasScrolledToSelected(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [selectedPokemon, hasScrolledToSelected]);

  // Smooth scroll when user selects a different pokemon
  useEffect(() => {
    if (selectedPokemon && hasScrolledToSelected) {
      scrollToPokemon(selectedPokemon.id, true); // true = smooth scroll for user interactions
    }
  }, [selectedPokemon, hasScrolledToSelected]);

  // Reset scroll flag when search changes
  useEffect(() => {
    if (searchTerm) {
      setHasScrolledToSelected(false);
    }
  }, [searchTerm]);

  const scrollToPokemon = (pokemonId: string, smooth: boolean = true) => {
    const pokemonElement = pokemonRefs.current[pokemonId];
    const containerElement = listContainerRef.current;

    if (pokemonElement && containerElement) {
      const containerRect = containerElement.getBoundingClientRect();
      const pokemonRect = pokemonElement.getBoundingClientRect();

      // Calculate the scroll position needed to center the Pokemon in the container
      const scrollTop =
        pokemonElement.offsetTop -
        containerElement.offsetTop -
        containerRect.height / 2 +
        pokemonRect.height / 2;

      containerElement.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: smooth ? "smooth" : "instant",
      });
    }
  };

  const selectAndScrollToPokemon = (pokemon: Pokemon) => {
    onPokemonSelect(pokemon);
    // Don't manually scroll here - let the useEffect handle it
  };

  return (
    <div className="w-80 bg-gradient-to-r from-slate-800/40 to-slate-800 flex flex-col">
      {/* Search Header */}
      <div className="p-4 flex items-center h-25 border-b-3 border-slate-700 shadow-md">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Pokemon..."
              className="w-full pl-10 pr-4 py-2 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300/70 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <NewPokemonForm />
        </div>
      </div>

      {/* Pokemon List */}
      <div
        ref={listContainerRef}
        className="flex-1 overflow-y-auto border-r-3 border-slate-700"
      >
        {filteredPokemon
          .sort((a, b) => a.dexNumber - b.dexNumber)
          .map((pokemon) => (
            <PokemonListItem
              key={pokemon.id}
              pokemon={pokemon}
              selectedPokemon={selectedPokemon}
              pokemonRefs={pokemonRefs}
              selectAndScrollToPokemon={selectAndScrollToPokemon}
            />
          ))}
      </div>
    </div>
  );
};

export default PokemonList;
