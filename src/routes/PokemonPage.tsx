import { useState, useEffect } from "react";
import { Plus, Save, RotateCcw, X, ArrowDownToLine } from "lucide-react";
import { type Pokemon } from "../lib/models/Pokemon";
import CustomSelect from "../components/Base/CustomSelect";
import { usePokedexContext } from "../lib/providers/PokedexProvider";
import {
  PokemonColors,
  PokemonShapes,
  GenderRatios,
  GrowthRates,
  EggGroups,
} from "../lib/models/constants";
import { validateSaveData } from "../lib/services/pokemonValidator";
import { useArrayManager } from "../lib/hooks/useArrayManager";
import FormSection from "../components/Pokemon Page/FormSection";
import InputField from "../components/Base/InputField";
import StatsInputSection from "../components/Pokemon Page/StatsInputSection";
import ArrayManager from "../components/Base/ArrayManager";
import MoveSection from "../components/Pokemon Page/MoveSection";
import InfoTooltip from "../components/Base/InfoTooltip";
import CustomAutocomplete from "../components/Base/CustomAutocomplete";
import NewPokemonForm from "../components/Forms/NewPokemonForm";
import DeleteButton from "../components/Base/DeleteButton";
import PokemonList from "../components/Pokemon Page/PokemonList";
import TypeBubble from "../components/TypeBubble";

const PokemonPage = () => {
  const {
    pokemon,
    types,
    setPokemonData,
    removePokemon,
    setDefault,
    selectedPokemon,
    setSelectedPokemon,
  } = usePokedexContext();

  const [editData, setEditData] = useState<Pokemon | null>(pokemon[0] || null);
  const [modalOpen, setModalOpen] = useState(false);

  const { handleArrayChange, removeFromArray, addToArray } = useArrayManager({
    data: editData ?? pokemon[0],
    setData: setEditData,
  });

  useEffect(() => {
    if (pokemon.length > 0 && !selectedPokemon) {
      setSelectedPokemon(pokemon[0]);
      setEditData(pokemon[0]);
    } else {
      setEditData(pokemon.find((p) => p.id === selectedPokemon?.id) || null);
    }
  }, [pokemon, selectedPokemon]);

  const resetChanges = () => {
    if (selectedPokemon) {
      setEditData(selectedPokemon);
    }
  };

  const setToDefault = () => {
    if (selectedPokemon) {
      setDefault(selectedPokemon.id);
    }
  };

  const saveChanges = () => {
    if (!selectedPokemon || !editData) {
      console.error("No Pokemon selected or edit data available");
      return;
    }

    // Here you would save the changes to your data store
    console.log(
      `Attempting to save changes to ${selectedPokemon.name}:`,
      editData
    );
    const { saveData, errors } = validateSaveData(editData);

    if (errors) {
      console.error("Validation errors found:", errors);
      return;
    } else {
      setPokemonData(saveData);
      // Update the selected Pokemon to the saved version
      setSelectedPokemon(saveData);
    }
  };

  function handleInputChange(field: string, value: string | number): void {
    if (!editData) return;

    setEditData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value,
      };
    });
  }

  function handleStatChange(
    field: "baseStats" | "effortValues",
    stat: keyof Pokemon["baseStats"] | keyof Pokemon["effortValues"],
    value: number
  ): void {
    if (!editData) return;

    setEditData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: {
          ...prev[field],
          [stat]: value,
        },
      };
    });
  }

  function addMove(
    field: "moves" | "tutorMoves" | "eggMoves",
    name: string
  ): void {
    if (!editData) return;

    setEditData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: [...prev[field], { name }],
      };
    });
  }

  function removeMoveFromArray(
    field: "moves" | "tutorMoves" | "eggMoves",
    index: number
  ): void {
    if (!editData) return;

    setEditData((prev) => {
      if (!prev) return null;
      const moves = [...prev[field]];
      moves.splice(index, 1);
      return {
        ...prev,
        [field]: moves,
      };
    });
  }

  function handleMoveChange(
    field: "moves" | "tutorMoves" | "eggMoves",
    index: number,
    subField: string,
    value: string | number
  ): void {
    if (!editData) return;

    setEditData((prev) => {
      if (!prev) return null;
      const moves = [...prev[field]];
      moves[index] = {
        ...moves[index],
        [subField]: value,
      };
      return {
        ...prev,
        [field]: moves,
      };
    });
  }

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
      <PokemonList
        pokemon={pokemon}
        selectedPokemon={selectedPokemon}
        onPokemonSelect={(pokemon) => {
          console.log("Selected Pokemon:", pokemon);
          setSelectedPokemon(pokemon);
          setEditData(pokemon);
        }}
        onAddPokemon={() => setModalOpen(true)}
      />

      {/* Main Content - Pokemon Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 h-25 bg-slate-800 border-b-3 border-slate-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {editData.name}
                {editData.formName && (
                  <span className="text-slate-300 ml-2">
                    ({editData.formName})
                  </span>
                )}
              </h1>
              <div className="flex">
                <p className="text-slate-300 mt-1 mr-10">
                  #{editData.dexNumber} - The {editData.category} Pokemon
                </p>
                <div className="flex gap-2 mt-1">
                  {editData.types.map((type) => (
                    <TypeBubble key={type} type={type} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={setToDefault}
                className="flex bg-slate-700 items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors shadow-sm cursor-pointer"
              >
                <ArrowDownToLine className="w-4 h-4" />
                Default
              </button>
              <button
                onClick={resetChanges}
                className="flex bg-slate-700 items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <DeleteButton
                onConfirm={() => {
                  if (
                    window.confirm(
                      "NOTICE: Deleting this Pokemon will not remove it's ID from any other Pokemon. Evolutions, offspring, etc."
                    )
                  ) {
                    removePokemon(selectedPokemon.id);
                    setSelectedPokemon(pokemon[0]);
                    setEditData(pokemon[0]);
                  }
                }}
              />
              <button
                onClick={saveChanges}
                className="flex items-center text-emerald-100 gap-2 px-4 py-2 bg-emerald-600 shadow-sm rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <Save className="w-5 h-5 text-emerald-200" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-800">
          <div className="max-w-4xl mx-auto space-y-8">
            <FormSection title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="ID"
                  value={editData.id}
                  onChange={(value) => handleInputChange("id", value)}
                  tooltip={{
                    description:
                      "The unique identifier for this Pokémon. Essentials standard is all caps no spaces.",
                  }}
                />
                <InputField
                  label="Name"
                  value={editData.name}
                  onChange={(value) => handleInputChange("name", value)}
                />
                <InputField
                  label="Form Name"
                  value={editData.formName || ""}
                  onChange={(value) => handleInputChange("formName", value)}
                />
                <InputField
                  label="Category"
                  value={editData.category}
                  onChange={(value) => handleInputChange("category", value)}
                />
                <InputField
                  label="Generation"
                  type="number"
                  value={editData.generation}
                  onChange={(value) => handleInputChange("generation", value)}
                />
                <InputField
                  label="Dex #"
                  type="number"
                  value={editData.dexNumber}
                  onChange={(value) => handleInputChange("dexNumber", value)}
                />
              </div>
              <div className="mt-4">
                <InputField
                  label="Pokedex Entry"
                  type="textarea"
                  value={editData.pokedex}
                  onChange={(value) => handleInputChange("pokedex", value)}
                  rows={3}
                />
              </div>
            </FormSection>

            <StatsInputSection
              title="Base Stats"
              stats={editData.baseStats || {}}
              onStatChange={(stat, value) =>
                handleStatChange(
                  "baseStats",
                  stat as keyof Pokemon["baseStats"],
                  value
                )
              }
            />

            <StatsInputSection
              title="Effort Values"
              stats={editData.effortValues || {}}
              onStatChange={(stat, value) =>
                handleStatChange(
                  "effortValues",
                  stat as keyof Pokemon["effortValues"],
                  value
                )
              }
            />

            <FormSection title="Types and Abilities">
              <div className="space-y-6">
                <ArrayManager
                  title="Types"
                  items={editData.types}
                  onItemChange={handleArrayChange.bind(null, "types")}
                  onAddItem={() => addToArray("types")}
                  onRemoveItem={(index) => removeFromArray("types", index)}
                  type="select"
                  options={Object.keys(types)}
                  placeholder="Select type..."
                  maxItems={2}
                  gridCols="grid-cols-1 md:grid-cols-2"
                  showRemoveButton={(_index, items) => items.length > 1}
                />

                <ArrayManager
                  title="Abilities"
                  items={editData.abilities}
                  onItemChange={handleArrayChange.bind(null, "abilities")}
                  onAddItem={() => addToArray("abilities")}
                  onRemoveItem={(index) => removeFromArray("abilities", index)}
                  type="ability"
                  placeholder="Type to search abilities..."
                  gridCols="grid-cols-1 md:grid-cols-3"
                />

                <ArrayManager
                  title="Hidden Abilities"
                  items={editData.hiddenAbilities || []}
                  onItemChange={handleArrayChange.bind(null, "hiddenAbilities")}
                  onAddItem={() => {
                    if (!editData.hiddenAbilities) {
                      setEditData((prev) => {
                        if (!prev) return null;
                        return { ...prev, hiddenAbilities: [""] };
                      });
                    } else {
                      addToArray("hiddenAbilities");
                    }
                  }}
                  onRemoveItem={(index) =>
                    removeFromArray("hiddenAbilities", index)
                  }
                  type="ability"
                  placeholder="Type to search hidden abilities..."
                  gridCols="grid-cols-1 md:grid-cols-3"
                  emptyMessage="No hidden abilities"
                />
              </div>
            </FormSection>

            <MoveSection
              title="Level-up Moves"
              moves={editData.moves || []}
              useLevel={true}
              onAddMove={() => addMove("moves", "")}
              onMoveChange={(index, field, value) =>
                handleMoveChange("moves", index, field, value)
              }
              onRemoveMove={(index) => removeMoveFromArray("moves", index)}
              gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              sortBy="level"
            />

            <MoveSection
              title="Tutor Moves"
              moves={editData.tutorMoves || []}
              useLevel={false}
              onAddMove={() => addMove("tutorMoves", "")}
              onMoveChange={(index, field, value) =>
                handleMoveChange("tutorMoves", index, field, value)
              }
              onRemoveMove={(index) => removeMoveFromArray("tutorMoves", index)}
            />

            <MoveSection
              title="Egg Moves"
              moves={editData.eggMoves || []}
              useLevel={false}
              onAddMove={() => addMove("eggMoves", "")}
              onMoveChange={(index, field, value) =>
                handleMoveChange("eggMoves", index, field, value)
              }
              onRemoveMove={(index) => removeMoveFromArray("eggMoves", index)}
            />

            {/* Egg Groups */}
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold ">Egg Groups</h2>
                <button
                  onClick={() => addToArray("eggGroups")}
                  className="px-3 py-1 text-sm border border-slate-500 rounded-md text-slate-500 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Group
                </button>
              </div>
              <div className="grid grid-cols-5">
                {editData.eggGroups.map((group, index) => (
                  <div className="flex py-2 items-center" key={index}>
                    <CustomSelect
                      key={index}
                      options={EggGroups}
                      value={group}
                      className="w-30"
                      onChange={(newGroup) =>
                        handleArrayChange("eggGroups", index, newGroup)
                      }
                      placeholder="Groups..."
                    />
                    <button
                      onClick={() => removeFromArray("eggGroups", index)}
                      className="px-2 py-1 h-fit text-rose-300 hover:text-rose-400 cursor-pointer rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Offspring */}
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold  flex items-center gap-3">
                  Offspring
                  <InfoTooltip description="One or more species that this Pokemon can produce through breeding. If not defined, it will be determined by the game." />
                </h2>
                <button
                  onClick={() => addToArray("offspring")}
                  className="px-3 py-1 text-sm border border-slate-500 rounded-md text-slate-500 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Pokemon
                </button>
              </div>
              <div className="grid grid-cols-3">
                {editData.offspring &&
                  editData.offspring.map((mon, index) => (
                    <div className="flex py-2 items-center" key={index}>
                      <CustomAutocomplete
                        key={index}
                        options={pokemon.map((p) => p.id)}
                        value={mon}
                        className="w-full"
                        onChange={(newPokemon) =>
                          handleArrayChange("offspring", index, newPokemon)
                        }
                        placeholder="Select Pokémon..."
                      />
                      <button
                        onClick={() => removeFromArray("offspring", index)}
                        className="px-2 py-1 h-fit text-rose-300 hover:text-rose-400 cursor-pointer rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
              </div>
            </section>

            {/* Physical Attributes */}
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold  mb-4">
                Physical Attributes
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Height (m)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editData.height}
                    onChange={(e) =>
                      handleInputChange("height", parseFloat(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editData.weight}
                    onChange={(e) =>
                      handleInputChange("weight", parseFloat(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Color
                  </label>
                  <CustomSelect
                    value={editData.color}
                    onChange={(value) => handleInputChange("color", value)}
                    options={PokemonColors}
                    placeholder="Select color..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Shape
                  </label>
                  <CustomSelect
                    value={editData.shape}
                    onChange={(value) => handleInputChange("shape", value)}
                    options={PokemonShapes}
                    placeholder="Select shape..."
                  />
                </div>
              </div>
            </section>

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
                    onChange={(e) =>
                      handleInputChange("catchRate", parseInt(e.target.value))
                    }
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
                    onChange={(e) =>
                      handleInputChange("happiness", parseInt(e.target.value))
                    }
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
                    onChange={(e) =>
                      handleInputChange("baseExp", parseInt(e.target.value))
                    }
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

      <NewPokemonForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default PokemonPage;
