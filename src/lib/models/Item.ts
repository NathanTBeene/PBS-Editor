import type { BattleUse, FieldUse, ItemFlags, PocketType, PokemonType } from "./constants";

export interface Item {
  // Base Information
  id: string;
  pocket: PocketType;
  name: string;
  namePlural: string;
  portionName?: string;
  description: string;
  portionNamePlural?: string;

  // Pricing
  price: number;
  sellPrice: number; // typically half of price
  bpPrice?: number;

  flingValue: number;
  naturalGift?: {
    type: PokemonType;
    power: number;
  }
  fieldUse?: FieldUse;
  battleUse?: BattleUse;
  flags?: ItemFlags[];
  consumable?: boolean;
  showQuantity?: boolean;
  move?: string;
}

export const defaultItem: Item = {
  id: "",
  name: "Unnamed",
  namePlural: "Unnamed",
  portionName: undefined,
  portionNamePlural: undefined,
  pocket: "Items",
  price: 0,
  sellPrice: 0,
  bpPrice: 1,
  fieldUse: undefined,
  battleUse: undefined,
  flags: undefined,
  flingValue: 0,
  naturalGift: undefined,
  consumable: true,
  showQuantity: true,
  move: undefined,
  description: "???"
};
