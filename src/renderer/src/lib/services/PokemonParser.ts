import { type PokemonType } from '../data/globals'

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
              .filter((type) => type.length > 0) as PokemonType[]
            if (types.length > 0) {
              partialData.types = types
            }
          case 'BaseStats':
            const stats: PokemonStats = PokemonParser.parseBaseStats(value)
            partialData.baseStats = stats
          case 'GenderRatio':
            if (PokemonParser.validateEnum(value, GenderRatio)) {
              partialData.genderRatio = value as GenderRatio
            }
            break
          case 'GrowthRate':
            if (PokemonParser.validateEnum(value, GrowthRate)) {
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
      console.warn('Invalid Pokemon data - missing ID:', data)
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
      genderRatio: data.genderRatio || GenderRatio.Female50Percent,
      growthRate: data.growthRate || GrowthRate.Medium,
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
      color: data.color || PokemonColor.Gray,
      shape: data.shape || PokemonShape.Quadruped,
      habitat: data.habitat || Habitat.None,

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

  private static validateEnum(content: string, type: any): boolean {
    // Check if the content is a valid enum
    const enumValues = Object.values(type)
    return enumValues.includes(content as any)
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

export enum GenderRatio {
  AlwaysMale = 'AlwaysMale',
  FemaleOneEighth = 'FemaleOneEighth',
  Female25Percent = 'Female25Percent',
  Female50Percent = 'Female50Percent',
  Female75Percent = 'Female75Percent',
  FemaleSevenEighths = 'FemaleSevenEighths',
  AlwaysFemale = 'AlwaysFemale',
  Genderless = 'Genderless'
}

export enum GrowthRate {
  Fast = 'Fast',
  Medium = 'Medium',
  Slow = 'Slow',
  Parabolic = 'Parabolic',
  Erratic = 'Erratic',
  Fluctuating = 'Fluctuating'
}

export enum PokemonColor {
  Red = 'Red',
  Blue = 'Blue',
  Yellow = 'Yellow',
  Green = 'Green',
  Black = 'Black',
  Brown = 'Brown',
  Purple = 'Purple',
  Gray = 'Gray',
  White = 'White',
  Pink = 'Pink'
}

export enum PokemonShape {
  Head = 'Head',
  Serpentine = 'Serpentine',
  Fins = 'Fins',
  HeadArms = 'HeadArms',
  Bipedal = 'Bipedal',
  HeadBase = 'HeadBase',
  HeadLegs = 'HeadLegs',
  Quadruped = 'Quadruped',
  Wings = 'Wings',
  Tentacles = 'Tentacles',
  Heads = 'Heads',
  Humanoid = 'Humanoid',
  BugWings = 'BugWings',
  Armor = 'Armor'
}

export enum EggGroup {
  Monster = 'Monster',
  Water1 = 'Water1',
  Bug = 'Bug',
  Flying = 'Flying',
  Field = 'Field',
  Fairy = 'Fairy',
  Grass = 'Grass',
  Humanlike = 'Humanlike',
  Water3 = 'Water3',
  Mineral = 'Mineral',
  Amorphous = 'Amorphous',
  Water2 = 'Water2',
  Ditto = 'Ditto',
  Dragon = 'Dragon',
  Undiscovered = 'Undiscovered'
}

export enum Habitat {
  None = 'None',
  Cave = 'Cave',
  Forest = 'Forest',
  Grassland = 'Grassland',
  Mountain = 'Mountain',
  Rare = 'Rare',
  RoughTerrain = 'RoughTerrain',
  Sea = 'Sea',
  Urban = 'Urban',
  WatersEdge = 'WatersEdge'
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
