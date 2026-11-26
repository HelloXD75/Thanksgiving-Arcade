function startTrivia() {
    startGame("🍂 THANKSGIVING TRIVIA");

    const questions = [
        ["When is Thanksgiving celebrated in the United States?",["Fourth Thursday of November","December 25","October 31"],0],
        ["Which bird is traditionally associated with Thanksgiving?",["Chicken","Turkey","Duck"],1],
        ["What dessert is popular at Thanksgiving?",["Pumpkin pie","Ice cream","Donuts"],0],
        ["What month is Thanksgiving in?",["October","December","November"],2],
        ["Which food is often served with turkey?",["Mashed potatoes","Sushi","Tacos"],0],
        ["What is Thanksgiving about?",["Giving thanks","Halloween","New Year"],0],
        ["Which sauce is popular with turkey?",["Chocolate sauce","Cranberry sauce","Hot sauce"],1],
        ["What season is Thanksgiving in?",["Winter","Spring","Autumn"],2],
        ["What do people often do together on Thanksgiving?",["Watch fireworks","Share a meal","Go swimming"],1],
        ["What vegetable is commonly served at Thanksgiving?",["Corn","Watermelon","Coconut"],0]
    ];

    let index=0;
    let score=0;

    function showQuestion() {
        if(index>=questions.length) {
            saveScore(score);
            document.getElementById("gameContent").innerHTML=`
                <h2>🎉 QUIZ COMPLETE!</h2>
                <p class="score">Your score: ${score}/${questions.length}</p>
                <p>${score===10?"PERFECT SCORE! 🏆":score>=7?"Great job! 🦃":"Good try! Play again!"}</p>
                <button onclick="startTrivia()">PLAY AGAIN</button>
            `;
            return;
        }

        const q=questions[index];

        document.getElementById("gameContent").innerHTML=`
            <p>Question ${index+1} of ${questions.length}</p>
            <p class="score">Score: ${score}</p>
            <h3 class="question">${q[0]}</h3>
            <div id="answers"></div>
            <p id="feedback"></p>
        `;

        q[1].forEach((answer,i)=>{
            const button=document.createElement("button");
            button.className="answer";
            button.textContent=answer;

            button.addEventListener("click",()=>{
                if(i===q[2]) {
                    score++;
                    document.getElementById("feedback").textContent="✅ CORRECT!";
                } else {
                    document.getElementById("feedback").textContent=
                        "❌ Not quite! Correct answer: "+q[1][q[2]];
                }

                document.querySelectorAll(".answer").forEach(b=>b.disabled=true);

                const next=document.createElement("button");
                next.textContent=index===9?"SEE RESULTS":"NEXT QUESTION →";
                next.style.marginTop="20px";
                next.addEventListener("click",()=>{
                    index++;
                    showQuestion();
                });
                document.getElementById("gameContent").appendChild(next);
            });

            document.getElementById("answers").appendChild(button);
        });
    }

    showQuestion();
}
