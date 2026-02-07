const fcPrincipal = document.getElementById("FC_PRINCIPAL");
const fcMonths = document.getElementById("FC_MONTHS");
const fcRate = document.getElementById("FC_RATE");
const fcBtn = document.getElementById("FC_CALCULATE");
let account = document.getElementById("FC_ACCOUNT").value;


fcBtn.disabled = true;
function checkFCButton() {

    let principal = fcPrincipal.value;
    let months = fcMonths.value;
    let account = document.getElementById("FC_ACCOUNT").value;
    let btn = document.getElementById("FC_CALCULATE");
    let ret_inpt = document.getElementById("FC_RATE").value;

    let accountErr = document.getElementById("accountError");
    let principalErr = document.getElementById("principalError");
    let monthsErr = document.getElementById("monthsError");
    let rateErr = document.getElementById("rateError");

    btn.disabled = true;
    btn.classList.remove("enabled");

    if (account === "" || principal === "" || months === "" || ret_inpt === "") return;

    if (accountErr.style.display === "block") return;
    if (principalErr.style.display === "block") return;
    if (monthsErr && monthsErr.style.display === "block") return;
    if (rateErr && rateErr.style.display === "block") return;

    btn.disabled = false;
    btn.classList.add("enabled");
}


function accountInput() {

    let input = document.getElementById("FC_ACCOUNT");
    let error = document.getElementById("accountError");

    let value = input.value.replace(/[^0-9]/g, "");

    if (value.length > 11) {
        value = value.slice(0, 11);
        error.style.display = "block";
        error.innerText = "Account number can be max 11 digits";
    } 
    else if (input.value !== value) {
        error.style.display = "block";
        error.innerText = "Only numbers are allowed";
    } 
    else {
        error.style.display = "none";
    }

    input.value = value;
}

let errorTimeout; 

function principalInput() {

    let value = fcPrincipal.value;

    value = value.replace(/[^0-9]/g, "");
    fcPrincipal.value = value;

    let amount = Number(value);
    let error = document.getElementById("principalError");

    const MIN = 10000;
    const MAX = 5000000;

    function showError(msg) {
        error.innerText = msg;
        error.classList.add("show");

        clearTimeout(errorTimeout);
        errorTimeout = setTimeout(() => {
            error.classList.remove("show");
        }, 2000);
    }

    if (value === "") {
        error.classList.remove("show");
    }
    else if (amount < MIN) {
        showError(`Minimum principal amount ₹${MIN.toLocaleString()}`);
    }
    else if (amount > MAX) {
        showError(`Maximum principal amount ₹${MAX.toLocaleString()}`);
        fcPrincipal.value = MAX;
    }
    else {
        error.classList.remove("show");
    }

    checkFCButton();
}


function rateInput() {

    let input = document.getElementById("FC_RATE");
    let error = document.getElementById("rateError");

    let value = input.value;

    value = value.replace(/[^0-9.]/g, "");

    if ((value.match(/\./g) || []).length > 1) {
        value = value.slice(0, value.lastIndexOf("."));
    }

    input.value = value;

    let rate = Number(value);

    const MIN = 0;
    const MAX = 5;

    if (value === "") {
        error.style.display = "none";
    }
    else if (rate < MIN) {
        error.style.display = "block";
        error.innerText = "Rate cannot be negative";
    }
    else if (rate > MAX) {
        error.style.display = "block";
        error.innerText = `Foreclosure charge cannot exceed ${MAX}%`;
        input.value = MAX;
    }
    else {
        error.style.display = "none";
    }

    checkFCButton();
}


function monthsInput() {

    let input = document.getElementById("FC_MONTHS");
    let value = input.value;
    let error = document.getElementById("monthsError");

    const MIN = 1;
    const MAX = 360;

    value = value.replace(/[^0-9]/g, "");
    input.value = value;

    let months = Number(value);

    if (value === "") {
        error.style.display = "none";
    }
    else if (months < MIN) {
        error.style.display = "block";
        error.innerText = ` Minimum tenure is ${MIN} month`;
    }
    else if (months > MAX) {
        error.style.display = "block";
        error.innerText = ` Maximum tenure is ${MAX} months`;
        input.value = MAX;  
    }
    else {
        error.style.display = "none";
    }

    checkFCButton();
}
function calculateForeclosure() {

    let principal = Number(fcPrincipal.value);
    let chargeRate = Number(fcRate.value);

    let charges = Math.round(principal * (chargeRate / 100));
    let finalAmount = principal + charges;
    let interestSaved = Math.round(principal * 0.04);

    FC_AMOUNT.innerText = "₹" + finalAmount.toLocaleString("en-IN");
    FC_SAVED.innerText = "₹" + interestSaved.toLocaleString("en-IN");

    showNOCLetter(principal);
}
function nameInput() {

    let nameField = document.getElementById("FC_NAME");
    let err = document.getElementById("ERR_NAME");

    let value = nameField.value;

    if (/[^a-zA-Z\s]/.test(value)) {
        err.innerText = "Only alphabets allowed";
        err.style.color = "red";
        nameField.style.border = "2px solid red";
    } else {
        err.innerText = "";
        nameField.style.border = "";
    }

    value = value.replace(/[^a-zA-Z\s]/g, "");

    value = value.replace(/\s+/g, " ").trim();

    nameField.value = value;
}

function prefixChange() {
    nameInput(); 
}


function getFullName() {
    let prefix = document.getElementById("FC_PREFIX").value;
    let name = document.getElementById("FC_NAME").value;
    return prefix + " " + name;
}


function showNOCLetter(amount) {

    let account = document.getElementById("FC_ACCOUNT").value;

    NOC_DATE.innerText = new Date().toLocaleDateString("en-GB");
    NOC_NAME.innerText = getFullName();


    let maskedAccount = "XXXXXX" + account.slice(-6);
    NOC_ACCOUNT.innerText = maskedAccount;

    NOC_SANCTION_DATE.innerText = "27/12/2024";
    NOC_LOAN_AMOUNT.innerText = amount.toLocaleString("en-IN");

    NOC_AMOUNT_WORDS.innerText =
        numberToWords(amount) + " Rupees Only";

    NOC_LETTER.style.display = "block";
    document.getElementById("FORECLOSURE_BOX").style.display = "none";
}


function numberToWords(num) {

    let ones = ["", "One", "Two", "Three", "Four", "Five",
        "Six", "Seven", "Eight", "Nine"];

    let tens = ["", "Ten", "Twenty", "Thirty", "Forty",
        "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    let teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen",
        "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

    let words = "";

    if (num >= 100000) {
        let lakh = parseInt(num / 100000);
        words = words + ones[lakh] + " Lakh ";
        num = num % 100000;
    }

    if (num >= 1000) {
        let thousand = parseInt(num / 1000);
        words = words + ones[thousand] + " Thousand ";
        num = num % 1000;
    }

    if (num >= 100) {
        let hundred = parseInt(num / 100);
        words = words + ones[hundred] + " Hundred ";
        num = num % 100;
    }


    if (num >= 20) {
        let ten = parseInt(num / 10);
        words = words + tens[ten] + " ";
        num = num % 10;
    }

    if (num > 0) {
        words = words + ones[num];
    }

    return words;
}
