<script lang="ts">
  import { goto } from "$app/navigation";
  import { client } from "$lib/utils/api";
  import { json } from "@sveltejs/kit";
  import { onMount } from "svelte";

  let loading = false;

  let author: string;
  let authorProfile: string;
  let message: string;

  let courseTitle: string[];
  let courseID: number;

  let activate: boolean = false;

  let editingIndex: number = -1;
  let editingTitle: string = "";

  let updateTitle: string;
  onMount(async () => {
    fetchQuote();
    const res1 = await client.selectCourse.title.$get();
    courseTitle = (await res1.json()) ?? "";
  });

  async function fetchQuote() {
    loading = true;
    const res = await fetch(
      "https://korean-advice-open-api.vercel.app/api/advice"
    );
    const data = await res.json();
    author = data.author;
    authorProfile = data.authorProfile;
    message = data.message;
  }

  async function whereToGo(title: string) {
    const res = await client.selectCourse.getID.$post({ json: { title } });
    courseID = await res.json();

    if (title == "/") {
      goto(`/`);
    } else if (title == "create") {
      goto(`/createCourse/`);
    } else {
      goto(`/course/${courseID}`);
    }
  }

  function modifystatus() {
    if (activate == true) {
      activate = false;
    } else {
      activate = true;
    }
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
    const res = await client.selectCourse.modifyTitle.$post({
      json: { title: oldTitle, modify: newTitle },
    });
    courseTitle[i] = newTitle;
    cancelEdit();
  }

  async function deleteCourse(title:string) {
   const res =  await client.selectCourse.deleteCourse.$post({json: {title}});
   window.location.href = window.location.pathname;
  }

</script>

<main>
  <div class="container">
    <header class="header">
      <nav class="navigation">
        <button class="nav-button" onclick={() => whereToGo("/")}
          >메인으로</button
        >
        <button class="nav-button" onclick={() => whereToGo("create")}
          >새로운 작업 추가</button
        >
        <button class="nav-button" onclick={() => modifystatus()}
          >작업 목록 수정</button
        >
      </nav>
    </header>

    <section class="main-content">
      <div class="quote-section">
        <blockquote class="quote-message">
          "{message}"
        </blockquote>
        <div class="quote-author">
          <span class="author-name">{author}</span>
          <span class="author-profile">({authorProfile})</span>
        </div>
      </div>

      <div class="quote-display">
        <h1 class="tdl-title">Course</h1>
        {#each courseTitle as title, i}
          <div class="course-row">
            <button class="course-subtitle" onclick={() => whereToGo(title)}>
              ({i + 1}) {title}
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
                        onclick={() => saveEdit(i, title, editingTitle)}
                        >저장</button
                      >
                      <button class="overlayButtonRight" onclick={cancelEdit}
                        >이전으로</button
                      >
                    </div>
                  </div>
                {:else}
                  <button class="action-btn" onclick={() => startEdit(i, title)}
                    >이름 수정</button
                  >
                {/if}
                <button class="action-btn" onclick={() => deleteCourse(title)}>삭제</button>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </section>
  </div>
</main>

<style>
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: none;
    margin: 0 auto;
    position: relative;
  }

  .header {
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem;
  }

  .navigation {
    display: flex;
    align-items: center;
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

  .nav-button:hover {
    background-color: #f0f0f0;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .quote-section {
    background: linear-gradient(135deg, #f8fafc 0%, #d9d9d9 100%);
    border-radius: 20px;
    border: 1px solid #bdbdbd;
    padding: 1.2rem 1rem;
    margin-bottom: 1rem;
    width: 100%;
    max-width: 736px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tdl-title {
    font-size: 35px;
    font-weight: 400;
    margin-bottom: 7px;
    margin-top: 3px;
    text-align: center;
  }

  .course-subtitle {
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

  .quote-message {
    font-size: 1.5rem;
    font-style: italic;
    color: #222831;
    text-align: center;
    margin: 0 0 2rem 0;
    line-height: 1.6;
    letter-spacing: 0.02em;
  }

  .quote-author {
    font-size: 1.1rem;
    color: #555;
    text-align: center;
  }

  .author-name {
    font-weight: bold;
    color: #30475e;
  }

  .author-profile {
    font-style: normal;
    color: #888;
    margin-left: 0.5rem;
  }

  .quote-display {
    background-color: #d9d9d9;
    border-radius: 20px;
    width: 100%;
    max-width: 1040px;
    height: 400px;
    margin-top: 1rem;
  }

  .course-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #d9d9d9;
    border: none;
    border-radius: 20px;
    margin-top: 4px;
    width: 1000px;
    height: 30px;
    padding: 0 12px;
    margin-bottom: 0px;
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

  .nav-button:hover {
    background-color: #f1f0f2;
  }
</style>
