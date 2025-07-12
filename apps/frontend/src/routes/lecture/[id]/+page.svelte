<script lang="ts">
  // /lecture/+page.svelte파일
  import { client } from "$lib/utils/api";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { getYoutubeId } from "$lib/utils/youtube";
  import { Carta, MarkdownEditor } from "carta-md";
  import "carta-md/default.css";
  import createDOMPurify from "isomorphic-dompurify";
  import "katex/dist/katex.css";
  import { math } from "@cartamd/plugin-math";
  import { goto } from "$app/navigation";
  import ollama from "ollama";

  const inputLectureId = $derived(page.params["id"]);

  let fullUrl: string = $state("");
  let value: string = $state("");
  let corId: number = $state(-1);
  let llmInput: string = $state("");
  let llmOutput: string = $state("");
  let queryInput:boolean = $state(false);

  type Lecture = {
    courseTitle: string;
    lectureTitle: string;
    lectureId: number;
    memo: string;
    url: string;
    isCompleted: boolean;
    courseID: number;
  };
  let lectureStatus: Lecture = $state({
    //초기 필요한 데이터 가져오기
    courseTitle: "",
    lectureTitle: "",
    lectureId: 0,
    memo: "",
    url: "",
    isCompleted: false,
    courseID: -1,
  });

  type LectureUpdate = {
    lectureId: number;
    memo: string;
    isCompleted: boolean;
  };
  let lectureUpdate: LectureUpdate;

  const VIDEO_CONTAINER_ID = "youtube-player";
  let player: InstanceType<Window["YT"]["Player"]>;

  //TODO:html sanitizer import and add Carta plugin
  const DOMPurify = createDOMPurify(window);
  const carta = new Carta({
    sanitizer: (html) => DOMPurify.sanitize(html),
    extensions: [math()],
  });

  //TOTO:get lectureTable values
  async function getCourseInfo() {
    const res = await client.lecture.lectureInfo.$post({
      json: { inputLectureId },
    });
    lectureStatus = await res.json();
    fullUrl = lectureStatus.url;
    value = lectureStatus.memo;
    corId = lectureStatus.courseID;

    lectureUpdate = {
      //학습 완료, 저장 후 update용
      lectureId: lectureStatus.lectureId,
      memo: lectureStatus.memo,
      isCompleted: lectureStatus.isCompleted,
    };
  }

  //TODO:Get youtube API and play
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

  async function updateChanges(Memo: string, status: boolean) {
    lectureUpdate.memo = Memo;
    lectureUpdate.isCompleted = status;
    await client.lecture.lectureMemo.$post({ json: { lectureUpdate } });
    goto(`/course/${corId}/`);
  }

  async function whereToGo() {
    goto(`/course/${corId}/`);
  }

  //Using ollama LLM
  async function handleLLMRequest() {
    queryInput = true;
    const response = await ollama.chat({
      model: "gemma3:1b",
      messages: [{ role: "user", content: llmInput }],
    });
    llmOutput = response.message.content;
  }

  function downloadTxt(): void{
    //마크업 내용을 텍스트로 변화
    const text: string = value;

    const blob:Blob = new Blob([text], {type: "text/plain;charset=utf-8"});

    const url: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = url;
    a.download = "content.txt"
    document.body.appendChild(a);
    a.click();

    setTimeout(() =>{
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },0);
  }
</script>

<svelte:head>
  <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<main>
  <div class="frame">
    <main class="main-content">
      <header class="header">
        <nav class="navigation">
          <button class="buttonstyle" onclick={() => whereToGo()}
            >{lectureStatus.courseTitle} - {lectureStatus.lectureTitle}</button
          >
          <div class="controller">
            <button
              class="buttonstyle"
              onclick={() => updateChanges(value, false)}>저장하기</button
            >
            <button
              class="completion-button"
              onclick={() => updateChanges(value, true)}>학습 완료</button
            >
            <button
              class="completion-button"
              onclick={() =>downloadTxt()}>다운로드</button
            >
          </div>
        </nav>
      </header>

      <section class="content-area">
        <div class="output-section">
          <div class="video-panel">
            <div id={VIDEO_CONTAINER_ID}>
              <!--이 영역은 유튜브가 출력됨니다.-->
            </div>
          </div>

          <div class="llm-panel">
            <div class="llm-output">
              <strong>Gemma3 model:</strong>
              {#if queryInput == true}
                {#if llmOutput}
                    <div class="llm-output-text">{llmOutput}</div>
                {:else}
                    <div class="blinking">잠시만 기다려주세요...</div>
                {/if}
              {/if}
            </div>
            <div class="llm-input-area">
              <input
                class="llm-input"
                type="text"
                placeholder="질문을 입력하세요"
                bind:value={llmInput}
                onkeydown={(e) => {
                  if (e.key === "Enter") handleLLMRequest();
                }}
              />
              <button class="llm-send-button" onclick={handleLLMRequest}
                >질문하기</button
              >
            </div>
          </div>
        </div>

        <div class="memo-panel">
          <MarkdownEditor bind:value {carta} />
        </div>
      </section>
    </main>
  </div>
</main>

<style>
  :global(.carta-font-code) {
    font-family: "Fira Mono", monospace;
    font-size: 1.1rem;
    line-height: 1.1rem;
    letter-spacing: normal;
  }

  .frame {
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  .main-content {
    background-color: white;
    width: 100%;
    max-width: 1440px;
    position: relative;
  }

  .header {
    height: 40px;
    width: 100%;
    position: relative;
    background-color: white;
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 34px;
  }

  .buttonstyle {
    font-size: 20px;
    line-height: 24px;
    font-family: "Hiragino Sans GB-W6", Helvetica, sans-serif;
    color: #000000;
    text-align: center;
    background-color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  .controller {
    display: flex;
    margin-left: auto;
  }

  .buttonstyle:hover {
    background-color: #f0f0f0;
  }

  .content-area {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 0;
  }

  .video-panel {
    width: 640px;
    margin-top: 0px;
  }

  .memo-panel {
    width: 736px;
    height: 761px;
  }

  .completion-button {
    font-size: 20px;
    line-height: 24px;
    font-family: "Hiragino Sans GB-W6", Helvetica, sans-serif;
    color: #000000;
    text-align: center;
    background-color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  .completion-button:hover {
    background-color: #f0f0f0;
  }

  .output-section {
    display: flex;
    flex-direction: column;
  }

  .llm-panel {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .llm-output {
    background: #f3f3f3;
    border-radius: 8px;
    padding: 12px;
    min-height: 40px;
    font-size: 1.1rem;
    max-height: 300px;
    overflow-y: auto;
    width: 615px;
  }

  .blinking{
    animation: blink 1.2s linear infinite;
  }
  @keyframes blink {
    0%   { opacity: 1; }
    50%  { opacity: 0.2; }
    100% { opacity: 1; }
  }

  .llm-output-text {
    margin-top: 6px;
    white-space: pre-wrap;
  }

  .llm-input-area {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .llm-input {
    flex: 1;
    padding: 8px 12px;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .llm-send-button {
    font-size: 20px;
    line-height: 24px;
    font-family: "Hiragino Sans GB-W6", Helvetica, sans-serif;
    color: #000000;
    text-align: center;
    background-color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  .llm-send-button:hover {
    background-color: #f0f0f0;
  }
</style>
