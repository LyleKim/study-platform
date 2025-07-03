<script lang="ts">
    import { client } from "$lib/utils/api";
    import { json } from "@sveltejs/kit";
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
</script>

<main>
    <a href="/main">
        <h1>모노레포 프로젝트</h1>
    </a>

    <h2>기존 과목 보기 페이지(여기서 생성누르면 '/newCourse'로 이동)</h2>

</main>