function startFood() {
    startGame("🍗 CATCH THE FOOD");

    document.getElementById("gameContent").innerHTML = `
        <p>Move with LEFT and RIGHT arrow keys or use the buttons!</p>
        <p class="score">Score: <span id="foodScore">0</span></p>
        <canvas id="foodCanvas" width="600" height="350"></canvas>
        <br><br>
        <button id="foodLeft">⬅ LEFT</button>
        <button id="foodRight">RIGHT ➡</button>
        <button id="foodRestart">RESTART</button>
        <h3 id="foodMessage"></h3>
    `;

    const canvas = document.getElementById("foodCanvas");
    const ctx = canvas.getContext("2d");

    let basket = 270;
    let foods = [];
    let score = 0;
    let running = true;
    let frame;
    let left = false;
    let right = false;
    let spawn = 0;

    function keyDown(e) {
        if(e.key === "ArrowLeft") left = true;
        if(e.key === "ArrowRight") right = true;
    }

    function keyUp(e) {
        if(e.key === "ArrowLeft") left = false;
        if(e.key === "ArrowRight") right = false;
    }

    document.addEventListener("keydown",keyDown);
    document.addEventListener("keyup",keyUp);

    const l = document.getElementById("foodLeft");
    const r = document.getElementById("foodRight");

    l.addEventListener("pointerdown",()=>left=true);
    l.addEventListener("pointerup",()=>left=false);
    l.addEventListener("pointerleave",()=>left=false);
    r.addEventListener("pointerdown",()=>right=true);
    r.addEventListener("pointerup",()=>right=false);
    r.addEventListener("pointerleave",()=>right=false);

    function draw() {
        if(!running) return;

        ctx.clearRect(0,0,600,350);

        ctx.fillStyle="#633516";
        ctx.fillRect(0,320,600,30);

        if(left) basket-=6;
        if(right) basket+=6;
        basket=Math.max(0,Math.min(540,basket));

        ctx.font="40px Arial";
        ctx.fillText("🧺",basket,315);

        spawn++;
        if(spawn>45) {
            foods.push({
                x:Math.random()*550,
                y:-30,
                speed:2+Math.random()*3,
                emoji:["🍗","🥧","🌽","🥔","🍎"][Math.floor(Math.random()*5)]
            });
            spawn=0;
        }

        foods.forEach((f,i)=>{
            f.y+=f.speed;
            ctx.fillText(f.emoji,f.x,f.y);

            if(f.y>270 && f.y<320 && f.x>basket-10 && f.x<basket+65) {
                score+=10;
                foods.splice(i,1);
                document.getElementById("foodScore").textContent=score;
            }
        });

        foods=foods.filter(f=>f.y<370);

        frame=requestAnimationFrame(draw);
    }

    function restart() {
        cancelAnimationFrame(frame);
        foods=[];
        score=0;
        basket=270;
        spawn=0;
        running=true;
        document.getElementById("foodScore").textContent="0";
        draw();
    }

    document.getElementById("foodRestart").addEventListener("click",restart);

    currentGameCleanup=()=>{
        running=false;
        cancelAnimationFrame(frame);
        document.removeEventListener("keydown",keyDown);
        document.removeEventListener("keyup",keyUp);
    };

    draw();
}
