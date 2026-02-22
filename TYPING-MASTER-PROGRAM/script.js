const showBox = document.getElementById("SHOW_BOX");
const typeBox = document.getElementById("INPUT_TYPE");
function CLEAR_INPUT_BOX() {
    const inp = document.getElementById("INPUT_TYPE");
    const colorDiv = document.getElementById("colorText");

    inp.value = "";
    colorDiv.innerHTML = "";

    correct = 0;
    incorrect = 0;
    correctBox.value = 0;
    incorrectBox.value = 0;
}


const correctBox = document.getElementById("correctCharacters");
const incorrectBox = document.getElementById("incorrectCharacters");
const SOUND = document.querySelector("#MUTE_CHEAK");

let correct = 0;
let incorrect = 0;

// typeBox.addEventListener("input", function () {

//     let givenText = showBox.innerText;
//     let typedText = typeBox.value;

//     if (typedText.length > givenText.length) {
//         typeBox.value = typedText.substring(0, givenText.length);
//         typedText = typeBox.value;
//     }

//     correct = 0;
//     incorrect = 0;

//     for (let i = 0; i < typedText.length; i++) {
//         if (typedText[i] === givenText[i]) {
//             correct++;
//         } else {
//             incorrect++;
//         }
//     }

//     correctBox.value = correct;
//     incorrectBox.value = incorrect;
// });


const easy = [
    "I like to learn new things every day.",
    "Books are our best friends.",
    "The sun rises in the east.",
    "Practice makes a person perfect.",
    "I wake up early every morning."
];

const medium = [
    "Typing is an important skill in today digital world.",
    "Technology has changed our lifestyle completely.",
    "Learning programming requires regular practice.",
    "Hard work always brings success in life.",
    "Computers are used in almost every field today."
];

const hard = [
    "Consistency is more important than motivation in the long run.",
    "Artificial intelligence is transforming modern industries rapidly.",
    "Time management helps balance work and personal life.",
    "Continuous learning is essential in a competitive environment.",
    "Self confidence improves problem solving abilities."
];

function loadParagraph() {
    // SOUND_CHEAK();
    
    const level = document.getElementById("level").value;
    const showBox = document.getElementById("SHOW_BOX");
    const TEXT_ARA_INPUT = document.getElementById("INPUT_TYPE");
    let value1 = document.getElementById("CUSTOM_INPUT");


    if (level === "") {
        showBox.innerText = "";
        TEXT_ARA_INPUT.disabled = true;
        value1.style.display = "none";
        SOUND.disabled = true;
            document.getElementById("SUMMID_BTN").disabled = true;


        CLEAR_INPUT_BOX();



        return;
    }

    let arr;

    if (level === "easy") {

        arr = easy;
        TEXT_ARA_INPUT.disabled = false;
        value1.style.display = "none";
        SOUND.disabled = false;
        document.getElementById("SUMMID_BTN").disabled = false;

        CLEAR_INPUT_BOX();



    }
    else if (level === "medium") {
        arr = medium;
        TEXT_ARA_INPUT.disabled = false;
        value1.style.display = "none";
        SOUND.disabled = false;
        document.getElementById("SUMMID_BTN").disabled = false;

        CLEAR_INPUT_BOX();




    }
    else if (level === "hard") {
        arr = hard;
        TEXT_ARA_INPUT.disabled = false;
        value1.style.display = "none";
        SOUND.disabled = false;
        document.getElementById("SUMMID_BTN").disabled = false;

        CLEAR_INPUT_BOX();




    }
    else {
        TEXT_ARA_INPUT.disabled = false;
        value1.style.display = "block";
        showBox.innerText = "";
        SOUND.disabled = false;
        document.getElementById("SUMMID_BTN").disabled = false;

        CLEAR_INPUT_BOX();


        return;

    }

    const randomIndex = Math.floor(Math.random() * arr.length);
    showBox.innerText = arr[randomIndex];


    let text = showBox.innerText;

    // for (let i = 0; i < text.length; i++) {
    //     // console.log(text[i]);
    // }


}

function colorWords() {

    const givenText = showBox.innerText;
    let typedText = typeBox.value;

    if (typedText.length > givenText.length) {
        typeBox.value = typedText.substring(0, givenText.length);
        typedText = typeBox.value;
    }

    let html = "";
    let correct = 0;
    let incorrect = 0;


    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === givenText[i]) {
            html += `<span class="correct">${typedText[i]}</span>`;
            correct++;
        } else {
            html += `<span class="incorrect">${typedText[i]}</span>`;
            incorrect++;
        }
    }



    document.getElementById("colorText").innerHTML = html;

    correctBox.value = correct;
    incorrectBox.value = incorrect;
}



let TOTAL_SECONDS = 3600;
let TIMER_ID = null;
let IS_PAUSED = false;

function START_TIMER() {
    // let TIME =  document.getElementById("COUNT_TIME");
    if (TIMER_ID !== null) {
        return;
    }

    TIMER_ID = setInterval(function () {

        let HOURS = Math.floor(TOTAL_SECONDS / 3600);
        let MINUTES = Math.floor((TOTAL_SECONDS % 3600) / 60);
        let SECONDS = TOTAL_SECONDS % 60;

        document.getElementById("COUNT_TIME").innerText =
            FORMAT_TIME(HOURS) + ":" +
            FORMAT_TIME(MINUTES) + ":" +
            FORMAT_TIME(SECONDS);

        TOTAL_SECONDS--;

        if (TOTAL_SECONDS < 0) {
            clearInterval(TIMER_ID);
            TIMER_ID = null;
        }
        document.getElementById("PAUSE_TIMER").disabled = false;
        document.getElementById("RESET_TIMER").disabled = false;
        // document.getElementById("SUMMID_BTN").disabled = false;


    }, 1000);
}
function FORMAT_TIME(VALUE) {
    return VALUE < 10 ? "0" + VALUE : VALUE;
}
function RESET_TIMER() {
    clearInterval(TIMER_ID);
    START_TIMER();
    TIMER_ID = null;
    TOTAL_SECONDS = 3600;
    document.getElementById("COUNT_TIME").innerText = "01:00:00";
}

function CHEAK_BTN() {
    let BTN_TEXT = document.getElementById("PAUSE_TIMER");
    if (BTN_TEXT.innerText == "Pause Timer") {
        PAUSE_TIMER();
        BTN_TEXT.innerText = "Resume Timer";
    }
    else {
        RESUME_TIMER()
        BTN_TEXT.innerText = "Pause Timer";

    }
}

function RESUME_TIMER() {

    if (!IS_PAUSED) {
        return;
    }

    IS_PAUSED = false;
    START_TIMER();
}
function PAUSE_TIMER() {
    if (TIMER_ID === null) {
        return;
    }

    clearInterval(TIMER_ID);
    TIMER_ID = null;
    IS_PAUSED = true;
}
function CONFORM_BTN() {
    CELEBRATE();
    document.getElementById("FOOTER_DIV").style.display = "block";
    let GIVEN_TEXT = document.getElementById("SHOW_BOX").innerText;
    let TYPED_TEXT = document.getElementById("INPUT_TYPE").value;

    let CORRECT_CHARS = 0;
    let INCORRECT_CHARS = 0;
    let SKIPPED_CHARS = 0;

    for (let i = 0; i < GIVEN_TEXT.length; i++) {

        if (TYPED_TEXT[i] === undefined) {
            SKIPPED_CHARS++;
        }
        else if (TYPED_TEXT[i] === GIVEN_TEXT[i]) {
            CORRECT_CHARS++;
        }
        else {
            INCORRECT_CHARS++;
        }
    }

    let GIVEN_WORDS = GIVEN_TEXT.split(" ");
    let TYPED_WORDS = TYPED_TEXT.split(" ");

    let CORRECT_WORDS = 0;
    let INCORRECT_WORDS = 0;
    let SKIPPED_WORDS = 0;

    for (let i = 0; i < GIVEN_WORDS.length; i++) {

        if (TYPED_WORDS[i] === undefined) {
            SKIPPED_WORDS++;
        }
        else if (TYPED_WORDS[i] === GIVEN_WORDS[i]) {
            CORRECT_WORDS++;
        }
        else {
            INCORRECT_WORDS++;
        }
    }

    let TOTAL_TYPED = CORRECT_CHARS + INCORRECT_CHARS;
    let ACCURACY = 0;

    if (TOTAL_TYPED > 0) {
        ACCURACY = (CORRECT_CHARS * 100) / TOTAL_TYPED;
    }

    let TIME_MINUTES = (3600 - TOTAL_SECONDS) / 60;
    let WPM = 0;

    if (TIME_MINUTES > 0) {
        WPM = TYPED_WORDS.length / TIME_MINUTES;
    }

    document.getElementById("correctCharacters").value = CORRECT_CHARS;
    document.getElementById("incorrectCharacters").value = INCORRECT_CHARS;
    document.getElementById("skippedCharacters").value = SKIPPED_CHARS;

    document.getElementById("correctWords").value = CORRECT_WORDS;
    document.getElementById("incorrectWords").value = INCORRECT_WORDS;
    document.getElementById("skippedWords").value = SKIPPED_WORDS;

    document.getElementById("totalAccuracy").value = ACCURACY.toFixed(2) + "%";
    document.getElementById("wpm").value = Math.round(WPM);
    document.getElementById("SUMMID_BTN").disabled = true;
    //  document.getElementById("PAUSE_TIMER").disabled = true;
    // document.getElementById("RESET_TIMER").disabled = true;
    ON_CONFORM_DISABLE();

    clearInterval(TIMER_ID);
    TIMER_ID = null;

}
const muteCheckbox = document.getElementById("MUTE_CHEAK");
const keySound = new Audio("audio.mp3");

document.addEventListener("keydown", function () {

    if (typeBox.disabled) return;
    if (muteCheckbox.checked) return;

    keySound.currentTime = 0;
    keySound.play().catch(() => {});
});



const MASTER_TEXT = `
Hard work always brings success in life. Learning programming
requires patience and practice. Consistency is the key to growth.
Technology has changed the way we live and work today. Education
plays an important role in shaping our future. Confidence and
discipline help achieve goals in life. Skills improve with daily
practice and effort. Focus and dedication lead to success.
Time management is essential for productivity. Never stop learning.
`.repeat(10);
function LOAD_WORDS_BASIC() {

    let COUNT = document.getElementById("costom_input").value;
    let SHOW_BOX = document.getElementById("SHOW_BOX");

    let WORDS = MASTER_TEXT.split(" ");

    let RESULT_TEXT = "";
    for (let i = 0; i < COUNT; i++) {

        RESULT_TEXT = RESULT_TEXT + WORDS[i] + " ";
    }

    SHOW_BOX.innerText = RESULT_TEXT;
}
function syncScroll() {
    const input = document.getElementById("INPUT_TYPE");
    const colorDiv = document.getElementById("colorText");

    colorDiv.scrollTop = input.scrollTop;
}

function CELEBRATE() {
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = RANDOM_COLOR();
        confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

function RANDOM_COLOR() {
    let colors = ["red", "yellow", "green", "blue", "pink", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
}


function ON_CONFORM_DISABLE() {

    document.getElementById("level").disabled = true;

    document.getElementById("costom_input").disabled = true;
    document.getElementById("costum_btn").disabled = true;

    document.getElementById("INPUT_TYPE").disabled = true;
    document.getElementById("INPUT_TYPE").focus();

    document.getElementById("PAUSE_TIMER").disabled = true;
    document.getElementById("RESET_TIMER").disabled = true;
    document.getElementById("SUMMID_BTN").disabled = true;

    document.getElementById("MUTE_CHEAK").disabled = true;
}

function DISABLE_COPY_PASTE() {

    const box = document.getElementById("INPUT_TYPE");

    box.onpaste = function () {
        return false;
    };

    box.oncopy = function () {
        return false;
    };

    box.oncut = function () {
        return false;
    };

    box.onkeydown = function (e) {
        if (e.ctrlKey && (e.key === "v" || e.key === "c" || e.key === "x")) {
            return false;
        }
    };
}
