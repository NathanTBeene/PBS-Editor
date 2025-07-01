class PokemonShapeManager {
  private static shapes = new Map<string, string>([
    ['HEAD', 'Head'],
    ['SERPENTINE', 'Serpentine'],
    ['FINS', 'Fins'],
    ['HEAD_ARMS', 'HeadArms'],
    ['BIPEDAL', 'Bipedal'],
    ['HEAD_BASE', 'HeadBase'],
    ['HEAD_LEGS', 'HeadLegs'],
    ['QUADRUPED', 'Quadruped'],
    ['WINGS', 'Wings'],
    ['TENTACLES', 'Tentacles'],
    ['HEADS', 'Heads'],
    ['HUMANOID', 'Humanoid'],
    ['BUG_WINGS', 'BugWings'],
    ['ARMOR', 'Armor']
  ])

  static getShapes(): string[] {
    return Array.from(this.shapes.keys())
  }

  static getShapeName(shape: string): string | undefined {
    return this.shapes.get(shape.toUpperCase())
  }

  static isValidShape(shape: string): boolean {
    return this.shapes.has(shape.toUpperCase())
  }

  static addShape(id: string, displayName?: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (this.shapes.has(normalizedKey)) {
      console.warn(`Shape "${id}" already exists.`)
      return false
    }
    this.shapes.set(
      normalizedKey,
      displayName || id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
    )
    console.log(`Shape "${id}" added successfully.`)
    return true
  }

  static removeShape(id: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (!this.shapes.has(normalizedKey)) {
      console.warn(`Shape "${id}" does not exist.`)
      return false
    }
    this.shapes.delete(normalizedKey)
    console.log(`Shape "${id}" removed successfully.`)
    return true
  }

  static getDefault(): string {
    return 'Quadruped'
  }
}

export { PokemonShapeManager }
