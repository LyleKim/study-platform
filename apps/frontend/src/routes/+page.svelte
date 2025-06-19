<script lang="ts">
  import { client } from "$lib";
  import { onMount } from "svelte";

  let data: number;
  onMount(async () => {
    const res = await client.testRoute.$get();
    data = await res.json();
  });
   
</script>

<div>
  <h1>
    This is a test { data }
  </h1>
</div>

