<script lang="ts">
  import {
    pokemonShapeManager,
    pokemonShapeStore,
    updatePokemonShapeStore
  } from '../../lib/data/globals'

  let shapeInput = $state('')

  const removeShape = (shape: string) => {
    if (pokemonShapeManager.removeShape(shape)) {
      updatePokemonShapeStore()
      console.log(`Removed shape: ${shape}`)
    } else {
      console.warn(`Failed to remove shape: ${shape}`)
    }
  }

  const addShape = () => {
    if (!shapeInput.trim()) {
      console.warn('Shape name cannot be empty')
      return
    }

    const shapeName = shapeInput.trim()
    if (shapeName && !pokemonShapeManager.isValidShape(shapeName)) {
      if (pokemonShapeManager.addShape(shapeName)) {
        updatePokemonShapeStore()
        console.log(`Added shape: ${shapeName}`)
        shapeInput = ''
      } else {
        console.warn(`Failed to add shape: ${shapeName}`)
      }
    } else {
      console.warn(`Invalid or duplicate shape name: ${shapeName}`)
    }
  }
</script>

<div class="shape constants-container">
  <h2>Shape</h2>
  <div class="list-container">
    {#each $pokemonShapeStore as shape}
      <button type="button" class="list-item">
        {shape}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          onclick={(event) => {
            event.stopPropagation()
            removeShape(shape)
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
      bind:value={shapeInput}
      type="text"
      name="add-shape"
      id="add-shape"
      placeholder="Add shape and press Enter..."
      onkeydown={(event) => {
        if (event.key === 'Enter') {
          addShape()
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
