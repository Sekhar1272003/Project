// Questions
let questions = [
  {
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Microsoft", "Google", "Oracle"],
    correctAnswer: 0
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "/*", "#", "<!--"],
    correctAnswer: 0
  },
  {
    question: "Which method is used to print something to the console?",
    options: ["console.write()", "print()", "console.log()", "log.console()"],
    correctAnswer: 2
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "constant", "variable"],
    correctAnswer: 0
  },
  {
    question: "Which operator is used for strict equality in JavaScript?",
    options: ["==", "=", "===", "!="],
    correctAnswer: 2
  },
  {
    question: "Which of these is used to create a function in JavaScript?",
    options: ["function", "func", "def", "method"],
    correctAnswer: 0
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: 0
  },
  {
    question: "How do you write an array in JavaScript?",
    options: ["{1, 2, 3}", "(1, 2, 3)", "[1, 2, 3]", "<1, 2, 3>"],
    correctAnswer: 2
  },
  {
    question: "Which event occurs when a user clicks on an HTML element?",
    options: ["onchange", "onclick", "onmouseover", "onkeydown"],
    correctAnswer: 1
  },
  {
    question: "Which method converts JSON data into a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.object()"],
    correctAnswer: 0
  }
];

// Variables
const TIME_PER_QUESTION = 15;

let current = 0;
let answers = [];
let timeLeft = 15;
let timerId;

// Elements
let welcome = document.getElementById("welcome-screen");
let quiz = document.getElementById("quiz-screen");
let result = document.getElementById("result-screen");

let questionEl = document.getElementById("question-text");
let optionsEl = document.getElementById("options-container");
let progressText = document.getElementById("progress-text");
let progressFill = document.getElementById("progress-fill");
let timerDisplay = document.getElementById("timer-display");

document.getElementById("total-questions-display").innerHTML = questions.length;
document.getElementById("feature-total").innerHTML = questions.length;


// Start Button
document.getElementById("start-btn").onclick = function () {

  welcome.classList.remove("active");
  quiz.classList.add("active");

  current = 0;
  answers = [];

  showQuestion();
};


// Show Question
function showQuestion() {

  clearInterval(timerId);

  let q = questions[current];

  // question
  questionEl.innerHTML = q.question;

  // clear old options
  optionsEl.innerHTML = "";

  // show options
  for (let i = 0; i < 4; i++) {

    let div = document.createElement("div");

    div.className = "option";

    div.innerHTML = q.options[i];

    // old selected answer
    if (answers[current] == i) {
      div.classList.add("selected");
    }

    // click option
    div.onclick = function () {

      answers[current] = i;

      let all = document.querySelectorAll(".option");

      for (let j = 0; j < all.length; j++) {
        all[j].classList.remove("selected");
      }

      div.classList.add("selected");
    };

    optionsEl.appendChild(div);
  }

  // progress
  progressText.innerHTML =
    "Question " + (current + 1) + " of " + questions.length;

  progressFill.style.width =
    ((current + 1) / questions.length) * 100 + "%";

  // previous button
  if (current == 0) {
    document.getElementById("prev-btn").disabled = true;
  } else {
    document.getElementById("prev-btn").disabled = false;
  }

  // submit button on last question
  if (current == questions.length - 1) {
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("submit-btn").style.display = "inline";
  } else {
    document.getElementById("next-btn").style.display = "inline";
    document.getElementById("submit-btn").style.display = "none";
  }

  startTimer();
}


// Timer
function startTimer() {

  timeLeft = TIME_PER_QUESTION;

  timerDisplay.innerHTML = "⏱ " + timeLeft + "s";

  timerId = setInterval(function () {

    timeLeft--;

    timerDisplay.innerHTML = "⏱ " + timeLeft + "s";

    // auto next
    if (timeLeft == 0) {

      clearInterval(timerId);

      if (current < questions.length - 1) {
        current++;
        showQuestion();
      } else {
        submitQuiz();
      }
    }

  }, 1000);
}


// Next Button
document.getElementById("next-btn").onclick = function () {

  if (current < questions.length - 1) {
    current++;
    showQuestion();
  }

};


// Previous Button
document.getElementById("prev-btn").onclick = function () {

  if (current > 0) {
    current--;
    showQuestion();
  }

};


// Submit
document.getElementById("submit-btn").onclick = function () {
  submitQuiz();
};


// Result
function submitQuiz() {

  clearInterval(timerId);

  let score = 0;

  // check answers
  for (let i = 0; i < questions.length; i++) {

    if (answers[i] == questions[i].correctAnswer) {
      score++;
    }

  }

  let wrong = questions.length - score;
  let percent = (score / questions.length) * 100;

  quiz.classList.remove("active");
  result.classList.add("active");

  document.getElementById("result-total").innerHTML = questions.length;
  document.getElementById("result-correct").innerHTML = score;
  document.getElementById("result-wrong").innerHTML = wrong;
  document.getElementById("result-percentage").innerHTML = percent + "%";

  // message
  if (percent >= 80) {
    document.getElementById("performance-message").innerHTML = "Excellent!";
  }
  else if (percent >= 50) {
    document.getElementById("performance-message").innerHTML = "Good Job!";
  }
  else {
    document.getElementById("performance-message").innerHTML = "Keep Practicing!";
  }

}


// Restart
document.getElementById("restart-btn").onclick = function () {

  clearInterval(timerId);

  current = 0;
  answers = [];

  result.classList.remove("active");
  welcome.classList.add("active");

};