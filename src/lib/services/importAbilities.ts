import { defaultAbility, type Ability } from "../models/Ability";

export const importAbilities = (data: string) => {
  const sections: string[] = data.split("#-------------------------------");
  const abilitiesList: Ability[] = [];

  if (data.includes("Pokedex") || data.includes("TotalPP")) {
    throw new Error("Invalid Abilities data format.");
  }

  let lineNum: number = 0;

  sections.forEach((section) => {
    const lines = section.split("\n");
    const ability: Ability = structuredClone(defaultAbility);

    lines.forEach((line) => {
      if (line.trim() === "" || line.startsWith("#")) return; // Skip empty lines and comments

      line = line.trim();
      // Get id line []
      if (line.startsWith("[") && line.endsWith("]")) {
        ability.id = line.slice(1, -1);
        return;
      }

      const [key, value] = line.split("=").map((s) => s.trim());

      switch (key) {
        case "Name":
          ability.name = value;
          break;
        case "Description":
          ability.description = value;
          break;
        case "Flags":
          ability.flags = value.split(",").map((flag) => flag.trim());
          break;
      }

      lineNum++;
    });

    if (abilitiesList.some((a) => a.id === ability.id)) {
      console.warn(`Duplicate ability found: ${ability.name}`);
      return;
    }

    // Make sure ID isn't blank
    if (!ability.id || ability.id.trim() === "[]") {
      return;
    }

    abilitiesList.push(ability);
  });

  console.log(`Parsed ${abilitiesList.length} abilities from internal PBS.`);
  return abilitiesList;
};
