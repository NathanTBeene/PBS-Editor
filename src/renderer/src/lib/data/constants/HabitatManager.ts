class HabitatManager {
  private static habitats = new Map<string, string>([
    ['NONE', 'None'],
    ['CAVE', 'Cave'],
    ['FOREST', 'Forest'],
    ['GRASSLAND', 'Grassland'],
    ['MOUNTAIN', 'Mountain'],
    ['RARE', 'Rare'],
    ['ROUGH_TERRAIN', 'RoughTerrain'],
    ['SEA', 'Sea'],
    ['URBAN', 'Urban'],
    ['WATERS_EDGE', 'WatersEdge']
  ])

  static getHabitats(): string[] {
    return Array.from(this.habitats.keys())
  }

  static getHabitatName(habitat: string): string | undefined {
    return this.habitats.get(habitat.toUpperCase())
  }

  static isValidHabitat(habitat: string): boolean {
    return this.habitats.has(habitat.toUpperCase())
  }

  static addHabitat(id: string, displayName?: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (this.habitats.has(normalizedKey)) {
      console.warn(`Habitat "${id}" already exists.`)
      return false
    }
    this.habitats.set(
      normalizedKey,
      displayName || id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
    )
    console.log(`Habitat "${id}" added successfully.`)
    return true
  }

  static removeHabitat(id: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (!this.habitats.has(normalizedKey)) {
      console.warn(`Habitat "${id}" does not exist.`)
      return false
    }
    this.habitats.delete(normalizedKey)
    console.log(`Habitat "${id}" removed successfully.`)
    return true
  }

  static getDefault(): string {
    return 'None'
  }
}

export { HabitatManager }
