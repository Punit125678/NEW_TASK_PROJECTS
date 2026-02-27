window.onload = function () {
    toggleAllowances(false);
};

function year_select() {
    let current_year = new Date().getFullYear();
    let year = document.getElementById("year").value;
    let leapMsg = document.getElementById("leap_year");

    if (year.length == 0) {
        document.getElementById("Form_page").reset();
        document.getElementById("month").disabled = true;
        document.getElementById("dayss").disabled = true;
        document.getElementById("Extra").style.display = "none";
        document.getElementById("cl_dyas").value = "";
        disableRadios();
        leapMsg.innerText = "";
        return;
    }

    if (year.length < 4) {
        document.getElementById("month").disabled = true;
        document.getElementById("dayss").disabled = true;
        leapMsg.innerText = "";
        return;
    }

    if (year > 2000 && year <= current_year) {
        document.getElementById("month").disabled = false;
        document.getElementById("dayss").disabled = false;
        document.getElementById("Extra").style.display = "none";
        document.getElementById("cl_dyas").value = "";
        leapMsg.innerText = "";
    }
    else {
        document.getElementById("Form_page").reset();
        document.getElementById("month").disabled = true;
        document.getElementById("dayss").disabled = true;
        document.getElementById("Extra").style.display = "none";
        document.getElementById("cl_dyas").value = "";
    }

    if (year > 0) {
        document.getElementById("EPD").disabled = true;
        document.getElementById("PRD").disabled = true;
        disableRadios();
        leapMsg.innerText = "";
    }

    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        leapMsg.innerText = "Year is Leap Year";
        leapMsg.style.color = "green";
    }
    else {
        leapMsg.innerText = "Year is Not Leap Year";
        leapMsg.style.color = "red";
    }
}

function setDays() {
    let month = document.getElementById("month").value;
    let year = document.getElementById("year").value;
    let daysInput = document.getElementById("dayss");

    if (month == "") {
        daysInput.value = "";
        document.getElementById("EPD").value = "";
        document.getElementById("EAD").value = "";
        document.getElementById("PRD").value = "";
        document.getElementById("HR").value = "";
        document.getElementById("SD").value = "";
        document.getElementById("FOCD").value = "";
        document.getElementById("TRAVEL").value = "";
        document.getElementById("Total_sallary").value = "";
        document.getElementById("EPD").disabled = true;
        document.getElementById("PRD").disabled = true;
        disableRadios();
        document.getElementById("hrinput").value = "";
        document.getElementById("sdinput").value = "";
        document.getElementById("focdinput").value = "";
        document.getElementById("travelinput").value = "";
        document.getElementById("Extra").style.display = "none";
        document.getElementById("cl_dyas").value = "";
        document.getElementById("cl_yes").checked = false;
        document.getElementById("cl_no").checked = false;
        return 0;
    }

    let days;
    if (month == 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            days = 29;
        }
        else {
            days = 28;
        }
    }
    else if (month == 4 || month == 6 || month == 9 || month == 11) {
        days = 30;
    }
    else {
        days = 31;
    }

    daysInput.value = days;
    document.getElementById("EPD").disabled = false;
    document.getElementById("PRD").disabled = false;

    return days;
}

function REMENING_DYS() {
    let totalDays = setDays();
    let prdInput = document.getElementById("PRD");
    let error = document.getElementById("EAD_ERROR");
    let ead = document.getElementById("EAD");
    let presentDays = +prdInput.value;

    if (prdInput.value == 0 || prdInput.value == "") {
        ead.value = "";
        document.getElementById("Total_sallary").value = "";
        error.innerText = "";
        document.getElementById("EPD").value = "";
        document.getElementById("hrinput").value = "";
        document.getElementById("sdinput").value = "";
        document.getElementById("focdinput").value = "";
        document.getElementById("travelinput").value = "";
        document.getElementById("cl_yes").checked = false;
        document.getElementById("cl_no").checked = false;
        disableRadios();
        hideExtra();
        resetSalary();
        return 0;
    }

    if (presentDays < 0) {
        error.innerText = "Present days cannot be negative";
        prdInput.style.border = "2px solid red";
        ead.value = "";
        hideExtra();
        resetSalary();
        return 0;
    }

    if (presentDays > totalDays) {
        prdInput.value = "";
        error.innerText = "Present days exceed total :- " + totalDays;
        error.style.color = "orange";
        prdInput.style.border = "2px solid orange";
        presentDays = "";
    }
    else {
        error.innerText = "";
        prdInput.style.border = "2px solid green";
    }

    let absentDays = totalDays - presentDays;
    ead.value = absentDays;

    enableRadios();

    return presentDays;
}

function INPUT_TYPE() {
    calculateSalary();
}

function checkCL() {
    let yes = document.getElementById("cl_yes").checked;
    let no = document.getElementById("cl_no").checked;

    if (yes) {
        document.getElementById("Extra").style.display = "flex";
        calculateSalary();
    }
    else if (no) {
        document.getElementById("Extra").style.display = "none";
        document.getElementById("cl_dyas").value = "";
        document.getElementById("CL_DYS_BOX").style.display = "none";
        calculateSalary();
    }
}

function hideExtra() {
    document.getElementById("Extra").style.display = "none";
    document.getElementById("cl_dyas").value = "";
}

function cheak_input() {
    let input = document.getElementById("EPD");
    let perDay = Number(input.value);
    let error = document.getElementById("salary_error");

    if (input.value.trim() === "") {
        error.innerText = "";
        document.getElementById("cl_yes").checked = false;
        document.getElementById("cl_no").checked = false;
        disableRadios();
        document.getElementById("Extra").style.display = "none";
        document.getElementById("CL_DYS_BOX").style.display = "none";
        document.getElementById("Total_sallary").value = "";
        toggleAllowances(false);
        return;
    }

    if (perDay < 0) {
        input.value = "";
        error.innerText = "Please enter valid salary";
        error.style.color = "red";
        toggleAllowances(false);
        disableRadios();
        return;
    }

    if (perDay < 100) {
        error.innerText = "Minimum salary should be 100";
        error.style.color = "red";
        document.getElementById("cl_yes").checked = false;
        document.getElementById("cl_no").checked = false;
        disableRadios();
        document.getElementById("Extra").style.display = "none";
        document.getElementById("CL_DYS_BOX").style.display = "none";
        toggleAllowances(false);
        return;
    }

    error.innerText = "";
    enableRadios();
    toggleAllowances(true);
}

function calculateSalary() {

    let perDay = Number(document.getElementById("EPD").value);
    let presentDays = Number(document.getElementById("PRD").value);
    let error = document.getElementById("salary_error");
    let input = document.getElementById("EPD");
    let value = input.value.trim();

// let perDay = Number(document.getElementById("EPD").value);

if (isNaN(perDay) || perDay < 99 || perDay > 10000) {
    error.innerText = "Salary must be between 0 and 10000";
    input.style.border = "2px solid red";

    document.getElementById("BASIC_SALLRY").value = "";
    document.getElementById("Total_sallary").value = "";
    return;
}



    if (perDay <= 0 || presentDays <= 0) {
        document.getElementById("BASIC_SALLRY").value = "";
        document.getElementById("Total_sallary").value = "";
        return;
    }

    let yes = document.getElementById("cl_yes").checked;
    let no  = document.getElementById("cl_no").checked;

    let finalPresent = presentDays;

  
    if (yes) {
        let clDays = Number(document.getElementById("cl_dyas").value) || 0;
        finalPresent += clDays;
    }

    let basicSalary = perDay * finalPresent;
    document.getElementById("BASIC_SALLRY").value = basicSalary.toFixed(2);

    if (!yes && !no) {
        document.getElementById("Total_sallary").value = "";
        return;
    }

 
    let HRp = Number(document.getElementById("HR").value) || 0;
    let SDp = Number(document.getElementById("SD").value) || 0;
    let FOCDp = Number(document.getElementById("FOCD").value) || 0;
    let TRAVELp = Number(document.getElementById("TRAVEL").value) || 0;

    let HR = (basicSalary * HRp) / 100;
    let SD = (basicSalary * SDp) / 100;
    let FOCD = (basicSalary * FOCDp) / 100;
    let TRAVEL = (basicSalary * TRAVELp) / 100;

    document.getElementById("hrinput").value = HR.toFixed(2);
    document.getElementById("sdinput").value = SD.toFixed(2);
    document.getElementById("focdinput").value = FOCD.toFixed(2);
    document.getElementById("travelinput").value = TRAVEL.toFixed(2);

    let totalSalary = basicSalary + HR + SD + FOCD + TRAVEL;

    document.getElementById("Total_sallary").value = totalSalary.toFixed(2);
}


function toggleAllowances(enable) {
    document.getElementById("HR").disabled = !enable;
    document.getElementById("SD").disabled = !enable;
    document.getElementById("FOCD").disabled = !enable;
    document.getElementById("TRAVEL").disabled = !enable;

    if (!enable) {
        document.getElementById("HR").value = "";
        document.getElementById("SD").value = "";
        document.getElementById("FOCD").value = "";
        document.getElementById("TRAVEL").value = "";
        document.getElementById("hrinput").value = "";
        document.getElementById("sdinput").value = "";
        document.getElementById("focdinput").value = "";
        document.getElementById("travelinput").value = "";
    }
}

function resetSalary() {
    document.getElementById("HR").value = "";
    document.getElementById("SD").value = "";
    document.getElementById("FOCD").value = "";
    document.getElementById("TRAVEL").value = "";
    document.getElementById("Total_sallary").value = "";
}

// function isFormValid() {
//     let perDay = document.getElementById("EPD").value.trim();
//     let present = document.getElementById("PRD").value.trim();
//     let HR = document.getElementById("HR").value.trim();
//     let SD = document.getElementById("SD").value.trim();
//     let FOCD = document.getElementById("FOCD").value.trim();
//     let TRAVEL = document.getElementById("TRAVEL").value.trim();

//     let yes = document.getElementById("cl_yes").checked;
//     let no = document.getElementById("cl_no").checked;

//     let hrErr = document.getElementById("HR_ERROR").innerText;
//     let sdErr = document.getElementById("SD_ERROR").innerText;
//     let focdErr = document.getElementById("FOCD_ERROR").innerText;
//     let travelErr = document.getElementById("TRAVEL_ERROR").innerText;
//     let clErr = document.getElementById("CL_ERROR").innerText;

//     if (perDay === "" || present === "") return false;
//     if (HR === "" || SD === "" || FOCD === "" || TRAVEL === "") return false;
//     if (!yes && !no) return false;
//     if (hrErr || sdErr || focdErr || travelErr || clErr) return false;

//     return true;
// }

function validateHR() {
    let input = document.getElementById("HR");
    let value = input.value.trim();
    let error = document.getElementById("HR_ERROR");

    if (value === "") {
        error.innerText = "";
        return;
    }

    if (!/^\d+$/.test(value)) {
        input.value = "";
        error.innerText = "Only numbers allowed";
        autoClearError("HR_ERROR");
        toggleAllowances(false);
        return;
    }

    let hr = Number(value);

    if (hr > 50) {
        input.value = "";
        error.innerText = "Max 50% allowed";
        autoClearError("HR_ERROR");
        toggleAllowances(false);
        return;
    }

    error.innerText = "";
}

function validateSD() {
    let input = document.getElementById("SD");
    let value = input.value.trim();
    let error = document.getElementById("SD_ERROR");

    if (value === "") {
        error.innerText = "";
        return;
    }

    if (!/^\d+$/.test(value)) {
        input.value = "";
        error.innerText = "Only numbers allowed";
        autoClearError("SD_ERROR");
        toggleAllowances(false);
        return;
    }

    let sd = Number(value);

    if (sd > 50) {
        input.value = "";
        error.innerText = "Max 50% allowed";
        autoClearError("SD_ERROR");
        toggleAllowances(false);
        return;
    }

    error.innerText = "";
}

function validateFOCD() {
    let input = document.getElementById("FOCD");
    let value = input.value.trim();
    let error = document.getElementById("FOCD_ERROR");

    if (value === "") {
        error.innerText = "";
        return;
    }

    if (!/^\d+$/.test(value)) {
        input.value = "";
        error.innerText = "Only numbers allowed";
        autoClearError("FOCD_ERROR");
        toggleAllowances(false);
        return;
    }

    let focd = Number(value);

    if (focd > 30) {
        input.value = "";
        error.innerText = "Max 30% allowed";
        autoClearError("FOCD_ERROR");
        toggleAllowances(false);
        return;
    }

    error.innerText = "";
}

function validateTRAVEL() {
    let input = document.getElementById("TRAVEL");
    let value = input.value.trim();
    let error = document.getElementById("TRAVEL_ERROR");

    if (value === "") {
        error.innerText = "";
        return;
    }

    if (!/^\d+$/.test(value)) {
        input.value = "";
        error.innerText = "Only numbers allowed";
        autoClearError("TRAVEL_ERROR");
        toggleAllowances(false);
        return;
    }

    let travel = Number(value);

    if (travel > 20) {
        input.value = "";
        error.innerText = "Max 20% allowed";
        autoClearError("TRAVEL_ERROR");
        toggleAllowances(false);
        return;
    }

    error.innerText = "";
}

function autoClearError(id) {
    setTimeout(() => {
        document.getElementById(id).innerText = "";
    }, 3000);
}

function disableRadios() {
    document.getElementById("cl_yes").disabled = true;
    document.getElementById("cl_no").disabled = true;
    document.getElementById("cl_yes").checked = false;
    document.getElementById("cl_no").checked = false;
}

function enableRadios() {
    document.getElementById("cl_yes").disabled = false;
    document.getElementById("cl_no").disabled = false;
}

function validateCLDays() {
        calculateSalary();

    let input = document.getElementById("cl_dyas");
    let value = input.value.trim();
    let error = document.getElementById("CL_ERROR");
    let clBox = document.getElementById("CL_DYS_BOX");

    let totalDays = Number(document.getElementById("dayss").value);
    let presentDays = Number(document.getElementById("PRD").value);
    let perDay = Number(document.getElementById("EPD").value);

    if (value === "") {
        clBox.style.display = "none";
        error.innerText = "";
    document.getElementById("Total_sallary").value = "";

        return;
    }

    if (!/^\d+$/.test(value)) {
        input.value = "";
        error.innerText = "Only numbers allowed";
        autoClearError("CL_ERROR");
        clBox.style.display = "none";
    document.getElementById("Total_sallary").value = "";

        return;
    }

    let clDays = Number(value);
    let maxCL = totalDays - presentDays;

    if (clDays > maxCL) {
        input.value = "";
        error.innerText = "CL cannot exceed remaining days";
    document.getElementById("Total_sallary").value = "";

        autoClearError("CL_ERROR");
        clBox.style.display = "none";
        return;
    }

    let finalPresent = presentDays + clDays;
    let finalAbsent = totalDays - finalPresent;

    document.getElementById("TOTAL_PRESENT_DYS").value = finalPresent;
    document.getElementById("TOTAL_ABSENT_DYS").value = finalAbsent;
    document.getElementById("Total_sallary").value = perDay * finalPresent;

    clBox.style.display = "flex";
    error.innerText = "";
}

function validatePerDaySalary() {

    let input = document.getElementById("EPD");
    let error = document.getElementById("salary_error");

    let value = input.value.trim();

    if (value === "") {
        error.innerText = "";
        return;
    }

    if (!/^\d+$/.test(value)) {
        input.value = "";
        error.innerText = "Only numbers allowed";
        input.style.border = "2px solid red";
        autoClearError("salary_error");
        // return;
    }

    let salary = Number(value);

    if (salary < 0) {
        input.value = "";
        error.innerText = "Salary cannot be negative";
        input.style.border = "2px solid red";
        autoClearError("salary_error");
        return;
    }

    if (salary >= 10000) {
        input.value = "";
        error.innerText = "Maximum salary allowed is 10000";
        input.style.border = "2px solid red";
        autoClearError("salary_error");
        return;
    }

    error.innerText = "";
    input.style.border = "2px solid green";
}

function autoClearError(id) {
    setTimeout(() => {
        document.getElementById(id).innerText = "";
    }, 2500);
}

function validatePresentDays() {

    let input = document.getElementById("PRD");
    let error = document.getElementById("EAD_ERROR");

    let value = input.value.trim();

    let totalDays = Number(document.getElementById("dayss").value);

    if (value === "") {
        error.innerText = "";
        input.style.border = "";
        return;
    }

    if (!/^\d+$/.test(value)) {
        input.value = "";
        error.innerText = "Only numbers allowed";
        input.style.border = "2px solid red";
        autoClearError("EAD_ERROR");
        return;
    }

    let present = Number(value);

    if (present < 0) {
        input.value = "";
        error.innerText = "Present days cannot be negative";
        input.style.border = "2px solid red";
        autoClearError("EAD_ERROR");
        return;
    }

    if (present > totalDays) {
        input.value = "";
        error.innerText = "Cannot exceed total days (" + totalDays + ")";
        input.style.border = "2px solid red";
        autoClearError("EAD_ERROR");
        return;
    }

    error.innerText = "";
    input.style.border = "2px solid green";

    REMENING_DYS();
}
