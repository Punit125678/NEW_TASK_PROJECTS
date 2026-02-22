    let box = document.getElementById("RANDOM_GST_CREATE");
document.getElementById("gst_amount").disabled = true;


function checkGst() {

    let gst = document.getElementById("gst");
    let feeInput = document.getElementById("fee_input");

    let message = document.getElementById("error_gst");

    let showGst = document.getElementById("gst_amount");
    let showCgst = document.getElementById("cgst");
    let showSgst = document.getElementById("sgst");
    let finalFee = document.getElementById("total_fees");

    let fee = parseFloat(feeInput.value);

    if (isNaN(fee) || gst.value === "") {
        showGst.value = "";
        showCgst.value = "";
        showSgst.value = "";
        finalFee.value = "";
        return;
    }

    let gstPercent = parseFloat(gst.value);

    let totalGst = (fee * gstPercent) / 100;
    let cgst = totalGst / 2;
    let sgst = totalGst / 2;
    let totalAmount = fee + totalGst;

    showGst.value = totalGst.toFixed(2);
    showCgst.value = cgst.toFixed(2);
    showSgst.value = sgst.toFixed(2);
    finalFee.value = totalAmount.toFixed(2);
    document.getElementById("prnt_btn").disabled = false;
    document.getElementById("gst").disabled = true;

    

}

function nameInput() {

    let input = document.getElementById("USER_NAME");
    let error = document.getElementById("name_error");

    let value = input.value.replace(/[^a-zA-Z\s]/g, "");

    input.value = value;

    if (value === "") {
        error.innerText = "Enter Name Full Name";
        input.style.border = "2px solid red";
        clearAndDisableCourseFields();
        return;
    }

    if (value.length < 3) {
        error.innerText = " Minimum 3 characters required";
        input.style.border = "2px solid red";
        clearAndDisableCourseFields();
    }
    else {
    error.innerText = "";
    input.style.border = "2px solid lightgreen";
    checkDateAndName();
    }
}
function randomGstBox() {

    let feeInput = document.getElementById("fee_input");
    let box = document.getElementById("RANDOM_GST_CREATE");

    let fee = parseFloat(feeInput.value);

    if (isNaN(fee) || fee <= 500) return;

    let discountList = [3, 5, 9, 12];
    let discountPercent = discountList
    [Math.floor(Math.random() * discountList.length)];

    let discountAmount = (fee * discountPercent) / 100;

    let finalAmount = fee - discountAmount;

  
    feeInput.value = finalAmount.toFixed(2);

    box.style.display = "block";
    box.innerHTML = `
        <h3>DISCOUNT APPLIED</h3>
        <p>Discount % : <b>${discountPercent}%</b></p>
        <p>Discount Amount : <b>${discountAmount.toFixed(2)}</b></p>
        <hr>
        <p><b>Final Amount : ${finalAmount.toFixed(2)}</b></p>
    `;

    document.getElementById("GST_CRAEATE_BTN").disabled = true;
    document.getElementById("fee_input").disabled = true;

    document.getElementById("gst").disabled = false;

}


function checkGstButton() {

    let course = document.getElementById("city").value;
    let fee = document.getElementById("fee_input").value;
    let btn = document.getElementById("GST_CRAEATE_BTN");

    btn.disabled = true;

    if (course !== "" && fee !== "" && !isNaN(fee) && fee > 0) {
        btn.disabled = false;
    }
}

function resetAllFeeSection() {

    let fee = document.getElementById("fee_input");
    let gst = document.getElementById("gst");

    let gstAmt = document.getElementById("gst_amount");
    let cgst = document.getElementById("cgst");
    let sgst = document.getElementById("sgst");
    let total = document.getElementById("total_fees");

    let box = document.getElementById("RANDOM_GST_CREATE");
    let btn = document.getElementById("GST_CRAEATE_BTN");
    let printBtn = document.getElementById("prnt_btn");
    let input = document.getElementById("fee_input").style.border = "";


    fee.value = "";
    gst.value = "";
    gstAmt.value = "";
    cgst.value = "";
    sgst.value = "";
    total.value = "";

    fee.disabled = true;
    gst.disabled = true;
    btn.disabled = true;
    printBtn.disabled = true;

    box.style.display = "none";
    box.innerHTML = "";
}


function courseChange() {

    let course = document.getElementById("city");
    let fee = document.getElementById("fee_input");
    let gst = document.getElementById("gst");

    let gstAmt = document.getElementById("gst_amount");
    let cgst = document.getElementById("cgst");
    let sgst = document.getElementById("sgst");
    let total = document.getElementById("total_fees");
    let box = document.getElementById("RANDOM_GST_CREATE");
    let btn = document.getElementById("GST_CRAEATE_BTN");
    resetAllFeeSection();

    if (course.value === "") {

        fee.value = "";
        fee.disabled = true;

        gst.value = "";
        gst.disabled = true;

        gstAmt.value = "";
        cgst.value = "";
        sgst.value = "";
        total.value = "";
    document.getElementById("fee_input").style.border = "";

        box.style.display = "none";
    document.getElementById("prnt_btn").disabled = true;



        btn.disabled = true; 
    } 
    else {

        fee.disabled = false;
        gst.disabled = true;

        checkGstButton(); 
    }
}

function clearAndDisableCourseFields() {

    let course = document.getElementById("city");
    let fee = document.getElementById("fee_input");
    let gst = document.getElementById("gst");

    let gstAmt = document.getElementById("gst_amount");
    let cgst = document.getElementById("cgst");
    let sgst = document.getElementById("sgst");
    let total = document.getElementById("total_fees");
    let input = document.getElementById("fee_input").style.border = "";


    course.value = "";
    course.disabled = true;

    fee.value = "";
    fee.disabled = true;

    gst.value = "";
    gst.disabled = true;

    gstAmt.value = "";
    cgst.value = "";
    sgst.value = "";
    total.value = "";
    document.getElementById("prnt_btn").disabled = true;

    document.getElementById("GST_CRAEATE_BTN").disabled = true;


}
function feeInput() {

    let input = document.getElementById("fee_input");
    let gst = document.getElementById("gst");
    let box = document.getElementById("RANDOM_GST_CREATE");
    let error = document.getElementById("name_error");

    let value = input.value;

    let cleanValue = value.replace(/[^0-9]/g, "");
    input.value = cleanValue;

    let amount = Number(cleanValue);

    if (cleanValue === "") {
        error.innerText = "";
        gst.disabled = true;
        box.style.display = "none";
        return;
    }

    if (amount < 500) {
        error.innerText = "Minimum amount is 500";
        input.style.border = "2px solid red";
        gst.disabled = true;
        box.style.display = "none";
        return;
    }

    if (amount > 1000001) {
        error.innerText = "Maximum amount is 1000000";
        input.style.border = "2px solid red";
         input.value = 0;
        gst.disabled = true;
        box.style.display = "none";
        return;
    }

    error.innerText = "";
    input.style.border = "2px solid green";
    gst.disabled = true;

    checkGst();
    checkGstButton();
}


function dateChange() {

    let date = document.getElementById("INPUT_DATE");
    let name = document.getElementById("USER_NAME");
    

    if (date.value === "") {
        name.value = "";
        name.disabled = true;
        document.getElementById("name_error").innerText = "";
        name.style.border = "";
       let course = document.getElementById("city").disabled = false;

        clearAndDisableCourseFields();



    } else {
        name.disabled = false;
    // document.getElementById("RANDOM_GST_CREATE").style.display = "block";

        checkDateAndName();
    }
}

function PRINT_GST() {
    window.print();
}

// function autoHideError(id) {
//     let el = document.getElementById(id);

//     el.classList.add("fade-error");
//     el.classList.remove("fade-out");

//     setTimeout(() => {
//         el.classList.add("fade-out");

//         setTimeout(() => {
//             el.innerText = "";
//             el.classList.remove("fade-error", "fade-out");
//         }, 1000); 
//     }, 2000); 
// }


function checkDateAndName() {

    let date = document.getElementById("INPUT_DATE").value;
    let name = document.getElementById("USER_NAME").value.trim();
    let course = document.getElementById("city");
    let box = document.getElementById("RANDOM_GST_CREATE");


    if (date !== "" && name.length >= 3) {
        course.disabled = false;
        box.style.display = "none";
    } else {
        course.disabled = true;
        course.value = "";
    // document.getElementById("RANDOM_GST_CREATE").style.display = "block";

    }
}
