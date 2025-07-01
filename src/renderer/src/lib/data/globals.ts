import { writable } from 'svelte/store'
import { PokemonParser, type PokemonData } from '../services/PokemonParser'
import { AbilitiesParser, type Ability } from '../services/AbilitiesParser'
import { MovesParser, type Move } from '../services/MovesParser'

// Import Managers
import { TypeManager } from './managers/TypeManager'
import { GenderRatioManager } from './managers/GenderRatioManager'
import { GrowthRateManager } from './managers/GrowthRateManager'
import { PokemonColorManager } from './managers/PokemonColorManager'
import { PokemonShapeManager } from './managers/PokemonShapeManager'
import { EggGroupManager } from './managers/EggGroupManager'
import { HabitatManager } from './managers/HabitatManager'

// Svelte Stores
export const pokemonData = writable<PokemonData[]>([])
export const selectedPokemon = writable<PokemonData | null>(null)

export const abilitiesList = writable<Ability[]>([])
export const movesList = writable<Move[]>([])

// Managers
export const typeManager = new TypeManager()
export const genderRatioManager = new GenderRatioManager()
export const growthRateManager = new GrowthRateManager()
export const pokemonColorManager = new PokemonColorManager()
export const pokemonShapeManager = new PokemonShapeManager()
export const eggGroupManager = new EggGroupManager()
export const habitatManager = new HabitatManager()

// Stores
export const typeStore = writable(typeManager.getTypes())
export const updateTypeStore = () => {
  typeStore.set(typeManager.getTypes())
}
export const genderRatioStore = writable(genderRatioManager.getRatios())
export const updateGenderRatioStore = () => {
  genderRatioStore.set(genderRatioManager.getRatios())
}
export const growthRateStore = writable(growthRateManager.getRates())
export const updateGrowthRateStore = () => {
  growthRateStore.set(growthRateManager.getRates())
}
export const pokemonColorStore = writable(pokemonColorManager.getColors())
export const updatePokemonColorStore = () => {
  pokemonColorStore.set(pokemonColorManager.getColors())
}
export const pokemonShapeStore = writable(pokemonShapeManager.getShapes())
export const updatePokemonShapeStore = () => {
  pokemonShapeStore.set(pokemonShapeManager.getShapes())
}
export const eggGroupStore = writable(eggGroupManager.getGroups())
export const updateEggGroupStore = () => {
  eggGroupStore.set(eggGroupManager.getGroups())
}
export const habitatStore = writable(habitatManager.getHabitats())
export const updateHabitatStore = () => {
  habitatStore.set(habitatManager.getHabitats())
}

// TODO: Implement import functions
export const importBaseAbilities = async () => {}
export const importBasePokemon = async () => {}
export const importBaseMoves = async () => {}

export enum PokemonType {
  Normal = 'Normal',
  Fighting = 'Fighting',
  Flying = 'Flying',
  Poison = 'Poison',
  Ground = 'Ground',
  Rock = 'Rock',
  Bug = 'Bug',
  Ghost = 'Ghost',
  Steel = 'Steel',
  Fire = 'Fire',
  Water = 'Water',
  Grass = 'Grass',
  Electric = 'Electric',
  Psychic = 'Psychic',
  Ice = 'Ice',
  Dragon = 'Dragon',
  Dark = 'Dark',
  Fairy = 'Fairy'
}
