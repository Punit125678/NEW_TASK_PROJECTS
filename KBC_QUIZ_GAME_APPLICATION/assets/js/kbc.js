document.addEventListener("DOMContentLoaded", () => {
    const elements = getElements();
    // console.log(elements);
    const state = createState();


    playLogoArrivalAnimation();
    initSteps(elements.steps);
    renderQuestion(elements, state);
    bindEvents(elements, state);
    initAnimations(elements);
    
});

const getElements = () => ({
    hero: document.querySelector(".hero"),
    footer: document.querySelector(".foder"),
    pollTrigger: document.querySelector("#odianas-poll"),
    pollLifeline: document.querySelector(".poll-bars"),
    lifeline50: document.querySelector(".none50-50"),
    pollModal: document.querySelector(".main-box"),
    pollClose: document.querySelector(".close"),
    pollbtns: document.querySelector(".lifeline"),
    askspeclist: document.querySelector(".expert-modal"),
    askbtn: document.querySelector(".on-call"),
    changequeastion: document.querySelector(".change-queastion"),
    heroItems: [
        document.querySelector(".head"),
        document.querySelector(".picher"),
        document.querySelector(".right-side"),
        document.querySelector(".correct1")
    ].filter(Boolean),
    lifelineItems: Array.from(document.querySelectorAll(".lifeline > div")),
    questionEl: document.querySelector(".question"),
    optionEls: Array.from(document.querySelectorAll(".option")),
    steps: Array.from(document.querySelectorAll(".ladder .step")),
    odi_poll: document.querySelector(".poll-bars")
});

const createState = () => ({
    currentQuestionIndex: 0,
    isLocked: false,
    questions: [
        {
            question: "What is the largest planet in the Solar System?",
            options: ["Saturn", "Mars", "Jupiter", "Earth"],
            correct: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Mercury", "Saturn"],
            correct: 1
        },
        {
            question: "Who wrote the Indian national anthem?",
            options: ["Premchand", "Rabindranath Tagore", "Sarojini Naidu", "Bankim Chandra"],
            correct: 1
        },
        {
            question: "Which ocean is the largest on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
            correct: 2
        }
    ]
});

const initSteps = (steps) => {
    steps.forEach((step) => {
        step.style.position = "relative";
        step.style.top = "10px";
        step.style.opacity = "0";
    });

    steps
        .slice()
        .reverse()
        .forEach((step, index) => {
            setTimeout(() => {
                step.style.transition = "top 300ms ease, opacity 300ms ease";
                step.style.top = "0";
                step.style.opacity = "1";
            }, index * 120);
        });
};

const playLogoArrivalAnimation = () => {
    if (sessionStorage.getItem("kbc-logo-entry") !== "1") {
        return;
    }

    const logo = document.querySelector(".head-overlay .logo");

    if (!logo) {
        sessionStorage.removeItem("kbc-logo-entry");
        return;
    }

    logo.classList.add("logo-arrive");
    sessionStorage.removeItem("kbc-logo-entry");
};

const playQuestionAnimation = ({ questionEl, optionEls }) => {
    if (questionEl) {
        questionEl.classList.remove("question-enter");
        void questionEl.offsetWidth;
        questionEl.classList.add("question-enter");
    }

    optionEls.forEach((option, index) => {
        option.classList.remove("option-enter");
        option.style.animationDelay = `${index * 0.08}s`;
        void option.offsetWidth;
        option.classList.add("option-enter");
    });
};

const getCurrentQuestion = (state) => state.questions[state.currentQuestionIndex];
// alert(getCurrentQuestion);
const renderQuestionText = (questionEl, currentQuestion) => {
    if (!questionEl || !currentQuestion) {
        return;
    }

    questionEl.textContent = currentQuestion.question;
    // alert(questionEl);
};

const resetOptionState = (option) => {
    option.classList.remove("correct");
    option.disabled = false;
};

const renderOption = (option, optionIndex, currentQuestion) => {
    const keyEl = option.querySelector(".key");
    const textEl = option.querySelector("span:last-child");

    
    resetOptionState(option);

    if (keyEl) {
        keyEl.textContent = `${String.fromCharCode(65 + optionIndex)}:`;
        // alert(keyEl);
    }
    // alert(String.fromCharCode(65 + optionIndex));

    if (textEl) {
        textEl.textContent = currentQuestion.options[optionIndex] ?? "";
        // alert(textEl);
    }
};

const renderOptions = (optionEls, currentQuestion) => {
    optionEls.forEach((option, index) => {
        renderOption(option, index, currentQuestion);
    });
};

const changequeations =  (elements,state)=>
        {
            nextQuestion(elements,state);
        };

const renderQuestion = (elements, state) => {
    const { questionEl, optionEls } = elements;
    const currentQuestion = getCurrentQuestion(state);

    if (!currentQuestion || !questionEl) {
        return;
    }

    renderQuestionText(questionEl, currentQuestion);
    renderOptions(optionEls, currentQuestion);

    playQuestionAnimation(elements);
};

const nextQuestion = (elements, state) => {
    state.currentQuestionIndex = (state.currentQuestionIndex + 1) % state.questions.length;
    state.isLocked = false;
     disabled50(elements, state);
    renderQuestion(elements, state);
};

const handleOptionClick = (event, elements, state) => {
    const selectedOption = event.currentTarget;
    const selectedIndex = elements.optionEls.indexOf(selectedOption);
    const currentQuestion = getCurrentQuestion(state);

    if (state.isLocked || !currentQuestion) {
        return;
    }

    state.isLocked = true;

    elements.optionEls.forEach((option) => {
        option.disabled = true;
    });


    elements.optionEls[currentQuestion.correct].classList.add("correct");

    setTimeout(() => {
        if (selectedIndex === currentQuestion.correct) {
            nextQuestion(elements, state);
            return;
        }

        state.isLocked = false;
        elements.optionEls.forEach((option) => {
            option.disabled = false;
            option.classList.remove("correct");
        });
    }, 700);
};




const openPoll = ({ pollModal, pollLifeline }) => {
    if (!pollModal || !pollLifeline || pollLifeline.classList.contains("used")) {
        return;
    }

    pollLifeline.classList.add("used");

    console.log(document.querySelector(".odians-poll"));
    setTimeout(() => {
        const btn = document.querySelector(".odians-poll");
        btn.style.display = "none";
    }, 1000);
    pollModal.classList.remove("is-closing");
    pollModal.classList.add("is-opening");

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            pollModal.classList.add("is-open");
        });
    });
};

const closePoll = ({ pollModal }) => {
    if (!pollModal || !pollModal.classList.contains("is-open")) {
        return;
    }

    pollModal.classList.remove("is-open");
    pollModal.classList.add("is-closing");



    setTimeout(() => {
        pollModal.classList.remove("is-closing");
        pollModal.classList.remove("is-opening");

    }, 650);
};

const initAnimations = ({ hero, footer, heroItems, lifelineItems }) => {
    if (hero) {
        hero.classList.add("show");
    }

    setTimeout(() => {
        if (footer) {
            footer.classList.add("show");
        }
    }, 200);

    setTimeout(() => {
        heroItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add("animate");
            }, index * 180);
        });
    }, 1100);

    setTimeout(() => {
        lifelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add("drop");
            }, index * 140);
        });
    }, 1750);
};

const bindEvents = (elements, state) => {
    // console.log("vishal"+state.questions.correct);
    console.log(elements);
    console.log(state);
    // const options = elements.optionEls;
    // options.forEach((option, index) => {
    //     option.style.display = "block";
    // });

    elements.optionEls.forEach((option) => {
        option.addEventListener("click", (event) => {
            handleOptionClick(event, elements, state);
        });
    });

    console.log(elements.pollTrigger);

    elements.changequeastion.addEventListener("click",()=>
    {
        changequeations(elements,state);
        elements.changequeastion.style.display = "none";
    });

    elements.pollTrigger.addEventListener("click", () => {
        odians_poll(elements, state);
        openPoll(elements);

    });

    elements.lifeline50.addEventListener("click", () => {
        lifeline50(elements, state);
        
    });

    elements.askbtn.addEventListener("click", () => {
        // alert("Hello");
        elements.askspeclist.style.display = "flex";
        askspeclistf(elements, state);
        setTimeout(() => {
            elements.askbtn.style.display = "none";
        }, 1000);
    });

    elements.askspeclist.querySelector(".expert-close").addEventListener("click", () => {
        elements.askspeclist.style.display = "none";
    });



    if (elements.pollClose) {
        elements.pollClose.addEventListener("click", () => {
            closePoll(elements);
        });
    }
};

// const odians_poll = (odi_poll, state) => {
//     if (!odi_poll) return;
//     console.log("poll trigger clicked with state => ", odi_poll)


//     console.log(odi_poll.pollLifeline);
//     for (let i = 0; i < state.questions.length; i++) {
//         console.log("Correct => " + state.questions[i].correct);
//         if (state.questions[i].correct) {
//             const bars = odi_poll.pollLifeline.querySelectorAll(".bar");

//             console.log("Eliments :- ", bars);
//         }
//     }
//     console.log("state = 2424", state.questions[0].correct);


//     const a = odi_poll.pollLifeline.querySelector(".a");
//     const b = odi_poll.pollLifeline.querySelector(".b");
//     const c = odi_poll.pollLifeline.querySelector(".c");
//     const d = odi_poll.pollLifeline.querySelector(".d");

//     a.style.height = "100px";
//     b.style.height = "100px";
//     c.style.height = "100px";
//     d.style.height = "100px";


//     console.log("Cheak!!");

//     console.log(a, b, c, d);
// };

const odians_poll = (odi_poll, state) => {

    const bars = odi_poll.pollLifeline.querySelectorAll(".bar");
    console.log("State :- ", state.questions[0].correct);
    console.log(bars);

    const correctIndex = state.questions[state.currentQuestionIndex].correct;
    // alert(correctIndex);


    bars.forEach((bar, index) => {

        let per;
        console.log("Bar :- ", bar);

        console.log("Correct Index :-", index);

        if (index === correctIndex) {
            per = Math.floor(Math.random() * 50) + 50;
            bar.style.height = per;
        } else {
            per = Math.floor(Math.random() * 20) + 10;
        }

        bar.style.height = per + "px";

        console.log("Option", index, per);
    });
};

const lifeline50 = (elements, state) => {
    lifeline50_50(elements, state);
    elements.lifeline50.style.display = "none";
};

const lifeline50_50 = (elements, state) => {

    const options = elements.optionEls;
    const correct = state.questions[state.currentQuestionIndex].correct;
    const cheak = true;

    const wrong = [];

    options.forEach((opt, index) => {
        if (index !== correct) wrong.push(index);
    });

    const keep = wrong[Math.floor(Math.random() * wrong.length)];

    options.forEach((opt, index) => {
        if (index !== correct && index !== keep) {
            opt.style.display = "none";
        }
    });


};



const  disabled50 = (elements, state) => {

    const options = elements.optionEls;
    const correct = state.questions[state.currentQuestionIndex].correct;
    const cheak = true;


    options.forEach((opt) => {
            opt.style.display = "block";
        

});
    };

const askspeclistf = (elements, state) => {
   
    const question = state.questions[state.currentQuestionIndex];
    const option = question.correct;

    // alert(correctOptionText);
    // alert(question.options[option]);
    console.log(elements.askspeclist);
    elements.askspeclist.querySelector(".expert-text")
        .innerHTML = `I think the correct answer is 
        <span style="color:yellow;font-weight:bold">
        Option ${question.options[option]}</span>`;


       

};

