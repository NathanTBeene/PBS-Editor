import type { Ability } from "../models/Ability";
import { getPocketNumber, type PokemonEvolution } from "../models/constants";
import type { Item } from "../models/Item";
import type { Move } from "../models/Move";
import type { Pokemon } from "../models/Pokemon";

const downloadAsTxt = (filename: string = "pokemon.txt", content: string) => {
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
  downloadAsTxt("pokemon.txt", content);
};

export const exportMovesToPBS = (moveList: Move[]) => {
  const lines: string[] = [];
  const header =
    "# See the documentation on the wiki to learn how to edit this file.";
  const separator = "#-------------------------------";
  lines.push(header);
  lines.push(separator);
  moveList.forEach((move) => {
    lines.push(formatMoveForExport(move));
    lines.push(separator);
  });
  // Remove the last separator for cleaner formatting
  if (lines[lines.length - 1] === separator) {
    lines.pop();
  }
  const content = lines.join("\n");
  downloadAsTxt("moves.txt", content);
};

export const exportAbilitiesToPBS = (abilities: Ability[]) => {
  const lines: string[] = [];
  const header =
    "# See the documentation on the wiki to learn how to edit this file.";
  const separator = "#-------------------------------";
  lines.push(header);
  lines.push(separator);
  abilities.forEach((ability) => {
    lines.push(formatAbilityForExport(ability));
    lines.push(separator);
  });
  // Remove the last separator for cleaner formatting
  if (lines[lines.length - 1] === separator) {
    lines.pop();
  }
  const content = lines.join("\n");
  downloadAsTxt("abilities.txt", content);
};

export const exportItemsToPBS = (items: Item[]) => {
  const lines: string[] = [];
  const header =
    "# See the documentation on the wiki to learn how to edit this file.";
  const separator = "#-------------------------------";
  lines.push(header);
  lines.push(separator);
  items.forEach((item) => {
    lines.push(formatItemForExport(item));
    lines.push(separator);
  });
  // Remove the last separator for cleaner formatting
  if (lines[lines.length - 1] === separator) {
    lines.pop();
  }
  const content = lines.join("\n");
  downloadAsTxt("items.txt", content);
}

// Pokemon Formatting

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

// Move Formatting
const formatMoveForExport = (move: Move): string => {
  const lines = [];
  lines.push(`[${move.id}]`);
  lines.push(`Name = ${move.name}`);
  lines.push(`Type = ${move.type}`);
  lines.push(`Category = ${move.category}`);
  lines.push(`Power = ${move.power}`);
  lines.push(`Accuracy = ${move.accuracy}`);
  lines.push(`TotalPP = ${move.pp}`);
  lines.push(`Target = ${move.target}`);
  if (move.priority !== 0) lines.push(`Priority = ${move.priority}`);
  lines.push(`FunctionCode = ${move.functionCode}`);
  if (move.flags.length > 0) lines.push(`Flags = ${move.flags.join(",")}`);
  if (move.effectChance > 0) lines.push(`EffectChance = ${move.effectChance}`);
  lines.push(`Description = ${move.description}`);

  return lines.join("\n");
};

// Ability Formatting
const formatAbilityForExport = (ability: Ability): string => {
  const lines = [];
  lines.push(`[${ability.id}]`);
  lines.push(`Name = ${ability.name}`);
  lines.push(`Description = ${ability.description}`);
  if (ability.flags.length > 0)
    lines.push(`Flags = ${ability.flags.join(",")}`);
  return lines.join("\n");
};

// Item Formatting
const formatItemForExport = (item: Item): string => {
  const lines = [];
  lines.push(`[${item.id}]`);
  lines.push(`Name = ${item.name}`);
  lines.push(`NamePlural = ${item.namePlural}`);
  item.portionName && lines.push(`PortionName = ${item.portionName}`);
  item.portionNamePlural && lines.push(`PortionNamePlural = ${item.portionNamePlural}`);
  lines.push(`Pocket = ${getPocketNumber(item.pocket)} ## ${item.pocket}`);
  lines.push(`Price = ${item.price}`);
  item.sellPrice > 0 && lines.push(`SellPrice = ${item.sellPrice}`);
  item.bpPrice > 0 && lines.push(`BPPrice = ${item.bpPrice}`);
  item.fieldUse && lines.push(`FieldUse = ${item.fieldUse}`);
  item.battleUse && lines.push(`BattleUse = ${item.battleUse}`);
  item.flags.length > 0 && lines.push(`Flags = ${formatItemFlags(item)}`);
  item.consumable === false && lines.push(`Consumable = false`);
  item.showQuantity === false && lines.push(`ShowQuantity = false`);
  item.move && lines.push(`Move = ${item.move}`);
  lines.push(`Description = ${item.description}`);

  return lines.join("\n");
}

const formatItemFlags = (item: Item): string | null => {
  if (item.flags.length === 0) return null;
  const lines: string[] = [];

  if (item.flingValue > 0) {
    lines.push(`Fling_${item.flingValue}`);
  }
  if (item.naturalGift) {
    lines.push(`NaturalGift_${item.naturalGift.type.toUpperCase()}_${item.naturalGift.power}`);
  }
  for (const flag of item.flags) {
    lines.push(flag);
  }
  return lines.sort().join(",");
}
