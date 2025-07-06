<script lang="ts">
    import { client } from "$lib/utils/api";
    import { goto } from '$app/navigation';
    
    let course: { title: string, goalDate: string} = {
        title: "",
        goalDate:  new Date().toISOString().split('T')[0]
    }

    let courseInfo: { title: string; goalDate: string } = {
        title: "",
        goalDate: ""
    }

    let inputCourseId: number;

    //(과목을 추가합니다 누르면) DB에 저장하고 courseId불러와서 각 과목 상세 페이지(TDL 뜨는곳) 이동
    async function courseAddClick() {
        courseInfo = { title: course.title, goalDate: course.goalDate };
        const res = await client.createCourse.$post({json:{ courseInfo }}); //courseId반환
        let data = await res.json();
        inputCourseId = data[0].courseId;
        goto(`/course/${inputCourseId}/`); // '/couser/[id]/+page.svelte'로 이동(dummyPage)
    }

</script>

<main>
    <a href="/main">
        <h1>모노레포 프로젝트</h1>
    </a>

    <h2>새로운 과목 생성하기</h2>

    <label>
        과목 이름:
        <input type="string" bind:value={course.title} />
    </label>

    <label>
        목표 날짜:
        <input type="date" bind:value={course.goalDate} />
    </label>

    <div>
        <button id="course-add-button" style="margin: 10px" onclick="{courseAddClick}">과목을 추가합니다</button>
    </div>
</main>