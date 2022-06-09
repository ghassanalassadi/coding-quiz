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
const scoreTable = document.getElementById("score-table");
const reactionContainer = document.getElementById("reaction-container");
const reactionToUserAnswer = document.getElementById("answer-reaction");
const backBtn = document.getElementById("back-btn");
var finalScore = 0; // initializing score value
let questionNumber = 0;
var highScores = {}; // declare dict to allow for global use
var timeLeft;

// array of questions

// some of the quiz functionality of this code was built with help from a video guide: https://www.youtube.com/watch?v=riDzcEQbX6k

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
highScoreBtn.addEventListener('click', highScoreList);
backBtn.addEventListener('click', startingPage);

// functions for quiz

function startingPage() {
    startBtn.classList.remove('hide');
    highScoreBtn.classList.remove('hide');
    backBtn.classList.add('hide');
    initialsContainer.classList.add('hide');
    highScoreContainer.classList.add('hide');
}

/*
Starts the quiz. Removes the start and high score buttons by adding 'hide' to class list
Also shows the questions by removing 'hide' from the class list.
*/
function startQuiz() {
    startBtn.classList.add('hide');
    highScoreBtn.classList.add('hide');
    questionContainer.classList.remove('hide');
    reactionToUserAnswer.innerText = "";
    questionNumber = 0; // reset question number index every time the quiz is started
    countdownTimer();
    timeLeft = 60;
    nextQuestion();
}

// resets the container every time a question is answered and loads the next question
function nextQuestion() {
    resetContainer();
    showQuestion(questionsForQuiz[questionNumber]);
}

// reveals the question from the array and loads the answers to the buttons
// also determines which answer is correct based on data from question array
function showQuestion(quizQuestion) {
    questionElement.innerText = quizQuestion.question; // replace placeholder text with text from a question in the question array
    quizQuestion.answers.forEach(answer => {
        const answerBtn = document.createElement('button');
        answerBtn.innerHTML = answer.text; // replace placeholder text with text from the answer list in the question array
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
    const correctAnswer = chosenAnswer.dataset.correct;

    if (correctAnswer) {
        reactionContainer.classList.remove('hide');
        reactionToUserAnswer.innerText = "Correct!";
        endGame();
    } else {
        timeLeft -= 10;
        reactionContainer.classList.remove('hide');
        reactionToUserAnswer.innerText = "Incorrect!";
        endGame();
    }
}

// check if final question reached and end game. if not, continue quiz
    function endGame() {
    reactionContainer.classList.remove('hide');
    if (questionsForQuiz.length > questionNumber + 1) {
        questionNumber++;
        nextQuestion();
    } else {
        console.log("Game Over!");
        reactionToUserAnswer.innerText = "Game Over!";
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
            reactionToUserAnswer.innerText = "Game Over!";
            highScoreSave();
        }
    }, 1000)
}

// saves high scores to a dictionary
function highScoreSave() {
    questionContainer.classList.add('hide');
    initialsContainer.classList.remove('hide');
    const submitBtn = document.getElementById("submit-btn");
    
    submitBtn.addEventListener('click', function(){
        const initialsTextbox = document.getElementById("initials-textbox").value;
        highScores = {
            initials: initialsTextbox,
            score: finalScore.toString()
    }
        localStorage.setItem("highScores", JSON.stringify(highScores));
        console.log(JSON.parse(localStorage.getItem("highScores")));
        highScoreList();
    })
}

// adds high score to table
function highScoreList() {
    startBtn.classList.add('hide');
    highScoreBtn.classList.add('hide');
    backBtn.classList.remove('hide');
    initialsContainer.classList.add('hide');
    highScoreContainer.classList.remove('hide');
    // use table elements to add score to table
    var addRow = scoreTable.insertRow(1);
    var initialsCell = addRow.insertCell(0);
    var scoreCell = addRow.insertCell(1);
    initialsCell.innerHTML = highScores.initials;
    scoreCell.innerHTML = highScores.score;
}