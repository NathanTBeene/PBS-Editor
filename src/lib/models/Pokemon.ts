import type {
  GenderRatio,
  GrowthRate,
  PokemonColor,
  PokemonEvolution,
  PokemonHabitat,
  PokemonShape,
  PokemonType,
} from "./constants";

export interface Pokemon {
  id: string;
  name: string;
  formName: string | null;
  types: PokemonType[];
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  genderRatio: GenderRatio;
  growthRate: GrowthRate;
  baseExp: number;
  effortValues: {
    hp: number | null;
    attack: number | null;
    defense: number | null;
    specialAttack: number | null;
    specialDefense: number | null;
    speed: number | null;
  };
  catchRate: number;
  happiness: number; // Base happiness
  abilities: string[];
  hiddenAbilities: string[] | null;
  moves: PokemonMove[]; // Level, Moves Learned
  tutorMoves: PokemonMove[];
  eggMoves: PokemonMove[];
  eggGroups: string[];
  hatchSteps: number;
  incense: string | null;
  offspring: string[] | null;
  height: number;
  weight: number;
  color: PokemonColor;
  shape: PokemonShape;
  habitat: PokemonHabitat;
  category: string;
  pokedex: string;
  generation: number;
  flags: string[] | null;
  wildItemCommon: string[] | null;
  wildItemUncommon: string[] | null;
  wildItemRare: string[] | null;
  evolutions: PokemonEvolution[] | null;
}

export interface PokemonMove {
  level?: number;
  name: string;
}

export const defaultPokemon: Pokemon = {
  id: "",
  name: "Unnamed",
  formName: null,
  types: ["NORMAL"],
  baseStats: {
    hp: 1,
    attack: 1,
    defense: 1,
    specialAttack: 1,
    specialDefense: 1,
    speed: 1,
  },
  genderRatio: "Female50Percent",
  growthRate: "Medium",
  baseExp: 100,
  effortValues: {
    hp: null,
    attack: null,
    defense: null,
    specialAttack: null,
    specialDefense: null,
    speed: null,
  },
  catchRate: 255,
  happiness: 70,
  abilities: [],
  hiddenAbilities: null,
  moves: [],
  tutorMoves: [],
  eggMoves: [],
  eggGroups: ["Undiscovered"],
  hatchSteps: 1,
  incense: null,
  offspring: null,
  height: 0.1,
  weight: 0.1,
  color: "Red",
  shape: "Head",
  habitat: "None",
  category: "???",
  pokedex: "???",
  generation: 0,
  flags: null,
  wildItemCommon: null,
  wildItemUncommon: null,
  wildItemRare: null,
  evolutions: null,
};
