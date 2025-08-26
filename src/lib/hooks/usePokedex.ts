import { useEffect, useState } from "react";
import {
  EggGroups,
  EvolutionMethods,
  GenderRatios,
  GrowthRates,
  PokemonColors,
  PokemonHabitats,
  PokemonShapes,
  PokemonTypes,
  type PokemonType,
} from "../models/constants";
import { useLocalStorage } from "./useLocalStorage";
import { importPokemon } from "../services/importPokemon";
import { importMoves } from "../services/importMoves";
import { importAbilities } from "../services/importAbilities";
import type { Move } from "../models/Move";
import { defaultMove } from "../models/Move";
import type { Ability } from "../models/Ability";
import { defaultPokemon, type Pokemon } from "../models/Pokemon";

export const usePokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [defaults, setDefaults] = useState<Pokemon[]>([]);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [moves, setMoves] = useState<Move[]>([]);

  const { setItem, getItem } = useLocalStorage();

  // Page State
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);

  // PBSData state dictionary
  const [PBSData, setPBSData] = useState({
    types: { ...PokemonTypes },
    genderRatios: [...GenderRatios],
    growthRates: [...GrowthRates],
    eggGroups: [...EggGroups],
    colors: [...PokemonColors],
    shapes: [...PokemonShapes],
    habitats: [...PokemonHabitats],
    evolutionMethods: [...EvolutionMethods],
  });

  useEffect(() => {
    // Initialize selected items when data loads
    if (pokemon.length > 0 && !selectedPokemon) {
      setSelectedPokemon(pokemon[0]);
    }
    if (moves.length > 0 && !selectedMove) {
      setSelectedMove(moves[0]);
    }
    if (abilities.length > 0 && !selectedAbility) {
      setSelectedAbility(abilities[0]);
    }
  }, [
    pokemon,
    moves,
    abilities,
    selectedPokemon,
    selectedMove,
    selectedAbility,
  ]);

  useEffect(() => {
    // Fetch and set initial Pokémon data
    const fetchPokemon = async () => {
      try {
        console.log("Attempting to fetch Pokémon data from local PBS.");
        const response = await fetch("/src/assets/PBS/pokemon.txt");
        const data = await response.text();
        const parsedPokemon = importPokemon(data);
        setPokemon(parsedPokemon);
        setDefaults(parsedPokemon);
      } catch (error) {
        console.error("Failed to load pokemon.txt:", error);
      }
    };

    const fetchMoves = async () => {
      try {
        console.log("Attempting to fetch Moves data from local PBS.");
        const response = await fetch("/src/assets/PBS/moves.txt");
        const data = await response.text();
        const parsedMoves = importMoves(data);
        setMoves(parsedMoves);
      } catch (error) {
        console.error("Failed to load moves.txt:", error);
      }
    };

    const fetchAbilities = async () => {
      try {
        console.log("Attempting to fetch Abilities data from local PBS.");
        const response = await fetch("/src/assets/PBS/abilities.txt");
        const data = await response.text();
        const parsedAbilities = importAbilities(data);
        setAbilities(parsedAbilities);
      } catch (error) {
        console.error("Failed to load abilities.txt:", error);
      }
    };

    // Load from local storage if available
    const PBSPokemon = getItem("PBSPokemon");
    if (PBSPokemon && JSON.parse(PBSPokemon).length > 0) {
      console.log("Loading Pokémon from local storage");
      setPokemon(JSON.parse(PBSPokemon));
    } else {
      fetchPokemon();
    }

    const PBSDefaults = getItem("PBSDefaults");
    if (PBSDefaults && JSON.parse(PBSDefaults).length > 0) {
      console.log("Loading Defaults from local storage");
      setDefaults(JSON.parse(PBSDefaults));
    } else {
      fetchPokemon();
    }

    const PBSMoves = getItem("PBSMoves");
    if (PBSMoves && JSON.parse(PBSMoves).length > 0) {
      console.log("Loading Moves from local storage");
      setMoves(JSON.parse(PBSMoves));
    } else {
      fetchMoves();
    }

    const PBSAbilities = getItem("PBSAbilities");
    if (PBSAbilities && JSON.parse(PBSAbilities).length > 0) {
      console.log("Loading Abilities from local storage");
      setAbilities(JSON.parse(PBSAbilities));
    } else {
      fetchAbilities();
    }

    const PBSDataFromStorage = getItem("PBSData");
    if (PBSDataFromStorage) {
      console.log("Loading PBS Data from local storage");
      setPBSData(JSON.parse(PBSDataFromStorage));
    }
  }, []);

  useEffect(() => {
    setItem("PBSPokemon", JSON.stringify(pokemon));
    setItem("PBSMoves", JSON.stringify(moves));
    setItem("PBSAbilities", JSON.stringify(abilities));
    setItem("PBSData", JSON.stringify(PBSData));
  }, [pokemon, abilities, moves, PBSData]);

  const resetConstants = (type: string) => {
    console.log(`Resetting constants for type: ${type}`);
    setPBSData((prev) => {
      const updated = { ...prev };
      switch (type) {
        case "types":
          updated.types = { ...PokemonTypes };
          break;
        case "genderRatio":
          updated.genderRatios = [...GenderRatios];
          break;
        case "growthRate":
          updated.growthRates = [...GrowthRates];
          break;
        case "eggGroup":
          updated.eggGroups = [...EggGroups];
          break;
        case "color":
          updated.colors = [...PokemonColors];
          break;
        case "shape":
          updated.shapes = [...PokemonShapes];
          break;
        case "habitat":
          updated.habitats = [...PokemonHabitats];
          break;
        case "evolutionMethod":
          updated.evolutionMethods = [...EvolutionMethods];
          break;
        default:
          break;
      }
      return updated;
    });
  };

  const addConstant = (type: string, value: string) => {
    console.log(`Adding constant: ${type} - ${value}`);
    setPBSData((prev) => {
      const updated = { ...prev };
      switch (type) {
        case "types":
          // Check if the type exists in PokemonTypes, if not create a default entry
          value = value.trim().toUpperCase();
          const typeData = PokemonTypes[value as PokemonType] || {
            name: value,
            color: "#6B7280", // Default gray color for new types
          };
          updated.types = {
            ...prev.types,
            [value]: typeData,
          };
          break;
        case "genderRatio":
          updated.genderRatios = [...prev.genderRatios, value];
          break;
        case "growthRate":
          updated.growthRates = [...prev.growthRates, value];
          break;
        case "eggGroup":
          updated.eggGroups = [...prev.eggGroups, value];
          break;
        case "color":
          updated.colors = [...prev.colors, value];
          break;
        case "shape":
          updated.shapes = [...prev.shapes, value];
          break;
        case "habitat":
          updated.habitats = [...prev.habitats, value];
          break;
        case "evolutionMethod":
          updated.evolutionMethods = [...prev.evolutionMethods, value];
          break;
        default:
          break;
      }
      return updated;
    });
  };

  const removeConstant = (type: string, value: string) => {
    console.log(`Removing constant: ${type} - ${value}`);
    setPBSData((prev) => {
      const updated = { ...prev };
      switch (type) {
        case "types":
          delete updated.types[value as PokemonType];
          break;
        case "genderRatio":
          updated.genderRatios = prev.genderRatios.filter((r) => r !== value);
          break;
        case "growthRate":
          updated.growthRates = prev.growthRates.filter((r) => r !== value);
          break;
        case "eggGroup":
          updated.eggGroups = prev.eggGroups.filter((g) => g !== value);
          break;
        case "color":
          updated.colors = prev.colors.filter((c) => c !== value);
          break;
        case "shape":
          updated.shapes = prev.shapes.filter((s) => s !== value);
          break;
        case "habitat":
          updated.habitats = prev.habitats.filter((h) => h !== value);
          break;
        case "evolutionMethod":
          updated.evolutionMethods = prev.evolutionMethods.filter(
            (e) => e !== value
          );
          break;
        default:
          break;
      }
      return updated;
    });
  };

  const getTypeColor = (type: string) => {
    const normalizedType = type.toUpperCase();
    const color =
      PBSData.types[normalizedType as PokemonType]?.color || "#6B7280";
    return color;
  };

  const updateTypeColor = (type: string, color: string) => {
    console.log(`Updating color for type: ${type} - ${color}`);
    setPBSData((prev) => {
      const updated = { ...prev };
      const normalizedType = type.toUpperCase() as PokemonType;

      if (updated.types[normalizedType]) {
        updated.types = {
          ...updated.types,
          [normalizedType]: {
            ...updated.types[normalizedType],
            color: color,
          },
        };
      }
      return updated;
    });
  };

  const setPokemonData = (data: Pokemon) => {
    setPokemon((prev) =>
      prev.map((pokemon) => (pokemon.id === data.id ? data : pokemon))
    );
  };

  const setMoveData = (data: Move) => {
    setMoves((prev) => prev.map((move) => (move.id === data.id ? data : move)));
  };

  function isPokemonInPokedex(id: string): boolean {
    return !!pokemon.find((p) => p.id === id.toUpperCase());
  }

  function isMoveInPokedex(id: string): boolean {
    return !!moves.find((m) => m.id === id.toUpperCase());
  }

  const addPokemon = (id: string, baseMon?: Pokemon) => {
    const data = { ...(baseMon || defaultPokemon) };
    data.id = id.trim().toUpperCase();
    data.name = id.trim();
    data.dexNumber = 0;
    setPokemon((prev) => [...prev, data]);

    return data;
  };

  const addMove = (id: string, baseMove?: Move) => {
    const data = { ...(baseMove || defaultMove) } as Move;
    data.id = id.trim().toUpperCase();
    data.name = id.trim();
    setMoves((prev) => [...prev, data]);

    return data;
  };

  const removePokemon = (id: string) => {
    setPokemon((prev) => prev.filter((pokemon) => pokemon.id !== id));
  };

  const removeMove = (id: string) => {
    setMoves((prev) => prev.filter((move) => move.name !== id));
  };

  const setDefault = (id: string) => {
    const defaultData = defaults.find((p) => p.id === id);
    if (!defaultData) {
      console.warn(`No default data found for Pokémon with ID: ${id}`);
      return;
    }
    if (defaultData) {
      setPokemon((prev) =>
        prev.map((pokemon) => (pokemon.id === id ? defaultData : pokemon))
      );
    }
  };

  return {
    pokemon,
    abilities,
    moves,
    setPokemonData,
    setMoveData,
    addPokemon,
    addMove,
    removePokemon,
    removeMove,
    isPokemonInPokedex,
    isMoveInPokedex,
    setDefault,
    getTypeColor,
    updateTypeColor,
    resetConstants,
    types: PBSData.types,
    genderRatios: PBSData.genderRatios,
    growthRates: PBSData.growthRates,
    eggGroups: PBSData.eggGroups,
    colors: PBSData.colors,
    shapes: PBSData.shapes,
    habitats: PBSData.habitats,
    evolutionMethods: PBSData.evolutionMethods,
    addConstant,
    removeConstant,
    selectedPokemon,
    selectedMove,
    selectedAbility,
    setSelectedPokemon,
    setSelectedMove,
    setSelectedAbility,
  };
};
