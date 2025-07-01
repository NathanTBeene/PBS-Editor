<script lang="ts">
  import { eggGroupManager, eggGroupStore, updateEggGroupStore } from '../../lib/data/globals'

  let eggGroupInput = $state('')

  const removeEggGroup = (group: string) => {
    if (eggGroupManager.removeGroup(group)) {
      updateEggGroupStore()
      console.log(`Removed egg group: ${group}`)
    } else {
      console.warn(`Failed to remove egg group: ${group}`)
    }
  }

  const addEggGroup = () => {
    if (!eggGroupInput.trim()) {
      console.warn('Egg group name cannot be empty')
      return
    }

    const groupName = eggGroupInput.trim()
    if (groupName && !eggGroupManager.isValidGroup(groupName)) {
      if (eggGroupManager.addGroup(groupName)) {
        updateEggGroupStore()
        console.log(`Added egg group: ${groupName}`)
        eggGroupInput = ''
      } else {
        console.warn(`Failed to add egg group: ${groupName}`)
      }
    } else {
      console.warn(`Invalid or duplicate egg group name: ${groupName}`)
    }
  }
</script>

<div class="egg-group constants-container">
  <h2>Egg Groups</h2>
  <div class="list-container">
    {#each $eggGroupStore as group}
      <button type="button" class="list-item">
        {group}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          onclick={(event) => {
            event.stopPropagation()
            removeEggGroup(group)
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
      bind:value={eggGroupInput}
      type="text"
      name="add-egg-group"
      id="add-egg-group"
      placeholder="Add egg group and press Enter..."
      onkeydown={(event) => {
        if (event.key === 'Enter') {
          addEggGroup()
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
