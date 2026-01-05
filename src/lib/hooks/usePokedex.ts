import { useEffect } from "react";
import { useAbilityData } from "./pokedex/useAbilityData";
import { useMoveData } from "./pokedex/useMoveData";
import { usePBSConstants } from "./pokedex/usePBSConstants";
import { usePokemonData } from "./pokedex/usePokemonData";
import { useItemData } from "./pokedex/useItemData";

export const usePokedex = () => {
  const pokemonData = usePokemonData();
  const moveData = useMoveData();
  const abilityData = useAbilityData();
  const itemData = useItemData();
  const constantsData = usePBSConstants();

  useEffect(() => {
    // Load Initial Data
    const loadData = async () => {
      await constantsData.loadPBSConstants();
      await pokemonData.loadPokemonData();
      await moveData.loadMoveData();
      await abilityData.loadAbilityData();
      await itemData.loadItemData();
    };

    loadData();
  }, []);

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
    overridePokemonData: pokemonData.overridePokemonData,
    importPokemonMerge: pokemonData.importMerge,
    importPokemonOverride: pokemonData.importOverride,

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
    overrideMoveData: moveData.overrideMoveData,
    importMovesMerge: moveData.importMerge,
    importMovesOverride: moveData.importOverride,
    getMoveDataById: moveData.getMoveDataById,

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
    importAbilitiesMerge: abilityData.importMerge,
    importAbilitiesOverride: abilityData.importOverride,

    // Item data
    items: itemData.items,
    setItemData: itemData.setItemData,
    selectedItem: itemData.selectedItem,
    setSelectedItem: itemData.setSelectedItem,
    isItemInPokedex: itemData.isItemInPokedex,
    addItem: itemData.addItem,
    removeItem: itemData.removeItem,
    resetItemData: itemData.resetItemData,
    setItemToDefault: itemData.setItemToDefault,
    importItemsMerge: itemData.importMerge,
    importItemsOverride: itemData.importOverride,

    // Constants data
    types: constantsData.types,
    genderRatios: constantsData.genderRatios,
    growthRates: constantsData.growthRates,
    eggGroups: constantsData.eggGroups,
    colors: constantsData.colors,
    shapes: constantsData.shapes,
    habitats: constantsData.habitats,
    evolutionMethods: constantsData.evolutionMethods,
    pockets: constantsData.pockets,
    fieldUses: constantsData.fieldUses,
    battleUses: constantsData.battleUses,
    itemFlags: constantsData.itemFlags,
    moveFlags: constantsData.moveFlags,
    resetConstants: constantsData.resetConstant,
    resetAllConstants: constantsData.resetAllConstants,
    addConstant: constantsData.addConstant,
    removeConstant: constantsData.removeConstant,
    getTypeColor: constantsData.getTypeColor,
    updateTypeColor: constantsData.updateTypeColor,
  };
};
