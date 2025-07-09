<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { page } from "$app/state";
    import { client } from "$lib/utils/api";
    import { onMount } from "svelte";
    import { fly } from 'svelte/transition'
  
    let title: string = $state("");
    //TODO: 본 페이지는 courseId를 동적 url 변수로 받아온다.
    const corId = $derived(page.params["id"]);
    let progressValue: number[] = $state([]);
    let lectureTitle: string[] = $state([]);
    let pressOn: boolean = $state(false);
  
    interface lectureData {
      courseId: string;
      title: string;
      videoUrl: string;
    }
  
    let activate:boolean = $state(false);

    let editingIndex: number = $state(-1);
    let editingTitle: string = $state("");
    let courseTitle: string[];

    let lecture: lectureData = $state({
      courseId: "",
      title: "",
      videoUrl: "",
    });
  
    $effect(() => { lecture.courseId = corId; });
  
    let newlecture: lectureData = {
      courseId: "",
      title: "",
      videoUrl: "",
    };
  
    $effect(() => { newlecture.courseId = corId; });
  
    onMount(async () => {
      const res1 = await client.course.title.$post({json : { corId }});
      title = (await res1.json()) ?? "";
      
      callProgreeRate();

      const res3 = await client.course.tdl.$post({json : { corId }});
      lectureTitle = await res3.json();

      const res4 = await client.course.allTitle.$get();
      courseTitle = (await res4.json()) ?? "";
    });

    async function callProgreeRate(){
      const res2 = await client.course.progRate.$post({json : { corId }});
      progressValue = await res2.json();
    }

    function modifystatus() {
    if (activate == true) {
      activate = false;
    } else {
      activate = true;
    }
  }

    async function whereToGo(title: string) {
      const res = await client.course.getLectureId.$post({ json: { title } });
      const id = await res.json();
      goto(`/lecture/${id}/`);
    }
  
    function pressAddTdlBut(val: boolean) {
      pressOn = val;
    }
  
    async function storeNewTdl() {
      lecture = { ...newlecture };
      const res = await client.course.Addlecture.$post({ json: { lecture } });
      pressAddTdlBut(false);
      window.location.href = window.location.pathname;
    }

    function startEdit(i: number, title: string) {
    editingIndex = i;
    editingTitle = title;
  }

  function cancelEdit() {
    editingIndex = -1;
    editingTitle = "";
  }

  async function saveEdit(i: number, oldTitle: string, newTitle: string) {
    const res = await client.course.modifyTitle.$post({
      json: { title: oldTitle, modify: newTitle },
    });
    await reloadLectureTitle();
    cancelEdit();
  }
  async function reloadLectureTitle() {
    const res = await client.course.tdl.$post({ json: { corId } });
    lectureTitle = await res.json();
  }

  async function deleteCourse(title: string) {
    await client.course.deleteCourse.$post({ json: { title } });
    await reloadLectureTitle();
    callProgreeRate();
  }

  </script>
  
  <main class="screen">
    <div class="content" transition:fly="{{ y: 60, duration: 800 }}">
      <header>
        <div class="header-bar">
          <h1 class="header-title">{title}</h1>
          <div class="buttonStyle">
            <button class="nav-button" onclick={() => goto('/')}
              >홈으로</button
            >
            <button class="nav-button" onclick={() => modifystatus()}
              >TDL 목록 수정</button
            >
            <button class="nav-button" onclick={() => pressAddTdlBut(true)}
              >새로운 TDL 추가
              <!-- 버튼 클릭 시 오버레이로 새로운 TDL 추가-->
            </button>
          </div>

          {#if pressOn}
            <div class="overlayOn" role="dialog">
              <div>
                <div class="inputTag">
                  <input
                    type="text"
                    placeholder="제목"
                    bind:value={newlecture.title}
                  />
                  <input
                    type="text"
                    placeholder="유튜브 URL"
                    bind:value={newlecture.videoUrl}
                  />
                </div>
                <div>
                  <button class="overlayButtonLeft" onclick={() => storeNewTdl()}
                    >저장</button
                  >
                  <button
                    class="overlayButtonRight"
                    onclick={() => pressAddTdlBut(false)}>이전으로</button
                  >
                </div>
              </div>
            </div>
          {/if}
        </div>
      </header>
  
      <section class="main-content">
        <div class="progress-section">
          <h2 class="progress-title">진도율</h2>
          {#if progressValue}
            {#if progressValue[1] / progressValue[0] < 0.5}
              <progress
                class="progress-bar"
                value={progressValue[1]}
                max={progressValue[0]}
              ></progress>
              <div>시작이 반입니다!</div>
            {/if}
  
            {#if progressValue[1] / progressValue[0] == 0.5}
              <progress
                class="progress-bar"
                value={progressValue[1]}
                max={progressValue[0]}
              ></progress>
              <div>벌써 절반이나 왔습니다!</div>
            {/if}
  
            {#if progressValue[1] / progressValue[0] > 0.5 && progressValue[1] / progressValue[0] < 1}
              <progress
                class="progress-bar"
                value={progressValue[1]}
                max={progressValue[0]}
              ></progress>
              <div>거의 다했습니다!</div>
            {/if}

            {#if progressValue[1] / progressValue[0] == 1}
              <progress
                class="progress-bar"
                value={progressValue[1]}
                max={progressValue[0]}
              ></progress>
              <div>축하합니다! 학습을 완료했습니다!</div>
            {/if}
          {:else}
            <div>loading...</div>
          {/if}
        </div>
  
        <div class="tdl-section">
          <h1 class="tdl-title">TDL</h1>
              {#each lectureTitle as lecture, i}
                {#if lecture !=""}
                <div class="course-row">
                  <button class="tdl-subtitle" onclick={() => whereToGo(lecture)}>
                      ({i+1}) {lecture}  
                  </button>

                  {#if activate}
                    <div class="course-actions">
                      {#if editingIndex === i}
                      <div class="overlayOn" role="dialog">
                        <div class="inputTag">
                          <input
                            type="text"
                            placeholder="제목"
                            bind:value={editingTitle}
                          />
                        </div>
                        <div>
                          <button
                            class="overlayButtonLeft"
                            onclick={() => saveEdit(i, lecture, editingTitle)}
                            >저장</button
                          >
                          <button class="overlayButtonRight" onclick={cancelEdit}
                            >이전으로</button
                          >
                        </div>
                    </div>
                  {:else}
                    <button class="action-btn" onclick={() => startEdit(i, lecture)}
                      >이름 수정</button
                    >
                  {/if}
                  <button class="action-btn" onclick={() => deleteCourse(lecture)}>삭제</button>
                </div>
              {/if}
            </div>
                {/if}
              {/each}
        </div>
      </section>
    </div>
  </main>
  
  <style>
    :global(body) {
      font-family: "Hiragino Sans GB-W6", Helvetica, Arial, sans-serif;
      color: #000000;
      line-height: 1.5;
    }
  
    .screen {
      display: flex;
      justify-content: center;
      min-height: 100vh;
    }
  
    .content {
      max-width: 1440px;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  
    header {
      padding: 0 3px;
    }
  
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1434px;
      height: auto;
      margin: 0 16;
      padding: 0 10px;

    }
  
    .header-title {
      margin: 0;
    }
  
    .overlayOn {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 40vw;
      height: 30vh;
      background: white;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      border-radius: 16px;
    }
  
    .inputTag {
      display: flex;
      flex-direction: column;
      align-items: center; /* 입력칸을 가로 중앙 정렬 */
      justify-content: center;
      gap: 18px; /* 입력칸 사이 간격 */
      width: 100%;
      margin-bottom: 24px; /* 버튼과의 간격 */
    }
  
    .inputTag input[type="text"] {
      width: 320px; /* 입력칸 너비 크게 */
      height: 48px; /* 입력칸 높이 크게 */
      font-size: 20px; /* 글씨 크게 */
      padding: 0 16px;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-sizing: border-box;
      background: #f9f9f9;
    }
  
    .main-content {
      flex-grow: 1;
      padding: 19px 0;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  
    .progress-section,
    .tdl-section {
      background-color: #d9d9d9;
      border-radius: 15px;
      padding: 10px;
    }
  
    .progress-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  
    .progress-title,
    .tdl-title {
      font-size: 35px;
      font-weight: 400;
      margin-bottom: 7px;
      margin-top: 3px;
      text-align: center;
    }
  
    .progress-bar {
      flex-grow: 1;
      height: 60px;
      border: 1px solid #000000;
      border-radius: 15px;
      overflow: hidden;
    }
  
    .tdl-section {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  
    .tdl-subtitle {
      background-color: #d9d9d9;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: 24px;
      margin-top: 15px;
      display: block;
      margin-bottom: 0px;
      width: 500px;
      height: 30px;
      margin-top: 4px;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  
    .buttonStyle{
      display: flex;
      gap: 8px;
    }

    .nav-button {
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
  
    .overlayButtonLeft {
      width: 160px;
      height: 54px;
      background-color: #d9d9d9;
      border: none;
      border-radius: 20px;
      font-size: 28px;
      cursor: pointer;
      transition: background-color 0.3s;
      align-items: left;
    }
  
    .overlayButtonRight {
      width: 160px;
      height: 54px;
      background-color: #d9d9d9;
      border: none;
      border-radius: 20px;
      font-size: 28px;
      cursor: pointer;
      transition: background-color 0.3s;
      align-items: right;
    }
  
    .nav-button:hover {
      background-color: #f1f0f2;
    }
    
  .course-actions {
    display: flex;
    gap: 8px;
  }

  .overlayOn {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 40vw;
    height: 30vh;
    background: white;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
    border-radius: 16px;
  }

  .inputTag {
    display: flex;
    flex-direction: column;
    align-items: center; /* 입력칸을 가로 중앙 정렬 */
    justify-content: center;
    gap: 18px; /* 입력칸 사이 간격 */
    width: 100%;
    margin-bottom: 24px; /* 버튼과의 간격 */
  }

  .inputTag input[type="text"] {
    width: 320px; /* 입력칸 너비 크게 */
    height: 48px; /* 입력칸 높이 크게 */
    font-size: 20px; /* 글씨 크게 */
    padding: 0 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
    background: #f9f9f9;
  }

  .overlayButtonLeft {
    width: 160px;
    height: 54px;
    background-color: #d9d9d9;
    border: none;
    border-radius: 20px;
    font-size: 28px;
    cursor: pointer;
    transition: background-color 0.3s;
    align-items: left;
  }

  .overlayButtonRight {
    width: 160px;
    height: 54px;
    background-color: #d9d9d9;
    border: none;
    border-radius: 20px;
    font-size: 28px;
    cursor: pointer;
    transition: background-color 0.3s;
    align-items: right;
  }

  .course-row{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #d9d9d9;
    border: none;
    border-radius: 20px;
    margin-top: 4px;
    width: 1200px;
    height: 30px;
    padding: 0 12px;
    margin-bottom: 0px;
  }


    @media (max-width: 768px) {
      .main-content {
        padding: 10px;
      }
      .nav-button {
        width: 100%;
        max-width: 292px;
      }
    }


  </style>
  