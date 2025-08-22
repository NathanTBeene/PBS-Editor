import type { Pokemon } from "../models/Pokemon";

export const validatePokemon = (mon: Pokemon) => {
  const errors: string[] = [];

  if (!mon.id || mon.id == "") errors.push("id");

  if (!mon.dexNumber || mon.dexNumber < 0) errors.push("dexNumber");

  if (!mon.name || mon.name == "") errors.push("name");

  if (mon.types[0] == "") errors.push("types");

  if (mon.types.length > 1) {
    if (mon.types[1] == "") {
      errors.push("types");
    }
  }

  if (mon.baseStats) {
    const { hp, attack, defense, specialAttack, specialDefense, speed } =
      mon.baseStats;
    if (
      hp < 1 ||
      attack < 1 ||
      defense < 1 ||
      specialAttack < 1 ||
      specialDefense < 1 ||
      speed < 1
    ) {
      errors.push("baseStats");
    }
  }

  if (mon.baseExp < 0) {
    errors.push("baseExp");
  }

  if (mon.effortValues) {
    const { hp, attack, defense, specialAttack, specialDefense, speed } =
      mon.effortValues;
    if (
      hp < 0 ||
      attack < 0 ||
      defense < 0 ||
      specialAttack < 0 ||
      specialDefense < 0 ||
      speed < 0
    ) {
      errors.push("effortValues");
    }
  }

  if (mon.catchRate < 0 || mon.catchRate > 255) errors.push("catchRate");

  if (mon.happiness < 0 || mon.happiness > 255) errors.push("happiness");

  if (mon.abilities.length === 0) errors.push("abilities");

  if (mon.moves.length === 0) errors.push("moves");

  if (mon.eggGroups.length === 0) errors.push("eggGroups");

  if (mon.hatchSteps < 0) errors.push("hatchSteps");

  if (mon.height < 0) errors.push("height");

  if (mon.weight < 0) errors.push("weight");

  if (mon.generation < 1) errors.push("generation");

  return errors.length > 0 ? errors : null;
};

export const validateSaveData = (data: Pokemon) => {
  const errors = validatePokemon(data);

  const {
    abilities,
    hiddenAbilities,
    moves,
    tutorMoves,
    eggMoves,
    eggGroups,
    offspring,
    flags,
  } = data;

  data.abilities = abilities.filter((ability) => ability != "");
  data.hiddenAbilities = hiddenAbilities.filter((ability) => ability != "");
  data.moves = moves.filter((move) => move.name != "");
  data.tutorMoves = tutorMoves.filter((move) => move.name != "");
  data.eggMoves = eggMoves.filter((move) => move.name != "");
  data.eggGroups = eggGroups.filter((group) => group != "");
  data.offspring = offspring.filter((child) => child != "");
  data.flags = flags.filter((flag) => flag != "");

  return { saveData: data, errors };
};
