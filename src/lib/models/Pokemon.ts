import type {
  GenderRatio,
  GrowthRate,
  PokemonColor,
  PokemonEvolution,
  PokemonHabitat,
  PokemonShape,
  PokemonType,
  EggGroup,
} from "./constants";

export interface Pokemon {
  id: string;
  dexNumber: number;
  name: string;
  formName: string;
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
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  catchRate: number;
  happiness: number; // Base happiness
  abilities: string[];
  hiddenAbilities: string[];
  moves: PokemonMove[]; // Level, Moves Learned
  tutorMoves: PokemonMove[];
  eggMoves: PokemonMove[];
  eggGroups: EggGroup[];
  hatchSteps: number;
  incense: string | null;
  offspring: string[];
  height: number;
  weight: number;
  color: PokemonColor;
  shape: PokemonShape;
  habitat: PokemonHabitat;
  category: string;
  pokedex: string;
  generation: number;
  flags: string[];
  wildItemCommon: string;
  wildItemUncommon: string;
  wildItemRare: string;
  evolutions: PokemonEvolution[] | null;
}

export interface PokemonMove {
  level?: number;
  name: string;
}

export const defaultPokemon: Pokemon = {
  id: "",
  dexNumber: 0,
  name: "Unnamed",
  formName: "",
  types: ["NORMAL"] as PokemonType[],
  baseStats: {
    hp: 1,
    attack: 1,
    defense: 1,
    specialAttack: 1,
    specialDefense: 1,
    speed: 1,
  },
  genderRatio: "Female50Percent" as GenderRatio,
  growthRate: "Medium" as GrowthRate,
  baseExp: 100,
  effortValues: {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  },
  catchRate: 255,
  happiness: 70,
  abilities: [],
  hiddenAbilities: [],
  moves: [] as PokemonMove[],
  tutorMoves: [] as PokemonMove[],
  eggMoves: [] as PokemonMove[],
  eggGroups: ["Undiscovered"] as EggGroup[],
  hatchSteps: 1,
  incense: null,
  offspring: [] as string[],
  height: 0.1,
  weight: 0.1,
  color: "Red" as PokemonColor,
  shape: "Head" as PokemonShape,
  habitat: "None" as PokemonHabitat,
  category: "???",
  pokedex: "???",
  generation: 1,
  flags: [],
  wildItemCommon: "",
  wildItemUncommon: "",
  wildItemRare: "",
  evolutions: null,
};
