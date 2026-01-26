function year_select()
{
    let current_year = new Date().getFullYear();
    let year = document.getElementById("year").value;
    let  leapMsg = document.getElementById("leap_year");
    if (year.length == 0)
    {
        document.getElementById("Form_page").reset();
        document.getElementById("month").disabled = true;
        document.getElementById("dayss").disabled = true;
        document.getElementById("Extra").style.display = "none";
        document.getElementById("cl_dyas").value = "";
        document.getElementById("cl_yes").disabled = true;
        document.getElementById("cl_no").disabled = true;
        document.getElementById("cl_yes").disabled = null;
        document.getElementById("cl_no").disabled = null;
        leapMsg.innerText = "";
        return;
    }

    
    if (year.length < 4)
    {
        document.getElementById("month").disabled = true;
        document.getElementById("dayss").disabled = true;
        leapMsg.innerText = "";

        return;
    }

    if (year > 2000 && year <= current_year)
    {
        document.getElementById("month").disabled = false;
        document.getElementById("dayss").disabled = false;
        document.getElementById("Extra").style.display = "none";
        document.getElementById("cl_dyas").value = "";
        leapMsg.innerText = "";

    }
    else
    {
        document.getElementById("Form_page").reset();
        document.getElementById("month").disabled = true;
        document.getElementById("dayss").disabled = true;
        document.getElementById("Extra").style.display = "none";
        document.getElementById("cl_dyas").value = "";

    }
    if(year > 0)
    {
        document.getElementById("EPD").disabled = true;
        document.getElementById("EAD").disabled = true;
        document.getElementById("cl_yes").disabled = true;
        document.getElementById("cl_no").disabled = true;
        leapMsg.innerText = "";

    }
    if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
    {
        leapMsg.innerText = "Year is Leap Year";
        leapMsg.style.color = "green";
    }
    else
    {
         leapMsg.innerText = "Year is Not Leap Year";
        leapMsg.style.color = "red";
    }

}



function setDays()
{
    let month = document.getElementById("month").value;
    let year  = document.getElementById("year").value;
    let daysInput = document.getElementById("dayss");
    let size = year.length;
    if(size == "")
    {

        daysInput.value = "";
        return 0;
    } 
    if(month == "")
    {
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
        document.getElementById("EAD").disabled = true;
        document.getElementById("cl_yes").disabled = true;
        document.getElementById("cl_no").disabled = true;
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
    if (month == 2)   
{
        

    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
    {
        days = 29;

        
    }
    else
    {
        days = 28;

       
    }
}

    else if(month == 4 || month == 6 || month == 9 || month == 11)
    {
        days = 30;
    }
    else
    {
        days = 31;
    }

    
    daysInput.value = days;
        document.getElementById("EPD").disabled = false;
        document.getElementById("EAD").disabled = false;
        // document.getElementById("cl_yes").disabled = null;
        // document.getElementById("cl_no").disabled = null;
    //  leapMsg.innerText = "Year is Not Leap Year";
    return days;
    


}
function REMENING_DYS()
{
    let totalDays = setDays();
    let absentInput = document.getElementById("EAD");
    let error = document.getElementById("EAD_ERROR");
    let prd = document.getElementById("PRD");

    let absent = +absentInput.value;

    if (absentInput.value == 0)
    {
        prd.value = "";
        document.getElementById("Total_sallary").value = "";
        error.innerText = "";
        document.getElementById("EPD").value = "";
          document.getElementById("hrinput").value = "";
        document.getElementById("sdinput").value = "";
        document.getElementById("focdinput").value = "";
        document.getElementById("travelinput").value = "";
          document.getElementById("cl_yes").checked = false;
        document.getElementById("cl_no").checked = false;
         document.getElementById("cl_yes").disabled = true;
        document.getElementById("cl_no").disabled = true;
        hideExtra();
        resetSalary()
        
        return;
    }

    if (absent < 0)
    {
        error.innerText = "Absent days cannot be negative";
        absentInput.style.border = "2px solid red";
        prd.value = "";
        hideExtra();
        resetSalary()
        return 0;
    }

    if (absent > totalDays)
    {
        error.innerText = "Enter valid absent days";
        absentInput.style.border = "2px solid red";
        prd.value = "";
        hideExtra();
        resetSalary()
        return 0;
    }

    
    error.innerText = "";
    absentInput.style.border = "2px solid green";
    

    let remainingDays = totalDays - absent;
    prd.value = remainingDays;

    return remainingDays;
}


function INPUT_TYPE()
    {
        let cl = document.getElementsByName("cl");
        if(cl[0].checked)
        {
            calculateSalary();
        }
        else if(cl[1].checked)
        {
            calculateSalary();
        }
        
    }

function checkCL()
{
    let R_DAYS = REMENING_DYS();
    let cl = document.getElementsByName("cl");
    let employee_per_day = document.getElementById("EPD").value;
     

    if(cl[0].checked)   
    {
        document.getElementById("Extra").style.display = "grid";
        AddEXTRA();

    }
    else             
    {
        document.getElementById("Extra").style.display = "none";
        document.getElementById("cl_dyas").value = "";
        document.getElementById("Total_sallary").value = "";

    }
    
    if(cl[1].checked)
    {
        let EMPLOYEE_SALLARY = employee_per_day * R_DAYS;
        document.getElementById("Total_sallary").value = EMPLOYEE_SALLARY;
    }
    else
    {
        document.getElementById("Total_sallary").value = "";

    }




}

function hideExtra()
{
    document.getElementById("Extra").style.display = "none";
    document.getElementById("cl_dyas").value = "";
}
function cheak_input() {
    let input = document.getElementById("EPD");
    let perDay = Number(input.value);
    let error = document.getElementById("salary_error");
    
    if (input.value.length === 0) {
        error.innerText = "";
        document.getElementById("cl_yes").disabled = true;
        document.getElementById("cl_no").disabled = true;
        document.getElementById("Total_sallary").value = "";
        hideExtra();
        resetSalary()

        return;
    }

    if (perDay < 0) {
        input.value = "";
        error.innerText = "Please enter valid salary";
        error.style.color = "red";
        document.getElementById("cl_yes").disabled = true;
        document.getElementById("cl_no").disabled = true;
        document.getElementById("Total_sallary").value = "";
        hideExtra();
        resetSalary()

        return;
    }

    if (perDay > 0 && perDay < 100) {
        error.innerText = "Minimum salary should be 100";
        error.style.color = "red";
        document.getElementById("cl_yes").disabled = true;
        document.getElementById("cl_no").disabled = true;
        document.getElementById("Total_sallary").value = "";
        hideExtra();
        resetSalary()


        return;
    }
        document.getElementById("cl_yes").disabled = false;
        document.getElementById("cl_no").disabled = false;
        document.getElementById("cl_yes").checked = false;
        document.getElementById("cl_no").checked = false;

    error.innerText = "";
}

function AddEXTRA()
{
    let totalDays = +setDays();        
    let R_DAYS    = +REMENING_DYS();   
    let CL_DAYS   = +document.getElementById("cl_dyas").value;

    let MAX_CL = totalDays - R_DAYS;

    if (CL_DAYS > MAX_CL)
    {
        CL_DAYS = MAX_CL;
        document.getElementById("cl_dyas").value = MAX_CL;
    }
  

    document.getElementById("PRD").value = R_DAYS + CL_DAYS;
    calculateSalary()
}

function calculateSalary()
{
    let perDay = +document.getElementById("EPD").value;

    let days   = +document.getElementById("PRD").value;

    let basicSalary = perDay * days;


    let HRp     = +document.getElementById("HR").value;
    let SDp     = +document.getElementById("SD").value;
    let FOCDp   = +document.getElementById("FOCD").value;
    let TRAVELp = +document.getElementById("TRAVEL").value;
    
    
    
    let HR     = (basicSalary * HRp) / 100;
    let SD     = (basicSalary * SDp) / 100;
    let FOCD   = (basicSalary * FOCDp) / 100;
    let TRAVEL = (basicSalary * TRAVELp) / 100;
    document.getElementById("hrinput").value = HR;
    document.getElementById("sdinput").value = SD;
    document.getElementById("focdinput").value = FOCD;
    document.getElementById("travelinput").value = TRAVEL;

    

    let totalSalary = basicSalary + HR + SD + FOCD + TRAVEL;

    document.getElementById("Total_sallary").value = totalSalary;

}

function resetSalary()
{
    // document.getElementById("EPD").value = "";
    // document.getElementById("EAD").value = "";
    // document.getElementById("PRD").value = "";
    document.getElementById("HR").value = "";
    document.getElementById("SD").value = "";
    document.getElementById("FOCD").value = "";
    document.getElementById("TRAVEL").value = "";
    document.getElementById("Total_sallary").value = "";

    // document.getElementById("EPD").disabled = true;
    // document.getElementById("EAD").disabled = true;

    // document.getElementById("cl_yes").checked = false;
    // document.getElementById("cl_no").checked = false;

    // document.getElementById("Extra").style.display = "none";
    // document.getElementById("cl_dyas").value = "";
}
