import type { PokemonEvolution } from "../models/constants";
import type { Pokemon } from "../models/Pokemon";

const downloadPokemonAsTxt = (
  filename: string = "pokemon.txt",
  content: string
) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

export const exportPokemonToPBS = (pokemonList: Pokemon[]) => {
  const lines: string[] = [];
  const header =
    "# See the documentation on the wiki to learn how to edit this file.";
  const separator = "#-------------------------------";

  lines.push(header);
  lines.push(separator);
  pokemonList.forEach((pokemon) => {
    lines.push(formatPokemonforExport(pokemon));
    lines.push(separator);
  });
  // Remove the last separator for cleaner formatting
  if (lines[lines.length - 1] === separator) {
    lines.pop();
  }

  const content = lines.join("\n");
  downloadPokemonAsTxt("pokemon.txt", content);
};

const formatPokemonforExport = (pokemon: Pokemon): string => {
  const lines = [];
  lines.push(`[${pokemon.id}]`);
  lines.push(`Name = ${pokemon.name}`);
  if (pokemon.formName) lines.push(`FormName = ${pokemon.formName}`);
  lines.push(`Types = ${pokemon.types.join(",")}`);
  lines.push(
    "BaseStats = " +
      [
        pokemon.baseStats.hp,
        pokemon.baseStats.attack,
        pokemon.baseStats.defense,
        pokemon.baseStats.specialAttack,
        pokemon.baseStats.specialDefense,
        pokemon.baseStats.speed,
      ].join(",")
  );
  lines.push(`GenderRatio = ${pokemon.genderRatio}`);
  lines.push(`GrowthRate = ${pokemon.growthRate}`);
  lines.push(`BaseExp = ${pokemon.baseExp}`);
  lines.push("EffortValues = " + formatEffortValues(pokemon.effortValues));
  lines.push(`CatchRate = ${pokemon.catchRate}`);
  lines.push(`Happiness = ${pokemon.happiness}`);
  lines.push(`Abilities = ${pokemon.abilities.join(",")}`);
  if (pokemon.hiddenAbilities.length > 0)
    lines.push(`HiddenAbilities = ${pokemon.hiddenAbilities.join(",")}`);
  const moveString = pokemon.moves
    .map((move) => `${move.level},${move.name}`)
    .join(",");
  lines.push(`Moves = ${moveString}`);
  if (pokemon.tutorMoves.length > 0)
    lines.push(
      `TutorMoves = ${pokemon.tutorMoves.map((move) => move.name).join(",")}`
    );
  if (pokemon.eggMoves.length > 0)
    lines.push(
      `EggMoves = ${pokemon.eggMoves.map((move) => move.name).join(",")}`
    );
  lines.push(`EggGroups = ${pokemon.eggGroups.join(",")}`);
  lines.push(`HatchSteps = ${pokemon.hatchSteps}`);
  if (pokemon.incense) lines.push(`Incense = ${pokemon.incense}`);
  if (pokemon.offspring.length > 0)
    lines.push(`Offspring = ${pokemon.offspring.join(",")}`);
  lines.push(`Height = ${pokemon.height}`);
  lines.push(`Weight = ${pokemon.weight}`);
  lines.push(`Color = ${pokemon.color}`);
  lines.push(`Shape = ${pokemon.shape}`);
  lines.push(`Habitat = ${pokemon.habitat}`);
  if (pokemon.category) lines.push(`Category = ${pokemon.category}`);
  if (pokemon.pokedex) lines.push(`Pokedex = ${pokemon.pokedex}`);
  lines.push(`Generation = ${pokemon.generation}`);
  if (pokemon.flags.length > 0)
    lines.push(`Flags = ${pokemon.flags.join(",")}`);
  if (pokemon.wildItemCommon)
    lines.push(`WildItemCommon = ${pokemon.wildItemCommon}`);
  if (pokemon.wildItemUncommon)
    lines.push(`WildItemUncommon = ${pokemon.wildItemUncommon}`);
  if (pokemon.wildItemRare)
    lines.push(`WildItemRare = ${pokemon.wildItemRare}`);
  if (pokemon.evolutions && pokemon.evolutions.length > 0)
    lines.push(`Evolutions = ` + formatEvolutions(pokemon.evolutions));
  return lines.join("\n");
};

const formatEffortValues = (evs: Pokemon["effortValues"]): string => {
  const evParts: string[] = [];
  if (evs.hp > 0) evParts.push(`HP,${evs.hp}`);
  if (evs.attack > 0) evParts.push(`ATTACK,${evs.attack}`);
  if (evs.defense > 0) evParts.push(`DEFENSE, ${evs.defense}`);
  if (evs.specialAttack > 0)
    evParts.push(`SPECIAL_ATTACK,${evs.specialAttack}`);
  if (evs.specialDefense > 0)
    evParts.push(`SPECIAL_DEFENSE,${evs.specialDefense}`);
  if (evs.speed > 0) evParts.push(`SPEED,${evs.speed}`);
  return evParts.join(",");
};

const formatEvolutions = (evolutions: PokemonEvolution[]): string => {
  const evoParts: string[] = [];
  evolutions.forEach((evo) => {
    let part = `${evo.id},${evo.method},${evo.parameter}`;
    evoParts.push(part);
  });
  return evoParts.join(",");
};
