<script lang="ts">
  import Router from 'svelte-spa-router'
  import PokemonPage from './routes/PokemonPage.svelte'
  import ConstantsPage from './routes/ConstantsPage.svelte'

  const routes = {
    '/': ConstantsPage
    // Add more routes here as needed
  }
</script>

<Router {routes} />
