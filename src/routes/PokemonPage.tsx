import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Save, RotateCcw, X } from "lucide-react";
import { type Pokemon } from "../lib/models/Pokemon";
import CustomSelect from "../components/CustomSelect";
import AbilitySelect from "../components/AbilitySelect";
import MoveEntry from "../components/MoveEntry";
import { usePokedexContext } from "../lib/providers/PokedexProvider";
import {
  PokemonTypes,
  PokemonColors,
  PokemonShapes,
  GenderRatios,
  GrowthRates,
  EggGroups,
  typeColors,
  type TypeColor,
} from "../lib/models/constants";
import InfoTooltip from "../components/InfoTooltip";
import CustomAutocomplete from "../components/CustomAutocomplete";
import { validateSaveData } from "../lib/services/pokemonValidator";

const PokemonPage = () => {
  const { pokemon, setPokemonData } = usePokedexContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(
    pokemon[0] || null
  );
  const [editData, setEditData] = useState<Pokemon | null>(pokemon[0] || null);

  useEffect(() => {
    if (pokemon.length > 0 && !selectedPokemon) {
      setSelectedPokemon(pokemon[0]);
      setEditData(pokemon[0]);
    }
  }, [pokemon, selectedPokemon]);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.includes(searchTerm)
    );
  }, [searchTerm, pokemon]);

  const resetChanges = () => {
    if (selectedPokemon) {
      setEditData(selectedPokemon);
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

  function handleArrayChange(
    field:
      | "types"
      | "abilities"
      | "hiddenAbilities"
      | "eggGroups"
      | "offspring"
      | "flags",
    index: number,
    newType: string
  ): void {
    if (!editData) return;

    setEditData((prev) => {
      if (!prev) return null;

      if (field === "types") {
        return {
          ...prev,
          types: prev.types.map((item, i) => (i === index ? newType : item)),
        };
      }
      if (field === "abilities") {
        return {
          ...prev,
          abilities: prev.abilities.map((item, i) =>
            i === index ? newType : item
          ),
        };
      }
      if (field === "hiddenAbilities" && prev.hiddenAbilities) {
        return {
          ...prev,
          hiddenAbilities: prev.hiddenAbilities.map((item, i) =>
            i === index ? newType : item
          ),
        };
      }
      if (field === "eggGroups") {
        return {
          ...prev,
          eggGroups: prev.eggGroups.map((item, i) =>
            i === index ? newType : item
          ),
        };
      }
      if (field === "offspring" && prev.offspring) {
        return {
          ...prev,
          offspring: prev.offspring.map((item, i) =>
            i === index ? newType : item
          ),
        };
      }
      if (field === "flags" && prev.flags) {
        return {
          ...prev,
          flags: prev.flags.map((item, i) => (i === index ? newType : item)),
        };
      }
      return prev;
    });
  }

  function removeFromArray(
    field:
      | "types"
      | "abilities"
      | "hiddenAbilities"
      | "eggGroups"
      | "offspring"
      | "flags",
    index: number
  ): void {
    if (!editData) return;

    setEditData((prev) => {
      if (!prev) return null;

      if (field === "types") {
        return {
          ...prev,
          types: prev.types.filter((_, i) => i !== index),
        };
      }
      if (field === "abilities") {
        return {
          ...prev,
          abilities: prev.abilities.filter((_, i) => i !== index),
        };
      }
      if (field === "hiddenAbilities" && prev.hiddenAbilities) {
        return {
          ...prev,
          hiddenAbilities: prev.hiddenAbilities.filter((_, i) => i !== index),
        };
      }
      if (field === "eggGroups") {
        return {
          ...prev,
          eggGroups: prev.eggGroups.filter((_, i) => i !== index),
        };
      }
      if (field === "offspring" && prev.offspring) {
        return {
          ...prev,
          offspring: prev.offspring.filter((_, i) => i !== index),
        };
      }
      if (field === "flags" && prev.flags) {
        return {
          ...prev,
          flags: prev.flags.filter((_, i) => i !== index),
        };
      }
      return prev;
    });
  }

  function addToArray(
    field:
      | "types"
      | "abilities"
      | "hiddenAbilities"
      | "eggGroups"
      | "offspring"
      | "flags"
  ): void {
    if (!editData) return;

    setEditData((prev) => {
      if (!prev) return null;

      if (field === "types") {
        return {
          ...prev,
          types: [...prev.types, ""],
        };
      }
      if (field === "abilities") {
        return {
          ...prev,
          abilities: [...prev.abilities, ""],
        };
      }
      if (field === "hiddenAbilities" && prev.hiddenAbilities) {
        return {
          ...prev,
          hiddenAbilities: [...prev.hiddenAbilities, ""],
        };
      }
      if (field === "eggGroups") {
        return {
          ...prev,
          eggGroups: [...prev.eggGroups, ""],
        };
      }
      if (field === "offspring") {
        return {
          ...prev,
          offspring: [...prev.offspring, ""],
        };
      }
      if (field === "flags" && prev.flags) {
        return {
          ...prev,
          flags: [...prev.flags, ""],
        };
      }
      return prev;
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
            <button className="p-2 px-3 bg-emerald-600 text-emerald-200 rounded-lg cursor-pointer hover:bg-emerald-500 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pokemon List */}
        <div className="flex-1 overflow-y-auto border-r-3 border-slate-700">
          {filteredPokemon.map((pokemon) => (
            <div
              key={pokemon.id}
              className={`p-3 border-b border-slate-500 bg-gradient-to-r from-slate-800/10 to-slate-800 cursor-pointer transition-colors ${
                selectedPokemon.id === pokemon.id
                  ? "bg-blue-600/20 border-l-4 border-l-blue-600/40"
                  : "hover:bg-slate-600/40"
              }`}
              onClick={() => {
                console.log("Selected Pokemon:", pokemon);
                setSelectedPokemon(pokemon);
                setEditData(pokemon);
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
                      <span
                        key={type}
                        style={{
                          backgroundColor: typeColors[type as TypeColor],
                        }}
                        className={`px-2 py-0.5 rounded text-xs font-medium `}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                    <span
                      key={type}
                      style={{
                        backgroundColor: typeColors[type as TypeColor],
                      }}
                      className={`px-2 py-1 rounded text-xs font-medium `}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={resetChanges}
                className="flex bg-slate-700 items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
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
            {/* Basic Information */}
            <section className="bg-slate-700/40 rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ID */}
                <div>
                  <label className="flex gap-2 items-center relative text-sm font-medium text-slate-300 mb-2">
                    ID
                    <InfoTooltip description="The unique identifier for this Pokémon. Essentials standard is all caps no spaces." />
                  </label>
                  <input
                    type="text"
                    value={editData.id}
                    onChange={(e) => handleInputChange("id", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
                {/* Form Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Form Name
                  </label>
                  <input
                    type="text"
                    value={editData.formName || ""}
                    onChange={(e) =>
                      handleInputChange("formName", e.target.value || "")
                    }
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Generation
                  </label>
                  <input
                    type="number"
                    value={editData.generation}
                    onChange={(e) =>
                      handleInputChange("generation", parseInt(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Dex #
                  </label>
                  <input
                    type="number"
                    value={editData.dexNumber}
                    onChange={(e) =>
                      handleInputChange("dexNumber", parseInt(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Pokedex Entry
                </label>
                <textarea
                  value={editData.pokedex}
                  onChange={(e) => handleInputChange("pokedex", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                />
              </div>
            </section>

            {/* Base Stats */}
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Base Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(editData.baseStats || {}).map(
                  ([stat, value]) => (
                    <div key={stat}>
                      <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">
                        {stat.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) =>
                          handleStatChange(
                            "baseStats",
                            stat as keyof Pokemon["baseStats"],
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                        min="0"
                        max="255"
                      />
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Effort Values */}
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold  mb-4">Effort Values</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(editData.effortValues || {}).map(
                  ([stat, value]) => (
                    <div key={stat}>
                      <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">
                        {stat.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) =>
                          handleStatChange(
                            "baseStats",
                            stat as keyof Pokemon["baseStats"],
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300/70"
                        min="0"
                        max="255"
                      />
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Types and Abilities */}
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">
                Types and Abilities
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Types
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {editData.types.map((type, index) => (
                      <div key={index} className="flex items-center">
                        <CustomSelect
                          value={type}
                          onChange={(newType) =>
                            handleArrayChange("types", index, newType)
                          }
                          options={PokemonTypes}
                          placeholder="Select type..."
                          className="flex-1"
                        />
                        {editData.types.length > 1 && (
                          <button
                            onClick={() => removeFromArray("types", index)}
                            className="p-1 text-rose-300 hover:text-rose-400 cursor-pointer transition-colors"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                    ))}
                    {editData.types.length < 2 && (
                      <button
                        onClick={() => addToArray("types")}
                        className="px-3 py-2 border border-slate-500 rounded-md text-slate-500 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Type
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Abilities
                  </label>
                  <div className="mb-4 gap-2 grid grid-cols-1 md:grid-cols-3">
                    {editData.abilities.map((ability, index) => (
                      <AbilitySelect
                        key={index}
                        value={ability}
                        onChange={(newAbility) =>
                          handleArrayChange("abilities", index, newAbility)
                        }
                        onRemove={() => removeFromArray("abilities", index)}
                        placeholder="Type to search abilities..."
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => addToArray("abilities")}
                    className="px-3 py-2 border border-slate-500 text-slate-500 rounded-lg shadow-sm flex items-center gap-2 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Ability
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Hidden Abilities
                  </label>
                  <div className="grid gap-2 grid-cols-1 md:grid-cols-3 mb-4">
                    {editData.hiddenAbilities.length > 0 ? (
                      editData.hiddenAbilities.map((ability, index) => (
                        <AbilitySelect
                          key={index}
                          value={ability}
                          onChange={(newAbility) =>
                            handleArrayChange(
                              "hiddenAbilities",
                              index,
                              newAbility
                            )
                          }
                          onRemove={() =>
                            removeFromArray("hiddenAbilities", index)
                          }
                          placeholder="Type to search hidden abilities..."
                        />
                      ))
                    ) : (
                      <p className="text-slate-500 italic">
                        No hidden abilities
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (!editData.hiddenAbilities) {
                        setEditData((prev) => {
                          if (!prev) return null;
                          return {
                            ...prev,
                            hiddenAbilities: [""],
                          };
                        });
                      } else {
                        addToArray("hiddenAbilities");
                      }
                    }}
                    className="px-3 py-2 border border-slate-500 text-slate-500 rounded-lg shadow-sm flex items-center gap-2 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Hidden Ability
                  </button>
                </div>
              </div>
            </section>

            {/* Level-up Moves */}
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold ">Level-up Moves</h2>
                <button
                  onClick={() => addMove("moves", "")}
                  className="px-3 py-1 text-sm border border-slate-500 rounded-md text-slate-500 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Move
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {editData.moves && editData.moves.length > 0 ? (
                  editData.moves
                    .sort((a, b) => (a.level || 0) - (b.level || 0))
                    .map((move, index) => (
                      <div
                        key={`${move.level}-${move.name}-${index}`}
                        className="w-full"
                      >
                        <MoveEntry
                          move={move}
                          onMoveChange={(value) =>
                            handleMoveChange("moves", index, "name", value)
                          }
                          onLevelChange={(value) =>
                            handleMoveChange("moves", index, "level", value)
                          }
                          onRemove={() => removeMoveFromArray("moves", index)}
                          useLevel={true}
                        />
                      </div>
                    ))
                ) : (
                  <div className="col-span-full">
                    <p className="text-slate-500 italic py-4 text-center">
                      No moves added yet
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Tutor Moves */}
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold ">Tutor Moves</h2>
                <button
                  onClick={() => addMove("tutorMoves", "")}
                  className="px-3 py-1 text-sm border border-slate-500 rounded-md text-slate-500 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Move
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {editData.tutorMoves && editData.tutorMoves.length > 0 ? (
                  editData.tutorMoves
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((move, index) => (
                      <div
                        key={`tutor-${move.name}-${index}`}
                        className="w-full"
                      >
                        <MoveEntry
                          move={move}
                          onMoveChange={(value) =>
                            handleMoveChange("tutorMoves", index, "name", value)
                          }
                          onLevelChange={() => {}} // Not used for tutor moves
                          onRemove={() =>
                            removeMoveFromArray("tutorMoves", index)
                          }
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
                )}
              </div>
            </section>

            {/* Egg Moves */}
            <section className="bg-slate-700/40 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold ">Egg Moves</h2>
                <button
                  onClick={() => addMove("eggMoves", "")}
                  className="px-3 py-1 text-sm border border-slate-500 rounded-md text-slate-500 cursor-pointer hover:text-slate-300 hover:bg-slate-500/30 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Move
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {editData.eggMoves && editData.eggMoves.length > 0 ? (
                  editData.eggMoves
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((move, index) => (
                      <div key={`egg-${move.name}-${index}`} className="w-full">
                        <MoveEntry
                          move={move}
                          onMoveChange={(value) =>
                            handleMoveChange("eggMoves", index, "name", value)
                          }
                          onLevelChange={() => {}} // Not used for egg moves
                          onRemove={() =>
                            removeMoveFromArray("eggMoves", index)
                          }
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
                )}
              </div>
            </section>

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
    </div>
  );
};

export default PokemonPage;
