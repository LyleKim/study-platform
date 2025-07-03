<script lang="ts">
    import { client } from "$lib/utils/api";
    import { json } from "@sveltejs/kit";
    import { onMount } from "svelte";
    import { page } from '$app/state';

    const res = $derived(page.params['id']);

    let inputCourseId: number = Number(res);

</script>

<main>
    <a href="/main">
        <h1>모노레포 프로젝트</h1>
    </a>

    <h2>각 과목 상세 페이지('/newCourse'에서 과목 생성 누르면 이쪽으로)</h2>
    <p>courseId: {inputCourseId}</p>
</main>