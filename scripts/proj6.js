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
        this.setCustomValidity(err);
        this.reportValidity();
    }
}

function displayResults(){
    // Grabs access to a specially created 'div' element called "results"
    const resultSection = document.getElementById("results");
    const calculator = document.forms[0].elements
        // Creates a Date Object for the project's start date.
        var s_date = new Date(calculator.startDate.value);
        s_date.setDate(s_date.getDate()+1);
        
        // Creates a Date Object for the project's estimated end date based on the project time
        var e_date = new Date(s_date);
        e_date.setDate(e_date.getDate() + Math.floor(calcProjectTime(calcTotalNumOfFrames(calculator.animLength.value, 8))(calculator.tpf.value)(calculator.numOfanimators.value)(calculator.isNewbie.checked).toFixed()/8));
        
        // Modifies the contents of the 'div' element to display a procedurally generated message based on the user's inputs.
        resultSection.style.display = "block";
        resultSection.innerHTML = `<div><h2>Results</h2>
        <p>Your project, <strong>${calculator.prjName.value.toUpperCase()}</strong>, has a runtime of <strong>${calculator.animLength.value.toLocaleString()} minutes</strong>, comprised of at least <strong>${calcTotalNumOfFrames(calculator.animLength.value, 8).toLocaleString()} frames</strong> (when animating on 3's) and at most <strong>${calcTotalNumOfFrames(calculator.animLength.value, 24).toLocaleString()} frames</strong> (when animating on 1's).</p><p>Since you have a team of <strong>${calculator.numOfanimators.value.toLocaleString()} animators</strong> and it takes <strong>${calculator.tpf.value} minutes</strong> to create one frame, it will take you roughly <strong>${calcProjectTime(calcTotalNumOfFrames(calculator.animLength.value, 8))(calculator.tpf.value)(calculator.numOfanimators.value)(calculator.isNewbie.checked).toFixed().toLocaleString()} - ${calcProjectTime(calcTotalNumOfFrames(calculator.animLength.value, 24))(calculator.tpf.value)(calculator.numOfanimators.value)(calculator.isNewbie.checked).toFixed().toLocaleString()} hours.</strong></p><p>If you start animating <strong>${s_date.toDateString()}</strong>, then you can expect to finish (at the earliest) around <strong>${e_date.toDateString()}</strong></p></div>`;   
}
const calcProjectTime = numOfFrames => tpf => numOfAnimators => isNew => {
    // If this is their first time, double the time it could take.
    if(isNew == true){
        return (numOfFrames * tpf)/(60 * numOfAnimators) * 2;
    }
    return (numOfFrames * tpf)/(60 * numOfAnimators);
};
const calcTotalNumOfFrames = (length, dps) => length * (dps * 60);

// When the overlay is clicked on, the overlay disappears.
document.getElementById("results").onclick = () => {
    document.getElementById("results").style.display = "none"
}