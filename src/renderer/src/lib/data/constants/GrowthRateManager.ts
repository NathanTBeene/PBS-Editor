class GrowthRateManager {
  private static growthRates = new Map<string, string>([
    ['FAST', 'Fast'],
    ['MEDIUM', 'Medium'],
    ['SLOW', 'Slow'],
    ['PARABOLIC', 'Parabolic'],
    ['ERRATIC', 'Erratic'],
    ['FLUCTUATING', 'Fluctuating']
  ])

  static getRates(): string[] {
    return Array.from(this.growthRates.keys())
  }

  static getRateName(rate: string): string | undefined {
    return this.growthRates.get(rate.toUpperCase())
  }

  static isValidRate(rate: string): boolean {
    return this.growthRates.has(rate.toUpperCase())
  }

  static addRate(id: string, displayName?: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (this.growthRates.has(normalizedKey)) {
      console.warn(`Growth rate "${id}" already exists.`)
      return false
    }
    this.growthRates.set(
      normalizedKey,
      displayName || id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
    )
    console.log(`Growth rate "${id}" added successfully.`)
    return true
  }

  static removeRate(id: string): boolean {
    const normalizedKey = id.toUpperCase()
    if (!this.growthRates.has(normalizedKey)) {
      console.warn(`Growth rate "${id}" does not exist.`)
      return false
    }
    this.growthRates.delete(normalizedKey)
    console.log(`Growth rate "${id}" removed successfully.`)
    return true
  }

  static getDefault(): string {
    return 'Medium'
  }
}

export { GrowthRateManager }
