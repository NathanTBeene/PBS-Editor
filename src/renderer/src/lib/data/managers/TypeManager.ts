class TypeManager {
  private types = new Map<string, { displayName: string; color: string }>([
    ['NORMAL', { displayName: 'Normal', color: '#a8a878' }],
    ['FIRE', { displayName: 'Fire', color: '#f08030' }],
    ['WATER', { displayName: 'Water', color: '#6890f0' }],
    ['ELECTRIC', { displayName: 'Electric', color: '#f8d030' }],
    ['GRASS', { displayName: 'Grass', color: '#78c850' }],
    ['ICE', { displayName: 'Ice', color: '#98d8d8' }],
    ['FIGHTING', { displayName: 'Fighting', color: '#c03028' }],
    ['POISON', { displayName: 'Poison', color: '#a040a0' }],
    ['GROUND', { displayName: 'Ground', color: '#e0c068' }],
    ['FLYING', { displayName: 'Flying', color: '#a890f0' }],
    ['PSYCHIC', { displayName: 'Psychic', color: '#f85888' }],
    ['BUG', { displayName: 'Bug', color: '#a8b820' }],
    ['ROCK', { displayName: 'Rock', color: '#b8a038' }],
    ['GHOST', { displayName: 'Ghost', color: '#705898' }],
    ['DRAGON', { displayName: 'Dragon', color: '#7038f8' }],
    ['DARK', { displayName: 'Dark', color: '#705848' }],
    ['STEEL', { displayName: 'Steel', color: '#b8b8d0' }],
    ['FAIRY', { displayName: 'Fairy', color: '#ee99ac' }]
  ])

  getTypes(): { [key: string]: { displayName: string; color: string } } {
    const typesObject: { [key: string]: { displayName: string; color: string } } = {}
    this.types.forEach((value, key) => {
      typesObject[key] = value
    })
    return typesObject
  }

  getType(id: string): { displayName: string; color: string } | undefined {
    return this.types.get(id.toUpperCase())
  }

  getTypeName(type: string): string | undefined {
    return this.types.get(type.toUpperCase())?.displayName
  }

  getTypeColor(type: string): string | undefined {
    return this.types.get(type.toUpperCase())?.color
  }

  setTypeColor(id: string, color: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (!this.types.has(normalizedKey)) {
      console.warn(`Type "${id}" does not exist.`)
      return false
    }
    this.types.get(normalizedKey)!.color = color
    console.log(`Color for type "${id}" updated successfully.`)
    return true
  }

  isValidType(type: string): boolean {
    return this.types.has(type.toUpperCase())
  }

  addType(id: string, displayName?: string, color?: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (this.types.has(normalizedKey)) {
      console.warn(`Type "${id}" already exists.`)
      return false
    }
    this.types.set(normalizedKey, {
      displayName: displayName || id.charAt(0).toUpperCase() + id.slice(1).toLowerCase(),
      color: color || '#000000' // Default color if none is provided
    })
    console.log(`Type "${id}" added successfully.`)
    return true
  }

  removeType(id: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (!this.types.has(normalizedKey)) {
      console.warn(`Type "${id}" does not exist.`)
      return false
    }
    this.types.delete(normalizedKey)
    console.log(`Type "${id}" removed successfully.`)
    return true
  }

  getDefault(): string {
    return 'Normal'
  }
}

export { TypeManager }
export type PokemonType = string
