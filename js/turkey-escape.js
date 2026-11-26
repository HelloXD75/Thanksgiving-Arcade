function startTurkey() {
    startGame("🦃 TURKEY ESCAPE");

    document.getElementById("gameContent").innerHTML = `
        <p>Press SPACE or tap JUMP to avoid the obstacles!</p>
        <p class="score">Score: <span id="turkeyScore">0</span></p>
        <canvas id="turkeyCanvas" width="650" height="260"></canvas>
        <br><br>
        <button id="jumpButton">JUMP!</button>
        <button id="turkeyRestart">RESTART</button>
        <h3 id="turkeyMessage"></h3>
    `;

    const canvas = document.getElementById("turkeyCanvas");
    const ctx = canvas.getContext("2d");

    let turkeyY = 190;
    let velocity = 0;
    let obstacleX = 650;
    let score = 0;
    let running = true;
    let jumping = false;
    let frame;

    function jump() {
        if (!jumping && running) {
            velocity = -12;
            jumping = true;
        }
    }

    function key(e) {
        if (e.code === "Space") {
            e.preventDefault();
            jump();
        }
    }

    document.addEventListener("keydown", key);
    document.getElementById("jumpButton").addEventListener("click", jump);

    function draw() {
        if (!running) return;

        ctx.clearRect(0,0,650,260);

        ctx.fillStyle = "#8c5126";
        ctx.fillRect(0,220,650,40);

        velocity += 0.55;
        turkeyY += velocity;

        if (turkeyY >= 190) {
            turkeyY = 190;
            velocity = 0;
            jumping = false;
        }

        obstacleX -= 5;

        if (obstacleX < -30) {
            obstacleX = 650 + Math.random()*200;
            score += 10;
            document.getElementById("turkeyScore").textContent = score;
        }

        ctx.font = "36px Arial";
        ctx.fillText("🦃",60,turkeyY+30);
        ctx.fillText("🌳",obstacleX,220);

        if (obstacleX < 100 && obstacleX > 35 && turkeyY > 150) {
            running = false;
            saveScore(score);
            document.getElementById("turkeyMessage").textContent =
                "GAME OVER! Final score: " + score;
            return;
        }

        frame = requestAnimationFrame(draw);
    }

    function restart() {
        cancelAnimationFrame(frame);
        turkeyY = 190;
        velocity = 0;
        obstacleX = 650;
        score = 0;
        jumping = false;
        running = true;
        document.getElementById("turkeyScore").textContent = "0";
        document.getElementById("turkeyMessage").textContent = "";
        draw();
    }

    document.getElementById("turkeyRestart").addEventListener("click",restart);

    currentGameCleanup = () => {
        running = false;
        cancelAnimationFrame(frame);
        document.removeEventListener("keydown",key);
    };

    draw();
}
