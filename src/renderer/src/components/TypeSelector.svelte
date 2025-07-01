<script lang="ts">
  import TypeButton from './TypeButton.svelte'
  import { typeManager } from '../lib/data/globals'
  import type { PokemonType } from '../lib/data/managers/TypeManager'

  let {
    selectedType = $bindable(),
    placeholder = 'Select a type...',
    allowClear = true,
    disabled = false
  }: {
    selectedType?: PokemonType | null
    placeholder?: string
    allowClear?: boolean
    disabled?: boolean
  } = $props()

  let isOpen = $state(false)
  let searchTerm = $state('')
  let comboboxRef: HTMLDivElement
  let inputRef: HTMLInputElement
  // Get all types from the enum with a blank option
  const allTypes = typeManager.getTypeList()

  // Filter types based on search term
  const filteredTypes = $derived(
    allTypes.filter((type) => type.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  function selectType(type: string) {
    selectedType = type as PokemonType
    searchTerm = ''
    isOpen = false
    inputRef?.blur()
  }

  function clearSelection() {
    selectedType = null
    searchTerm = ''
    isOpen = false
    inputRef?.focus()
  }

  function handleInputFocus() {
    if (!disabled) {
      isOpen = true
    }
  }

  function handleInputBlur(event: FocusEvent) {
    // Delay closing to allow for option clicks
    setTimeout(() => {
      if (!comboboxRef?.contains(event.relatedTarget as Node)) {
        isOpen = false
        searchTerm = ''
      }
    }, 100)
  }

  function handleKeydown(event: KeyboardEvent) {
    if (disabled) return

    switch (event.key) {
      case 'Escape':
        isOpen = false
        searchTerm = ''
        inputRef?.blur()
        break
      case 'ArrowDown':
        event.preventDefault()
        if (!isOpen) {
          isOpen = true
        }
        break
      case 'Enter':
        event.preventDefault()
        if (filteredTypes.length === 1) {
          selectType(filteredTypes[0])
        }
        break
    }
  }

  // Close dropdown when clicking outside
  function handleClickOutside(event: MouseEvent) {
    if (!comboboxRef?.contains(event.target as Node)) {
      isOpen = false
      searchTerm = ''
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="type-selector" bind:this={comboboxRef}>
  <div class="input-container" class:open={isOpen} class:disabled>
    <input
      bind:this={inputRef}
      bind:value={searchTerm}
      onfocus={handleInputFocus}
      onblur={handleInputBlur}
      onkeydown={handleKeydown}
      {placeholder}
      {disabled}
      class="type-input"
      autocomplete="off"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="type-dropdown-listbox"
    />
    {#if selectedType && !searchTerm}
      <div class="selected-type">
        {#if !selectedType}
          <div class="blank-option">No Type</div>
        {:else}
          <TypeButton type={selectedType} />
        {/if}
      </div>
    {/if}

    <div class="input-actions">
      {#if selectedType && allowClear && !disabled}
        <button
          type="button"
          class="clear-button"
          onclick={clearSelection}
          aria-label="Clear selection"
        >
          ×
        </button>
      {/if}
      <button
        type="button"
        class="dropdown-arrow"
        class:rotated={isOpen}
        onclick={() => (isOpen = !isOpen)}
        aria-label="Toggle dropdown"
        {disabled}
      >
        ▼
      </button>
    </div>
  </div>
  {#if isOpen}
    <div class="dropdown" role="listbox" id="type-dropdown-listbox">
      {#if filteredTypes.length === 0}
        <div class="no-options">No types found</div>
      {:else}
        {#each filteredTypes as type (type)}
          <button
            type="button"
            class="option"
            class:selected={selectedType === type}
            onclick={() => selectType(type)}
            role="option"
            aria-selected={selectedType === type}
          >
            {#if type === ''}
              <div class="blank-option">No Type</div>
            {:else}
              <TypeButton type={type as PokemonType} />
            {/if}
          </button>
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style>
  .type-selector {
    position: relative;
    width: 100%;
    max-width: 160px;
  }
  .input-container {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 4px 0;
    transition: border-color 0.2s ease;
  }

  .input-container:hover {
    border-color: #999;
  }
  .input-container.open {
    border-color: #007acc;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .input-container.disabled {
    background: #f5f5f5;
    border-color: #ddd;
    cursor: not-allowed;
  }

  .type-input {
    flex: 1;
    padding: 12px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    min-width: 0;
  }

  .type-input:disabled {
    cursor: not-allowed;
    color: #999;
  }

  .selected-type {
    position: absolute;
    top: 15%;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 1;
    border: none;
  }

  .selected-type + .type-input {
    padding-left: 110px;
    color: transparent;
    caret-color: transparent;
  }

  .input-actions {
    display: flex;
    align-items: center;
    padding-right: 8px;
    gap: 4px;
  }

  .clear-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    color: #666;
    cursor: pointer;
    border-radius: 50%;
    font-size: 16px;
    line-height: 1;
    transition: background-color 0.2s ease;
  }

  .clear-button:hover {
    background: #f0f0f0;
    color: #333;
  }
  .dropdown-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    color: #666;
    cursor: pointer;
    font-size: 12px;
    transition: transform 0.2s ease;
  }

  .dropdown-arrow:disabled {
    cursor: not-allowed;
    color: #999;
  }

  .dropdown-arrow.rotated {
    transform: rotate(180deg);
  }
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    border: 1px solid #007acc;
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .option {
    display: block;
    width: 100%;
    padding: 8px 12px;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .option:hover {
    background: #f0f8ff;
  }

  .option.selected {
    background: #e6f3ff;
  }

  .option:focus {
    outline: none;
    background: #f0f8ff;
  }

  .no-options {
    padding: 12px;
    color: #666;
    text-align: center;
    font-style: italic;
  }

  /* Scrollbar styling for webkit browsers */
  .dropdown::-webkit-scrollbar {
    width: 6px;
  }

  .dropdown::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .dropdown::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  .dropdown::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }

  .blank-option {
    padding: 4px 12px;
    width: 90px;
    border: 1px solid #ccc;
    border-radius: 20px;
    text-align: center;
    color: #666;
    background: transparent;
    font-style: italic;
  }
</style>
