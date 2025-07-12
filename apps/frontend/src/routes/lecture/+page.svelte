<script lang="ts">
    import { onMount } from "svelte";
    import { Carta, MarkdownEditor } from "carta-md";
    import 'carta-md/default.css';
    import createDOMPurify from 'isomorphic-dompurify'
    import 'katex/dist/katex.css';
    import { math } from "@cartamd/plugin-math";
    import { goto } from "$app/navigation";
    import ollama from "ollama";
  
    let value:string = $state("");
    let llmInput: string = $state("");
    let llmOutput: string = $state("");
    let queryInput:boolean = $state(false);
  
    //TODO:html sanitizer import and add Carta plugin
    const DOMPurify = createDOMPurify(window);
    const carta = new Carta({
      sanitizer:(html) => DOMPurify.sanitize(html),
      extensions: [math()]
    });
  
  async function whereToGo() {
    goto('/');
  }
  
  function downloadPdf(){
    //TODO: pdf를 다운로드 할 수 있게 만들어야함
  }

  async function handleLLMRequest() {
    queryInput = true;
    const response = await ollama.chat({
      model: "gemma3:1b",
      messages: [{ role: "user", content: llmInput }],
    });
    llmOutput = response.message.content;
  }

  //텍스트 다운로드
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
                      <button class="buttonstyle" onclick={() => whereToGo()}>오프라인 모드</button>
                      <div class="interaction-point">
                        <button class="completion-button" onclick={() => downloadTxt()}>다운로드</button>
                        <button class="buttonstyle" onclick={() => whereToGo()}>홈으로</button>
                     </div>
                  </nav>
              </header>
              
              <section class="content-area">
                  <div class="alert-panel">
                      <div>
                          <h3>오프라인 모드에서는 llm 질의와 메모 기능만 지원합니다.</h3>
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

    .interaction-point{
        display: flex;
        margin-left: auto;
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
  
    .buttonstyle:hover {
      background-color: #f0f0f0;
    }
  
    .content-area {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px 0;
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