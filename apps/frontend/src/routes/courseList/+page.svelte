<script lang="ts">
</script>

<main>
    <div class="screen">
        <div class="container">
            <header class="header">
                <nav class="navigation">
                    <button class="nav-button">메인으로</button>
                </nav>
            </header>


            <section class="main-content">
                <div class="quote-section">
                    <h1> 명언 출력 부분 </h1>
                </div>

                <div class="quote-display">
                    <!-- This section will contain the displayed quote -->
                </div>
            </section>

            <footer class="footer">
                <button class="footer-button subject">새로운 과목 주가</button>
                <button class="footer-button subjects">과목 목록 수정</button>
            </footer>
        </div>
    </div>
</main>

<style>
.screen {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
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
    padding: 1rem;
}

.navigation {
    display: flex;
    align-items: center;
}

.nav-button {
    font-size: 25px;
    line-height: 37.5px;
    font-family: "Hiragino Sans GB-W6", Helvetica, sans-serif;
    color: #000000;
    text-align: center;
    background-color: #ffffff;
    border: none;
    padding: 1rem 2rem;
    cursor: pointer;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 2rem;
}

.quote-section {
    background-color: #d9d9d9;
    border-radius: 20px;
    border: 1px solid #000000;
    padding: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    max-width: 1440px;
}

.quote-display {
    background-color: #d9d9d9; 
    border-radius: 20px; 
    max-width: 1440px;
    height: 200px; 
    margin-top: 2rem;
}

.footer {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}

.footer-button {
    font-size: 25px;
    line-height: 37.5px;
    font-family: "Hiragino Sans GB-W6", Helvetica, sans-serif;
    color: #000000;
    text-align: center;
    background-color: #ffffff;
    border: none;
    padding: 1rem 2rem;
    cursor: pointer;
}

.footer-button:hover {
    background-color: #f0f0f0;
}
</style>