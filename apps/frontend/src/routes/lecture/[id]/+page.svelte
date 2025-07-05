<script lang="ts">
  // /lecture/+page.svelte파일
  import { client } from "$lib/utils/api";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { getYoutubeId } from "$lib/utils/youtube";
  import { Carta, MarkdownEditor } from "carta-md";
  import 'carta-md/default.css';
  import createDOMPurify from 'isomorphic-dompurify'
  import 'katex/dist/katex.css';
  import { math } from "@cartamd/plugin-math";
  import { goto } from "$app/navigation";

  const inputLectureId = $derived(page.params["id"]);

  let fullUrl: string = $state("");
  let value:string = $state("");

type Lecture = {
    courseTitle: string;
    lectureTitle: string;
    lectureId: number;
    memo: string;
    url: string;
    isCompleted: boolean;
};
let lectureStatus: Lecture = $state({  //초기 필요한 데이터 가져오기
    courseTitle: "",
    lectureTitle: "",
    lectureId: 0,
    memo: "",
    url: "",
    isCompleted: false
});

type LectureUpdate = {
    lectureId: number;
    memo: string;
    isCompleted: boolean;
};
let lectureUpdate:LectureUpdate;

    
  const VIDEO_CONTAINER_ID = "youtube-player";
  let player: InstanceType<Window["YT"]["Player"]>;

  //TODO:html sanitizer import and add Carta plugin
  const DOMPurify = createDOMPurify(window);
  const carta = new Carta({
    sanitizer:(html) => DOMPurify.sanitize(html),
    extensions: [math()]
  });

  //TOTO:get lectureTable values
  async function getCourseInfo(){
    const res = await client.lecture.lectureInfo.$post({json:{ inputLectureId }});
    lectureStatus = await res.json();
    fullUrl = lectureStatus.url;
    value = lectureStatus.memo

    lectureUpdate = { //학습 완료, 저장 후 update용
        lectureId: lectureStatus.lectureId,
        memo: lectureStatus.memo,
        isCompleted: lectureStatus.isCompleted
    };

    console.log(getYoutubeId(fullUrl)); //console.log
  };


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


async function updateChanges(Memo:string, status:boolean){
    lectureUpdate.memo = Memo;
    lectureUpdate.isCompleted = status;
    await client.lecture.lectureMemo.$post({json : { lectureUpdate }});
    goto('/');
}

async function whereToGo() {
    goto('/');
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
                    <button class="buttonstyle" onclick={() => whereToGo()}>{lectureStatus.courseTitle} - {lectureStatus.lectureTitle}</button>
                    <button class="buttonstyle" onclick={() => updateChanges(value, false)}>저장하기</button>
                </nav>
            </header>
            
            <section class="content-area">
                <div class="video-panel">
                    <div id={VIDEO_CONTAINER_ID}>
                        <!--이 영역은 유튜브가 출력됨니다.-->
                    </div>
                </div>

                <div class="memo-panel">
                    <MarkdownEditor bind:value {carta} />
                </div>
            </section>
            
            <footer class="footer">
                <div class="completion-part">
                    <button class="completion-button" onclick={() => updateChanges(value, true)}>학습 완료</button>
                </div>
            </footer>
        </main>
    </div>
</main>

<style>
:global(.carta-font-code) {
    font-family: 'Fira Mono', monospace;
    font-size: 1.1rem;
    line-height: 1.1rem;
    letter-spacing: normal;
} 

.frame {
    background-color:white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
}

.main-content{
    background-color: white;
    width: 100%;
    max-width: 1440px;
    min-height: 1024px;
    position:relative
}

.header{
    height: 60px;
    width: 100%;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    background-color: #d9d9d9;
}

.navigation{
    display: flex;
    justify-content: space-between;
    align-items:center;
    height: 100%;
    padding: 0 34px;
}

.buttonstyle{
    width: 600px;
    height: 59px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size:30px;
    line-height: 45px;
    font-family:"Inter-Reqular",Arial, Helvetica, sans-serif;
    font-weight: 400;
    color:#000000;
    text-align: center;
    background: none;
    border:none;
    cursor:pointer;
}

.content-area{
    display: flex;
    justify-content: space-between;
    padding:79px 20px 0;
}

.video-panel{
    width: 640px;
    height: 543px;
    margin-top: 100px;
}

.memo-panel{
    width: 736px;
    height: 761px;
}

.footer{
    height: 121px;
    background-color: white;
    position: absolute;
    bottom:0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 62px;
}

.completion-button{
    width: 184px;
    height: 73px;
    background-color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 27;
    line-height: 40.5px;
    font-family: "Inter-Regular",Arial, Helvetica, sans-serif;
    font-weight: 400;
    color:#000000;
    text-align: center;
}
</style>