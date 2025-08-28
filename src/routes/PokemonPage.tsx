import { useState, useEffect, useMemo } from "react";
import { type Pokemon } from "../lib/models/Pokemon";
import { usePokedexContext } from "../lib/providers/PokedexProvider";
import PokemonList from "@/components/pokemon/sections/PokemonList";
import PokemonHeader from "@/components/pokemon/sections/PokemonHeader";
import PokemonBasicInfo from "@/components/pokemon/sections/PokemonBasicInfo";

const PokemonPage = () => {
  const { pokemon, selectedPokemon, setSelectedPokemon } = usePokedexContext();

  const [editData, setEditData] = useState<Pokemon | null>(selectedPokemon);

  useEffect(() => {
    if (selectedPokemon) {
      setEditData(selectedPokemon);
    }
  }, [selectedPokemon]);

  // Only want to change the list when
  // selectedPokemon changes.
  // Or the list itself changes.
  const memoPokemonList = useMemo(() => {
    return (
      <PokemonList
        selectedPokemon={selectedPokemon}
        onPokemonSelect={(pokemon) => {
          console.log("Selected Pokemon:", pokemon);
          setSelectedPokemon(pokemon);
          setEditData(pokemon);
        }}
        onAddPokemon={() => {}}
      />
    );
  }, [pokemon]);

  // Early return if no data is available
  if (!editData || !selectedPokemon) {
    return (
      <div className="flex h-screen text-slate-200 shadow-xl items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No Pokemon Data</h2>
          <p className="text-slate-400">Loading Pokemon data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen text-slate-200 shadow-xl">
      {/* Left Sidebar - Pokemon List */}
      {memoPokemonList}

      {/* Main Content - Pokemon Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <PokemonHeader
          pokemon={editData}
          onSave={() => console.log("Save")}
          onReset={() => console.log("Reset")}
          onDelete={() => console.log("Delete")}
          onSetDefault={() => console.log("Set Default")}
        />

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-800">
          <div className="max-w-4xl mx-auto space-y-8">
            <PokemonBasicInfo pokemon={editData} setPokemon={setEditData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
