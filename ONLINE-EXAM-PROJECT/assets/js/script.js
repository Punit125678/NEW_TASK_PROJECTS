function validateEmail() {
    let emailInput = document.getElementById("email");
    let msg = document.getElementById("emailMsg");
    let email = emailInput.value.trim();

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (email === "") {
        msg.innerText = "Email is required";
        msg.style.color = "red";
        emailInput.style.border = "2px solid red";
        return false;
    }

    if (!emailPattern.test(email)) {
        msg.innerText = "Enter a valid email address";
        msg.style.color = "red";
        emailInput.style.border = "2px solid red";
        return false;
    }

    msg.innerText = "Valid Email";
    msg.style.color = "green";
    emailInput.style.border = "2px solid green";

    return true;
}

function validateName() {
    let nameInput = document.getElementById("name");
    let errorMsg = document.getElementById("name-error");

    let originalValue = nameInput.value;
    let hasNumber = /[0-9]/.test(originalValue);

    nameInput.value = originalValue.replace(/[0-9]/g, "");
    let name = nameInput.value.trim();

    if (name === "") {
        errorMsg.innerText = "Name is required";
        errorMsg.style.color = "red";
        nameInput.style.border = "2px solid red";
        return false;
    }

    if (hasNumber) {
        errorMsg.innerText = "Numbers are not allowed";
        errorMsg.style.color = "red";
        nameInput.style.border = "2px solid red";
        return false;
    }

    if (name.length < 3) {
        errorMsg.innerText = "Minimum 3 letters required";
        errorMsg.style.color = "red";
        nameInput.style.border = "2px solid red";
        return false;
    }

    errorMsg.innerText = "Valid Name";
    errorMsg.style.color = "green";
    nameInput.style.border = "2px solid green";

    return true;
}

document.getElementById("name").addEventListener("input", validateName);
document.getElementById("password").addEventListener("input", function () {
    let pass = this.value;

    let upper = /[A-Z]/.test(pass);
    let lower = /[a-z]/.test(pass);
    let number = /[0-9]/.test(pass);
    let special = /[!@#$%^&*]/.test(pass);
    let length = pass.length >= 6;

    check("upper", upper);
    check("lower", lower);
    check("number", number);
    check("special", special);
    check("length", length);
});

function check(id, condition) {
    let element = document.getElementById(id);
    if (condition) {
        element.classList.remove("invalid");
        element.classList.add("valid");
    } else {
        element.classList.remove("valid");
        element.classList.add("invalid");
    }
}

const imageInput = document.getElementById("imageInput");
const previewDiv = document.getElementById("previewDiv");

imageInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            previewDiv.style.backgroundImage = `url(${this.result})`;
            previewDiv.style.backgroundSize = "contain";
            previewDiv.style.backgroundRepeat = "no-repeat";
            previewDiv.style.backgroundPosition = "center";
        });

        reader.readAsDataURL(file);
    }
});

const submitBtn = document.getElementById("submitBtn");
submitBtn.disabled = true;

function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let gender = document.querySelector('input[name="gender"]:checked');
    let file = document.getElementById("imageInput").files.length;

    let emailValid = email.includes("@") && email.includes(".");
    let upper = /[A-Z]/.test(pass);
    let lower = /[a-z]/.test(pass);
    let number = /[0-9]/.test(pass);
    let special = /[!@#$%^&*]/.test(pass);
    let length = pass.length >= 6;

    let passwordValid = upper && lower && number && special && length;

    if (name !== "" && emailValid && passwordValid && dob !== "" && gender && file > 0) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", validateForm);
    input.addEventListener("change", validateForm);
});

function goToPage() {
    window.location.href = "quiz/index.html";
}