import { useAbilityData } from "./pokedex/useAbilityData";
import { useMoveData } from "./pokedex/useMoveData";
import { usePBSConstants } from "./pokedex/usePBSConstants";
import { usePokemonData } from "./pokedex/usePokemonData";

export const usePokedex = () => {
  const pokemonData = usePokemonData();
  const moveData = useMoveData();
  const abilityData = useAbilityData();
  const constantsData = usePBSConstants();

  return {
    // Pokemon data
    pokemon: pokemonData.pokemon,
    setPokemonData: pokemonData.setPokemonData,
    selectedPokemon: pokemonData.selectedPokemon,
    setSelectedPokemon: pokemonData.setSelectedPokemon,
    isPokemonInPokedex: pokemonData.isPokemonInPokedex,
    addPokemon: pokemonData.addPokemon,
    removePokemon: pokemonData.removePokemon,
    resetPokemonData: pokemonData.resetPokemonData,
    setPokemonToDefault: pokemonData.setPokemonToDefault,

    // Move data
    moves: moveData.moves,
    setMoveData: moveData.setMoveData,
    selectedMove: moveData.selectedMove,
    setSelectedMove: moveData.setSelectedMove,
    isMoveInPokedex: moveData.isMoveInPokedex,
    addMove: moveData.addMove,
    removeMove: moveData.removeMove,
    resetMoveData: moveData.resetMoveData,
    setMoveToDefault: moveData.setMoveToDefault,

    // Ability data
    abilities: abilityData.abilities,
    setAbilityData: abilityData.setAbilityData,
    selectedAbility: abilityData.selectedAbility,
    setSelectedAbility: abilityData.setSelectedAbility,
    isAbilityInPokedex: abilityData.isAbilityInPokedex,
    addAbility: abilityData.addAbility,
    removeAbility: abilityData.removeAbility,
    resetAbilityData: abilityData.resetAbilityData,
    setAbilityToDefault: abilityData.setAbilityToDefault,

    // Constants data
    types: constantsData.types,
    genderRatios: constantsData.genderRatios,
    growthRates: constantsData.growthRates,
    eggGroups: constantsData.eggGroups,
    colors: constantsData.colors,
    shapes: constantsData.shapes,
    habitats: constantsData.habitats,
    evolutionMethods: constantsData.evolutionMethods,
    resetConstants: constantsData.resetConstant,
    resetAllConstants: constantsData.resetAllConstants,
    addConstant: constantsData.addConstant,
    removeConstant: constantsData.removeConstant,
    getTypeColor: constantsData.getTypeColor,
    updateTypeColor: constantsData.updateTypeColor,
  };
};
