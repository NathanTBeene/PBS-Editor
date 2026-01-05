import {defaultItem, type Item} from "../models/Item";
import { getPocketFromNumber, type PokemonType } from "../models/constants";

export const importItems = (data: string): Item[] => {
  const sections: string[] = data.split("#-------------------------------");
  const itemsList: Item[] = [];

  if (data.includes("Pokedex") || data.includes("TotalPP")) {
    throw new Error("Invalid Items data format.");
  }

  let lineNum: number = 0;

  sections.forEach((section) => {
    const lines = section.split("\n");
    const item = { ...defaultItem };

    lines.forEach((line) => {
      if (line.trim() === "" || line.startsWith("#")) return; // Skip empty lines and comments

      line = line.trim();
      // Get id line []
      if (line.startsWith("[") && line.endsWith("]")) {
        item.id = line.slice(1, -1);
        return;
      }

      const [key, value] = line.split("=").map((s) => s.trim());

      switch (key) {
        case "Name":
          item.name = value;
          break;
        case "NamePlural":
          item.namePlural = value;
          break;
        case "Description":
          item.description = value;
          break;
        case "Pocket":
          item.pocket = getPocketFromNumber(parseInt(value));
          break;
        case "Price":
          item.price = parseInt(value);
          break;
        case "SellPrice":
          item.sellPrice = parseInt(value);
          break;
        case "PortionName":
          item.portionName = value;
          break;
        case "PortionNamePlural":
          item.portionNamePlural = value;
          break;
        case "BPPrice":
          item.bpPrice = parseInt(value);
          break;
        case "FieldUse":
          item.fieldUse = value;
          break;
        case "BattleUse":
          item.battleUse = value;
          break;
        case "Consumable":
          item.consumable = value.toLowerCase() === "true";
          break;
        case "ShowQuantity":
          item.showQuantity = value.toLowerCase() === "true";
          break;
        case "Move":
          item.move = value;
          break;
        case "Flags":
          const flagLines = value.split(",").map((s) => s.trim());
          for (const flag of flagLines) {
            if (!item.flags) item.flags = [];
            // Handle special flags with values
            if (flag.startsWith("Fling")) {
              const [, flingValue] = flag.split("_");
              item.flingValue = parseInt(flingValue);
            }
            else if (flag.startsWith("NaturalGift")) {
              const [, type, power] = flag.split("_");
              item.naturalGift = {
                type: type as PokemonType || "NORMAL",
                power: parseInt(power)
              };
            }
            else {
              item.flags.push(flag as any);
            }
          }

      }

      lineNum++;
    })

    if (itemsList.some((i) => i.id === item.id)) {
      console.warn(`Duplicate item found: ${item.name}`);
      return;
    }

    // Make sure ID isn't blank
    if (!item.id || item.id.trim() === "[]") {
      return;
    }

    itemsList.push(item);
  })

  console.log(`Parsed ${itemsList.length} items from internal PBS.`);
  return itemsList;
};
