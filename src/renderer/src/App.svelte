<script lang="ts">
  import { PokemonParser } from './lib/services/PokemonParser'
  async function importFile() {
    try {
      const result = await window.api.openFile()

      if (result.success) {
        const content = result.content || ''
        const pokemonData = PokemonParser.parse(content)
        console.log('Pokemon data imported')
        console.log('First Pokemon:', pokemonData[3])
        // You can now use pokemonData in your application
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
</main>
