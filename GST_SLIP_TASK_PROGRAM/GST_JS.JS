    let box = document.getElementById("RANDOM_GST_CREATE");

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

    } else {
        error.innerText = "";
        input.style.border = "2px solid lightgreen";
    let course = document.getElementById("city").disabled = false;

    }

}

function randomGstBox() {

    let feeInput = document.getElementById("fee_input");
    let gstSelect = document.getElementById("gst");

    let gstAmtInput = document.getElementById("gst_amount");
    let cgstInput = document.getElementById("cgst");
    let sgstInput = document.getElementById("sgst");
    let totalInput = document.getElementById("total_fees");

    let box = document.getElementById("RANDOM_GST_CREATE");

    let fee = parseFloat(feeInput.value);

    let gstList = [5, 9, 18];
    let gst = gstList[Math.floor(Math.random() * gstList.length)];

    let totalGst = (fee * gst) / 100;
    let cgst = totalGst / 2;
    let sgst = totalGst / 2;
    let total = fee + totalGst;

    gstSelect.value = gst;

    gstAmtInput.value = totalGst.toFixed(2);
    cgstInput.value = cgst.toFixed(2);
    sgstInput.value = sgst.toFixed(2);
    totalInput.value = total.toFixed(2);

    box.style.display = "block";
    box.innerHTML = `
        <h3>GST AUTO GENERATED</h3>
        <p>GST % : <b>${gst}%</b></p>
        <p>CGST : <b>${cgst.toFixed(2)}</b></p>
        <p>SGST : <b>${sgst.toFixed(2)}</b></p>
        <hr>
        <p><b>Total Fees : ${total.toFixed(2)}</b></p>
    `;
    let btn = document.getElementById("GST_CRAEATE_BTN").disabled = true;
    document.getElementById("gst").disabled = true;
    document.getElementById("prnt_btn").disabled = false;


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

    if (course.value === "") {

        fee.value = "";
        fee.disabled = true;

        gst.value = "";
        gst.disabled = true;

        gstAmt.value = "";
        cgst.value = "";
        sgst.value = "";
        total.value = "";

        box.style.display = "none";
    document.getElementById("prnt_btn").disabled = true;


        btn.disabled = true; 
    } 
    else {
        // gst.disabled = false;

        fee.disabled = false;
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

    let value = input.value;

    let cleanValue = value.replace(/[^0-9]/g, "");

    if (value !== cleanValue) {

        input.style.border = "2px solid red";
        box.style.display = "none";   
        gst.disabled = true;

    } else {

        input.style.border = "";
        gst.disabled = false;
    }

    input.value = cleanValue;

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
        clearAndDisableCourseFields();

    } else {
        name.disabled = false;
    }
}

function PRINT_GST() {
    window.print();
}

