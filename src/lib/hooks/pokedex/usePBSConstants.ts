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
} from "@/lib/models/constants";
import { useEffect, useState } from "react";
import { useIndexedDB } from "../useIndexedDB";
import _ from "lodash";

export const usePBSConstants = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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

  const { saveConstants, loadConstants } = useIndexedDB();

  const loadPBSConstants = async () => {
    try {
      const storedConstants = await loadConstants();
      if (storedConstants) {
        console.log("Loaded PBS Constants from IndexDB");
        setPBSData(storedConstants);
      } else {
        console.log("No PBS Constants found in IndexDB, using defaults.");
      }
    } catch (error) {
      console.log("IndexDb Error, using default constants.", error);
    }
    setIsInitialLoad(false);
  };

  useEffect(() => {
    if (isInitialLoad) return;
    saveConstants(PBSData);
  }, [PBSData]);

  const resetAllConstants = () => {
    console.log("Resetting all constants");
    setPBSData({
      types: { ...PokemonTypes },
      genderRatios: [...GenderRatios],
      growthRates: [...GrowthRates],
      eggGroups: [...EggGroups],
      colors: [...PokemonColors],
      shapes: [...PokemonShapes],
      habitats: [...PokemonHabitats],
      evolutionMethods: [...EvolutionMethods],
    });
  };

  const resetConstant = (type: string) => {
    console.log(`Resetting constant: ${type}`);
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
          value = value.trim().toUpperCase();
          const typeData = PokemonTypes[value as PokemonType] || {
            name: value,
            color: "#6B7280",
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

  return {
    loadPBSConstants,
    types: PBSData.types,
    genderRatios: PBSData.genderRatios,
    growthRates: PBSData.growthRates,
    eggGroups: PBSData.eggGroups,
    colors: PBSData.colors,
    shapes: PBSData.shapes,
    habitats: PBSData.habitats,
    evolutionMethods: PBSData.evolutionMethods,
    resetAllConstants,
    resetConstant,
    addConstant,
    removeConstant,
    getTypeColor,
    updateTypeColor,
  };
};
