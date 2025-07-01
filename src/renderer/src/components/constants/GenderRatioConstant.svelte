<script lang="ts">
  import {
    genderRatioManager,
    genderRatioStore,
    updateGenderRatioStore
  } from '../../lib/data/globals'

  let ratioInput = ''

  const removeRatio = (ratio: string) => {
    if (genderRatioManager.removeRatio(ratio)) {
      updateGenderRatioStore()
      console.log(`Removed gender ratio: ${ratio}`)
    } else {
      console.warn(`Failed to remove gender ratio: ${ratio}`)
    }
  }

  const addRatio = () => {
    if (!ratioInput.trim()) {
      console.warn('Gender ratio name cannot be empty')
      return
    }

    const ratioName = ratioInput.trim()
    if (ratioName && !genderRatioManager.isValidRatio(ratioName)) {
      if (genderRatioManager.addRatio(ratioName)) {
        updateGenderRatioStore()
        console.log(`Added gender ratio: ${ratioName}`)
        ratioInput = ''
      } else {
        console.warn(`Failed to add gender ratio: ${ratioName}`)
      }
    } else {
      console.warn(`Invalid or duplicate gender ratio name: ${ratioName}`)
    }
  }
</script>

<div class="constants-container">
  <h2>Gender Ratios</h2>
  <div class="list-container">
    {#each $genderRatioStore as ratio}
      <button type="button" class="list-item">
        {ratio}
        <div
          onclick={(event) => {
            event.stopPropagation()
            removeRatio(ratio)
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
      bind:value={ratioInput}
      type="text"
      name="add-ratio"
      id="add-ratio"
      placeholder="Type Ratio and press Enter..."
      onkeydown={(event) => {
        if (event.key === 'Enter') {
          addRatio()
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
