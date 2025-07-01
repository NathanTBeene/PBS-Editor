class EggGroupManager {
  private eggGroups = new Map<string, string>([
    ['MONSTER', 'Monster'],
    ['WATER1', 'Water1'],
    ['BUG', 'Bug'],
    ['FLYING', 'Flying'],
    ['FIELD', 'Field'],
    ['FAIRY', 'Fairy'],
    ['GRASS', 'Grass'],
    ['HUMANLIKE', 'Humanlike'],
    ['WATER3', 'Water3'],
    ['MINERAL', 'Mineral'],
    ['AMORPHOUS', 'Amorphous'],
    ['WATER2', 'Water2'],
    ['DITTO', 'Ditto'],
    ['DRAGON', 'Dragon'],
    ['UNDISCOVERED', 'Undiscovered']
  ])

  getGroups(): string[] {
    return Array.from(this.eggGroups.keys())
  }

  getGroupName(group: string): string | undefined {
    return this.eggGroups.get(group.toUpperCase())
  }

  isValidGroup(group: string): boolean {
    return this.eggGroups.has(group.toUpperCase())
  }

  addGroup(id: string, displayName?: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (this.eggGroups.has(normalizedKey)) {
      console.warn(`Egg group "${id}" already exists.`)
      return false
    }
    this.eggGroups.set(
      normalizedKey,
      displayName || id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
    )
    console.log(`Egg group "${id}" added successfully.`)
    return true
  }

  removeGroup(id: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (!this.eggGroups.has(normalizedKey)) {
      console.warn(`Egg group "${id}" does not exist.`)
      return false
    }
    this.eggGroups.delete(normalizedKey)
    console.log(`Egg group "${id}" removed successfully.`)
    return true
  }

  getDefault(): string {
    return 'Undiscovered'
  }
}

export { EggGroupManager }
export type EggGroup = keyof EggGroupManager['eggGroups']
