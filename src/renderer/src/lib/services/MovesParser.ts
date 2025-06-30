import { PokemonType } from '../data/globals'

export class MovesParser {
  public static parse(content: string): Move[] {
    const lines = content.split(/\r?\n/)
    const moves: Move[] = []

    const sections = lines
      .join('\n')
      .split(/#-------------------------------/)
      .map((section) => section.trim())

    for (const section of sections) {
      const partialData: Partial<Move> = {}

      const lines = section.split(/\r?\n/)
      for (const line of lines) {
        if (!line.trim() || line.startsWith('#')) continue

        if (line.startsWith('[') && line.endsWith(']')) {
          const id = line.slice(1, -1).trim()
          partialData.id = id
          continue
        }
        const parts = line.split('=')
        if (parts.length < 2) continue

        const key = parts[0].trim()
        const value = parts[1].trim()

        switch (key) {
          case 'Name':
            partialData.name = value
            break
          case 'Type':
            if (MovesParser.validateEnum(value, PokemonType)) {
              partialData.type = value as PokemonType
            } else {
              console.warn(`Invalid type in move: ${value}`)
            }
            break
          case 'Category':
            if (MovesParser.validateEnum(value, MoveCategory)) {
              partialData.category = value as MoveCategory
            }
            break
          case 'Power':
            partialData.power = value === '0' ? null : parseInt(value)
            break
          case 'Accuracy':
            partialData.accuracy = value === '0' ? null : parseInt(value)
            break
          case 'TotalPP':
            partialData.totalPP = parseInt(value)
            break
          case 'Target':
            if (MovesParser.validateEnum(value, MoveTarget)) {
              partialData.target = value as MoveTarget
            }
            break
          case 'Priority':
            partialData.priority = parseInt(value)
            break
          case 'FunctionCode':
            partialData.functionCode = value.split(',').map((code) => code.trim())
            break
          case 'Flags':
            partialData.flags = value.split(',').map((flag) => flag.trim())
            break
          case 'EffectChance':
            partialData.effectChance = parseInt(value)
            break
          case 'Description':
            partialData.description = value
            break
          default:
            console.warn(`Unknown key in move: ${key}`)
        }
      }

      const move = MovesParser.validateMove(partialData)
      if (move) {
        moves.push(move)
      }
    }

    return moves
  }
  private static validateMove(move: Partial<Move>): Move | null {
    if (!move.id) {
      console.warn('Move is missing id:', move)
      return null
    }
    if (!move.name) {
      move.name = move.id // Fallback to id if name is missing
    }
    if (!move.type) {
      console.warn('Move is missing type:', move)
      return null
    }
    if (!move.category) {
      console.warn('Move is missing category:', move)
      return null
    }
    if (move.totalPP === undefined) {
      move.totalPP = 5 // Default PP
    }
    if (!move.target) {
      move.target = MoveTarget.NEAR_OTHER // Default target
    }

    return {
      id: move.id,
      name: move.name,
      type: move.type,
      category: move.category,
      power: move.power || null,
      accuracy: move.accuracy || null,
      totalPP: move.totalPP,
      target: move.target,
      priority: move.priority,
      functionCode: move.functionCode,
      flags: move.flags,
      effectChance: move.effectChance,
      description: move.description
    } as Move
  }

  private static validateEnum(content: string, type: any): boolean {
    // Check if the content is a valid enum
    const enumValues = Object.values(type)
    return enumValues.includes(content as any)
  }
}

export interface Move {
  id: string
  name: string
  type: PokemonType
  category: MoveCategory
  power: number | null
  accuracy: number | null
  totalPP: number
  target: MoveTarget
  priority?: number
  functionCode?: string[]
  flags?: string[]
  effectChance?: number
  description?: string
}

export enum MoveCategory {
  PHYSICAL = 'Physical',
  SPECIAL = 'Special',
  STATUS = 'Status'
}

export enum MoveTarget {
  NONE = 'None',
  USER = 'User',
  NEAR_ALLY = 'NearAlly',
  USER_OR_NEAR_ALLY = 'UserOrNearAlly',
  ALL_ALLIES = 'AllAllies',
  USER_AND_ALLIES = 'UserAndAllies',
  NEAR_OTHER = 'NearOther',
  ALL_NEAR_OTHERS = 'AllNearOthers',
  OTHER = 'Other',
  ALL_NEAR_FOES = 'AllNearFoes',
  FOE_SIDE = 'FoeSide',
  USER_SIDE = 'UserSide',
  BOTH_SIDES = 'BothSides'
}
