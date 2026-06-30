// ===== Quiz Data (JavaScript Questions) =====
const questions = [
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["int", "var", "string", "define"],
    correctAnswer: 1
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
    question: "What does 'DOM' stand for?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Document Order Model",
      "Display Object Model"
    ],
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
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "constant"],
    correctAnswer: 2
  }
];

// ===== State Variables =====
let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

// ===== DOM Elements =====
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");

const totalQuestionsDisplay = document.getElementById("total-questions-display");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const resultTotal = document.getElementById("result-total");
const resultCorrect = document.getElementById("result-correct");
const resultWrong = document.getElementById("result-wrong");
const resultPercentage = document.getElementById("result-percentage");
const performanceMessage = document.getElementById("performance-message");

// ===== Initialize =====
totalQuestionsDisplay.textContent = questions.length;

// ===== Screen Switching =====
function showScreen(screen) {
  [welcomeScreen, quizScreen, resultScreen].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

// ===== Start Quiz =====
startBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  userAnswers = new Array(questions.length).fill(null);
  showScreen(quizScreen);
  loadQuestion();
});

// ===== Load Question =====
function loadQuestion() {
  const q = questions[currentQuestionIndex];

  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressFill.style.width = progressPercent + "%";

  questionText.textContent = q.question;

  optionsContainer.innerHTML = "";
  q.options.forEach((optionText, index) => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("option");
    optionDiv.textContent = optionText;
    optionDiv.dataset.index = index;

    if (userAnswers[currentQuestionIndex] === index) {
      optionDiv.classList.add("selected");
    }

    optionDiv.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(optionDiv);
  });

  prevBtn.disabled = currentQuestionIndex === 0;

  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }
}

// ===== Select Option =====
function selectOption(index) {
  userAnswers[currentQuestionIndex] = index;

  const allOptions = optionsContainer.querySelectorAll(".option");
  allOptions.forEach(opt => opt.classList.remove("selected"));
  allOptions[index].classList.add("selected");
}

// ===== Navigation =====
prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
});

// ===== Submit Quiz =====
submitBtn.addEventListener("click", () => {
  let correctCount = 0;
  let wrongCount = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.correctAnswer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const percentage = Math.round((correctCount / questions.length) * 100);

  resultTotal.textContent = questions.length;
  resultCorrect.textContent = correctCount;
  resultWrong.textContent = wrongCount;
  resultPercentage.textContent = percentage + "%";

  let message = "";
  if (percentage >= 90) {
    message = "Excellent!";
  } else if (percentage >= 70) {
    message = "Great Job!";
  } else if (percentage >= 50) {
    message = "Good Effort!";
  } else {
    message = "Keep Practicing!";
  }
  performanceMessage.textContent = message;

  showScreen(resultScreen);
});

// ===== Restart Quiz =====
restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  userAnswers = new Array(questions.length).fill(null);
  showScreen(welcomeScreen);
});