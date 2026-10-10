let wrongQuestions = JSON.parse(
    localStorage.getItem("wrongQuestions")
) || [];

let mockQuestions = [];

let highestScore =
    localStorage.getItem("highestScore") || 0;

let examMode = false;
let examScore = 0;
window.onload = function () {
    loadQuestion();
};

function loadQuestion() {

    document.querySelector("h2").innerText =
        currentQuestions[currentQuestion].question;

    document.getElementById("choice0").innerText =
        currentQuestions[currentQuestion].choices[0];

    document.getElementById("choice1").innerText =
        currentQuestions[currentQuestion].choices[1];

    document.getElementById("choice2").innerText =
        currentQuestions[currentQuestion].choices[2];

    document.getElementById("choice3").innerText =
        currentQuestions[currentQuestion].choices[3];

    document.getElementById("result").innerHTML = "";
    document.getElementById("explanation").innerHTML = "";
}

function checkAnswer(selected){

    if(selected === currentQuestions[currentQuestion].answer){

        document.getElementById("result").innerHTML =
            "⭕ 正解";

        if(examMode){
            examScore++;
        }

    }else{

        document.getElementById("result").innerHTML =
            "❌ 不正解";

        if(!wrongQuestions.includes(
            currentQuestions[currentQuestion]
        )){

            wrongQuestions.push(
                currentQuestions[currentQuestion]
            );
            localStorage.setItem(
    "wrongQuestions",
    JSON.stringify(wrongQuestions)
);

        }
    }

    document.getElementById("explanation").innerHTML =
        currentQuestions[currentQuestion].explanation;
}

document.getElementById("choice0").onclick =
function(){ checkAnswer(0); };

document.getElementById("choice1").onclick =
function(){ checkAnswer(1); };

document.getElementById("choice2").onclick =
function(){ checkAnswer(2); };

document.getElementById("choice3").onclick =
function(){ checkAnswer(3); };

document.getElementById("nextButton").onclick =
function(){

    currentQuestion++;

    if(currentQuestion >= currentQuestions.length){

        if(examMode){
            if(examScore > highestScore){

    highestScore = examScore;

    localStorage.setItem(
        "highestScore",
        highestScore
    );

}

            let percent =
                Math.round(
                    examScore /
                    currentQuestions.length * 100
                );

            let resultText =
                "模擬試験終了\n\n" +
                "得点 : " +
                examScore +
                " / " +
                currentQuestions.length +
                "\n\n" +
                "正答率 : " +
                percent +
                "%";
                resultText +=

"\n\n最高得点 : " +
highestScore +
" / 20";

            if(percent >= 70){

                resultText +=
                "\n\n🎉 合格";

            }else{

                resultText +=
                "\n\n📚 不合格";
            }

            alert(resultText);

            examMode = false;

            goHome();

            return;
        }

        currentQuestion = 0;
    }

    loadQuestion();
};

function startRandomQuiz(){

    document.getElementById("home").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    document.getElementById("categoryName").innerText =
        "ランダム出題";

    currentQuestions = [
        ...hygieneQuestions,
        ...serviceQuestions,
        ...operationQuestions,
        ...japaneseQuestions
    ];

    currentQuestions.sort(
        ()=>Math.random()-0.5
    );

    currentQuestion = 0;

    examMode = false;

    loadQuestion();
}

function startWrongQuestions(){

    if(wrongQuestions.length === 0){

        alert("まだ間違えた問題がありません");

        return;
    }

    document.getElementById("home").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    document.getElementById("categoryName").innerText =
        "間違えた問題";

    currentQuestions = wrongQuestions;

    currentQuestion = 0;

    examMode = false;

    loadQuestion();
}

function startMockExam(){

    examMode = true;
    examScore = 0;

    document.getElementById("home").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    document.getElementById("categoryName").innerText =
        "模擬試験20問";

    let allQuestions = [

        ...hygieneQuestions,
        ...serviceQuestions,
        ...operationQuestions,
        ...japaneseQuestions

    ];

    allQuestions.sort(
        ()=>Math.random()-0.5
    );

    mockQuestions =
        allQuestions.slice(0,20);

    currentQuestions = mockQuestions;

    currentQuestion = 0;

    loadQuestion();
}


function resetAllData(){

    let result = confirm(
        "保存データをすべて削除しますか？"
    );

    if(!result){
        return;
    }

    wrongQuestions = [];

    highestScore = 0;

    localStorage.removeItem(
        "wrongQuestions"
    );

    localStorage.removeItem(
        "highestScore"
    );

    alert(
        "保存データを削除しました"
    );
}