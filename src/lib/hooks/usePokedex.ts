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
} from "../models/constants";
import { useLocalStorage } from "./useLocalStorage";
import { importPokemon } from "../services/importPokemon";
import { importMoves } from "../services/importMoves";
import { importAbilities } from "../services/importAbilities";
import type { Move } from "../models/Move";
import type { Ability } from "../models/Ability";
import type { Pokemon } from "../models/Pokemon";

export const usePokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [moves, setMoves] = useState<Move[]>([]);

  const { setItem, getItem } = useLocalStorage();

  // PBSData state dictionary
  const [PBSData, setPBSData] = useState({
    types: [...PokemonTypes],
    genderRatios: [...GenderRatios],
    growthRates: [...GrowthRates],
    eggGroups: [...EggGroups],
    colors: [...PokemonColors],
    shapes: [...PokemonShapes],
    habitats: [...PokemonHabitats],
    evolutionMethods: [...EvolutionMethods],
  });

  useEffect(() => {
    // Fetch and set initial Pokémon data
    const fetchPokemon = async () => {
      try {
        console.log("Attempting to fetch Pokémon data from local PBS.");
        const response = await fetch("/src/assets/PBS/pokemon.txt");
        const data = await response.text();
        const parsedPokemon = importPokemon(data);
        setPokemon(parsedPokemon);
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

  const addConstant = (type: string, value: string) => {
    setPBSData((prev) => {
      const updated = { ...prev };
      switch (type) {
        case "type":
          updated.types = [...prev.types, value];
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

  return {
    pokemon,
    abilities,
    moves,
    types: PBSData.types,
    genderRatios: PBSData.genderRatios,
    growthRates: PBSData.growthRates,
    eggGroups: PBSData.eggGroups,
    colors: PBSData.colors,
    shapes: PBSData.shapes,
    habitats: PBSData.habitats,
    evolutionMethods: PBSData.evolutionMethods,
    addConstant,
  };
};
