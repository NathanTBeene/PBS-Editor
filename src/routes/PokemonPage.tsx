import { useState, useEffect, useMemo } from "react";
import { type Pokemon } from "../lib/models/Pokemon";
import { usePokedexContext } from "../lib/providers/PokedexProvider";
import PokemonList from "@/components/pokemon/sections/PokemonList";
import PokemonHeader from "@/components/pokemon/sections/PokemonHeader";
import PokemonBasicInfo from "@/components/pokemon/sections/PokemonBasicInfo";
import StatsInputSection from "@/components/pokemon/sections/StatsInputSection";
import TypesAbilitiesSection from "@/components/pokemon/sections/TypesAbilitiesSection";
import MoveSection from "@/components/pokemon/sections/MoveSection";
import EggGroupSection from "@/components/pokemon/sections/EggGroupSection";
import OffspringSection from "@/components/pokemon/sections/OffspringSection";
import PhysicalAttributesSection from "@/components/pokemon/sections/PhysicalAttributesSection";
import { useAlertContext } from "@/lib/providers/AlertProvider";
import GameMechanicsSection from "@/components/pokemon/sections/GameMechanicsSection";
import WildItemsSection from "@/components/pokemon/sections/WildItemsSection";
import FlagsSection from "@/components/pokemon/sections/FlagsSection";
import { validatePokemon } from "@/lib/services/pokemonValidator";

const PokemonPage = () => {
  const {
    pokemon,
    selectedPokemon,
    setSelectedPokemon,
    setPokemonToDefault,
    removePokemon,
    setPokemonData,
    overridePokemonData,
  } = usePokedexContext();

  const { showWarning, showError } = useAlertContext();

  const [editData, setEditData] = useState<Pokemon | null>(selectedPokemon);

  useEffect(() => {
    if (selectedPokemon) {
      setEditData(selectedPokemon);
    }
  }, [selectedPokemon]);

  const handleSave = async () => {
    if (!selectedPokemon || !editData) return;

    const validationErrors = validatePokemon(editData);
    if (validationErrors) {
      console.error("Validation Errors:", validationErrors);
      showError(
        "Validation Errors",
        `The following fields have an invalid input or have been left blank:\n\n ${validationErrors.join(
          "\n"
        )}`
      );
      return;
    }

    if (selectedPokemon.id != editData.id) {
      const response = await showWarning(
        "Different Pokemon ID",
        `You've changed the unique Pokemon id for ${selectedPokemon.name}. If you proceed, this pokemon will be overwritten. It is recommended that if you want to change the ID, you instead create a new Pokemon.`
      );

      // ON Cancel
      if (!response) {
        const id = selectedPokemon.id;
        setEditData((prev) => (prev ? { ...prev, id } : null));
        return;
      }

      // ON Confirm, override.
      console.log("Overriding Pokemon ID", selectedPokemon.id, editData.id);
      overridePokemonData(selectedPokemon.id, editData);
      return;
    }

    console.log("Saving Pokemon Data", editData);
    setPokemonData(editData);
  };

  // Returns to full default values of the imported PBS File.
  const handleDefault = async () => {
    if (!selectedPokemon || !editData) return;

    if (
      await showWarning(
        "Reset to Default",
        `This will reset all details for ${selectedPokemon.name} to their default values. Are you sure you want to do this?`
      )
    ) {
      // On Confirm, reset selected pokemon to its default values.
      const success = setPokemonToDefault(selectedPokemon.id);
      if (success) {
        setEditData(selectedPokemon);
      } else {
        showError(
          `ID Not Found`,
          `There was no default data found for a Pokemon with the unique ID [${selectedPokemon.id}]. This is most likely a custom pokemon, or the ID does not correctly match an existing Pokemon.`
        );
      }
    }

    // On Cancel do nothing.
  };

  // Returns values to their start when selected.
  const handleReset = () => {
    if (!selectedPokemon || !editData) return;

    setEditData(selectedPokemon);
  };

  // Don't need to wait since delete button
  // already requires confirmation.
  const handleDelete = () => {
    if (!selectedPokemon || !editData) return;

    removePokemon(selectedPokemon.id);
    setSelectedPokemon(null);
  };

  // Only want to change the list when
  // pokemon list itself changes.
  const memoPokemonList = useMemo(() => {
    return (
      <PokemonList
        selectedPokemon={selectedPokemon}
        onPokemonSelect={(pokemon) => {
          setSelectedPokemon(pokemon);
          setEditData(pokemon);
        }}
      />
    );
  }, [pokemon, selectedPokemon]);

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
    <div className="flex h-screen w-[70vw] text-slate-200 shadow-xl">
      {/* Left Sidebar - Pokemon List */}
      {memoPokemonList}

      {/* Main Content - Pokemon Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <PokemonHeader
          pokemon={editData}
          onSave={handleSave}
          onReset={handleReset}
          onDelete={handleDelete}
          onSetDefault={handleDefault}
        />

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-800">
          <div className="max-w-4xl mx-auto space-y-8 mb-80">
            {/* Basic Info */}
            <PokemonBasicInfo pokemon={editData} setPokemon={setEditData} />

            {/* Base Stats */}
            <StatsInputSection
              title="Base Stats"
              type="base"
              pokemon={editData}
              setPokemon={setEditData}
              minValue={1}
            />

            {/* Effort Values */}
            <StatsInputSection
              title="Effort Values"
              type="effort"
              pokemon={editData}
              setPokemon={setEditData}
              minValue={0}
            />

            {/* Types and Abilities */}
            <TypesAbilitiesSection
              pokemon={editData}
              setPokemon={setEditData}
            />

            {/* Level-Up Moves */}
            <MoveSection
              title="Level-up Moves"
              pokemon={editData}
              setPokemon={setEditData}
              type="level"
            />

            {/* Tutor Moves */}
            <MoveSection
              title="Tutor Moves"
              pokemon={editData}
              setPokemon={setEditData}
              type="tutor"
            />

            {/* Egg Moves */}
            <MoveSection
              title="Egg Moves"
              pokemon={editData}
              setPokemon={setEditData}
              type="egg"
            />

            {/* Egg Groups */}
            <EggGroupSection pokemon={editData} setPokemon={setEditData} />

            {/* Offspring */}
            <OffspringSection
              currentPokemon={editData}
              setPokemon={setEditData}
            />

            {/* Physical Attributes */}
            <PhysicalAttributesSection
              currentPokemon={editData}
              setPokemon={setEditData}
            />

            {/* Game Mechanics */}
            <GameMechanicsSection pokemon={editData} setPokemon={setEditData} />

            {/* Wild Items */}
            <WildItemsSection pokemon={editData} setPokemon={setEditData} />

            {/* Flags */}
            <FlagsSection pokemon={editData} setPokemon={setEditData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
