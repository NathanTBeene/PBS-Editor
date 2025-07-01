<script lang="ts">
  import GenderRatioConstant from './../components/constants/GenderRatioConstant.svelte'
  import TypeConstant from './../components/constants/TypeConstant.svelte'
</script>

<header>
  <h1>Constants Page</h1>
</header>

<div class="container">
  <TypeConstant />
  <GenderRatioConstant />
</div>

<style>
  .container {
    display: flex;
  }
</style>
