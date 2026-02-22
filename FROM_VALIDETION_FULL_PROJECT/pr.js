window.onload = function () {
    generateCaptcha();
};



let min = 10;
let sec = 0;

setInterval(function () {
    let showMin = min;
    let showSec = sec;

    if (showMin < 10) {
        showMin = "0" + showMin;
    }

    if (showSec < 10) {
        showSec = "0" + showSec;
    }

    document.getElementById("time_remening").innerText =
        showMin + ":" + showSec;

    sec--;

    if (sec < 0) {
        sec = 59;
        min--;
    }

    if (min <= 0 && sec <= 0) {
        min = 0;
        sec = 0;
        window.location.href = "SECOND_FILE.html/page2.html";
    }

}, 1000);


setInterval(function () {
    let now = new Date();

    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();

    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;

    document.getElementById("current_time").innerText =
        hour + " : " + min + " : " + sec;

}, 1000);

let bulbs = document.getElementsByClassName("bulb");


for (let i = 0; i < bulbs.length; i++) {
    bulbs[i].src = "IMEGS-FOLDER/light-bulb-on-image.png";
}
state = 1;


blink = setInterval(function () {
    if (state == 1) {
        for (let i = 0; i < bulbs.length; i++) {
            bulbs[i].src = "IMEGS-FOLDER/off-image.png";
        }
        state = 0;
    } else {
        for (let i = 0; i < bulbs.length; i++) {
            bulbs[i].src = "IMEGS-FOLDER/light-bulb-on-image.png";
        }
        state = 1;
    }
}, 1000);


setInterval(function () {
    let hour = new Date().getHours();
    let text = document.getElementById("TEXT_ACCORDING");
    let img = document.getElementById("imeg1");

    if (!img) return;
    if (hour >= 4 && hour < 12) {
        text.innerText = "GOOD MORNING";
        img.src = "IMEGS-FOLDER/MORNING_IMEG.png";
    }
    else if (hour >= 12 && hour < 17) {
        text.innerText = "GOOD AFTERNOON";
        img.src = "IMEGS-FOLDER/AFTERNOON_IMEG.png";
    }
    else if (hour >= 17 && hour < 21) {
        text.innerText = "GOOD EVENING";
        img.src = "IMEGS-FOLDER/EVENING_IMEG.png";
    }
    else {
        text.innerText = "GOOD NIGHT";
        img.src = "IMEGS-FOLDER/night.png";
    }
}, 1000);




function validation_form() {
    let result = true;
    let btn_on = 0;

    if (document.getElementById("N_name").value == "") {
        document.getElementById("NAME_ERROR").innerText = " Please Fill Name ";

        result = false;

    }
    else {
        document.getElementById("NAME_ERROR").innerText = "";
        btn_on++;

    }

    if (document.getElementById("F_name").value == "") {
        document.getElementById("F_ERROR").innerText = "Enter Father Name";
        result = false;
    }
    else {
        document.getElementById("F_ERROR").innerText = "";
        btn_on++;
    }

    if (document.getElementById("E_name").value == "") {
        document.getElementById("EMAIL_ERROR").innerText = "Email Required";
        result = false;

    }
    else {
        btn_on++;
    }

    if (document.getElementById("Number_input").value == "") {
        document.getElementById("NUM_ERROR").innerText = "Number Required";
        result = false;
    }
    else {
        btn_on++;
    }

    if (document.getElementById("password_input").value == "") {
        document.getElementById("PASS_ERROR").innerText = "Password Required";
        result = false;
    }
    else {
        btn_on++;
    }

    let DATE_in = document.getElementById("date_input").value;
    let d_count = DATE_in.length;

    if (d_count == 0) {
        let n = document.getElementById("DATE_ERROR");
        n.innerText = "Enter Date";
        n.style.color = "red";
        result = false;
    }
    else {
        document.getElementById("DATE_ERROR").innerText = "";
        btn_on++;
    }


    if (document.getElementById("time_input").value == "") {
        document.getElementById("TIME_ERROR").innerText = "Time Required";
        result = false;
    }
    else {
        btn_on++;
    }

    let CHEAK_GENDER = document.getElementsByName("gender");
    let genderChecked = false;

    for (let i = 0; i < CHEAK_GENDER.length; i++) {
        if (CHEAK_GENDER[i].checked) {
            genderChecked = true;
        }
    }

    if (genderChecked == false) {
        let n = document.getElementById("RADIO_ERROR");
        n.innerText = "Choose Gender";
        n.style.color = "red";
        result = false;
    }
    else {
        document.getElementById("RADIO_ERROR").innerText = "";
        btn_on++;
    }


    let checkhobbys = document.getElementsByName("hobbys");
    let count = 0;

    for (let i = 0; i < checkhobbys.length; i++) {
        if (checkhobbys[i].checked == true) {
            count++;
        }
    }

    if (count == 0) {
        let n = document.getElementById("CHEAK_ERROR");
        n.innerText = "Select Hobby";
        n.style.color = "red";
        result = false;
    }
    if (count == 1) {
        let n = document.getElementById("CHEAK_ERROR");
        n.innerText = "Select one More";
        n.style.color = "red";
        result = false;
    }
    if (count > 1) {
        document.getElementById("CHEAK_ERROR").innerText = "";
        btn_on++;
    }


    if (document.getElementById("FILE_SELECT").value == "") {
        document.getElementById("FILE_ERROR").innerText = "Select file";
        result = false;
    }
    else {
        document.getElementById("FILE_ERROR").innerText = ""
        btn_on++;
    }

    if (document.getElementById("ADD_INPUT").value == "") {
        document.getElementById("TEXT_ERROR").innerText = "Address required";
        result = false;
    }
    else {
        document.getElementById("TEXT_ERROR").innerText = "";
        btn_on++;

    }

    if (document.getElementById("city_name").value == "") {
        document.getElementById("CITY_ERROR").innerText = "Select city";
        result = false;
    }
    else {
        document.getElementById("CITY_ERROR").innerText = "";
        btn_on++;
    }
    if (document.getElementById("userInput").value == "") {
        document.getElementById("msg").innerText = "Fill Capcha";
        document.getElementById("msg").style.color = "red";


        result = false;

    }
    else {
        btn_on++;
    }
    if (!checkCaptcha()) {
        return false;
    }
    return result;
}



function NAME_CHEAK(USER_NAME) {
    let name_error = document.getElementById("NAME_ERROR");
    let btn = document.getElementById("SUMBTN");

    if (/[0-9]/.test(USER_NAME.value)) {
        name_error.innerText = "Numbers are not allowed";
        name_error.style.color = "red";
        USER_NAME.style.border = "2px solid red";
        btn.disabled = true;

        USER_NAME.value = USER_NAME.value.replace(/[0-9]/g, "");
        return;
    }

    if (/[^a-zA-Z ]/.test(USER_NAME.value)) {
        name_error.innerText = "Special characters not allowed";
        name_error.style.color = "red";
        USER_NAME.style.border = "2px solid red";
        btn.disabled = true;

        USER_NAME.value = USER_NAME.value.replace(/[^a-zA-Z ]/g, "");
        return;
    }

    let value = USER_NAME.value.trim();

    if (value.length == 0) {
        name_error.innerText = "Enter Full Name";
        name_error.style.color = "red";
        USER_NAME.style.border = "2px solid red";
        btn.disabled = true;
        return;
    }

    if (value.length < 3) {
        name_error.innerText = "Minimum 3 characters required";
        name_error.style.color = "darkred";
        USER_NAME.style.border = "2px solid red";
        btn.disabled = true;
        return;
    }

    name_error.innerText = "";
    USER_NAME.style.border = "2px solid green";
    checkAllFilledSimple();
}


function check_email(input) {
    let error = document.getElementById("EMAIL_ERROR");
    let EMAIL_INPUT = document.getElementById("E_name");
    let submitBtn = document.getElementById("SUMBTN");

    let email = input.value;

    if (email.length == 0) {
        error.innerText = "Please Fill Email";
        error.style.color = "red";
        EMAIL_INPUT.style.border = "2px solid red";
        submitBtn.disabled = true;
        return;
    }

    let emailPattern = /^(?=.*[0-9])[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]+$/;


    if (emailPattern.test(email)) {
        error.innerText = "Valid Email";
        error.style.color = "green";
        EMAIL_INPUT.style.border = "2px solid green";
        submitBtn.disabled = false;

        checkAllFilledSimple();
    }
    else {
        error.innerText = "Enter Valid Email";
        error.style.color = "red";
        EMAIL_INPUT.style.border = "2px solid red";
        submitBtn.disabled = true;
    }
}




function showPassword() {
    let pass = document.getElementById("password_input");
    let eye = document.getElementById("eyeIcon");

    if (pass.type == "password") {
        pass.type = "text";
        eye.innerHTML = "🙈";
    }
    else {
        pass.type = "password";
        eye.innerHTML = "👁️";
    }
    checkAllFilledSimple();

}
function check_mobile(data) {
    let p = document.getElementById("NUM_ERROR");
    let NUMBER_INPUT = document.getElementById("Number_input");
    let btn = document.getElementById("SUMBTN");

    if (/[a-zA-Z]/.test(data.value)) {
        p.innerText = "Alphabets are not allowed";
        p.style.color = "red";
        NUMBER_INPUT.style.border = "2px solid red";
        btn.disabled = true;

        data.value = data.value.replace(/[a-zA-Z]/g, "");
        return;
    }

    data.value = data.value.replace(/[^0-9]/g, "");

    let count = data.value.length;

    if (count == 0) {
        p.innerText = "Enter Mobile Number";
        p.style.color = "red";
        NUMBER_INPUT.style.border = "2px solid red";
        btn.disabled = true;
        return;
    }

    if (count > 10) {
        data.value = data.value.slice(0, 10);
        count = data.value.length;
    }

    if (count < 10) {
        p.innerText = "Number must be 10 digits";
        p.style.color = "red";
        NUMBER_INPUT.style.border = "2px solid red";
        btn.disabled = true;
    }
    else {
        p.innerText = "Valid Mobile Number";
        p.style.color = "green";
        NUMBER_INPUT.style.border = "2px solid green";
        checkAllFilledSimple();
    }
}


function file_select() {
    let fileInput = document.getElementById("FILE_SELECT");
    let error = document.getElementById("FILE_ERROR");

    if (fileInput.files.length === 0) {
        error.innerText = "Please select a file";
        fileInput.style.border = "2px solid red";
        error.style.color = "red";
        document.getElementById("SUMBTN").disabled = true;

        return;
    }

    error.innerText = "File selected";
    error.style.color = "green";
    fileInput.style.border = "2px solid green";

    checkAllFilledSimple();
}

function father_name1(f_n) {
    let father_input_error = document.getElementById("F_ERROR");
    let FATHER_INPUT = document.getElementById("F_name");

    if (/[0-9]/.test(f_n.value)) {
        father_input_error.innerText = "Numbers are not allowed";
        father_input_error.style.color = "red";
        FATHER_INPUT.style.border = "2px solid red";
        document.getElementById("SUMBTN").disabled = true;

        f_n.value = f_n.value.replace(/[0-9]/g, "");
        return;
    }

    f_n.value = f_n.value.replace(/[^a-zA-Z ]/g, "");

    let f_count = f_n.value.length;

    if (f_count == 0) {
        father_input_error.innerText = "Enter Full Name";
        father_input_error.style.color = "red";
        FATHER_INPUT.style.border = "2px solid red";
        document.getElementById("SUMBTN").disabled = true;
        return;
    }
    else if (f_count <= 2) {
        father_input_error.innerText = "Enter Valid Name";
        father_input_error.style.color = "darkred";
        FATHER_INPUT.style.border = "3px solid red";
        document.getElementById("SUMBTN").disabled = true;
        return;
    }
    else {
        father_input_error.innerText = "";
        FATHER_INPUT.style.border = "3px solid green";
        checkAllFilledSimple();
    }
}
function check_strength(data) {
    document.getElementById("PASSWORD_STORGN").style.display = "block";
    let upper = document.getElementById("upper");
    let lower = document.getElementById("lower");
    let number = document.getElementById("number");
    let special = document.getElementById("special");
    let length8 = document.getElementById("length8");
    let pass = document.getElementById("password_input");
    let count = 0;
    let btn = document.getElementById("SUMBTN");
    pass.style.border = "3px solid red";
    if (/[A-Z]/.test(data)) {
        upper.style.color = "green";
        count++;
    }
    else {
        upper.style.color = "red";
        btn.disabled = true;
    }

    if (/[a-z]/.test(data)) {
        lower.style.color = "green";
        count++;
    }
    else {
        lower.style.color = "red";
        btn.disabled = true;
    }

    if (/[0-9]/.test(data)) {
        number.style.color = "green";
        count++;
    }
    else {
        number.style.color = "red";
        btn.disabled = true;
    }

    if (/[!@#$%^&]/.test(data)) {
        special.style.color = "green";
        count++;
    }
    else {
        special.style.color = "red";
        btn.disabled = true;
    }

    if (data.length >= 8) {
        length8.style.color = "green";
        count++;
    }
    else {
        length8.style.color = "red";
        btn.disabled = true;
    }

    let msg = "";
    let color = "red";

    if (data.length == 0) {
        msg = "Please Enter Password";
    }
    else if (count <= 2) {
        msg = "Weak Password";
    }
    else if (count <= 4) {
        msg = "Good Password";
        color = "orange";
    }
    else {
        msg = "Strong Password";
        color = "green";
        btn.disabled = false;
        pass.style.border = "3px solid green";

    }

    let error = document.getElementById("PASS_ERROR");
    error.innerText = msg;
    error.style.color = color;
}

// function on_input_password()
//     {
//         document
//     }

function check_date(d_n) {
    let DATE_INPUT = document.getElementById("date_input");
    let date_error = document.getElementById("DATE_ERROR");

    if (d_n.value.length == 0) {
        date_error.innerText = "Enter Date";
        date_error.style.color = "red";
        DATE_INPUT.style.border = "2px solid red";
        document.getElementById("SUMBTN").disabled = true;

    }
    else {
        date_error.innerText = "";
        DATE_INPUT.style.border = "2px solid green";
        checkAllFilledSimple();

    }

}

function city_input(c_t) {
    let city_error = document.getElementById("CITY_ERROR");
    let CITY_INPUT = document.getElementById("city_name");
    if (c_t.value == "") {
        city_error.innerText = "Select City";
        city_error.style.color = "red";
        CITY_INPUT.style.border = "2px solid red";
        document.getElementById("SUMBTN").disabled = true;

    }
    else {
        city_error.innerText = "";
        CITY_INPUT.style.border = "2px solid green";
        checkAllFilledSimple();

    }

}

function cheak_addres(T_x) {
    let Address1 = document.getElementById("TEXT_ERROR");
    let ADRESS_INPUT = document.getElementById("ADD_INPUT");

    if (T_x.value == "") {
        Address1.innerText = "Address required";
        ADRESS_INPUT.style.border = "2px solid red";
        document.getElementById("SUMBTN").disabled = true;

    }
    else {
        Address1.innerText = "";
        ADRESS_INPUT.style.border = "2px solid green";
        checkAllFilledSimple();



    }


}

function cheak_time(t_i) {
    let time_error = document.getElementById("TIME_ERROR");
    let TIME_INPUT = document.getElementById("time_input");

    if (t_i.value.length == 0) {
        time_error.innerText = "Enter Time";
        time_error.style.color = "red";
        TIME_INPUT.style.border = "2px solid red";
        document.getElementById("SUMBTN").disabled = true;


    }
    else {
        time_error.innerText = "";
        TIME_INPUT.style.border = "2px solid green";
        checkAllFilledSimple();



    }

}



let mainCaptcha = "";
function generateCaptcha() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    mainCaptcha = "";

    for (let i = 0; i < 4; i++) {
        let r = Math.floor(Math.random() * chars.length);
        mainCaptcha += chars[r];
    }

    document.getElementById("captchaText").innerText = mainCaptcha;
    document.getElementById("userInput").value = "";
}
function checkCaptchaLive() {
    let user = document.getElementById("userInput").value.trim();
    let msg = document.getElementById("msg");

    if (user === "") {
        msg.innerText = "Enter Captcha";
        msg.style.color = "red";
        document.getElementById("SUMBTN").disabled = true;
        return;
    }

    if (user.toLowerCase() === mainCaptcha.toLowerCase()) {
        msg.innerText = "Captcha Matched";
        msg.style.color = "green";

        checkAllFilledSimple();
    }
    else {
        msg.innerText = "Invalid Captcha";
        msg.style.color = "red";
        document.getElementById("SUMBTN").disabled = true;
    }
}




function hobbys1(h_i) {
    let hobby = document.getElementsByName("hobbys");
    let hobby_error = document.getElementById("CHEAK_ERROR");
    let count = 0;

    for (let i = 0; i < hobby.length; i++) {
        if (hobby[i].checked) {
            count++;
        }
    }

    if (count == 0) {
        hobby_error.innerText = "Select hobbys";
        hobby_error.style.color = "red";
    }
    else if (count == 1) {
        hobby_error.innerText = "Select One More";
    }
    else {
        hobby_error.innerText = "";
    }
    checkAllFilledSimple();
}


function checkAllFilledSimple() {
    let cheak = true;

    if (N_name.value == "") {
        cheak = false;
    }
    if (F_name.value == "") {
        cheak = false;
    }
    if (E_name.value == "") {
        cheak = false;
    }
    if (Number_input.value == "") {
        cheak = false;
    }
    if (password_input.value == "") {
        cheak = false;
    }
    if (date_input.value == "") {
        cheak = false;
    }
    if (time_input.value == "") {
        cheak = false;
    }
    if (FILE_SELECT.value == "") {
        cheak = false;
    }
    if (ADD_INPUT.value == "") {
        cheak = false;
    }
    if (city_name.value == "") {
        cheak = false;
    }
    if (userInput.value == "") {
        cheak = false;
    }

    let g = document.getElementsByName("gender");
    let gcheak = false;
    for (let i = 0; i < g.length; i++) {
        if (g[i].checked) {
            gcheak = true;
        }
    }
    if (!gcheak) cheak = false;

    let h = document.getElementsByName("hobbys");
    let c = 0;
    for (let i = 0; i < h.length; i++) {
        if (h[i].checked) c++;
    }
    if (c < 2) cheak = false;

    let user = document.getElementById("userInput").value.trim();
    let msg = document.getElementById("msg");



    document.getElementById("SUMBTN").disabled = !cheak;


}


