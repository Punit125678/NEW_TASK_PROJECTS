function INPUT_DEATIELS() {

    let name = document.getElementById("CUSTOMER_NAME").value;
    let mobile = document.getElementById("MOBILE_NUMBER").value;
    let plan = document.getElementById("R_PLAN").value;
    let total = document.getElementById("GST_AMOUNT").value;

    document.getElementById("M_INPUT").innerText = mobile;
    document.getElementById("SIM_P").innerText = "Jio";
    document.getElementById("T_AMOUNT").innerText = "₹" + total;

    document.getElementById("PAYMENT_MODE").style.display = "flex";

    document.getElementById("CUSTOMER_NAME").readOnly = true;
    document.getElementById("R_PLAN").disabled = true;
    document.getElementById("MOBILE_NUMBER").disabled = true;

}


function PYMENT_BOX_DISEVLE() {
    document.getElementById("PAYMENT_BOX").style.display = "none";
    document.getElementById("CARD_PAYMENT").style.display = "none";
    document.getElementById("NET_BANKING").style.display = "none";
    document.getElementById("CASH_PAYMENT").style.display = "none";
}

function PAYMENT_METHOD() {

    let P_METHOD = document.getElementById("PAYMENT_SELECT").value;

    PYMENT_BOX_DISEVLE();

    if (P_METHOD == "upi") {
        document.getElementById("PAYMENT_BOX").style.display = "flex";
    }
    else if (P_METHOD == "card") {
        document.getElementById("CARD_PAYMENT").style.display = "block";
    }
    else if (P_METHOD == "netbanking") {
        document.getElementById("NET_BANKING").style.display = "block";
    }
    else if (P_METHOD == "cash") {
        document.getElementById("CASH_PAYMENT").style.display = "block";
    }
    else {
        PYMENT_BOX_DISEVLE();
    }
}

function FINAL_PAYMENT(paymentMode) {

    Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: paymentMode,
        timer: 2000,
        showConfirmButton: false
    });

    setTimeout(function () {
        SHOW_SUMMARY(paymentMode);
    }, 2000);
}
function SHOW_SUMMARY(paymentMode) {

    let name = document.getElementById("CUSTOMER_NAME").value;
    let mobile = document.getElementById("MOBILE_NUMBER").value;
    let plan = document.getElementById("R_PLAN").value;
    let amount = document.getElementById("GST_AMOUNT").value;

    let date = new Date();

    document.getElementById("S_NAME").innerHTML = name;
    document.getElementById("S_MOBILE").innerHTML = mobile;
    document.getElementById("S_PLAN").innerHTML = "₹" + plan + " - 28 Days";
    document.getElementById("S_AMOUNT").innerHTML = amount;
    document.getElementById("S_VALIDITY").innerHTML = "28 Days";
    document.getElementById("S_DATE").innerHTML = date.toLocaleDateString();
    document.getElementById("S_TIME").innerHTML = date.toLocaleTimeString();
    document.getElementById("S_MODE").innerHTML = paymentMode;

    let extraBox = document.getElementById("S_EXTRA");



    if (paymentMode === "UPI Payment") {

        let upi = document.getElementById("UPI_INPUT").value;

        extraBox.innerHTML =
            "<b>UPI Details</b><br>" +
            "UPI ID :- " + upi;
    }

    else if (paymentMode === "Credit Card Payment") {

        let cardNo = document.getElementById("CARD_NO").value;
        let last4 = cardNo.slice(-4);

        extraBox.innerHTML =
            "<b>Card Details</b><br>" +
            "Card Number :- XXXX-XXXX-XXXX-" + last4;
    }

    else if (paymentMode === "Net Banking") {

        let bank = document.getElementById("NB_BANK").value;
        let accName = document.getElementById("NB_NAME").value;
        let accNo = document.getElementById("NB_ACC").value;
        let ifsc = document.getElementById("NB_IFSC").value;

        let maskedAcc = "XXXXXX" + accNo.slice(-4);

        extraBox.innerHTML =
            "<b>Net Banking Details</b><br>" +
            "Bank :- " + bank + "<br>" +
            "Account Holder :- " + accName + "<br>" +
            "Account No :- " + maskedAcc + "<br>" +
            "IFSC Code :- " + ifsc;
    }

    else if (paymentMode === "Cash Payment") {

        extraBox.innerHTML =
            "<b>Cash Payment</b><br>" +
            "Payment will be collected in cash";
    }

    document.getElementById("SUMMARY_BOX").style.display = "block";
}

let NAME_OK = false;
let NUMBER_OK = false;
let PLAN_OK = false;
function CHEAK_SELECT() {
    let plan = document.getElementById("R_PLAN").value;
    let err = document.getElementById("SELLCT_ERROR");

    if (plan === "") {
        err.innerText = "Select a plan";
        err.style.color = "red";
        document.getElementById("GST_AMOUNT").value = "";

        PLAN_OK = false;
    } else {
        err.innerText = "";
        let gst = plan * 0.18;
        let total = Number(plan) + gst;

        document.getElementById("GST_AMOUNT").value = total.toFixed(2);
        PLAN_OK = true;
    }

    CHECK_ALL_FIELDS();
}


function NULL_FIELDS() {
    let INPUT_NAME = document.getElementById("CUSTOMER_NAME");
    let name_error = document.getElementById("NAME_ERROR");

    INPUT_NAME.value = INPUT_NAME.value.replace(/[^a-zA-Z\s]/g, "");

    if (INPUT_NAME.value.trim() === "") {
        name_error.innerText = "Enter your name";
        name_error.style.color = "red";
        INPUT_NAME.style.border = "2px solid red";
        NAME_OK = false;
    }
    else {
        name_error.innerText = "";
        INPUT_NAME.style.border = "2px solid green";
        NAME_OK = true;
    }

    CHECK_ALL_FIELDS();
}
function NUM_ERRORR() {
    let INPUT_NUM = document.getElementById("MOBILE_NUMBER");
    let NUM_ERROR = document.getElementById("NUM_ERROR");

    INPUT_NUM.value = INPUT_NUM.value.replace(/[^0-9]/g, "");

    if (INPUT_NUM.value === "") {
        NUM_ERROR.innerText = "Enter mobile number";
        NUM_ERROR.style.color = "red";
        INPUT_NUM.style.border = "2px solid red";
        NUMBER_OK = false;
    }
    else if (INPUT_NUM.value.length < 10) {
        NUM_ERROR.innerText = "Enter 10 digit mobile number";
        NUM_ERROR.style.color = "red";
        INPUT_NUM.style.border = "2px solid red";
        NUMBER_OK = false;
    }
    else {
        NUM_ERROR.innerText = "Valid Number";
        NUM_ERROR.style.color = "green";
        INPUT_NUM.style.border = "2px solid green";
        NUMBER_OK = true;
    }

    CHECK_ALL_FIELDS();
}

function CHECK_ALL_FIELDS() {
    let btn = document.getElementById("BTN");

    if (NAME_OK && NUMBER_OK && PLAN_OK) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    } else {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.style.cursor = "not-allowed";
    }
}

function CHECK_UPI() {
    let upiInput = document.getElementById("UPI_INPUT");
    let upiError = document.getElementById("UPI_ERROR");
    let payBtn = document.getElementById("UPI_PYMENT");

    let upi = upiInput.value.trim();

    let upiPattern = /^[a-zA-Z0-9.\-_]{4,}@[a-zA-Z]{3,}$/;

    if (upi === "") {
        upiError.innerText = "Enter UPI ID";
        upiError.style.color = "red";
        payBtn.disabled = true;
        payBtn.style.opacity = "0.5";
    }
    else if (!upiPattern.test(upi)) {
        upiError.innerText = "Invalid UPI ID format";
        upiError.style.color = "red";
        payBtn.disabled = true;
        payBtn.style.opacity = "0.5";
    }
    else {
        upiError.innerText = "Valid UPI ID";
        upiError.style.color = "green";
        payBtn.disabled = false;
        payBtn.style.opacity = "1";
    }
}

function CHECK_CARD() {

    let cardNo = document.getElementById("CARD_NO");
    let cardName = document.getElementById("CARD_NAME");
    let exp = document.getElementById("CARD_EXP");
    let cvv = document.getElementById("CARD_CVV");
    let payBtn = document.getElementById("CARD_PAY_BTN");

    let ok = true;

    cardNo.value = cardNo.value.replace(/[^0-9]/g, "");
    if (cardNo.value.length !== 16) {
        document.getElementById("CARD_NO_ERR").innerText = "Enter 16 digit card number";
        document.getElementById("CARD_NO_ERR").style.color = "red";
        ok = false;
    } else {
        document.getElementById("CARD_NO_ERR").innerText = "";
    }

    cardName.value = cardName.value.replace(/[^a-zA-Z\s]/g, "");
    if (cardName.value.trim().length < 3) {
        document.getElementById("CARD_NAME_ERR").innerText = "Enter valid name";
        document.getElementById("CARD_NAME_ERR").style.color = "red";
        ok = false;
    } else {
        document.getElementById("CARD_NAME_ERR").innerText = "";
    }

    if (exp.value === "") {
        document.getElementById("CARD_EXP_ERR").innerText = "Select expiry date";
        document.getElementById("CARD_EXP_ERR").style.color = "red";
        ok = false;
    } else {
        document.getElementById("CARD_EXP_ERR").innerText = "";
    }

    cvv.value = cvv.value.replace(/[^0-9]/g, "");
    if (cvv.value.length !== 3) {
        document.getElementById("CARD_CVV_ERR").innerText = "Enter 3 digit CVV";
        document.getElementById("CARD_CVV_ERR").style.color = "red";
        ok = false;
    } else {
        document.getElementById("CARD_CVV_ERR").innerText = "";
    }

    payBtn.disabled = !ok;
    payBtn.style.opacity = ok ? "1" : "0.5";
    payBtn.style.cursor = ok ? "pointer" : "not-allowed";
} function CHECK_NETBANKING() {

    let bank = document.getElementById("NB_BANK");
    let name = document.getElementById("NB_NAME");
    let acc = document.getElementById("NB_ACC");
    let ifsc = document.getElementById("NB_IFSC");
    let btn = document.getElementById("NB_PAY_BTN");

    let ok = true;

    if (bank.value === "") {
        document.getElementById("NB_BANK_ERR").innerText = "Select bank";
        document.getElementById("NB_BANK_ERR").style.color = "red";
        ok = false;
    } else {
        document.getElementById("NB_BANK_ERR").innerText = "";
    }

    name.value = name.value.replace(/[^a-zA-Z\s]/g, "");
    if (name.value.trim().length < 3) {
        document.getElementById("NB_NAME_ERR").innerText = "Enter valid name";
        document.getElementById("NB_NAME_ERR").style.color = "red";
        ok = false;
    } else {
        document.getElementById("NB_NAME_ERR").innerText = "";
    }

    acc.value = acc.value.replace(/[^0-9]/g, "");

    if (acc.value.length < 8) {
        document.getElementById("NB_ACC_ERR").innerText = "Minimum 8 digits required";
        document.getElementById("NB_ACC_ERR").style.color = "red";
        ok = false;
    }
    else if (acc.value.length > 18) {
        acc.value = acc.value.slice(0, 18);
        ok = false;
    }
    else if (acc.value.length === 18) {
        let maskedAcc = "XXXXXX" + acc.value.slice(-4);
        document.getElementById("NB_ACC_ERR").innerText =
            "Account OK (" + maskedAcc + ")";
        document.getElementById("NB_ACC_ERR").style.color = "green";
        ok = true;
    }
    else {
        document.getElementById("NB_ACC_ERR").innerText = "";
    }

    ifsc.value = ifsc.value.toUpperCase();
    let ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    if (!ifscPattern.test(ifsc.value)) {
        document.getElementById("NB_IFSC_ERR").innerText = "Invalid IFSC code";
        document.getElementById("NB_IFSC_ERR").style.color = "red";
        ok = false;
    } else {
        document.getElementById("NB_IFSC_ERR").innerText = "";
        document.getElementById("PAYMENT_SELECT").valuedisabled = true;
    }

    btn.disabled = !ok;
    btn.style.opacity = ok ? "1" : "0.5";
    btn.style.cursor = ok ? "pointer" : "not-allowed";

}
function PYMENT_BTN()
    {
        
    }
