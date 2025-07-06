<script lang="ts">
  import { goto } from '$app/navigation';

  function newCourseClick() {
      goto('/createCourse');
  }

  function courseClick() {
      goto('/courseList')
  }

</script>

<main>
  <a href="/main">
      <h1>모노레포 프로젝트</h1>
  </a>

  <div>
      <button id="new-course-button" onclick="{newCourseClick}">새로운 과목 생성하기</button>
      <button id="course-button" onclick="{courseClick}">기존 과목 보기</button>
  </div>
  
</main>