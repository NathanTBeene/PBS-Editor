<script lang="ts">
  import { typeManager, typeStore, updateTypeStore } from '../../lib/data/globals'
  import ColorPicker from 'svelte-awesome-color-picker'

  let selectedType = $state<string | null>(null)
  let typeInput = $state('')

  const removeType = (type: string) => {
    if (typeManager.removeType(type)) {
      updateTypeStore()
      console.log(`Removed type: ${type}`)
    } else {
      console.warn(`Failed to remove type: ${type}`)
    }
  }

  const addType = () => {
    if (!typeInput.trim()) {
      console.warn('Type name cannot be empty')
      return
    }

    const typeName = typeInput.trim()
    if (typeName && !typeManager.isValidType(typeName)) {
      if (typeManager.addType(typeName)) {
        updateTypeStore()
        console.log(`Added type: ${typeName}`)
        typeInput = ''
      } else {
        console.warn(`Failed to add type: ${typeName}`)
      }
    } else {
      console.warn(`Invalid or duplicate type name: ${typeName}`)
    }
  }

  const updateTypeColor = (id: string, color: string) => {
    const typeData = typeManager.getType(id)
    if (typeData) {
      const colorData = typeData.color
      if (color == colorData) {
        return
      }
      typeManager.setTypeColor(id, color)
      updateTypeStore()
    } else {
      console.warn(`Type with id ${id} not found`)
    }
  }

  const getSelectedTypeColor = () => {
    const store = $typeStore
    return (selectedType && store[selectedType]?.color) || '#ffffff'
  }
  let selectedTypeColor = $derived(getSelectedTypeColor())
</script>

<div class="type constants-container">
  <h2>Types</h2>
  <p>Select a type to edit the color.</p>
  <div class="selected-type">
    {#if selectedType}
      <div class="selected-type-info">
        <span>{selectedType}</span>
        <ColorPicker
          bind:hex={selectedTypeColor}
          position="responsive"
          label=""
          onInput={(event) => updateTypeColor(selectedType, event.hex)}
        />
      </div>
    {:else}
      <span>No type selected</span>
    {/if}
  </div>

  <div class="list-container">
    {#each Object.keys($typeStore) as typeId}
      <button
        type="button"
        class="list-item {selectedType === typeId ? 'selected' : ''}"
        onclick={() => {
          if (selectedType === typeId) {
            selectedType = null
          } else {
            selectedType = typeId
          }
        }}
      >
        <span>
          {typeId}
          <div class="item-color" style="background-color:{$typeStore[typeId].color}"></div>
        </span>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          onclick={(event) => {
            event.stopPropagation()
            removeType(typeId)
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
      bind:value={typeInput}
      type="text"
      name="add-type"
      id="add-type"
      placeholder="Add type and press Enter..."
      onkeydown={(event) => {
        if (event.key === 'Enter') {
          addType()
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
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: scroll;
    max-height: 300px;
    padding: 0.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none; /* IE and Edge */
    border: 1px solid #ccc;
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

  .list-item.selected {
    background-color: #9f8ece;
  }

  .list-item span {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .item-color {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #22222262;
  }

  .selected-type {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    margin-top: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px 10px 0 0;
    border-bottom: none;
    padding: 0.5rem;
  }

  .selected-type-info {
    display: flex;
    align-items: center;
    gap: 1rem;
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
