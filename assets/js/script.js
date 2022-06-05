// calling elements from html file
const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question-element");
const answerBtnElement = document.getElementById("answer-btns");
const options = document.getElementById("options");
const highScoreBtn = document.getElementById("high-score-btn");

let mixQuestions, currentQuestionIndex;

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

startBtn.addEventListener('click', startQuiz);

// functions for quiz

function startQuiz() {
    startBtn.classList.add('hide');
    highScoreBtn.classList.add('hide');
    mixQuestions = questionsForQuiz.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    nextQuestion();
}

function nextQuestion() {
    resetContainer();
    showQuestion(mixQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
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

function resetContainer() {
    while (answerBtnElement.firstChild) {
        answerBtnElement.removeChild(answerBtnElement.firstChild);
    }
}

function chooseAnswer(event) {
    const chosenAnswer = event.target;
    const correct = chosenAnswer.dataset.correct;

    if (correct) {
        console.log("Correct!");
        endGame();
    } else {
        console.log("Incorrect!");
        endGame();
    }
}


// check if final question reached
function endGame() {
    if (mixQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        nextQuestion();
    } else {
        console.log("Game Over!");
    }
}