<script lang="ts">
  import Router from 'svelte-spa-router'
  import PokemonPage from './routes/PokemonPage.svelte'

  const routes = {
    '/': PokemonPage
    // Add more routes here as needed
  }
</script>

<Router {routes} />
