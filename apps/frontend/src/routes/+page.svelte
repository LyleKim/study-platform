<script lang="ts">
  import { goto } from '$app/navigation';
  import { fly } from 'svelte/transition'

  function newCourseClick() {
      goto('/createCourse');
  }

  function courseClick() {
      goto('/courseList')
  }

</script>

<main>
 <div class="main-page">
    <div class="content" transition:fly="{{ y: 60, duration: 800 }}">
      <header class="header"></header>    
      
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">당신의 학습, 하나의 플랫폼에서<span class="hero-title-dot">.</span></h1>
        </div>

        <div class="button-group">
          <button class="buttonStyle" onclick="{newCourseClick}">새로운 과목 생성하기</button>
          <button class="buttonStyle" onclick="{courseClick}">기존 과목 보기</button>
        </div>
      </section>
      
      <footer></footer>
    </div>
  </div> 
</main>

<style>
  .main-page{
    display: flex;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
  }

  .content{
    max-width: 1440px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .header{
    height: 50px;
  }

  .hero{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 96px 0;
  }

  .hero-content{
    background-color: white;
    border-radius: 20px;
    padding: 43px 42px;
    margin-bottom: 55px;
  }

  .hero-title{
    font-size: 48px;
    font-family: "Inria Sans-Regular", Helvetica, sans-serif;
    font-weight: 400;
    color: black;
    text-align: center;
    max-width: 618px;
  }

  .hero-title-dot{
    display: inline-block;
    margin-left: 5px;
    animation: blink 1s steps(1) infinite;
    margin-left: 5px;
  }

  .buttonStyle{
    width: 300px;
    height: 62px;
    background-color: white;
    border: none;
    border-radius: 20px;
    font-size: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0 140px;
    align-items: left;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  
  .button-group {
    display: flex;
    gap: 32px;
    justify-content: center;
  }

  .buttonStyle:hover {
    background-color: #f1f0f2;
  }

</style>