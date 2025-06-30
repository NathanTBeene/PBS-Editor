export class AbilitiesParser {
  public static parse(content: string): Ability[] {
    const lines = content.split(/\r?\n/)
    const abilities: Ability[] = []

    const sections = lines
      .join('\n')
      .split(/#-------------------------------/)
      .map((section) => section.trim())

    for (const section of sections) {
      const partialData: Partial<Ability> = {}

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
          case 'Description':
            partialData.description = value
            break
          default:
            console.warn(`Unknown key in ability: ${key}`)
        }
      }

      const ability = AbilitiesParser.validateAbility(partialData)
      if (ability) {
        abilities.push(ability)
      }
    }

    return abilities
  }

  private static validateAbility(ability: Partial<Ability>): Ability | null {
    if (!ability.id) {
      console.warn('Ability is missing id:', ability)
      return null
    }
    if (!ability.name) {
      ability.name = ability.id // Fallback to id if name is missing
    }
    if (!ability.description) {
      ability.description = 'No description available' // Fallback for description
    }

    return {
      id: ability.id,
      name: ability.name,
      description: ability.description
    } as Ability
  }
}

export interface Ability {
  id: string
  name: string
  description: string
}
