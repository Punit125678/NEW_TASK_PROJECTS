let errorTimer = {}; 

function showError(errId, message, input) {

    let err = document.getElementById(errId);

    err.innerText = message;
    err.classList.add("show");

    if (input) {
        input.style.border = "2px solid red";
    }

    if (errorTimer[errId]) {
        clearTimeout(errorTimer[errId]);
    }

    errorTimer[errId] = setTimeout(() => {
        err.classList.remove("show");
    }, 3000);
}

function clearError(errId, input) {
    let err = document.getElementById(errId);
    err.innerText = "";
    err.classList.remove("show");

    if (input) {
        input.style.border = "2px solid green";
    }
}
function LOAN_CHECK(LOAN) {

    let btn = document.getElementById("CALCULET_EMI");

    if (/[^0-9,]/.test(LOAN.value)) {
        LOAN.value = LOAN.value.replace(/[^0-9,]/g, "");
        showError("ERR_LOAN", "Only numbers allowed", LOAN);
        btn.disabled = true;
        return;
    }

    if (LOAN.value.trim() === "") {
        showError("ERR_LOAN", "Loan amount required", LOAN);
        btn.disabled = true;
        return;
    }

    let amount = Number(LOAN.value.replace(/,/g, ""));

    if (amount < 50000) {
        showError("ERR_LOAN", "Minimum loan amount is 50,000", LOAN);
        btn.disabled = true;
        return;
    }

    if (amount > 1000000000) {
        LOAN.value = (1000000000).toLocaleString("en-US");
        showError("ERR_LOAN", "Maximum loan amount is 100 Crore", LOAN);
        btn.disabled = true;
        return;
    }

    LOAN.value = amount.toLocaleString("en-US");
    clearError("ERR_LOAN", LOAN);
    CHECK_BUTTON();
}
function YEAR_CHECK(YEAR) {

    let btn = document.getElementById("CALCULET_EMI");

    if (/[^0-9]/.test(YEAR.value)) {
        YEAR.value = YEAR.value.replace(/[^0-9]/g, "");
        showError("ERR_YEAR", "Only numbers allowed", YEAR);
        btn.disabled = true;
        return;
    }

    if (YEAR.value.trim() === "") {
        showError("ERR_YEAR", "Tenure required", YEAR);
        btn.disabled = true;
        return;
    }

    let yearValue = Number(YEAR.value);

    if (yearValue < 1) {
        YEAR.value = "1";
        showError("ERR_YEAR", "Minimum tenure is 1 year", YEAR);
        btn.disabled = true;
        return;
    }

    if (yearValue > 30) {
        YEAR.value = "30";
        showError("ERR_YEAR", "Maximum tenure is 30 years", YEAR);
        btn.disabled = true;
        return;
    }

    clearError("ERR_YEAR", YEAR);
    CHECK_BUTTON();
}

function RATE_CHECK(RATE) {

    let btn = document.getElementById("CALCULET_EMI");

    if (/[^0-9.]/.test(RATE.value)) {
        RATE.value = RATE.value.replace(/[^0-9.]/g, "");
        showError("ERR_RATE", "Only numbers allowed", RATE);
        btn.disabled = true;
        return;
    }

    if ((RATE.value.match(/\./g) || []).length > 1) {
        RATE.value = RATE.value.slice(0, -1);
        showError("ERR_RATE", "Only one dot allowed", RATE);
        btn.disabled = true;
        return;
    }

    if (RATE.value.trim() === "") {
        showError("ERR_RATE", "Interest rate required", RATE);
        btn.disabled = true;
        return;
    }

    let rateValue = Number(RATE.value);

    if (rateValue < 0.1) {
        showError("ERR_RATE", "Minimum interest rate is 0.1%", RATE);
        btn.disabled = true;
        return;
    }

    if (rateValue > 30) {
        RATE.value = "30";
        showError("ERR_RATE", "Maximum interest rate is 30%", RATE);
        btn.disabled = true;
        return;
    }

    clearError("ERR_RATE", RATE);
    CHECK_BUTTON();
}

 function setWords(spanId, amount) {
    document.getElementById(spanId).innerText =
        numberToWords(amount) + " rupees only";
}

function numberToWords(num) {

    let ones = ["", "one", "two", "three", "four", "five",
                "six", "seven", "eight", "nine"];

    let teens = ["ten", "eleven", "twelve", "thirteen", "fourteen",
                 "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];

    let tens = ["", "", "twenty", "thirty", "forty",
                "fifty", "sixty", "seventy", "eighty", "ninety"];

    let words = "";

    if (num >= 10000000) {
        let crore = parseInt(num / 10000000);
        words =  words + numberToWords(crore) + " crore ";
        num = num % 10000000;
    }

    if (num >= 100000) {
        let lakh = parseInt(num / 100000);
        words = words +  numberToWords(lakh) + " lakh ";
        num = num % 100000;
    }

    if (num >= 1000) {
        let thousand = parseInt(num / 1000);
        words =  words +numberToWords(thousand) + " thousand ";
        num = num % 1000;
    }

    if (num >= 100) {
        let hundred = parseInt(num / 100);
        words += ones[hundred] + " hundred ";
        num = num % 100;
    }

    if (num >= 10 && num < 20) {
        words += teens[num - 10];
        return words.trim();
    }

    if (num >= 20) {
        let ten = parseInt(num / 10);
        words += tens[ten] + " ";
        num = num % 10;
    }

    if (num > 0) {
        words += ones[num];
    }

    return words.trim();
}

function CHECK_BUTTON()
{
    let loanOk = document.getElementById("LOAN_AMOUNT").style.border === "2px solid green";
    let yearOk = document.getElementById("TENURE_IN_YEAR").style.border === "2px solid green";
    let rateOk = document.getElementById("ANNUAL_I_R").style.border === "2px solid green";

    let btn = document.getElementById("CALCULET_EMI");

    btn.disabled = !(loanOk && yearOk && rateOk);
}

function calculateEMI() {

    let loan = Number(document.getElementById("LOAN_AMOUNT").value.replace(/,/g, ""));
    let annualRate = Number(document.getElementById("ANNUAL_I_R").value);
    let years = Number(document.getElementById("TENURE_IN_YEAR").value);
    
    let monthlyRate = annualRate / 12 / 100;
    let months = years * 12;

    let emi = loan * monthlyRate * Math.pow(1 + monthlyRate, months) /
              (Math.pow(1 + monthlyRate, months) - 1);

    emi = Math.round(emi);

    let totalPayable = emi * months;
    let totalInterest = totalPayable - loan;

    document.getElementById("R_PRINCIPAL").textContent = "₹" + loan.toLocaleString("en-IN");
    document.getElementById("R_RATE").textContent = annualRate + "%";
    document.getElementById("R_MONTHS").textContent = months;
    document.getElementById("R_EMI").textContent = "₹" + emi.toLocaleString("en-IN");
    document.getElementById("R_INTEREST").textContent = "₹" + totalInterest.toLocaleString("en-IN");
    document.getElementById("R_TOTAL").textContent = "₹" + totalPayable.toLocaleString("en-IN");

    let tbody = document.getElementById("EMI_TABLE_BODY");
    tbody.textContent = "";

    let balance = loan;
    setWords("P_AMOUNT", loan);          
    setWords("M_AMOUNT", emi);           
    setWords("I_AMOUNT", totalInterest); 
    setWords("t_p_AMOUNT", totalPayable);
    for (let month = 1; month <= months; month++) {

        let interest = Math.round(balance * monthlyRate);
        let principal = emi - interest;
        balance = balance - principal;

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.textContent = month;

        let td2 = document.createElement("td");
        td2.textContent = emi.toLocaleString("en-IN");

        let td3 = document.createElement("td");
        td3.textContent = principal.toLocaleString("en-IN");

        let td4 = document.createElement("td");
        td4.textContent = interest.toLocaleString("en-IN");

        let td5 = document.createElement("td");
        td5.textContent = balance > 0 ? balance.toLocaleString("en-IN") : "0";

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        tbody.appendChild(tr);
    }
    document.getElementById("PRINT").disabled = false;
    document.getElementById("FINAL").style.display = "block";
}

// function FORMAT_LOAN(LOAN)
// {
//     if (LOAN.value.trim() === "") return;

//     let amount = Number(LOAN.value.replace(/,/g, ""));
//     if (!isNaN(amount))
//     {
//         LOAN.value = amount.toLocaleString("en-US");
//     }
// }

function printResult() {
    window.print();
}
function goToForeclosure() {
    window.location.href = "FORCLOSER.html";
}
