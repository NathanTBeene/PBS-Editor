import type { PokemonType } from "../models/constants";
import { defaultMove, type Move } from "../models/Move";

export const importMoves = (data: string) => {
  const sections: string[] = data.split("#-------------------------------");
  const movesList: Move[] = [];

  sections.forEach((section) => {
    const lines = section.split("\n");
    const move = { ...defaultMove };

    lines.forEach((line) => {
      if (line.trim() === "" || line.startsWith("#")) {
        return; // Skip empty lines and comments
      }

      // Get id line []
      if (line.startsWith("[") && line.endsWith("]")) {
        move.id = line.slice(1, -1);
      }

      const [key, value] = line.split("=").map((s) => s.trim());

      switch (key) {
        case "Name":
          move.name = value;
          break;
        case "Type":
          move.type = value as PokemonType;
          break;
        case "Category":
          move.category = value as "Physical" | "Special" | "Status";
          break;
        case "Power":
          move.power = parseInt(value);
          break;
        case "Accuracy":
          move.accuracy = parseInt(value);
          break;
        case "PP":
          move.pp = parseInt(value);
          break;
        case "Target":
          move.target = value;
          break;
        case "Priority":
          move.priority = parseInt(value);
          break;
        case "FunctionCode":
          move.functionCode = value;
          break;
        case "Flags":
          move.flags = value.split(",").map((flag) => flag.trim());
          break;
        case "EffectChance":
          move.effectChance = parseInt(value);
          break;
        case "Description":
          move.description = value;
          break;
      }
    });

    if (move.id == "[]" || move.name == "Unnamed") {
      return;
    }

    movesList.push(move);
  });

  console.log(`Parsed ${movesList.length} moves from internal PBS.`);
  return movesList;
};
