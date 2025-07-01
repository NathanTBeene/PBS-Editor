<script lang="ts">
  import IoMdArrowRoundBack from 'svelte-icons/io/IoMdArrowRoundBack.svelte'

  const { title = 'Title', back = false } = $props()
</script>

<header>
  <div class="header-container">
    {#if back}
      <button class="back-button" onclick={() => history.back()}>
        <IoMdArrowRoundBack size="8" />
      </button>
    {/if}
  </div>
  <h1 class="header-title">{title}</h1>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .back-button {
    height: 40px;
    width: 40px;
    background: none;
    border: none;
    cursor: pointer;
    color: white;

    transition: all 0.3s ease;
  }

  .back-button:hover {
    color: red;
  }
</style>
