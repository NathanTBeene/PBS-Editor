<script lang="ts">
  import {
    pokemonColorManager,
    pokemonColorStore,
    updatePokemonColorStore
  } from '../../lib/data/globals'

  let colorInput = $state('')

  const removeColor = (color: string) => {
    if (pokemonColorManager.removeColor(color)) {
      updatePokemonColorStore()
      console.log(`Removed color: ${color}`)
    } else {
      console.warn(`Failed to remove color: ${color}`)
    }
  }

  const addColor = () => {
    if (!colorInput.trim()) {
      console.warn('Color name cannot be empty')
      return
    }

    const colorName = colorInput.trim()
    if (colorName && !pokemonColorManager.isValidColor(colorName)) {
      if (pokemonColorManager.addColor(colorName)) {
        updatePokemonColorStore()
        console.log(`Added color: ${colorName}`)
        colorInput = ''
      } else {
        console.warn(`Failed to add color: ${colorName}`)
      }
    } else {
      console.warn(`Invalid or duplicate color name: ${colorName}`)
    }
  }
</script>

<div class="color constants-container">
  <h2>Color</h2>
  <div class="list-container">
    {#each $pokemonColorStore as color}
      <button type="button" class="list-item">
        {color}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          onclick={(event) => {
            event.stopPropagation()
            removeColor(color)
          }}
          class="remove-item"
        >
          X
        </div>
      </button>
    {/each}
  </div>
  <div class="actions">
    <input
      bind:value={colorInput}
      type="text"
      name="add-color"
      id="add-color"
      placeholder="Add color and press Enter..."
      onkeydown={(event) => {
        if (event.key === 'Enter') {
          addColor()
        }
      }}
    />
  </div>
</div>

<style>
  .constants-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: auto;
  }

  .list-container {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    max-height: 300px;
    padding: 0.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none; /* IE and Edge */
    border: 1px solid #ccc;
    border-radius: 12px 12px 0 0;
  }

  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-radius: 8px;
    border: none;
    background: none;
  }

  .list-item:hover {
    background-color: #444;
  }

  .remove-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5rem;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    font-size: 0.6rem;
    color: white;
    cursor: pointer;
    font-weight: bold;
  }

  .remove-item:hover {
    background-color: #ff4d4d;
  }

  .actions {
    padding: 0.5rem;
    border-radius: 0 0 10px 10px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-top: none;
  }

  .actions input {
    padding: 0.5rem;
    width: 100%;
    border-radius: 5px;
    background: none;
    border: 1px solid #e6e6e600;
    transition: all 0.2s ease;
    color: white;
  }

  .actions input:focus {
    outline: none;
    border: 1px solid #e6e6e6;
  }
</style>
