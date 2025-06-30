<script lang="ts">
  import { PokemonParser, type PokemonData } from '../lib/services/PokemonParser'

  let pokemonData: PokemonData[] = []
  let selectedPokemon: PokemonData | null = null

  function selectPokemon(pokemon: PokemonData) {
    selectedPokemon = pokemon
    console.log('Selected Pokemon:', pokemon)
  }

  async function importFile() {
    try {
      const result = await window.api.openFile()

      if (result.success) {
        const content = result.content || ''
        pokemonData = PokemonParser.parse(content)
        console.log('Pokemon data imported')
        console.log('First Pokemon:', pokemonData[3])
      } else {
        console.error('Failed to open file:', result.error)
      }
    } catch (error) {
      console.error('Error opening file:', error)
    }
  }
</script>

<main>
  <h1>PBS-Editor</h1>
  <button onclick={importFile}>Import PBS File</button>
  <aside>
    <div>
      <h2>Pokemon ({pokemonData.length})</h2>
      {#if pokemonData.length > 0}
        <div class="pokemon-list">
          {#each pokemonData as pokemon}
            <div
              class="pokemon-item"
              class:selected={selectedPokemon === pokemon}
              onclick={() => selectPokemon(pokemon)}
              role="button"
              tabindex="0"
              onkeydown={(e) => e.key === 'Enter' && selectPokemon(pokemon)}
            >
              {pokemon.name}
            </div>
          {/each}
        </div>
      {:else}
        <p>No Pokemon data available.</p>
      {/if}
    </div>
  </aside>
</main>

<style>
  .pokemon-list {
    width: 300px;
    max-height: 700px;
    overflow-y: auto;
    border-radius: 8px;
    background-color: #0f172b;
  }

  .pokemon-item {
    padding: 8px 12px;
    cursor: pointer;
    user-select: none;
  }

  .pokemon-item:last-child {
    border-bottom: none;
  }

  .pokemon-item:hover {
    background-color: #e6f3ff;
  }

  .pokemon-item.selected {
    background-color: #007acc;
    color: white;
  }

  .pokemon-item:focus {
    outline: 2px solid #007acc;
    outline-offset: -2px;
  }
</style>
