import { defaultAbility, type Ability } from "../models/Ability";

export const importAbilities = (data: string) => {
  const sections: string[] = data.split("#-------------------------------");
  const abilitiesList: Ability[] = [];

  sections.forEach((section) => {
    const lines = section.split("\n");
    const ability = { ...defaultAbility };

    lines.forEach((line) => {
      if (line.trim() === "" || line.startsWith("#")) return; // Skip empty lines and comments

      // Get id line []
      if (line.startsWith("[") && line.endsWith("]")) {
        ability.id = line.slice(1, -1);
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
    });
  });

  console.log(`Parsed ${abilitiesList.length} abilities from internal PBS.`);
  return abilitiesList;
};
