class HabitatManager {
  private habitats = new Map<string, string>([
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

  getHabitats(): string[] {
    return Array.from(this.habitats.keys())
  }

  getHabitatName(habitat: string): string | undefined {
    return this.habitats.get(habitat.toUpperCase())
  }

  isValidHabitat(habitat: string): boolean {
    return this.habitats.has(habitat.toUpperCase())
  }

  addHabitat(id: string, displayName?: string): boolean {
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

  removeHabitat(id: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (!this.habitats.has(normalizedKey)) {
      console.warn(`Habitat "${id}" does not exist.`)
      return false
    }
    this.habitats.delete(normalizedKey)
    console.log(`Habitat "${id}" removed successfully.`)
    return true
  }

  getDefault(): string {
    return 'None'
  }
}

export { HabitatManager }
export type Habitat = keyof HabitatManager['habitats']
