const questions = [
    {
        question: "JavaScript kis type ki language hai?",
        options: ["Compiled", "Interpreted", "Machine", "Binary"],
        correct: 1
    },
    {
        question: "HTML ka full form kya hai?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "None"
        ],
        correct: 0
    },
    {
        question: "CSS ka use kisliye hota hai?",
        options: ["Structure", "Styling", "Database", "Server"],
        correct: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript (single line)?",
        options: ["//", "##", "<!-- -->", "**"],
        correct: 0
    },
    {
        question: "Which method is used to print in console?",
        options: ["print()", "console.log()", "echo()", "write()"],
        correct: 1
    },
    {
        question: "Which operator is used for strict equality?",
        options: ["==", "=", "===", "!="],
        correct: 2
    },
    {
        question: "Which keyword is used to declare constant in JS?",
        options: ["let", "var", "const", "static"],
        correct: 2
    },
    {
        question: "Which loop runs at least one time?",
        options: ["for", "while", "do...while", "foreach"],
        correct: 2
    },
    {
        question: "Which tag is used to link JS file?",
        options: ["<js>", "<script>", "<link>", "<style>"],
        correct: 1
    },
    {
        question: "Which method converts string to number?",
        options: ["parseInt()", "toString()", "join()", "push()"],
        correct: 0
    },
    {
        question: "Which array method adds element at end?",
        options: ["push()", "pop()", "shift()", "slice()"],
        correct: 0
    },
    {
        question: "Which array method removes last element?",
        options: ["push()", "pop()", "shift()", "splice()"],
        correct: 1
    },
    {
        question: "Which event occurs when button is clicked?",
        options: ["hover", "change", "click", "load"],
        correct: 2
    },
    {
        question: "Which symbol is used for template literal?",
        options: ["'", "\"", "`", "#"],
        correct: 2
    },
    {
        question: "Which keyword is used to create function?",
        options: ["func", "function", "def", "method"],
        correct: 1
    },
    {
        question: "Which data type is not primitive?",
        options: ["String", "Number", "Boolean", "Object"],
        correct: 3
    },
    {
        question: "Which method joins array elements?",
        options: ["join()", "push()", "map()", "filter()"],
        correct: 0
    },
    {
        question: "Which method loops over array?",
        options: ["map()", "push()", "pop()", "join()"],
        correct: 0
    },
    {
        question: "Which operator is used for NOT?",
        options: ["!", "&", "|", "%"],
        correct: 0
    },
    {
        question: "Which symbol is used for logical AND?",
        options: ["&&", "||", "!!", "%%"],
        correct: 0
    },
    {
        question: "Which symbol is used for logical OR?",
        options: ["&&", "||", "^^", "//"],
        correct: 1
    },
    {
        question: "Which keyword is block scoped?",
        options: ["var", "let", "int", "static"],
        correct: 1
    },
    {
        question: "Which function is used to show alert box?",
        options: ["alert()", "print()", "log()", "confirmBox()"],
        correct: 0
    }
];

let currentIndex = 0;
let score = 0;
let timerInterval;  

let btn = document.querySelector("#btn");
btn.disabled = true;

function loadQuestion() {

    const q = questions[currentIndex];
    let html = "<h3>" + q.question + "</h3>";

    for (let i = 0; i < q.options.length; i++) {
        html += "<button onclick='checkAnswer(" + i + ")'>"
            + q.options[i] +
            "</button>";
    }

    document.getElementById("quizBox").innerHTML = html;
}

function checkAnswer(selected) {

    const correctIndex = questions[currentIndex].correct;
    const buttons = document.querySelectorAll("#quizBox button");

    if (selected == correctIndex) {
        score++;
    }

    for (let i = 0; i < buttons.length; i++) {

        if (i == correctIndex) {
            buttons[i].style.backgroundColor = "green";
        } else {
            buttons[i].style.backgroundColor = "red";
        }

        buttons[i].disabled = true;
    }

    btn.disabled = false;
}
startTimer();

function nextQuestion() {

    currentIndex++;
    btn.disabled = true;

    if (currentIndex < questions.length) {
        loadQuestion();
        startTimer();
    } else {
        document.getElementById("quizBox").innerHTML =
            "<h3>Quiz Finished</h3><p>Your Score: "
            + score + " / " + questions.length + "</p>";
    }
}
function autoTimeUp() {

    const correctIndex = questions[currentIndex].correct;
    const buttons = document.querySelectorAll("#quizBox button");

    for (let i = 0; i < buttons.length; i++) {

        if (i == correctIndex) {
            buttons[i].style.backgroundColor = "green";
        } else {
            buttons[i].style.backgroundColor = "red";
        }

        buttons[i].disabled = true;
    }

    setTimeout(() => {
        nextQuestion();
    }, 2000); 
}


function startTimer() {

    clearInterval(timerInterval);   
    let seconds = 60;
    const timerDisplay = document.querySelector(".timer");

    timerDisplay.innerText = seconds;

    timerInterval = setInterval(() => {

        seconds--;
        timerDisplay.innerText = seconds;

        if (seconds <= 0) {
            clearInterval(timerInterval);
            timerDisplay.innerText = "Time Up!";
            autoTimeUp();
        }

    }, 1000);
}