<script lang="ts">
  import type { PokemonType } from '../lib/data/managers/TypeManager'
  let { type } = $props<{ type: PokemonType }>()
</script>

<div class="type-button" data-type={type.toLowerCase()}>
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
  .type-button[data-type='normal'] {
    background-color: var(--type-normal);
    border: 2px solid var(--type-normal-dark);
  }

  .type-button[data-type='fighting'] {
    background-color: var(--type-fighting);
    border: 2px solid var(--type-fighting-dark);
  }

  .type-button[data-type='flying'] {
    background-color: var(--type-flying);
    border: 2px solid var(--type-flying-dark);
  }

  .type-button[data-type='poison'] {
    background-color: var(--type-poison);
    border: 2px solid var(--type-poison-dark);
  }

  .type-button[data-type='ground'] {
    background-color: var(--type-ground);
    border: 2px solid var(--type-ground-dark);
  }

  .type-button[data-type='rock'] {
    background-color: var(--type-rock);
    border: 2px solid var(--type-rock-dark);
  }

  .type-button[data-type='bug'] {
    background-color: var(--type-bug);
    border: 2px solid var(--type-bug-dark);
  }

  .type-button[data-type='ghost'] {
    background-color: var(--type-ghost);
    border: 2px solid var(--type-ghost-dark);
  }

  .type-button[data-type='steel'] {
    background-color: var(--type-steel);
    border: 2px solid var(--type-steel-dark);
  }

  .type-button[data-type='fire'] {
    background-color: var(--type-fire);
    border: 2px solid var(--type-fire-dark);
  }

  .type-button[data-type='water'] {
    background-color: var(--type-water);
    border: 2px solid var(--type-water-dark);
  }

  .type-button[data-type='grass'] {
    background-color: var(--type-grass);
    border: 2px solid var(--type-grass-dark);
  }

  .type-button[data-type='electric'] {
    background-color: var(--type-electric);
    border: 2px solid var(--type-electric-dark);
  }

  .type-button[data-type='psychic'] {
    background-color: var(--type-psychic);
    border: 2px solid var(--type-psychic-dark);
  }

  .type-button[data-type='ice'] {
    background-color: var(--type-ice);
    border: 2px solid var(--type-ice-dark);
  }

  .type-button[data-type='dragon'] {
    background-color: var(--type-dragon);
    border: 2px solid var(--type-dragon-dark);
  }

  .type-button[data-type='dark'] {
    background-color: var(--type-dark);
    border: 2px solid var(--type-dark-dark);
  }

  .type-button[data-type='fairy'] {
    background-color: var(--type-fairy);
    border: 2px solid var(--type-fairy-dark);
  }
</style>
