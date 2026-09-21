const questions = [
  {
    q: "Which language is mainly used to structure a web page?",
    a: ["Python", "HTML", "SQL", "C++"],
    correct: 1
  },
  {
    q: "Which CSS property changes the text color?",
    a: ["font-size", "background", "color", "display"],
    correct: 2
  },
  {
    q: "Which one is a JavaScript data type?",
    a: ["String", "Table", "Selector", "Style"],
    correct: 0
  },
  {
    q: "What does CPU stand for?",
    a: ["Central Processing Unit", "Computer Personal Unit", "Control Program Utility", "Central Program User"],
    correct: 0
  },
  {
    q: "Which HTML tag is used for the largest heading?",
    a: ["<h6>", "<head>", "<h1>", "<title>"],
    correct: 2
  }
];

let current = 0;
let score = 0;
let selected = null;
let time = 3600;

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const number = document.getElementById("number");
const progress = document.getElementById("progress");
const next = document.getElementById("next");

document.getElementById("studentName").textContent =
  sessionStorage.getItem("studentName") || "Student";
document.getElementById("studentId").textContent =
  sessionStorage.getItem("studentId") || "—";

function showQuestion() {
  const item = questions[current];
  question.textContent = item.q;
  number.textContent = current + 1;
  progress.style.width = `${((current + 1) / questions.length) * 100}%`;
  answers.innerHTML = "";
  selected = null;

  item.a.forEach((answer, i) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.onclick = () => {
      document.querySelectorAll(".answers button").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
      selected = i;
    };
    answers.appendChild(button);
  });
}

next.onclick = () => {
  if (selected === null) {
    alert("Please choose an answer first.");
    return;
  }

  if (selected === questions[current].correct) score++;

  if (current === questions.length - 1) {
    sessionStorage.setItem("score", score);
    window.location.href = "result.html";
    return;
  }

  current++;
  showQuestion();
};

setInterval(() => {
  time--;
  const min = Math.floor(time / 60).toString().padStart(2, "0");
  const sec = (time % 60).toString().padStart(2, "0");
  document.getElementById("timer").textContent = `${min}:${sec}`;

  if (time <= 0) window.location.href = "result.html";
}, 1000);

showQuestion();
