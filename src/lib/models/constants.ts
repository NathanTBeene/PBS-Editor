export interface PokemonEvolution {
  id: string;
  method: EvolutionMethod;
  parameter: string;
}

export const isValidType = (
  value: string,
  constantArray: string[]
): boolean => {
  return constantArray.includes(value);
};

export let PokemonTypes: string[] = [
  "NORMAL",
  "FIRE",
  "WATER",
  "ELECTRIC",
  "GRASS",
  "ICE",
  "FIGHTING",
  "POISON",
  "GROUND",
  "FLYING",
  "PSYCHIC",
  "BUG",
  "ROCK",
  "GHOST",
  "DARK",
  "DRAGON",
  "STEEL",
  "FAIRY",
];
export type PokemonType = string;

export let GenderRatios: string[] = [
  "AlwaysMale",
  "FemaleOneEighth",
  "Female25Percent",
  "Female50Percent",
  "Female75Percent",
  "FemaleSevenEighths",
  "AlwaysFemale",
  "Genderless",
];
export type GenderRatio = string;

export let GrowthRates: string[] = [
  "Fast",
  "Medium",
  "Slow",
  "Parabolic",
  "Erratic",
  "Fluctuating",
];
export type GrowthRate = string;

export let EggGroups: string[] = [
  "Monster",
  "Water1",
  "Bug",
  "Flying",
  "Field",
  "Fairy",
  "Grass",
  "Humanlike",
  "Water3",
  "Mineral",
  "Amorphous",
  "Water2",
  "Ditto",
  "Dragon",
  "Undiscovered",
];
export type EggGroup = string;

export let PokemonColors: string[] = [
  "Black",
  "Blue",
  "Brown",
  "Gray",
  "Green",
  "Pink",
  "Purple",
  "Red",
  "White",
  "Yellow",
];
export type PokemonColor = string;

export let PokemonShapes: string[] = [
  "Head",
  "Serpentine",
  "Finned",
  "HeadArms",
  "HeadBase",
  "BipedalTail",
  "HeadLegs",
  "Quadruped",
  "Winged",
  "Multiped",
  "MultiBody",
  "Bipedal",
  "MultiWinged",
  "Insectoid",
];
export type PokemonShape = string;

export let PokemonHabitats: string[] = [
  "None",
  "Cave",
  "Forest",
  "Grassland",
  "Mountain",
  "Rare",
  "RoughTerrain",
  "Sea",
  "Urban",
  "WatersEdge",
];
export type PokemonHabitat = string;

export let EvolutionMethods: string[] = [
  // Levelling-up evolution methods
  "Level",
  "LevelMale",
  "LevelFemale",
  "LevelDay",
  "LevelNight",
  "LevelMorning",
  "LevelAfternoon",
  "LevelEvening",
  "LevelNoWeather",
  "LevelSun",
  "LevelRain",
  "LevelSnow",
  "LevelSandstorm",
  "LevelCycling",
  "LevelSurfing",
  "LevelDiving",
  "LevelDarkness",
  "LevelDarkInParty",
  "AttackGreater",
  "AtkDefEqual",
  "DefenseGreater",
  "Silcoon",
  "Cascoon",
  "Ninjask",
  "Happiness",
  "HappinessMale",
  "HappinessFemale",
  "HappinessDay",
  "HappinessNight",
  "HappinessMove",
  "HappinessMoveType",
  "HappinessHoldItem",
  "MaxHappiness",
  "Beauty",
  "HoldItem",
  "HoldItemMale",
  "HoldItemFemale",
  "DayHoldItem",
  "NightHoldItem",
  "HoldItemHappiness",
  "HasMove",
  "HasMoveType",
  "HasInParty",
  "Location",
  "LocationFlag",
  "Region",
  // Using an item evolution methods
  "Item",
  "ItemMale",
  "ItemFemale",
  "ItemDay",
  "ItemNight",
  "ItemHappiness",
  // Trade evolution methods
  "Trade",
  "TradeMale",
  "TradeFemale",
  "TradeDay",
  "TradeNight",
  "TradeItem",
  "TradeSpecies",
  // After every battle evolution methods
  "BattleDealCriticalHit",
  // Manually triggered evolution methods
  "Event",
  "EventAfterDamageTaken",
  // Special evolution methods
  "Shedinja",
];
export type EvolutionMethod = string;

export const typeColors = {
  NORMAL: "#A8A77A",
  FIRE: "#EE8130",
  WATER: "#6390F0",
  ELECTRIC: "#F7D02C",
  GRASS: "#7AC74C",
  ICE: "#96D9D6",
  FIGHTING: "#C22E28",
  POISON: "#A33EA1",
  GROUND: "#E2BF65",
  FLYING: "#A98FF3",
  PSYCHIC: "#F95587",
  BUG: "#A6B91A",
  ROCK: "#B6A136",
  GHOST: "#735797",
  DRAGON: "#6F35FC",
  DARK: "#705746",
  STEEL: "#B7B7CE",
  FAIRY: "#D685AD",
} as const;

export type TypeColor = keyof typeof typeColors;
