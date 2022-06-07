// calling elements from html file
const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question-element");
const answerBtnElement = document.getElementById("answer-btns");
const options = document.getElementById("options");
const highScoreBtn = document.getElementById("high-score-btn");
const timerElement = document.getElementById("timer");
const initialsContainer = document.getElementById("initials-field");
const highScoreContainer = document.getElementById("high-score-container");
var finalScore = 0; // initializing score value

// keep track of question number
let questionNumber = 0;
var timeLeft;

// array of questions

const questionsForQuiz = [
    {
        question: "Which one of these is NOT classified as a pair of boolean values?",
        answers: [
            {text: "true and false", correct: false},
            {text: "1 and 0", correct: false},
            {text: "yes and no", correct: false},
            {text: "why and how", correct: true}
        ]
    },
    {
        question: "How many statements does a for loop take?",
        answers: [
            {text: "3", correct: true},
            {text: "10", correct: false},
            {text: "1", correct: false},
            {text: "5", correct: false}
        ]
    },
    {
        question: "What is a function?",
        answers: [
            {text: "A conditional statement.", correct: false},
            {text: "A block of re-executable code.", correct: true},
            {text: "Another name for a for loop.", correct: false},
            {text: "None of these", correct: false},
        ]
    },
    {
        question: "What does API stand for?",
        answers: [
            {text: "Application Programming Institution.", correct: false},
            {text: "Application Programming Infrastructure.", correct: false},
            {text: "Application Programming Interface.", correct: true},
            {text: "Application Programming Interrogation", correct: false}
        ]
    }
    
]

// calls 'start quiz' function on button press
startBtn.addEventListener('click', startQuiz);

// functions for quiz

/*
Starts the quiz. Removes the start and high score buttons by adding 'hide' to class list
Also shows the questions by removing 'hide' from the class list.
*/
function startQuiz() {
    startBtn.classList.add('hide');
    highScoreBtn.classList.add('hide');
    questionContainer.classList.remove('hide');
    countdownTimer();
    timeLeft = 60;
    nextQuestion();
}

// resets the container every time a question is answered and loads the next question
function nextQuestion() {
    resetContainer();
    showQuestion(questionsForQuiz[questionNumber]);
}


function showQuestion(quizQuestion) {
    questionElement.innerText = quizQuestion.question;
    quizQuestion.answers.forEach(answer => {
        const answerBtn = document.createElement('button');
        answerBtn.innerText = answer.text;
        answerBtn.classList.add('answer-btn');
        if (answer.correct) {
            answerBtn.dataset.correct = answer.correct;
        }
        answerBtn.addEventListener('click', chooseAnswer);
        answerBtnElement.appendChild(answerBtn);
    });
}

// remove placeholder buttons and replace with the actual answer buttons for each question
function resetContainer() {
    while (answerBtnElement.firstChild) {
        answerBtnElement.removeChild(answerBtnElement.firstChild);
    }
}

// determines what should be done if the answer is correct or incorrect
function chooseAnswer(event) {
    const chosenAnswer = event.target;
    const correct = chosenAnswer.dataset.correct;

    if (correct) {
        console.log("Correct!");
        endGame();
    } else {
        timeLeft -= 10;
        console.log("Incorrect!");
        endGame();
    }
}

// check if final question reached and end game
    function endGame() {
    if (questionsForQuiz.length > questionNumber + 1) {
        questionNumber++;
        nextQuestion();
    } else {
        console.log("Game Over!");
        highScoreSave();
        finalScore = timeLeft;
        clearInterval(timer);
}
}

// countdown timer
function countdownTimer() {
    timer = setInterval(function() {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if(timeLeft === 0) {
            finalScore = 0;
            clearInterval(timer);
            console.log("Game Over!");
            highScoreSave();
        }
    }, 1000)
}


function highScoreSave() {
    questionContainer.classList.add('hide');
    initialsContainer.classList.remove('hide');
    const submitBtn = document.getElementById("submit-btn");
    
    submitBtn.addEventListener('click', function(){
        const initialsTextbox = document.getElementById("initials-textbox").value;
        var highScores = {
            initials: initialsTextbox,
            score: finalScore.toString()
    }
        localStorage.setItem("highScores", JSON.stringify(highScores));
        console.log(JSON.parse(localStorage.getItem("highScores")));
        highScoreList();
    })
}

function highScoreList() {
    initialsContainer.classList.add('hide');
}