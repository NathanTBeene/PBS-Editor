import type { BattleUse, FieldUse, ItemFlags, PocketType, PokemonType } from "./constants";
import type { PokemonMove } from "./Pokemon";

export interface Item {
  id: string;
  name: string;
  namePlural: string;
  description: string;
  pocket: PocketType;
  price: number;
  sellPrice: number; // typically half of price
  flingValue: number;
  naturalGift?: {
    type: PokemonType;
    power: number;
  }
  portionName?: string;
  portionNamePlural?: string;
  bpPrice?: number;
  fieldUse?: FieldUse;
  battleUse?: BattleUse;
  flags?: ItemFlags[];
  consumable?: boolean;
  showQuantity?: boolean;
  move?: PokemonMove;
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
  bpPrice: 0,
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
