class TypeManager {
  private static types = new Map<string, string>([
    ['NORMAL', 'Normal'],
    ['FIRE', 'Fire'],
    ['WATER', 'Water'],
    ['ELECTRIC', 'Electric'],
    ['GRASS', 'Grass'],
    ['ICE', 'Ice'],
    ['FIGHTING', 'Fighting'],
    ['POISON', 'Poison'],
    ['GROUND', 'Ground'],
    ['FLYING', 'Flying'],
    ['PSYCHIC', 'Psychic'],
    ['BUG', 'Bug'],
    ['ROCK', 'Rock'],
    ['GHOST', 'Ghost'],
    ['DRAGON', 'Dragon'],
    ['DARK', 'Dark'],
    ['STEEL', 'Steel'],
    ['FAIRY', 'Fairy']
  ])

  static getTypes(): string[] {
    return Array.from(this.types.keys())
  }

  static getTypeName(type: string): string | undefined {
    return this.types.get(type.toUpperCase())
  }

  static isValidType(type: string): boolean {
    return this.types.has(type.toUpperCase())
  }

  static addType(id: string, displayName?: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (this.types.has(normalizedKey)) {
      console.warn(`Type "${id}" already exists.`)
      return false
    }
    this.types.set(
      normalizedKey,
      displayName || id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
    )
    console.log(`Type "${id}" added successfully.`)
    return true
  }

  static removeType(id: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (!this.types.has(normalizedKey)) {
      console.warn(`Type "${id}" does not exist.`)
      return false
    }
    this.types.delete(normalizedKey)
    console.log(`Type "${id}" removed successfully.`)
    return true
  }

  static getDefault(): string {
    return 'Normal'
  }
}

export { TypeManager }
export type PokemonType = string
