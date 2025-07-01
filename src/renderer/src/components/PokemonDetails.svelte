<script lang="ts">
  import { genderRatioManager, growthRateManager } from '../lib/data/globals'
  import { selectedPokemon } from '../lib/data/globals'
  import TypeSelector from './TypeSelector.svelte'

  const updateId = (event) => {
    // Get the name from the input event
    const name = event.target.value
    // Make id uppercase and replace spaces with underscores
    const id = name.toUpperCase().replace(/\s+/g, '')
    // Update the selectedPokemon id
    $selectedPokemon.id = id
  }
</script>

<h2>Selected Pokemon: {$selectedPokemon.id}</h2>
<div class="container">
  <h2>Basic Information</h2>
  <div class="basic-info">
    <section class="name-form-type">
      <!-- Name -->
      <div class="name">
        <strong>Name:</strong>
        <input
          type="text"
          name="name"
          id="name"
          bind:value={$selectedPokemon.name}
          oninput={updateId}
        />
      </div>
      <!-- FormName -->
      <div class="form-name">
        <strong>Form Name:</strong>
        <input type="text" name="formName" id="formName" bind:value={$selectedPokemon.formName} />
      </div>
      <!-- Types -->
      <div class="types">
        <TypeSelector bind:selectedType={$selectedPokemon.types[0]} />
        <TypeSelector bind:selectedType={$selectedPokemon.types[1]} />
      </div>
    </section>
    <!-- Base Stats -->
    <section class="base-stats">
      <div class="stat-list">
        <div class="stat">
          <strong>HP</strong>
          <input
            min="0"
            max="255"
            type="number"
            name="hp"
            bind:value={$selectedPokemon.baseStats.hp}
          />
        </div>
        <div class="stat">
          <strong>Attack</strong>
          <input
            min="0"
            max="255"
            type="number"
            name="attack"
            bind:value={$selectedPokemon.baseStats.atk}
          />
        </div>
        <div class="stat">
          <strong>Defense</strong>
          <input
            min="0"
            max="255"
            type="number"
            name="defense"
            bind:value={$selectedPokemon.baseStats.def}
          />
        </div>
        <div class="stat">
          <strong>Spe. Attack</strong>
          <input
            min="0"
            max="255"
            type="number"
            name="special-attack"
            bind:value={$selectedPokemon.baseStats.spa}
          />
        </div>
        <div class="stat">
          <strong>Spe. Defense</strong>
          <input
            min="0"
            max="255"
            type="number"
            name="special-defense"
            bind:value={$selectedPokemon.baseStats.spd}
          />
        </div>
        <div class="stat">
          <strong>Speed</strong>
          <input
            min="0"
            max="255"
            type="number"
            name="speed"
            bind:value={$selectedPokemon.baseStats.spe}
          />
        </div>
      </div>
    </section>
  </div>
</div>
<div class="container training">
  <h2>Training</h2>
  <!-- Gender Ratio -->
  <div class="section gender-ratio">
    <strong>Gender Ratio:</strong>
    <select bind:value={$selectedPokemon.genderRatio as string}>
      {#each genderRatioManager.getRatios() as ratio}
        <option value={ratio}>{ratio}</option>
      {/each}
    </select>
  </div>
  <!-- Growth Rate -->
  <div class="section growth-rate">
    <strong>Growth Rate:</strong>
    <select bind:value={$selectedPokemon.growthRate as string}>
      {#each growthRateManager.getRates() as rate}
        <option value={rate}>{rate}</option>
      {/each}
    </select>
  </div>
  <!-- Base Experience -->
  <div class="section base-exp">
    <strong>Base Experience:</strong>
    <input type="number" name="base-exp" bind:value={$selectedPokemon.baseExp} min="0" max="255" />
  </div>
  <!-- Evs -->
  <div class="section ev-stats">
    <div class="stat-list">
      <div class="stat">
        <strong>HP</strong>
        <input min="0" max="255" type="number" name="evhp" bind:value={$selectedPokemon.evs.hp} />
      </div>
      <div class="stat">
        <strong>Attack</strong>
        <input
          min="0"
          max="255"
          type="number"
          name="evattack"
          bind:value={$selectedPokemon.evs.atk}
        />
      </div>
      <div class="stat">
        <strong>Defense</strong>
        <input
          min="0"
          max="255"
          type="number"
          name="evdefense"
          bind:value={$selectedPokemon.evs.def}
        />
      </div>
      <div class="stat">
        <strong>Spe. Attack</strong>
        <input
          min="0"
          max="255"
          type="number"
          name="evspecial-attack"
          bind:value={$selectedPokemon.evs.spa}
        />
      </div>
      <div class="stat">
        <strong>Spe. Defense</strong>
        <input
          min="0"
          max="255"
          type="number"
          name="evspecial-defense"
          bind:value={$selectedPokemon.evs.spd}
        />
      </div>
      <div class="stat">
        <strong>Speed</strong>
        <input
          min="0"
          max="255"
          type="number"
          name="evspeed"
          bind:value={$selectedPokemon.evs.spe}
        />
      </div>
    </div>
  </div>
  <!-- Catch Rate -->
  <div class="section catch-rate">
    <strong>Catch Rate:</strong>
    <input
      type="number"
      name="catch-rate"
      bind:value={$selectedPokemon.catchRate}
      min="0"
      max="255"
    />
  </div>
  <!-- Happiness -->
  <div class="section happiness">
    <strong>Base Happiness:</strong>
    <input
      type="number"
      name="happiness"
      bind:value={$selectedPokemon.happiness}
      min="0"
      max="255"
    />
  </div>
</div>

<div class="container abilities">
  <h2>Abilities</h2>
</div>

<style>
  input {
    background: none;
    color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
  }

  input:focus {
    outline: none;
    border-color: #6385b6;
  }

  input[type='number'] {
    width: 50px;
    text-align: center;
  }

  /* Removing spinboxes for number fields */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .container {
    margin: 1rem auto;
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

  .basic-info {
    display: flex;
  }
</style>
