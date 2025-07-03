<script lang="ts">
  // /lecture/+page.svelte파일
  import { client } from "$lib/utils/api";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { getYoutubeId } from "$lib/utils/youtube";

  let fullUrl: string = $state("");
  let lectureId: number = $state(-1);
  let courseTitle: string = $state("");
  let lectureTitle: string = $state("");
  let memo: string = $state("");

  const VIDEO_CONTAINER_ID = "youtube-player";
  let player: InstanceType<Window["YT"]["Player"]>;

  const inputLectureId = $derived(page.params["id"]);

  //url에서 영상id 추출
  function extractId(url: string | null) {
    const regExp = /(?:youtu\.be\/|youtube\.com\/)([^#&?]{11})/;
    if (url !== null) {
      const match = url.match(regExp);
      return match && match[1] ? match[1] : null;
    }
  }

  //강의 데이터 불러오기 (영상, 메모)
  async function getCourseInfo(){
    const res = await client.lectureInfo.$post({ json: { inputLectureId } });
    const result = await res.json();

    lectureTitle = result.lectureTitle;
    courseTitle = result.courseTitle;
    lectureId = result.lectureId;
    fullUrl = result.url;
    console.log(getYoutubeId(fullUrl));
  };

  //유튜브 영상 가져오기
  onMount(async () => {
    await getCourseInfo();

    function load() {
      if (fullUrl) {
        player = new window.YT.Player(VIDEO_CONTAINER_ID, {
          videoId: getYoutubeId(fullUrl),
          playerVars: { autoplay: 0 },
        });
      }
    }

      if (window.YT) {
        load();
      } else {
        window.onYouTubeIframeAPIReady = load;
      }
  });

  //메모 저장
  async function saveMemo() {
    const tmp = document.querySelector<HTMLElement>("#memo-pad-content");
    memo = tmp?.innerText ?? "";
    if (lectureId !== null) {
      const res = await client.lectureMemo.$post({ json: { lectureId, memo } });
    }
    if (tmp !== null) tmp.innerText = memo;
  }
</script>

<svelte:head>
  <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<main>
  <nav>
    <a href="/">home</a>
    <a href="/lecture">lecture</a>
  </nav>

  <h1>과목 이름: {courseTitle}</h1>
  <h2>강의 제목: {lectureTitle}</h2>

  <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/{videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>     -->

  <div id={VIDEO_CONTAINER_ID}>
    <!--이 영역은 유튜브가 출력됨니다.-->
  </div>

  <br /><br />
  <div id="memo-pad">
    <div id="memo-pad-header">
      <button id="save-memo-button" onclick={saveMemo}>메모 저장</button>
    </div>

    <div id="memo-pad-content" contenteditable="true">
      {@html memo.replace(/\n/g, "<br>")}
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
