let isEditMode = false;

function Assian_person() {
    let Assian_INPUT = document.getElementById("A_b");
    let ERORO = document.getElementById("ASSIAN_ERROR");
    let value = Assian_INPUT.value.trim();
    ERORO.innerText = "";

    if (/[0-9]/.test(value)) {
        Assian_INPUT.value = Assian_INPUT.value.slice(0, -1);
        ERORO.innerText = "Numbers are not allowed";
        Assian_INPUT.style.border = "2px solid red";
        return false;
    }

    if (/[^a-zA-Z ]/.test(value)) {
        Assian_INPUT.value = Assian_INPUT.value.slice(0, -1);
        ERORO.innerText = "Special characters not allowed";
        Assian_INPUT.style.border = "2px solid red";
        return false;
    }

    if (value.length < 3) {
        ERORO.innerText = "Fill Valid Name";
        Assian_INPUT.style.border = "2px solid red";
        return false;
    }

    ERORO.innerText = "";
    Assian_INPUT.style.border = "2px solid green";
    return true;
}


function TASK_CHEAK() {

    let t = document.getElementById("TASK");
    let e = document.getElementById("Task_EROOR");

    if (t.value.trim().length < 3) {

        if (document.activeElement === t) {
            e.innerText = "Fill valid task";
            t.style.border = "2px solid red";
        }

        return false;
    }

    e.innerText = "";
    t.style.border = "2px solid green";
    return true;
}

function isFormValid() {

    return (
        document.getElementById("A_b").value.trim().length >= 3 &&
        document.getElementById("TASK").value.trim().length >= 3 &&
        document.getElementById("des").value.trim() !== "" &&
        document.getElementById("A_D").value !== "" &&
        document.getElementById("PRIORITY").value !== "" &&
        (
            first_week.checked || second_week.checked ||
            third_week.checked || fourth_week.checked
        ) &&
        (
            N_s.checked || I_P.checked || C.checked ||
            N_F.checked || N_I.checked || C_L.checked
        )
    );

}


function DESCRIPTION_CHECK() {
    let d = document.getElementById("des");
    let e = document.getElementById("Description_error");

    if (d.value.trim() === "") {
        e.innerText = "Fill Description";
        d.style.border = "2px solid red";
        return false;
    }

    e.innerText = "";
    d.style.border = "2px solid green";
    return true;
}

function DATE_CHECK() {
    let d = document.getElementById("A_D");
    let e = document.getElementById("ASSIAN_date_ERROR");

    if (d.value === "") {
        e.innerText = "Select Date";
        d.style.border = "2px solid red";
        return false;
    }

    e.innerText = "";
    d.style.border = "2px solid green";
    return true;
}

function PRIORITY_CHECK() {
    let p = document.getElementById("PRIORITY");
    let e = document.getElementById("priorty_error");

    if (p.value === "") {
        e.innerText = "Select Priority";
        p.style.border = "2px solid red";
        return false;
    }

    e.innerText = "";
    p.style.border = "2px solid green";
    return true;
}

function WEEK_CHECK() {
    let e = document.getElementById("week_error");

    if (
        !first_week.checked && !second_week.checked && !third_week.checked && !fourth_week.checked
    ) {
        e.innerText = "Select Deadline";
        return false;
    }

    e.innerText = "";
    return true;
}

function STATUS_CHECK() {
    let e = document.getElementById("status_error");

    if (
        !N_s.checked &&
        !I_P.checked &&
        !C.checked &&
        !N_F.checked &&
        !N_I.checked &&
        !C_L.checked
    ) {
        e.innerText = "Select Status";
        return false;
    }

    e.innerText = "";
    return true;
}
function CHECK_BUTTON() {

    let btn = document.getElementById("Task_btn");

    if (isFormValid()) {
        btn.disabled = false;
        btn.style.opacity = "1";
    } else {
        btn.disabled = true;
        btn.style.opacity = "0.5";
    }

}





document.getElementById("Task_btn").onclick = ADD_TASK;

function ADD_TASK() {

    document.getElementById("FOTTER_END").style.display = "grid";
    let assigned = document.getElementById("A_b").value;
    let task = document.getElementById("TASK").value;
    let description = document.getElementById("des").value;
    let date = document.getElementById("A_D").value;

    let priority = document.getElementById("PRIORITY").value;

    let deadline = "";

    if (document.getElementById("first_week").checked) {
        deadline = "With In 1 Week";
    }
    if (document.getElementById("second_week").checked) {
        deadline = "With In 2 Week";
    }
    if (document.getElementById("third_week").checked) {
        deadline = "With In 3 Week";
    }
    if (document.getElementById("fourth_week").checked) {
        deadline = "With In 4 Week";
    }
    let status = "";

    if (document.getElementById("N_s").checked) {
        status = "Not Started";
    }
    if (document.getElementById("I_P").checked) {
        status = "In Progress";
    }
    if (document.getElementById("C").checked) {
        status = "Completed";
    }
    if (document.getElementById("N_F").checked) {
        status = "Needs Info";
    }
    if (document.getElementById("N_I").checked) {
        status = "On Hold";
    }
    if (document.getElementById("C_L").checked) {
        status = "Cancelled";
    }

    document.getElementById("first_box").innerText = assigned;
    document.getElementById("sec_box").innerText = task;
    document.getElementById("third_box").innerText = description;
    document.getElementById("fouth_box").innerText = date;
    document.getElementById("fifth_box").innerText = priority;
    document.getElementById("six_box").innerText = deadline;
    document.getElementById("seven_box").innerText = status;



    document.getElementById("A_b").value = "";
    document.getElementById("TASK").value = "";
    document.getElementById("des").value = "";
    document.getElementById("A_D").value = "";
    document.getElementById("PRIORITY").value = "";

    document.getElementById("first_week").checked = false;
    document.getElementById("second_week").checked = false;
    document.getElementById("third_week").checked = false;
    document.getElementById("fourth_week").checked = false;

    document.getElementById("N_s").checked = false;
    document.getElementById("I_P").checked = false;
    document.getElementById("C").checked = false;
    document.getElementById("N_F").checked = false;
    document.getElementById("N_I").checked = false;
    document.getElementById("C_L").checked = false;

    document.getElementById("Completed_cheak").checked = false;
    document.getElementById("FOTTER").style.display = "block";
    let btn_tsk = document.getElementById("Task_btn");
    if (btn_tsk.innerText === "Add Task")
    {
        btn_tsk.disabled = true;
    }
    else
    {
        btn_tsk.disabled = true;
        btn_tsk.innerText = "Add Task";

    }

    if (btn_tsk.innerText === "Add Task") {
        Swal.fire({
            icon: 'success',
            title: 'Task Added',
            text: 'Your task has been added successfully!',
            confirmButtonText: 'OK'
        });
    }
    else
    {
        Swal.fire({
            icon: 'success',
            title: 'Task updeted',
            text: 'Your task has been updeted successfully!',
            confirmButtonText: 'OK'
        });
        
    }
    isEditMode = false;

    
    DISABLE_ALL_FIELDS();


}


function Cheak_click_function() {

    let chk = document.getElementById("Completed_cheak");

    if (chk.checked) {

        document.getElementById("Delete_btn").style.opacity = "1";
        document.getElementById("Delete_btn").disabled = false;
        document.getElementById("first_box").style.backgroundColor = "#c8f7c5";
        document.getElementById("sec_box").style.backgroundColor = "#c8f7c5";
        document.getElementById("third_box").style.backgroundColor = "#c8f7c5";
        document.getElementById("fouth_box").style.backgroundColor = "#c8f7c5";
        document.getElementById("fifth_box").style.backgroundColor = "#c8f7c5";
        document.getElementById("six_box").style.backgroundColor = "#c8f7c5";
        document.getElementById("seven_box").style.backgroundColor = "#c8f7c5";
        document.getElementById("eyet_box").style.backgroundColor = "#c8f7c5";
        document.getElementById("nine_box").style.backgroundColor = "#c8f7c5";
        document.getElementById("tenth_box").style.backgroundColor = "#c8f7c5";

    } else {
        document.getElementById("Delete_btn").disabled = true;
        document.getElementById("Delete_btn").style.opacity = "0.5";
        document.getElementById("first_box").style.backgroundColor = "";
        document.getElementById("sec_box").style.backgroundColor = "";
        document.getElementById("third_box").style.backgroundColor = "";
        document.getElementById("fouth_box").style.backgroundColor = "";
        document.getElementById("fifth_box").style.backgroundColor = "";
        document.getElementById("six_box").style.backgroundColor = "";
        document.getElementById("seven_box").style.backgroundColor = "";
        document.getElementById("eyet_box").style.backgroundColor = "";
        document.getElementById("nine_box").style.backgroundColor = "";
        document.getElementById("tenth_box").style.backgroundColor = "";
    }

}

function Edit_function() {


    document.getElementById("Task_btn").innerText = "Update Task";
    let assigned = document.getElementById("first_box").innerText;
    let task = document.getElementById("sec_box").innerText;
    let description = document.getElementById("third_box").innerText;
    let date = document.getElementById("fouth_box").innerText;
    let priority = document.getElementById("fifth_box").innerText;
    let deadline = document.getElementById("six_box").innerText;
    let status = document.getElementById("seven_box").innerText;

    document.getElementById("A_b").value = assigned;
    document.getElementById("TASK").value = task;
    document.getElementById("des").value = description;
    document.getElementById("A_D").value = date;
    document.getElementById("PRIORITY").value = priority;

    document.getElementById("first_week").checked = false;
    document.getElementById("second_week").checked = false;
    document.getElementById("third_week").checked = false;
    document.getElementById("fourth_week").checked = false;

    if (deadline === "With In 1 Week") {
        document.getElementById("first_week").checked = true;
    }
    if (deadline === "With In 2 Week") {
        document.getElementById("second_week").checked = true;
    }
    if (deadline === "With In 3 Week") {
        document.getElementById("third_week").checked = true;
    }
    if (deadline === "With In 4 Week") {
        document.getElementById("fourth_week").checked = true;
    }

    document.getElementById("N_s").checked = false;
    document.getElementById("I_P").checked = false;
    document.getElementById("C").checked = false;
    document.getElementById("N_F").checked = false;
    document.getElementById("N_I").checked = false;
    document.getElementById("C_L").checked = false;

    if (status === "Not Started") {
        document.getElementById("N_s").checked = true;
    }
    if (status === "In Progress") {
        document.getElementById("I_P").checked = true;
    }
    if (status === "Completed") {
        document.getElementById("C").checked = true;
    }
    if (status === "Needs Info") {
        document.getElementById("N_F").checked = true;
    }
    if (status === "On Hold") {
        document.getElementById("N_I").checked = true;
    }
    if (status === "Cancelled") {
        document.getElementById("C_L").checked = true;
    }

    document.getElementById("Completed_cheak").checked = false;

    document.getElementById("first_box").style.backgroundColor = "";
    document.getElementById("sec_box").style.backgroundColor = "";
    document.getElementById("third_box").style.backgroundColor = "";
    document.getElementById("fouth_box").style.backgroundColor = "";
    document.getElementById("fifth_box").style.backgroundColor = "";
    document.getElementById("six_box").style.backgroundColor = "";
    document.getElementById("seven_box").style.backgroundColor = "";
    document.getElementById("eyet_box").style.backgroundColor = "";
    document.getElementById("nine_box").style.backgroundColor = "";
    document.getElementById("tenth_box").style.backgroundColor = "";
     document.getElementById("Delete_btn").disabled = true;
        document.getElementById("Delete_btn").style.opacity = "0.5";
    document.getElementById("Task_btn").disabled = false;

    ENABLE_ALL_FIELDS();
}
function SHOW_LOADER() {
    document.getElementById("LOADER").style.display = "flex";

    setTimeout(function () {
        document.getElementById("LOADER").style.display = "none";
        delete_function();
    }, 3000);
}

function delete_function() {
    document.getElementById("Task_btn").innerText = "Add Task";
    // document.getElementById("Task_btn").disabled = false;

    ENABLE_ALL_FIELDS();
    document.getElementById("FOTTER_END").style.display = "none";

    let delBtn = document.getElementById("Delete_btn");
    delBtn.disabled = true;
    delBtn.style.opacity = "0.5";

    Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Task deleted successfully!'
    });
    isEditMode = true;
}


function DISABLE_ALL_FIELDS() {
    A_b.disabled = true;
    TASK.disabled = true;
    des.disabled = true;
    A_D.disabled = true;
    PRIORITY.disabled = true;

    first_week.disabled = true;
    second_week.disabled = true;
    third_week.disabled = true;
    fourth_week.disabled = true;

    N_s.disabled = true;
    I_P.disabled = true;
    C.disabled = true;
    N_F.disabled = true;
    N_I.disabled = true;
    C_L.disabled = true;
}

function ENABLE_ALL_FIELDS() {
    A_b.disabled = false;
    TASK.disabled = false;
    des.disabled = false;
    A_D.disabled = false;
    PRIORITY.disabled = false;

    first_week.disabled = false;
    second_week.disabled = false;
    third_week.disabled = false;
    fourth_week.disabled = false;

    N_s.disabled = false;
    I_P.disabled = false;
    C.disabled = false;
    N_F.disabled = false;
    N_I.disabled = false;
    C_L.disabled = false;
}
