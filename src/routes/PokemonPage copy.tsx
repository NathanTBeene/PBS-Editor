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
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold  mb-4">Game Mechanics</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Catch Rate */}
                <div>
                  <label className="flex gap-2 items-center relative text-sm font-medium text-slate-300 mb-2">
                    Catch Rate
                    <InfoTooltip description="Number between 0 and 255. The higher the number, the more likely it is to catch. (0 means it can only be caught with a Master Ball)" />
                  </label>
                  <input
                    type="number"
                    value={editData.catchRate}
                    onChange={() => {}}
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                    min="0"
                    max="255"
                  />
                </div>
                {/* Base Happiness */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Base Happiness
                  </label>
                  <input
                    type="number"
                    value={editData.happiness}
                    onChange={() => {}}
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                    min="0"
                    max="255"
                  />
                </div>
                {/* Base Experience */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Base Experience
                  </label>
                  <input
                    type="number"
                    value={editData.baseExp}
                    onChange={() => {}}
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
                {/* Growth Rate */}
                <div>
                  <label className="flex gap-2 items-center relative text-sm font-medium text-slate-300 mb-2">
                    Growth Rate
                    <InfoTooltip
                      description="The growth rate of this Pokémon. Click for more information."
                      link="https://bulbapedia.bulbagarden.net/wiki/Experience"
                    />
                  </label>
                  <CustomSelect
                    value={editData.growthRate}
                    onChange={(value) => handleInputChange("growthRate", value)}
                    options={GrowthRates}
                    placeholder="Select growth rate..."
                  />
                </div>
                {/* Gender Ratio */}
                <div>
                  <label className="flex gap-2 items-center relative text-sm font-medium text-slate-300 mb-2">
                    Gender Ratio
                    <InfoTooltip description="The ratio of Pokémon that will be female for this species." />
                  </label>
                  <CustomSelect
                    value={editData.genderRatio}
                    onChange={(value) =>
                      handleInputChange("genderRatio", value)
                    }
                    options={GenderRatios}
                    placeholder="Select gender ratio..."
                  />
                </div>
                {/* Hatch Steps */}
                <div>
                  <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2 relative">
                    Hatch Steps
                    <InfoTooltip description="The number of steps required for this Pokémon to hatch." />
                  </label>
                  <input
                    type="number"
                    value={editData.hatchSteps}
                    onChange={(e) =>
                      handleInputChange("hatchSteps", parseInt(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
                {/* Incense */}
                <div>
                  <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2 relative">
                    Incense
                    <InfoTooltip description="The item ID of an item that must be held by the parent Pokémon to breed this Pokémon." />
                  </label>
                  <input
                    type="text"
                    value={editData.incense || ""}
                    onChange={(e) =>
                      handleInputChange("incense", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
              </div>
            </section>

            {/* Wild Items */}
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold  mb-4 flex items-center gap-2">
                Wild Items
                <InfoTooltip description="The IDs of items that a wild Pokémon of this species can be found holding." />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Common Item */}
                <div>
                  <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2 relative">
                    Wild Item Common (50%)
                  </label>
                  <input
                    type="text"
                    value={editData.wildItemCommon || ""}
                    onChange={(e) =>
                      handleInputChange("wildItemCommon", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
                {/* Wild Item Uncommon (5%) */}
                <div>
                  <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2 relative">
                    Wild Item Uncommon (5%)
                  </label>
                  <input
                    type="text"
                    value={editData.wildItemUncommon || ""}
                    onChange={(e) =>
                      handleInputChange("wildItemUncommon", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
                {/* Wild Item Rare (1%) */}
                <div>
                  <label className="flex gap-2 items-center text-sm font-medium text-slate-300 mb-2 relative">
                    Wild Item Rare (1%)
                  </label>
                  <input
                    type="text"
                    value={editData.wildItemRare || ""}
                    onChange={(e) =>
                      handleInputChange("wildItemRare", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
              </div>
            </section>

            {/* Flags */}
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6 mb-60">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-semibold  mb-4 flex items-center gap-2">
                  Flags
                  <InfoTooltip
                    description="A list of labels that can be used to make the Pokemon behave differently. For a list of existing flags, click here."
                    link="https://essentialsdocs.fandom.com/wiki/Defining_a_species"
                  />
                </h2>
                <button
                  onClick={() => addToArray("flags")}
                  className="px-3 py-1 text-sm border border-slate-500 rounded-md text-slate-500 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Flag
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {editData.flags.map((flag, index) => (
                  <div className="flex py-2 items-center" key={index}>
                    <input
                      type="text"
                      value={flag}
                      onChange={(e) =>
                        handleInputChange("flags", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                      placeholder="Enter flag..."
                    />
                    <button
                      onClick={() => removeFromArray("flags", index)}
                      className="px-2 py-1 h-fit text-rose-300 hover:text-rose-400 cursor-pointer rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
