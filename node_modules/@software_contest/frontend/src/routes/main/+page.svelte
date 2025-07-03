<script lang="ts">
    import { client } from "$lib/utils/api";
    import { json } from "@sveltejs/kit";
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';

    let inputLectureId: number = 2; //나중에 없애기

    function newCourseClick() {
        goto('/newCourse');
    }

    function courseClick() {
        goto('/course')
    }

    function lectureClick() { //나중에 없애기 (버튼이랑 같이)
        goto(`/lecture/${inputLectureId}/`)
    }

</script>

<main>
    <a href="/main">
        <h1>모노레포 프로젝트</h1>
    </a>

    <div>
        <button id="new-course-button" onclick="{newCourseClick}">새로운 과목 생성하기</button>
        <button id="course-button" onclick="{courseClick}">기존 과목 보기</button>
        <button id="lecture-button" onclick="{lectureClick}">강의 상세 보기(임시)</button>
    </div>
    
</main>