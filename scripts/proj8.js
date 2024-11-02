/* 
For this assignment, I utilized the browser's console to let me know when/if I had syntax errors in my code. 
I could also double-check to make sure that I was using a method rather than returning the method itself (a mistake I've made quite a few times. 
I would also use the console to see what form values from the form came as and what I should use. 
For example, the 'is-new' checkbox has a value property AND a 'checked' property. 
Value returns the value, regardless of whether the checkbox is checked. The checked property is conditional. 
Therefore, it was very important for me to check to make sure that I was working with the value that would make my code function as intended. 
I also utilized 'console.log()' to ensure methods were functioning properly by placing these calls in certain sections of my code 
to make sure certain things run or don't run.
*/

const fields = Array.from(document.forms[0].elements).filter((field) => field.type !== "submit" && field.type !== "reset");
const STD_DPS = 24;
const ECON_DPS = STD_DPS/3;

// Validates all fields whenever focused on or being changed.
fields.forEach(field => {
    field.onfocus = validate;
    field.oninput = validate;
})
function validate(){
    try{
        if(this.validity.valueMissing || this.value.length <= 0){
            switch (this.name) {
                case "prjName":
                    throw "Please enter a project name."
                    break;
                case "animLength":
                    throw "Please enter the duration of your animation."
                    break;
                case "tpf":
                    throw "Please enter the time it takes to create one (1) frame."
                    break;
                case "numOfanimators":
                    throw "Please enter the number of animators working on this project."
                    break;
                case "startDate":
                    throw "Please enter the start date of this project."
                    break;
                default:
                    throw "Please enter a valid value."
                    break;
            }
        }
        else if(this.validity.rangeUnderflow){
            throw `Please enter a valid value (i.e., ≥${this.min})`
        }
        else{
            throw ""
        }
    }
    catch(err){
        // Errors that are caught will be reported to the user
        this.setCustomValidity(err);
        this.reportValidity();
    }
}

function Project(name, team_size, start_date, is_first){
    this.prj_name = name;
    this.team_size = team_size;
    this.start_date = start_date;
    this.is_first = is_first;
}


function Animation_Project(name, team_size, start_date, is_first, length, time_per_frame){
    Project.call(this, name, team_size, start_date, is_first);
    
    this.length = length;
    this.time_per_frame = time_per_frame;
    this.calcTotalNumOfFrames = (dps) => this.length * (dps * 60);
    this.calcProjectTime = (dps) => {
        // If this is their first time, double the time it could take.
        if(this.is_first == true){
            return (this.calcTotalNumOfFrames(dps) * this.time_per_frame)/(60 * this.team_size) * 2;
        }
        return (this.calcTotalNumOfFrames(dps) * this.time_per_frame)/(60 * this.team_size);
    };
    this.end_date = () =>{
        let tmp_date = new Date(this.start_date);
        tmp_date.setDate(tmp_date.getDate() + Math.floor(this.calcProjectTime(STD_DPS).toFixed()/8));
        return tmp_date;
    }
}


function displayResults(){
    // Grabs access to a specially created 'div' element called "results"
    const resultSection = document.getElementById("results");
    const calculator = document.forms[0].elements
        // Creates a Date Object for the project's start date.
        var s_date = new Date(calculator.startDate.value);
        s_date.setDate(s_date.getDate()+1);
        
        let a_prj = new Animation_Project(calculator.prjName.value, calculator.numOfanimators.value, s_date, calculator.isNewbie.checked, calculator.animLength.value, calculator.tpf.value);
        
        // Modifies the contents of the 'div' element to display a procedurally generated message based on the user's inputs.
        resultSection.style.display = "block";
        resultSection.innerHTML = `<div><h2>Results</h2>
        <p>Your project, <strong>${a_prj.prj_name.toUpperCase()}</strong>, has a runtime of <strong>${a_prj.length.toLocaleString()} minutes</strong>, comprised of at least <strong>${a_prj.calcTotalNumOfFrames(ECON_DPS).toLocaleString()} frames</strong> (when animating on 3's) and at most <strong>${a_prj.calcTotalNumOfFrames(STD_DPS).toLocaleString()} frames</strong> (when animating on 1's).</p><p>Since you have a team of <strong>${a_prj.team_size.toLocaleString()} animators</strong> and it takes <strong>${a_prj.time_per_frame} minutes</strong> to create one frame, it will take you roughly <strong>${a_prj.calcProjectTime(ECON_DPS).toFixed().toLocaleString()} - ${a_prj.calcProjectTime(STD_DPS).toFixed().toLocaleString()} hours.</strong></p><p>If you start animating <strong>${a_prj.start_date.toDateString()}</strong>, then you can expect to finish (at the earliest) around <strong>${a_prj.end_date().toDateString()}</strong></p></div>`;   
}


// When the overlay is clicked on, the overlay disappears.
document.getElementById("results").onclick = () => {
    document.getElementById("results").style.display = "none"
}