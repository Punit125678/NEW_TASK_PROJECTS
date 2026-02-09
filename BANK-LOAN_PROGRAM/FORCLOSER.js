const fcPrincipal = document.getElementById("FC_PRINCIPAL");
const fcMonths = document.getElementById("FC_MONTHS");
const fcRate = document.getElementById("FC_RATE");
const fcBtn = document.getElementById("FC_CALCULATE");
const fcAccount = document.getElementById("FC_ACCOUNT");
const fcName = document.getElementById("FC_NAME");
const fcPrefix = document.getElementById("FC_PREFIX");

let errorTimers = {};

fcBtn.disabled = true;

if (fcAccount) fcAccount.addEventListener("input", accountInput);
if (fcPrincipal) fcPrincipal.addEventListener("input", principalInput);
if (fcMonths) fcMonths.addEventListener("input", monthsInput);
if (fcRate) fcRate.addEventListener("input", rateInput);
if (fcName) fcName.addEventListener("input", nameInput);
if (fcPrefix) fcPrefix.addEventListener("change", prefixChange);
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
        SHOW_ERROR("accountError", "Account number can be max 11 digits", 5);
    } 
    else if (input.value !== value) {
        SHOW_ERROR("accountError", "Only numbers are allowed", 5);
    } 
    else {
        error.style.display = "none";
        error.classList.remove("show");
        if (errorTimers["accountError"]) {
            clearTimeout(errorTimers["accountError"]);
        }
    }

    input.value = value;
    checkFCButton();
}

function principalInput() {

    let value = fcPrincipal.value;

    value = value.replace(/[^0-9]/g, "");
    fcPrincipal.value = value;

    let amount = Number(value);
    let error = document.getElementById("principalError");

    const MIN = 10000;
    const MAX = 5000000;

    
    if (value === "") {
        error.style.display = "none";
        error.classList.remove("show");
        if (errorTimers["principalError"]) clearTimeout(errorTimers["principalError"]);
    }
    else if (amount < MIN) {
         SHOW_ERROR(
        "principalError",
        `Minimum principal amount ₹${MIN.toLocaleString()}`,
        5
    );
    }
    else if (amount > MAX) {
         SHOW_ERROR(
        "principalError",
        `Maximum principal amount ₹${MAX.toLocaleString()}`,
        5
    );
        fcPrincipal.value = MAX;
    }
    else {
        error.style.display = "none";
        error.classList.remove("show");
        if (errorTimers["principalError"]) clearTimeout(errorTimers["principalError"]);
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
        error.classList.remove("show");
    }
    else if (rate < MIN) {
        SHOW_ERROR("rateError", "Rate cannot be negative", 4);
    }
    else if (rate > MAX) {
        SHOW_ERROR("rateError", `Foreclosure charge cannot exceed ${MAX}%`, 4);
        input.value = MAX;
    }
    else {
        error.style.display = "none";
        error.classList.remove("show");
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
        error.classList.remove("show");
    }
    else if (months < MIN) {
        SHOW_ERROR("monthsError", `Minimum tenure is ${MIN} month`, 4);
    }
    else if (months > MAX) {
        SHOW_ERROR("monthsError", `Maximum tenure is ${MAX} months`, 4);
        input.value = MAX;  
    }
    else {
        error.style.display = "none";
        error.classList.remove("show");
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
function SHOW_ERROR(id, message, seconds = 4) {
    const el = document.getElementById(id);
    if (!el) return;

    el.innerText = message;
    el.style.display = "block";
    el.classList.add("show");

    if (errorTimers[id]) {
        clearTimeout(errorTimers[id]);
    }

    errorTimers[id] = setTimeout(() => {
        el.classList.remove("show");
        el.style.display = "none";

       
        checkFCButton();

    }, seconds * 1000);
}


function nameInput() {

    let nameField = document.getElementById("FC_NAME");
    let err = document.getElementById("ERR_NAME");

    let value = nameField.value;

    if (/[^a-zA-Z\s]/.test(value)) {
        SHOW_ERROR("ERR_NAME", "Only alphabets allowed", 3);
        nameField.style.border = "2px solid red";
    } else {
        err.style.display = "none";
        err.classList.remove("show");
        nameField.style.border = "";
        if (errorTimers["ERR_NAME"]) {
            clearTimeout(errorTimers["ERR_NAME"]);
        }
    }

    value = value.replace(/[^a-zA-Z\s]/g, "");

    value = value.replace(/\s+/g, " ").trim();

    nameField.value = value;
    checkFCButton();
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

