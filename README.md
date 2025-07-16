**study-platform**

---

숭실대학교 소프트웨어학부 2025년 소프트웨어 공모전 결과물입니다.

- Report : [소프트웨어공모전 1차 서류보고서 제출_이김.pdf](https://github.com/user-attachments/files/21250766/1._.pdf)

- References : M. Quispe-Vargas, “The impact of YouGlish on English
speaking proficiency in higher education,” in J ournal of
Technology and Science Education, vol. 14, no. 2, pp. 349–
362, 2024.

What is it for?

- **YouTube video and markdown memo function**: Displays the video corresponding to the entered YouTube link, along with a memo pad that supports markdown.
- **LLM request**: Allows users to refine their notes or ask questions using an LLM. By utilizing the local LLM platform Ollama, data privacy and security are ensured.
- **Download as .txt file**: Enables users to download their written memos as a .txt file.
- **Motivation**: Provides random motivational quotes to help encourage continued learning.


<br><br>

***How to start develop?***

---

**Prepare databases**

1. install Docker
2. Run instances using docker compose:
    
    ```
    docker compose up -d
    ```
    
3. Install LLM what can run in your local
    
    ```
    docker compose exec -it ollama /bin/bash
    
    #you can find LLM what is proper in your local developing enviornment
    #https://github.com/ollama/ollama
    ollama run gemma3 #install gemma3 LLM
    ollama run llama4:scout #install llama4 LLM
    ```

<br><br>

**Run to dev**

```
bun run dev # run backend and frontend dev server
```

<br><br>
***Contributors***

---

- 김준석(https://github.com/LyleKim)
- 김연주(https://github.com/7imyj3)
