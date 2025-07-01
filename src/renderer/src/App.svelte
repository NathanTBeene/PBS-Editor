<script lang="ts">
  import Router from 'svelte-spa-router'
  import MainPage from './routes/MainPage.svelte'
  import PokemonPage from './routes/PokemonPage.svelte'
  import ConstantsPage from './routes/ConstantsPage.svelte'

  const routes = {
    '/': MainPage,
    '/pokemon': PokemonPage,
    '/constants': ConstantsPage
  }
</script>

<Router {routes} />
