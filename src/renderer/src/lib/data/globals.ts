import { writable } from 'svelte/store'
import { PokemonParser, type PokemonData } from '../services/PokemonParser'
import { AbilitiesParser, type Ability } from '../services/AbilitiesParser'
import { MovesParser, type Move } from '../services/MovesParser'

// Import Managers
import { TypeManager } from './constants/TypeManager'
import { GenderRatioManager } from './constants/GenderRatioManager'
import { GrowthRateManager } from './constants/GrowthRateManager'
import { PokemonColorManager } from './constants/PokemonColorManager'
import { PokemonShapeManager } from './constants/PokemonShapeManager'
import { EggGroupManager } from './constants/EggGroupManager'
import { HabitatManager } from './constants/HabitatManager'

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
