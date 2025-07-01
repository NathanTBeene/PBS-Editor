<script lang="ts">
  import type { PokemonType } from '../lib/data/managers/TypeManager'
  import { typeManager } from '../lib/data/globals'

  let { type } = $props<{ type: PokemonType }>()

  const typeDetails = typeManager.getType(type)

  const mixWithBlack = (color: string, percentage: number): string => {
    const hex = color.startsWith('#') ? color.slice(1) : color
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)

    const mixColor = (c: number): number => Math.round(c * (1 - percentage) + 0 * percentage)

    return `#${[mixColor(r), mixColor(g), mixColor(b)].map((c) => c.toString(16).padStart(2, '0')).join('')}`
  }

  const borderColor = typeDetails ? mixWithBlack(typeDetails.color, 0.4) : '#ff0000'
</script>

<div
  class="type-button"
  style="background-color: {typeDetails?.color || '#ff0000'}; border-color: {borderColor};"
>
  {type.charAt(0).toUpperCase() + type.slice(1)}
</div>

<style>
  .type-button {
    padding: 4px 12px;
    width: 90px;
    border: 1px solid red;
    border-radius: 20px;
    text-align: center;
    color: white;
  }
</style>
