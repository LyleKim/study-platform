<script lang="ts">
  import { page } from "$app/state";

    const res = $derived(page.params['id']);

</script>


<div>
    <h1>
        클릭하신 페이지는 "{res}"에 대한 영상, 메모 기능을 지원합니다.
    </h1>
</div>