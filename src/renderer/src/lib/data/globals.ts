import { writable } from 'svelte/store'
import { PokemonParser, type PokemonData } from '../services/PokemonParser'
import { AbilitiesParser, type Ability } from '../services/AbilitiesParser'
import { MovesParser, type Move } from '../services/MovesParser'

export const pokemonData = writable<PokemonData[]>([])
export const selectedPokemon = writable<PokemonData | null>(null)
export const abilitiesList = writable<Ability[]>([])
export const movesList = writable<Move[]>([])

const abilitiesFilePath = '../../assets/pbs_base_files/abilities.txt'
const pokemonFilePath = '../../assets/pbs_base_files/pokemon.txt'
const movesFilePath = '../../assets/pbs_base_files/moves.txt'

export const importBaseAbilities = async () => {
  const response = await fetch(abilitiesFilePath)
  if (!response.ok) {
    console.error('Failed to fetch abilities file:', response.statusText)
    return
  }

  const content = await response.text()
  const abilities = AbilitiesParser.parse(content)
  abilitiesList.set(abilities)
}

export const importBasePokemon = async () => {
  const response = await fetch(pokemonFilePath)
  if (!response.ok) {
    console.error('Failed to fetch pokemon file:', response.statusText)
    return
  }

  const content = await response.text()
  const pokemon = PokemonParser.parse(content)
  pokemonData.set(pokemon)
}

export const importBaseMoves = async () => {
  const response = await fetch(movesFilePath)
  if (!response.ok) {
    console.error('Failed to fetch moves file:', response.statusText)
    return
  }

  const content = await response.text()
  const moves = MovesParser.parse(content)
  movesList.set(moves)
}

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
