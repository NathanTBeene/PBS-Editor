import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { type Pokemon } from "../lib/models/Pokemon";
import CustomSelect from "../components/ui/CustomSelect";
import { usePokedexContext } from "../lib/providers/PokedexProvider";
import { GenderRatios, GrowthRates } from "../lib/models/constants";
import StatsInputSection from "@/components/pokemon/sections/StatsInputSection";
import MoveSection from "@/components/pokemon/sections/MoveSection";
import InfoTooltip from "@/components/ui/InfoTooltip";
import PokemonList from "@/components/pokemon/sections/PokemonList";
import PokemonHeader from "@/components/pokemon/sections/PokemonHeader";
import PokemonBasicInfo from "@/components/pokemon/sections/PokemonBasicInfo";
import TypesAbilitiesSection from "@/components/pokemon/sections/TypesAbilitiesSection";
import EggGroupSection from "@/components/pokemon/sections/EggGroupSection";
import OffspringSection from "@/components/pokemon/sections/OffspringSection";
import PhysicalAttributesSection from "@/components/pokemon/sections/PhysicalAttributesSection";

const PokemonPage = () => {
  const { pokemon, selectedPokemon, setSelectedPokemon } = usePokedexContext();

  const [editData, setEditData] = useState<Pokemon | null>(pokemon[0] || null);

  useEffect(() => {
    if (pokemon.length > 0 && !selectedPokemon) {
      setSelectedPokemon(pokemon[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedPokemon) {
      setEditData(selectedPokemon);
    }
  }, [selectedPokemon]);

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

  function handleInputChange(arg0: string, value: string | number): void {
    throw new Error("Function not implemented.");
  }

  function addToArray(arg0: string): void {
    throw new Error("Function not implemented.");
  }

  function removeFromArray(arg0: string, index: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex h-screen text-slate-200 shadow-xl">
      {/* Left Sidebar - Pokemon List */}
      <PokemonList
        pokemon={pokemon}
        selectedPokemon={selectedPokemon}
        onPokemonSelect={(pokemon) => {
          console.log("Selected Pokemon:", pokemon);
          setSelectedPokemon(pokemon);
          setEditData(pokemon);
        }}
        onAddPokemon={() => {}}
      />

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

            <StatsInputSection
              title="Base Stats"
              stats={editData.baseStats || {}}
              onStatChange={() => {}}
            />

            <StatsInputSection
              title="Effort Values"
              stats={editData.effortValues || {}}
              onStatChange={() => {}}
            />

            <TypesAbilitiesSection
              pokemon={editData}
              setPokemon={setEditData}
            />

            <MoveSection
              title="Level-up Moves"
              pokemon={editData}
              type="level"
            />

            <MoveSection title="Tutor Moves" pokemon={editData} type="tutor" />

            <MoveSection title="Egg Moves" pokemon={editData} type="egg" />

            {/* Egg Groups */}
            <EggGroupSection pokemon={editData} />

            {/* Offspring */}
            <OffspringSection currentPokemon={editData} />

            {/* Physical Attributes */}
            <PhysicalAttributesSection currentPokemon={editData} />

            {/* Game Mechanics */}

            {/* Flags */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
