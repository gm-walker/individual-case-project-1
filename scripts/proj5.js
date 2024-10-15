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
function displayResults(prj_name, length, time_per_frame, num_of_animators, startDate, isNew){
    // Grabs access to a specially created 'div' element called "results"
    const resultSection = document.getElementById("results");
    
    try{
        // If the submission has no project name...
        if(prj_name.value === ""){
            throw "No project name.\nPlease enter a project name into the calculator.";
        }
        // If the animation length is less than 1 min...
        else if(length.value <= 0){
            throw "Invalid animation length.\nPlease enter a value greater than zero (0)."
        }
        // If the time it takes to create one (1) frame of animation is less than one (1) min...
        else if(time_per_frame <= 0){
            throw "Invalid time per frame.\nPlease enter a value greater than zero (0)."
        }
        // If the number of animators working on this project is less than one (1)...
        else if(num_of_animators <= 0){
            throw "Invalid number of animators.\nPlease enter a value greater than zero (0)."
        }
        else if(startDate == ""){
            throw "No start date. \n Please enter the project's start date into the calculator."
        }
        // Creates a Date Object for the project's start date.
        var s_date = new Date(startDate.value);
        s_date.setDate(s_date.getDate()+1);
        
        // Creates a Date Object for the project's estimated end date based on the project time
        var e_date = new Date(s_date);
        e_date.setDate(e_date.getDate() + Math.floor(calcProjectTime(calcTotalNumOfFrames(length.value, 8))(time_per_frame.value)(num_of_animators.value)(isNew.checked).toFixed()/8));
        
        // Modifies the contents of the 'div' element to display a procedurally generated message based on the user's inputs.
        resultSection.style.display = "block";
        resultSection.innerHTML = `<div><h2>Results</h2>
        <p>Your project, <strong>${prj_name.value}</strong>, has a runtime of <strong>${length.value.toLocaleString()} minutes</strong>, comprised of at least <strong>${calcTotalNumOfFrames(length.value, 8).toLocaleString()} frames</strong> (when animating on 3's) and at most <strong>${calcTotalNumOfFrames(length.value, 24).toLocaleString()} frames</strong> (when animating on 1's).</p><p>Since you have a team of <strong>${num_of_animators.value.toLocaleString()} animators</strong> and it takes <strong>${time_per_frame.value} minutes</strong> to create one frame, it will take you roughly <strong>${calcProjectTime(calcTotalNumOfFrames(length.value, 8))(time_per_frame.value)(num_of_animators.value)(isNew.checked).toFixed().toLocaleString()} - ${calcProjectTime(calcTotalNumOfFrames(length.value, 24))(time_per_frame.value)(num_of_animators.value)(isNew.checked).toFixed().toLocaleString()} hours.</strong></p><p>If you start animating <strong>${s_date.toDateString()}</strong>, then you can expect to finish (at the earliest) around <strong>${e_date.toDateString()}</strong></p></div>`;
    }
    // If an error occurs, display the error in an alert to the user and in the browser console.
    catch (err){
            console.log(`ERR: ${err}`);
            alert(`ERROR: ${err}`);
    }   
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