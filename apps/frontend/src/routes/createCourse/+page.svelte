<script lang="ts">
  import { client } from "$lib/utils/api";
  import { goto } from "$app/navigation";
  import { fly } from 'svelte/transition'

  let course: { title: string; goalDate: string } = {
    title: "",
    goalDate: new Date().toISOString().split("T")[0],
  };

  let courseInfo: { title: string; goalDate: string } = {
    title: "",
    goalDate: "",
  };

  let inputCourseId: number;

  //(과목을 추가합니다 누르면) DB에 저장하고 courseId불러와서 각 과목 상세 페이지(TDL 뜨는곳) 이동
  async function courseAddClick() {
    courseInfo = { title: course.title, goalDate: course.goalDate };
    const res = await client.createCourse.$post({ json: { courseInfo } }); //courseId반환
    let data = await res.json();
    inputCourseId = data[0].courseId;
    goto(`/course/${inputCourseId}/`); // '/couser/[id]/+page.svelte'로 이동(dummyPage)
  }

  async function whereToGo() {
    goto(`/`);
    }
</script>

<main>
<div transition:fly="{{ y: 60, duration: 800 }}">
  <div class="form-container">
    <h1 class="form-title">새로운 학습 생성하기</h1>

    <label class="form-label">
      학습 이름:
      <input
        class="form-input"
        type="text"
        bind:value={course.title}
        placeholder="과목명을 입력하세요"
      />
    </label>

    <label class="form-label">
      목표 날짜:
      <input class="form-input" type="date" bind:value={course.goalDate} />
    </label>
    <div class="buttonStyle">
        <div>
        <button
            class="form-button-left"
            onclick={courseAddClick}>학습 추가</button
        >
        </div>

        <div>
        <button
            class="form-button-right"
            onclick={()=>whereToGo()}>이전으로</button
        >
        </div>
    </div>
  </div>
</div>
</main>

<style>
  .form-container {
    background: #fff;
    max-width: 500px;
    margin: 70px auto;
    border-radius: 16px;
    padding: 50px 32px 28px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form-title {
    font-size: 2rem;
    color: #333;
    margin-bottom: 32px;
    font-weight: 600;
  }
  .form-label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 22px;
    font-size: 1rem;
    color: #444;
    font-weight: 500;
  }
  .form-input {
    margin-top: 8px;
    width: 100%;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: 1rem;
    background: #f8fafc;
    transition: border 0.2s;
  }
  .form-input:focus {
    outline: none;
    border: 1.5px solid #007aff;
    background: #fff;
  }

  .buttonStyle{
    display: flex;
    flex-direction: row;
  }

  .form-button-left {
    width: 170px;
    height: 57px;
    background-color: white;
    border: none;
    border-radius: 20px;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0 100px;
  }

  .form-button-right {
    width: 170px;
    height: 57px;
    background-color: white;
    border: none;
    border-radius: 20px;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0 100px;
  }

  .form-button-left:hover {
    background: #f1f0f2;
  }

  .form-button-right:hover {
    background: #f1f0f2;
  }
</style>
