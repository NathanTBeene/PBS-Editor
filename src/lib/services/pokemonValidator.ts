import type { Pokemon } from "../models/Pokemon";

export const validatePokemon = (mon: Pokemon) => {
  const errors: string[] = [];

  if (!mon.id || mon.id == "") errors.push("id");

  if (!mon.name || mon.name == "") errors.push("name");

  for (const move of mon.moves) {
    if (!move.name || move.name == "" || (move.level && move.level < 1))
      errors.push("moves");
  }

  for (const move of mon.tutorMoves) {
    if (!move.name || move.name == "") errors.push("tutorMoves");
  }

  for (const move of mon.eggMoves) {
    if (!move.name || move.name == "") errors.push("eggMoves");
  }

  for (const group of mon.eggGroups) {
    if (!group || group == "") errors.push("eggGroups");
  }

  for (const child of mon.offspring) {
    if (!child || child == "") errors.push("offspring");
  }

  for (const flag of mon.flags) {
    if (!flag || flag == "") errors.push("flag");
  }

  return errors.length > 0 ? errors : null;
};
