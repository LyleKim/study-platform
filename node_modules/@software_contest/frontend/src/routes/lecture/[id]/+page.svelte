<script lang="ts">
    import { client } from "$lib/utils/api";
    import { json } from "@sveltejs/kit";
    import { onMount } from "svelte";
    import { page } from '$app/state';

    const res = $derived(page.params['id']);
    // svelte-ignore state_referenced_locally
        console.dir(typeof(res));

    let inputLectureId: number = Number(res);
    
    let videoId = $state<string | null>(null);
    let lectureId = $state<number | null>(null);
    let courseTitle = $state<string | null>(null);
    let lectureTitle = $state<string | null>(null);
    let memo = $state<string>("");


    //url에서 영상id 추출
    function extractId(url: string | null) {
        const regExp = /(?:youtu\.be\/|youtube\.com\/)([^#&?]{11})/;
        if(url !== null) { 
            const match = url.match(regExp); 
            return (match && match[1]) ? match[1] : null;
        }
    }

    //강의 데이터 불러오기 (영상, 메모)
    onMount(async () => {
        const res = await client.lectureInfo.$post({json:{ inputLectureId }});
        const data = await res.json();
        console.log(data);
        lectureTitle = data[0].lectureTitle;
        courseTitle = data[0].courseTitle;
        lectureId = data[0].lectureId;
        videoId = extractId(data[0].url) ?? null;
        if(data[0].memo !== null) memo = data[0].memo;
    });

    
    //메모 저장
    async function saveMemo(){
        const tmp = document.querySelector<HTMLElement>("#memo-pad-content");
        memo = tmp?.innerText ?? "";
        if(lectureId !== null) {
            const res = await client.lectureMemo.$post({json:{ lectureId, memo }});
            console.log(await res.json());
        }
        if(tmp !== null) tmp.innerText = memo
    }

</script>


<main>
    <a href="/main">
        <h1>모노레포 프로젝트</h1>
    </a>

    <h2>강의 상세 페이지</h2>

    <h3>
        과목 이름: {courseTitle}
        <br>
        강의 제목: {lectureTitle}
    </h3>

    <iframe width="560" height="315" src="https://www.youtube.com/embed/{videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>    
    <br><br>
    <div id="memo-pad">

        <div id="memo-pad-header">
            <button id="save-memo-button" onclick={saveMemo}>메모 저장</button>
        </div>

        <div id="memo-pad-content" contenteditable="true">
            {@html memo.replace(/\n/g, '<br>')}
        </div>

    </div>

</main>

<style>

        #memo-pad-header {
        background-color: rgb(214, 176, 105);
        border: none;
        outline: none;
        width: 560px; 
        height: 40px;
        align-self: center;
    }

    #memo-pad-content {
        background-color: rgb(177, 145, 86);
        border: none;
        outline: none;
        width: 560px; 
        height: 495px;
        align-self: center;
        max-height: 315px;
        overflow: auto;
    }

    #save-memo-button {
        margin: 8px;
    }

</style>