document.addEventListener("DOMContentLoaded", () => {
    const elements = getLandingElements();

    initLandingAnimations(elements);
    bindLandingEvents(elements);
});

const getLandingElements = () => ({
    box: document.querySelector(".box"),
    sideImage: document.querySelector(".box2"),
    logo: document.querySelector(".logo"),
    upperLogo: document.querySelector(".upper-logo"),
    termsCheck: document.querySelector("#terms-check"),
    startButton: document.querySelector("#start-btn")
});

const animateTermsBox = ({ box }) => {
    if (!box) {
        return;
    }

    requestAnimationFrame(() => {
        box.classList.add("is-visible");
    });
};

const animateSideImage = ({ sideImage }) => {
    if (!sideImage) {
        return;
    }

    setTimeout(() => {
        sideImage.classList.add("is-visible");
    }, 220);
};

const animateLogo = ({ logo }) => {
    if (!logo) {
        return;
    }

    setTimeout(() => {
        logo.classList.add("is-visible");
    }, 420);
};

const animateUpperLogo = ({ upperLogo }) => {
    if (!upperLogo) {
        return;
    }

    setTimeout(() => {
        upperLogo.classList.add("is-visible");
    }, 320);
};

const initLandingAnimations = (elements) => {
    animateTermsBox(elements);
    animateSideImage(elements);
    animateUpperLogo(elements);
    animateLogo(elements);
};

const goToGamePage = () => {
    sessionStorage.setItem("kbc-logo-entry", "1");
    window.location.href = "/KBC_QUIZ_GAME_APPLICATION/assets/pages/index.html";
};

const showTermsAlert = () => {
    if (typeof Swal !== "undefined") {
        Swal.fire({
            title: "Terms Required",
            text: "Please accept the terms and conditions first.",
            icon: "warning",
            confirmButtonText: "OK"
        });
        return;
    }

    alert("Please accept the terms and conditions first.");
};

const animateLogoToGamePage = ({ logo }) => {
    if (!logo) {
        goToGamePage();
        return;
    }

    logo.classList.add("is-launching");

    setTimeout(() => {
        goToGamePage();
    }, 860);
};

const handleStartClick = (elements) => {
    const { termsCheck } = elements;

    if (!termsCheck || !termsCheck.checked) {
        showTermsAlert();
        return;
    }

    animateLogoToGamePage(elements);
};

const bindLandingEvents = (elements) => {
    if (!elements.startButton) {
        return;
    }

    elements.startButton.addEventListener("click", () => {
        handleStartClick(elements);
    });
};
