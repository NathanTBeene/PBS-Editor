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
  type: "NORMAL",
  category: "Status",
  power: 0,
  accuracy: 100,
  pp: 5,
  target: "None",
  priority: 0,
  functionCode: "None",
  flags: [] as string[],
  effectChance: 0,
  description: "???",
};

export const moveTargets = [
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
] as const;

export type MoveTarget = (typeof moveTargets)[number];
