import {
  typeManager,
  genderRatioManager,
  growthRateManager,
  pokemonColorManager,
  eggGroupManager,
  habitatManager,
  pokemonShapeManager
} from '../data/globals'
import type { PokemonType } from '../data/managers/TypeManager'
import type { GenderRatio } from '../data/managers/GenderRatioManager'
import type { GrowthRate } from '../data/managers/GrowthRateManager'
import type { EggGroup } from '../data/managers/EggGroupManager'
import type { PokemonColor } from '../data/managers/PokemonColorManager'
import type { Habitat } from '../data/managers/HabitatManager'
import type { PokemonShape } from '../data/managers/PokemonShapeManager'

export class PokemonParser {
  public static parse(content: string): PokemonData[] {
    const lines = content.split(/\r?\n/)
    const pokemonData: PokemonData[] = []
    // Split by #----
    const sections = lines
      .join('\n')
      .split(/#-------------------------------/)
      .map((section) => section.trim())

    // Implement parsing logic here
    for (const section of sections) {
      const partialData: Partial<PokemonData> = {}

      // Go through each pokemon.
      const lines = section.split(/\r?\n/)
      for (const line of lines) {
        // Skip empty lines and comments
        if (!line.trim() || line.startsWith('#')) continue

        // If brackets, that is the id
        if (line.startsWith('[') && line.endsWith(']')) {
          const id = line.slice(1, -1).trim()
          partialData.id = id
          continue
        }

        // Split by '=' to get key-value pairs
        const parts = line.split('=')
        if (parts.length < 2) continue

        const key = parts[0].trim()
        const value = parts[1].trim()

        switch (key) {
          case 'Name':
            partialData.name = value
            break
          case 'Types':
            const types = value
              .split(',')
              .map((type) => type.trim())
              .filter((type) => typeManager.isValidType(type))
            partialData.types = types as (keyof (typeof typeManager)['types'])[] // Type assertion
            break
          case 'BaseStats':
            const stats: PokemonStats = PokemonParser.parseBaseStats(value)
            partialData.baseStats = stats
          case 'GenderRatio':
            if (genderRatioManager.isValidRatio(value)) {
              partialData.genderRatio = value as GenderRatio
            }
            break
          case 'GrowthRate':
            if (growthRateManager.isValidRate(value)) {
              partialData.growthRate = value as GrowthRate
            }
            break
          case 'BaseExp':
            partialData.baseExp = parseInt(value)
            break
          case 'EVs':
            partialData.evs = PokemonParser.parseEvs(value)
            break
          case 'CatchRate':
            partialData.catchRate = parseInt(value)
            break
          case 'Happiness':
            partialData.happiness = parseInt(value)
            break
          case 'Abilities':
            const abilities = value
              .split(',')
              .map((ability) => ability.trim())
              .filter((ability) => ability.length > 0)
            partialData.abilities = abilities
            break
          case 'HiddenAbilities':
            const hiddenAbilities = value
              .split(',')
              .map((ability) => ability.trim())
              .filter((ability) => ability.length > 0)
            partialData.hiddenAbilities = hiddenAbilities
            break
          case 'Moves':
            partialData.moves = PokemonParser.parseMoves(value)
            break
          case 'TutorMoves':
            const moves = value.split(',').map((move) => move.trim())
            partialData.tutorMoves = moves.filter((move) => move.length > 0)
            break
          case 'EggMoves':
            const eggMoves = value.split(',').map((move) => move.trim())
            partialData.eggMoves = eggMoves.filter((move) => move.length > 0)
            break
          case 'EggGroups':
            const eggGroups = value
              .split(',')
              .map((group) => group.trim())
              .filter((group) => eggGroupManager.isValidGroup(group))
            partialData.eggGroups = eggGroups as (keyof (typeof eggGroupManager)['eggGroups'])[] // Type assertion
            break
          case 'HatchSteps':
            partialData.hatchSteps = parseInt(value)
            break
          case 'Insence':
            partialData.insence = value
            break
          case 'Offspring':
            const offspring = value
              .split(',')
              .map((offspring) => offspring.trim())
              .filter((offspring) => offspring.length > 0)
            partialData.offspring = offspring
            break
          case 'Height':
            partialData.height = parseFloat(value)
            break
          case 'Weight':
            partialData.weight = parseFloat(value)
            break
          case 'Color':
            if (pokemonColorManager.isValidColor(value)) {
              partialData.color = value as PokemonColor
            }
            break
          case 'Shape':
            if (pokemonShapeManager.isValidShape(value)) {
              partialData.shape = value as PokemonShape
            }
            break
          case 'Habitat':
            if (habitatManager.isValidHabitat(value)) {
              partialData.habitat = value as Habitat
            }
            break
          case 'Category':
            partialData.category = value
            break
          case 'Pokedex':
            partialData.pokedex = value
            break
          case 'Generation':
            partialData.generation = parseInt(value)
            break
          case 'Evolutions':
            partialData.evolutions = PokemonParser.parseEvolutions(value)
            break
          default:
            // console.warn(`Unknown key: ${key} with value: ${value}`)
            break
        }
      }

      pokemonData.push(PokemonParser.validateData(partialData))
    }

    return pokemonData.filter((data) => data !== null) as PokemonData[]
  }
  private static validateData(data: Partial<PokemonData>): PokemonData | null {
    // Must have an ID to be valid
    if (!data.id) {
      return null
    }

    // Create validated data with defaults
    const validatedData: PokemonData = {
      // Core identification
      id: data.id,
      name: data.name || '',
      formName: data.formName || '',

      // Type information
      types: data.types || [],

      // Base stats
      baseStats: data.baseStats || {
        hp: 0,
        atk: 0,
        def: 0,
        spe: 0,
        spa: 0,
        spd: 0
      },

      // Training
      genderRatio: data.genderRatio || ('Female50Percent' as GenderRatio),
      growthRate: data.growthRate || ('Medium' as GrowthRate),
      baseExp: data.baseExp || 0,
      evs: data.evs || {},
      catchRate: data.catchRate || 0,
      happiness: data.happiness || 0,

      // Abilities
      abilities: data.abilities || [],
      hiddenAbilities: data.hiddenAbilities || [],

      // Moves
      moves: data.moves || [],
      tutorMoves: data.tutorMoves || [],
      eggMoves: data.eggMoves || [],

      // Breeding
      eggGroups: data.eggGroups || [],
      hatchSteps: data.hatchSteps || 0,
      insence: data.insence || '',
      offspring: data.offspring || [],

      // Physical characteristics
      height: data.height || 0,
      weight: data.weight || 0,
      color: data.color || ('Gray' as PokemonColor),
      shape: data.shape || ('Quadruped' as PokemonShape),
      habitat: data.habitat || ('None' as Habitat),

      // Pokedex information
      category: data.category || '',
      pokedex: data.pokedex || '',
      generation: data.generation || 1,

      // Evolution
      evolutions: data.evolutions || [],

      // Miscellaneous
      flags: data.flags || [],
      wildItemCommon: data.wildItemCommon || [],
      wildItemUncommon: data.wildItemUncommon || [],
      wildItemRare: data.wildItemRare || []
    }

    return validatedData
  }

  private static parseBaseStats(content: string): PokemonStats {
    const stats: PokemonStats = {
      hp: 0,
      atk: 0,
      def: 0,
      spe: 0,
      spa: 0,
      spd: 0
    }

    // Will default to -1 if for some reason nothing is provided
    const parts = content.split(',')
    stats.hp = parseInt(parts[0]) || -1
    stats.atk = parseInt(parts[1]) || -1
    stats.def = parseInt(parts[2]) || -1
    stats.spe = parseInt(parts[3]) || -1
    stats.spa = parseInt(parts[4]) || -1
    stats.spd = parseInt(parts[5]) || -1

    return stats
  }

  private static parseEvs(content: string): PokemonEVs {
    const evs: PokemonEVs = {}

    const parts = content.split(',')

    // Split by pairs EV-name, value, EV-name, value
    for (let i = 0; i < parts.length; i += 2) {
      const name = parts[i].trim().toUpperCase()
      const value = parseInt(parts[i + 1].trim())

      switch (name) {
        case 'HP':
          evs.hp = value
          break
        case 'ATTACK':
          evs.atk = value
          break
        case 'DEFENSE':
          evs.def = value
          break
        case 'SPEED':
          evs.spe = value
          break
        case 'SPECIAL_ATTACK':
          evs.spa = value
          break
        case 'SPECIAL_DEFENSE':
          evs.spd = value
          break
        default:
          console.warn(`Unknown EV stat: ${name} with value: ${value}`)
          break
      }
    }

    return evs
  }

  public static parseMoves(content: string): PokemonMove[] {
    const moves: PokemonMove[] = []

    const parts = content.split(',')

    // Split by pairs level, move, level, move
    for (let i = 0; i < parts.length; i += 2) {
      const level = parseInt(parts[i].trim())
      const move = parts[i + 1].trim()

      if (isNaN(level) || !move) {
        console.warn(`Invalid move entry: ${parts[i]} ${parts[i + 1]}`)
        continue
      }

      moves.push({ level, move })
    }

    return moves
  }

  public static parseEvolutions(content: string): PokemonEvolution[] {
    const evolutions: PokemonEvolution[] = []

    if (!content) {
      return evolutions
    }

    const parts = content.split(',')

    // Split by three parts: species, method, parameter
    for (let i = 0; i < parts.length; i += 3) {
      const species = parts[i].trim()
      const method = parts[i + 1].trim()
      const parameter = parts[i + 2]?.trim()

      if (!species || !method) {
        console.warn(`Invalid evolution entry: ${parts[i]} ${parts[i + 1]} ${parts[i + 2]}`)
        continue
      }

      const evolution: PokemonEvolution = {
        species,
        method
      }

      if (parameter) {
        // Try to parse parameter as number or keep as string
        const numParam = parseFloat(parameter)
        evolution.parameter = isNaN(numParam) ? parameter : numParam
      }

      evolutions.push(evolution)
    }

    return evolutions
  }

  public static createEmptyPokemonData(id: string): PokemonData | null {
    const emptyData: Partial<PokemonData> = {
      id: id
    }

    return PokemonParser.validateData(emptyData) || null
  }
}

// Types and interfaces for Pokemon data
export interface PokemonStats {
  hp: number
  atk: number
  def: number
  spe: number
  spa: number
  spd: number
}

export interface PokemonMove {
  level: number
  move: string
}

export interface PokemonEvolution {
  species: string
  method: string
  parameter?: number | string
}

export interface PokemonEVs {
  hp?: number
  atk?: number
  def?: number
  spe?: number
  spa?: number
  spd?: number
}

export interface PokemonData {
  // Core identification
  id: string
  name: string
  formName: string

  // Type information
  types: PokemonType[]

  // Base stats
  baseStats: PokemonStats

  // Training
  genderRatio: GenderRatio
  growthRate: GrowthRate
  baseExp: number
  evs: PokemonEVs
  catchRate: number
  happiness: number

  // Abilities
  abilities: string[]
  hiddenAbilities: string[]

  // Moves
  moves: PokemonMove[]
  tutorMoves: string[]
  eggMoves: string[]

  // Breeding
  eggGroups: EggGroup[]
  hatchSteps: number
  insence: string
  offspring: string[]

  // Physical characteristics
  height: number
  weight: number
  color: PokemonColor
  shape: PokemonShape
  habitat: Habitat

  // Pokedex information
  category: string
  pokedex: string
  generation: number

  // Evolution
  evolutions: PokemonEvolution[]

  // Miscellaneous
  flags: string[]
  wildItemCommon: string[]
  wildItemUncommon: string[]
  wildItemRare: string[]
}
