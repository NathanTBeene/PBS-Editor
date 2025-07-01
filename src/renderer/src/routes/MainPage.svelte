<script lang="ts">
  import { push } from 'svelte-spa-router'
  import Header from '../components/Header.svelte'

  const navigate = (path: string) => {
    push(path)
  }
</script>

<Header title="Pokemon PBS Editor" />

<div class="card-container">
  <div class="card" onclick={() => navigate('/pokemon')}>
    <h2>Pokemon</h2>
    <p>Manage pokemon data.</p>
  </div>
  <div class="card">
    <h2>Pokemon</h2>
    <p>Manage pokemon data.</p>
  </div>
  <div class="card">
    <h2>Pokemon</h2>
    <p>Manage pokemon data.</p>
  </div>
  <div class="card" onclick={() => navigate('/constants')}>
    <h2>Constants</h2>
    <p>Manage the constant data.</p>
    <p>Eg: Egg Groups, Types, etc.</p>
  </div>
</div>

<style>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
  }

  .card {
    background: linear-gradient(135deg, #71717b, #3f3f46);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px 25px;
    border-radius: 12px;
    width: calc(33.333% - 40px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
  }

  .card:hover {
    transform: translateY(-3px);
    filter: brightness(1.2);
    cursor: pointer;
  }
</style>
