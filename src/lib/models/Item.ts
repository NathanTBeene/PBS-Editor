import type { BattleUse, FieldUse, ItemFlags, PocketType, PokemonType } from "./constants";

export interface Item {
  // Base Information
  id: string;
  pocket: PocketType;
  name: string;
  namePlural: string;
  portionName: string;
  description: string;
  portionNamePlural: string;

  // Pricing
  price: number;
  sellPrice: number; // typically half of price
  bpPrice: number;

  // In-Game Use Information
  fieldUse: FieldUse;
  battleUse: BattleUse;
  move: string;

  // Miscellaneous
  consumable: boolean;
  showQuantity: boolean;

  // Flag information
  flags: ItemFlags[];
  flingValue: number;
  naturalGift?: {
    type: PokemonType;
    power: number;
  }
}

export const defaultItem: Item = {
  id: "[]",
  name: "Unnamed",
  namePlural: "Unnamed",
  portionName: "",
  portionNamePlural: "",
  pocket: "Items",
  price: 0,
  sellPrice: 0,
  bpPrice: 1,
  fieldUse: "",
  battleUse: "",
  flags: [],
  flingValue: 0,
  naturalGift: undefined,
  consumable: true,
  showQuantity: true,
  move: "",
  description: "???"
};
