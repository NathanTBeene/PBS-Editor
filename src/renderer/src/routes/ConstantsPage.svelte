<script lang="ts">
  import ColorConstant from '../components/constants/ColorConstant.svelte'
  import GrowthRateConstant from '../components/constants/GrowthRateConstant.svelte'
  import HabitatConstant from '../components/constants/HabitatConstant.svelte'
  import ShapeConstant from '../components/constants/ShapeConstant.svelte'
  import Header from '../components/Header.svelte'
  import EggGroupConstant from '../components/constants/EggGroupConstant.svelte'
  import GenderRatioConstant from '../components/constants/GenderRatioConstant.svelte'
  import TypeConstant from '../components/constants/TypeConstant.svelte'
</script>

<Header title="Constants" back={true} />

<div class="container">
  <TypeConstant />
  <GenderRatioConstant />
  <EggGroupConstant />
  <GrowthRateConstant />
  <HabitatConstant />
  <ColorConstant />
  <ShapeConstant />
</div>

<style>
  .container {
    margin: 0 auto;
    max-width: calc(100vw - 3rem);
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    overflow-y: auto;
    max-height: 90vh;
    scrollbar-width: none;
    -ms-overflow-style: none; /* IE and Edge */
  }
</style>
