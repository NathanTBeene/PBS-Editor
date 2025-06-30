<script lang="ts">
  import { PokemonParser, type PokemonData } from '../lib/services/PokemonParser'
  import { pokemonData, selectedPokemon } from '../lib/data/globals'
  import TypeSelector from './../components/TypeSelector.svelte'

  let pokemonList: PokemonData[] = $pokemonData

  function selectPokemon(pokemon: PokemonData) {
    selectedPokemon.set(pokemon)
    console.log('Selected Pokemon:', pokemon)
  }

  async function importPokemonPBS() {
    try {
      const result = await window.api.openFile()

      if (result.success) {
        const content = result.content || ''
        const data = PokemonParser.parse(content)
        pokemonData.set(data)
        pokemonList = data
        console.log('Pokemon data imported')
        console.log('First Pokemon:', data[3])
      } else {
        console.error('Failed to open file:', result.error)
      }
    } catch (error) {
      console.error('Error opening file:', error)
    }
  }

  const createPokemon = (id: string) => {
    const emptyPokemon = PokemonParser.createEmptyPokemonData(id)
    if (emptyPokemon) {
      pokemonData.update((data) => [...data, emptyPokemon])
      selectPokemon(emptyPokemon)
    } else {
      console.error('Failed to create empty Pokemon data')
    }
  }
</script>

<header>
  <h1>Pokemon Editing Page</h1>
  <button on:click={importPokemonPBS}>Import Pokemon File</button>
</header>

<div class="page-container">
  <div class="pokemon-list-container">
    <div class="list-header">
      <h2>Pokemon ({pokemonList.length})</h2>
      <button class="add-pokemon-button">+</button>
    </div>
    <div class="pokemon-list-search">
      <input
        type="text"
        placeholder="Search Pokemon..."
        on:input={(e) => {
          const searchTerm = (e.target as HTMLInputElement).value.toLowerCase()
          pokemonList = $pokemonData.filter((pokemon) =>
            pokemon.id.toString().toLowerCase().includes(searchTerm)
          )
        }}
      />
    </div>
    <div class="pokemon-list">
      {#each pokemonList as pokemon (pokemon.id)}
        <div
          class="pokemon-item"
          role="button"
          tabindex="0"
          on:click={() => selectPokemon(pokemon)}
          on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              selectPokemon(pokemon)
              e.preventDefault()
            }
          }}
          class:selected={$selectedPokemon?.id === pokemon.id}
        >
          {pokemon.id}
        </div>
      {/each}
    </div>
  </div>
  <div class="pokemon-details-container">
    {#if $selectedPokemon}
      <h2>Selected Pokemon: {$selectedPokemon.id}</h2>
      <div class="basic-info-contianer">
        <h2>Basic Information</h2>
        <!-- ID -->
        <div class="section id">
          <strong>ID:</strong>
          <input type="text" name="id" id="id" bind:value={$selectedPokemon.id} />
        </div>
        <!-- Name -->
        <div class="section name">
          <strong>Name:</strong>
          <input type="text" name="name" id="name" bind:value={$selectedPokemon.name} />
        </div>
        <!-- FormName -->
        <div class="section form-name">
          <strong>Form Name:</strong>
          <input type="text" name="formName" id="formName" />
        </div>
      </div>
    {:else}
      <p>Select a Pokemon to see details</p>
    {/if}
  </div>
</div>

<!-- Add Pokemon Modal -->

<style>
  .page-container {
    flex: 1;
    display: flex;
    padding: 10px;
  }

  .pokemon-list-container {
    width: 300px;
    border-radius: 10px;
    border: 1px solid #90a1b9;
    padding: 10px;
  }

  .pokemon-list-container h2 {
    margin: 0;
    font-size: 1.6em;
    color: #f1f5f9;
    text-align: center;
  }

  .pokemon-details-container {
    flex: 1;
    padding: 10px;
  }

  .pokemon-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-radius: 5px;
    max-height: calc(100vh - 260px);
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer and Edge */
  }

  .pokemon-list-search {
    margin: 10px 0px;
  }

  .pokemon-list-search input {
    width: 100%;
    padding: 8px;
    border: 1px solid #90a1b9;
    background: none;
    border-radius: 4px;
    color: #f1f5f9;
    font-size: 1em;
  }

  .pokemon-list-search input:focus {
    outline: none;
    border-color: #0f172b;
    box-shadow: 0 0 0 2px rgba(46, 69, 97, 0.5);
  }

  .pokemon-item {
    border: 1px solid #90a1b9;
    border-radius: 8px;
    padding: 12px 16px;
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    color: #f1f5f9;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
  }

  .pokemon-item:hover {
    background: linear-gradient(135deg, #334155 0%, #475569 100%);
    border-color: #64748b;
    transform: translateY(1px);
  }

  .pokemon-item:active {
    transform: translateY(0);
  }
</style>
