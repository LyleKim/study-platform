<script lang="ts">
  import { client } from "$lib/utils/api";
  import { json } from "@sveltejs/kit";
  import { onMount } from "svelte";

  let data: number;
  let data1: string;
  let input: number = 718;

  onMount(async () => {
    const res = await client.testRoute.$get();
    data = await res.json();
  
    const res1 = await client.postTest.$post({json:{ input }});
    data1 = await res1.json();
  });

   
</script>

<div class=main-warraper>
  <div id=header1>
    <h1>
      This is a test { data }
    </h1>
  </div>

  <div>
    {data1}
  </div>
  
</div>


