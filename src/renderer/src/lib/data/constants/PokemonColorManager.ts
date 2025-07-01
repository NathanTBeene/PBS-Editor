class PokemonColorManager {
  private static colors = new Map<string, string>([
    ['RED', 'Red'],
    ['BLUE', 'Blue'],
    ['YELLOW', 'Yellow'],
    ['GREEN', 'Green'],
    ['BLACK', 'Black'],
    ['BROWN', 'Brown'],
    ['PURPLE', 'Purple'],
    ['GRAY', 'Gray'],
    ['WHITE', 'White'],
    ['PINK', 'Pink']
  ])

  static getColors(): string[] {
    return Array.from(this.colors.keys())
  }

  static getColorName(color: string): string | undefined {
    return this.colors.get(color.toUpperCase())
  }

  static isValidColor(color: string): boolean {
    return this.colors.has(color.toUpperCase())
  }

  static addColor(id: string, displayName?: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (this.colors.has(normalizedKey)) {
      console.warn(`Color "${id}" already exists.`)
      return false
    }
    this.colors.set(
      normalizedKey,
      displayName || id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
    )
    console.log(`Color "${id}" added successfully.`)
    return true
  }

  static removeColor(id: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (!this.colors.has(normalizedKey)) {
      console.warn(`Color "${id}" does not exist.`)
      return false
    }
    this.colors.delete(normalizedKey)
    console.log(`Color "${id}" removed successfully.`)
    return true
  }

  static getDefault(): string {
    return 'Gray'
  }
}

export { PokemonColorManager }
