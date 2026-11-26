let currentGameCleanup = null;

function startGame(title) {
    if (currentGameCleanup) currentGameCleanup();
    currentGameCleanup = null;

    document.getElementById("games").style.display = "none";
    document.querySelector(".hero").style.display = "none";

    const area = document.getElementById("gameArea");
    area.style.display = "block";
    document.getElementById("gameTitle").textContent = title;

    area.scrollIntoView({behavior:"smooth"});
}

function goHome() {
    if (currentGameCleanup) currentGameCleanup();
    currentGameCleanup = null;

    document.getElementById("gameArea").style.display = "none";
    document.getElementById("games").style.display = "block";
    document.querySelector(".hero").style.display = "block";

    window.scrollTo({top:0, behavior:"smooth"});
}

function saveScore(score) {
    let best = Number(localStorage.getItem("thanksgivingBest") || 0);
    if (score > best) {
        localStorage.setItem("thanksgivingBest", score);
    }
}

document.getElementById("playerName").textContent =
    localStorage.getItem("thanksgivingPlayer") || "Guest";

if (!localStorage.getItem("thanksgivingPlayer")) {
    let name = prompt("Welcome to Thanksgiving Arcade! Enter your player name:");
    if (name && name.trim()) {
        localStorage.setItem("thanksgivingPlayer", name.trim());
        document.getElementById("playerName").textContent = name.trim();
    }
}
