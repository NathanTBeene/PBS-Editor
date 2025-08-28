import type { PokemonType } from "./constants";

export interface Move {
  id: string;
  name: string;
  type: PokemonType;
  category: "Physical" | "Special" | "Status";
  power: number;
  accuracy: number;
  pp: number;
  target: MoveTarget;
  priority: number;
  functionCode: string;
  flags: string[];
  effectChance: number;
  description: string;
}

export const defaultMove = {
  id: "[]",
  name: "Unnamed",
  type: "NORMAL" as PokemonType,
  category: "Status" as "Physical" | "Special" | "Status",
  power: 0,
  accuracy: 100,
  pp: 5,
  target: "None" as MoveTarget,
  priority: 0,
  functionCode: "None",
  flags: [] as MoveFlag[],
  effectChance: 0,
  description: "???",
};

export const moveTargets: string[] = [
  "None",
  "User",
  "NearAlly",
  "UserOrNearAlly",
  "AllAllies",
  "UserAndAllies",
  "NearFoe",
  "RandomNearFoe",
  "AllNearFoes",
  "Foe",
  "AllFoes",
  "NearOther",
  "AllNearOthers",
  "Other",
  "AllBattlers",
  "UserSide",
  "FoeSide",
  "BothSides",
];

type MoveTarget = string;

export const MoveFlags = [
  "Contact", // The move makes physical contact with the target.
  "CanProtect", // The target can use Protect or Detect to protect itself from the move.
  "CanMirrorMove", // The move can be copied by Mirror Move.
  "ThawsUser", // If the user is frozen, the move will thaw it out before it is used.
  "HighCriticalHitRate", // The move has a high critical hit rate.
  "Biting", // The move is a biting move (powered up by the ability Strong Jaw).
  "Punching", // The move is a punching move (powered up by the ability Iron Fist).
  "Sound", // The move is a sound-based move.
  "Powder", // The move is a powder-based move (Grass-type Pokémon are immune to them).
  "Pulse", // The move is a pulse-based move (powered up by the ability Mega Launcher).
  "Bomb", // The move is a bomb-based move (resisted by the ability Bulletproof).
  "Dance", // The move is a dance move (repeated by the ability Dancer).
  "CannotMetronome", // This move cannot be used by the move Metronome.
  "TramplesMinimize", // This move deals double damage to Pokémon that used Minimize.
] as const;

export type MoveFlag = string;
