<script lang="ts">
  import { selectedPokemon } from '../lib/data/globals'
  import TypeSelector from './TypeSelector.svelte'
</script>

<h2>Selected Pokemon: {$selectedPokemon.id}</h2>
<div class="basic-info container">
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
    <input type="text" name="formName" id="formName" bind:value={$selectedPokemon.formName} />
  </div>
  <!-- Types -->
  <div class="section types">
    <TypeSelector bind:selectedType={$selectedPokemon.types[0]} />
    <TypeSelector bind:selectedType={$selectedPokemon.types[1]} />
  </div>
  <!-- Base Stats -->
  <div class="section base-stats">
    <div class="base-stat">
      <strong>HP</strong>
      <input type="number" name="hp" bind:value={$selectedPokemon.baseStats.hp} />
    </div>
    <div class="base-stat">
      <strong>Attack</strong>
      <input type="number" name="attack" bind:value={$selectedPokemon.baseStats.atk} />
    </div>
    <div class="base-stat">
      <strong>Defense</strong>
      <input type="number" name="defense" bind:value={$selectedPokemon.baseStats.def} />
    </div>
    <div class="base-stat">
      <strong>Spe. Attack</strong>
      <input type="number" name="special-attack" bind:value={$selectedPokemon.baseStats.spa} />
    </div>
    <div class="base-stat">
      <strong>Spe. Defense</strong>
      <input type="number" name="special-defense" bind:value={$selectedPokemon.baseStats.spd} />
    </div>
    <div class="base-stat">
      <strong>Speed</strong>
      <input type="number" name="speed" bind:value={$selectedPokemon.baseStats.spe} />
    </div>
  </div>
</div>

<style>
  .container {
    padding: 1rem;
    background: none;
    border: 2px solid #ccc;
    border-radius: 8px;
  }

  .container h2 {
    margin-bottom: 0.8rem;
    font-size: 1.6rem;
    color: #dddddd;
    border-bottom: 1px solid #ccc;
  }
</style>
