class GenderRatioManager {
  private genderRatios = new Map<string, string>([
    ['ALWAYSMALE', 'AlwaysMale'],
    ['FEMALEONEEIGHTH', 'FemaleOneEighth'],
    ['FEMALE25PERCENT', 'Female25Percent'],
    ['FEMALE50PERCENT', 'Female50Percent'],
    ['FEMALE75PERCENT', 'Female75Percent'],
    ['FEMALESEVENEIGHTHS', 'FemaleSevenEighths'],
    ['ALWAYSFEMALE', 'AlwaysFemale'],
    ['GENDERLESS', 'Genderless']
  ])

  getRatios(): string[] {
    return Array.from(this.genderRatios.keys())
  }

  getRatioDisplayNames(): string[] {
    return Array.from(this.genderRatios.values())
  }

  getRatioName(ratio: string): string | undefined {
    return this.genderRatios.get(ratio.toUpperCase())
  }

  isValidRatio(ratio: string): boolean {
    return this.genderRatios.has(ratio.toUpperCase())
  }

  addRatio(id: string, displayName?: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (this.genderRatios.has(normalizedKey)) {
      console.warn(`Gender ratio "${id}" already exists.`)
      return false
    }
    this.genderRatios.set(
      normalizedKey,
      displayName || id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
    )
    console.log(`Gender ratio "${id}" added successfully.`)
    return true
  }

  removeRatio(id: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (!this.genderRatios.has(normalizedKey)) {
      console.warn(`Gender ratio "${id}" does not exist.`)
      return false
    }
    this.genderRatios.delete(normalizedKey)
    console.log(`Gender ratio "${id}" removed successfully.`)
    return true
  }

  getDefault(): string {
    return 'Female50Percent'
  }
}

export { GenderRatioManager }
export type GenderRatio = keyof GenderRatioManager['genderRatios']
