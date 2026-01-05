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

export const PokemonTypes = {
  NORMAL: { name: "NORMAL", color: "#A8A77A" },
  FIRE: { name: "FIRE", color: "#EE8130" },
  WATER: { name: "WATER", color: "#6390F0" },
  ELECTRIC: { name: "ELECTRIC", color: "#F7D02C" },
  GRASS: { name: "GRASS", color: "#7AC74C" },
  ICE: { name: "ICE", color: "#96D9D6" },
  FIGHTING: { name: "FIGHTING", color: "#C22E28" },
  POISON: { name: "POISON", color: "#A33EA1" },
  GROUND: { name: "GROUND", color: "#E2BF65" },
  FLYING: { name: "FLYING", color: "#A98FF3" },
  PSYCHIC: { name: "PSYCHIC", color: "#F95587" },
  BUG: { name: "BUG", color: "#A6B91A" },
  ROCK: { name: "ROCK", color: "#B6A136" },
  GHOST: { name: "GHOST", color: "#735797" },
  DARK: { name: "DARK", color: "#705746" },
  DRAGON: { name: "DRAGON", color: "#6F35FC" },
  STEEL: { name: "STEEL", color: "#B7B7CE" },
  FAIRY: { name: "FAIRY", color: "#D685AD" },
} as const;

export type PokemonType = keyof typeof PokemonTypes;

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

export let PocketTypes = [
  "Items",
  "Medicine",
  "Pokeballs",
  "TMsHMs",
  "Berries",
  "Mail",
  "BattleItems",
  "KeyItems",
];
export type PocketType = (typeof PocketTypes)[number];

export const getPocketNumber = (pocket: PocketType): number => {
  return PocketTypes.findIndex((pocketType) => pocketType === pocket) + 1
}

export const getPocketFromNumber = (pocketNumber: number): PocketType => {
  return PocketTypes[pocketNumber - 1] as PocketType
};

export let FieldUses = [
  "OnPokemon",
  "Direct",
  "TR",
  "TM",
  "HM"
]

export type FieldUse = (typeof FieldUses)[number];

export let BattleUses = [
  "OnPokemon",
  "OnMove",
  "OnBattler",
  "OnFoe",
  "Direct"
]

export type BattleUse = (typeof BattleUses)[number];

export let ItemFlags = [
  "Mail",
  "IconMail",
  "PokeBall",
  "SnagBall",
  "Berry",
  "KeyItem",
  "EvolutionStone",
  "Fossil",
  "Apricorn",
  "TypeGem",
  "Mulch",
  "MegaStone",
  "MegaRing",
  "Repel",
  // Fling and Natural Gift are separately handled
]

export type ItemFlags = (typeof ItemFlags)[number];
