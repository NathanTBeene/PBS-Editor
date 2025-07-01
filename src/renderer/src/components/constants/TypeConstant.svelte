<script lang="ts">
  import { typeManager, typeStore, updateTypeStore } from '../../lib/data/globals'

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
</script>

<div class="type constants-container">
  <h2>Type Constants</h2>
  <div class="list-container">
    {#each $typeStore as type}
      <button type="button" class="list-item">
        {type}
        <div
          onclick={(event) => {
            event.stopPropagation()
            removeType(type)
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
