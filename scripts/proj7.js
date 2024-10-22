const contact_form = document.forms["contactfrm"].elements;
const files = [];

/**
 * This function adds the file to the 'recentFiles' select element and to the 'files' array.
 * @param {string} file - The file's path
 */

function addFile(file){
    try{
        // If the file exists in the 'files' array, it will throw an exception.
        files.forEach(f => {
            if(f == file.match(/[a-zA-Z0-9_]+\.txt/g)[0]){
                throw `ERR: ${f} already exists`;
            }
        })
        // Otherwise, it pushes the filename into the array.
        files.push(file.match(/[a-zA-Z0-9_]+\.txt/g)[0]);
        
        // Creates a new option and places it into 'recentFiles' select element.
        let newOption = document.createElement("option")
        newOption.value = contact_form.message.value;
        newOption.text = file.match(/[a-zA-Z0-9_]+\.txt/g);
        contact_form.recentFiles.add(newOption, contact_form.recentFiles[1])
    }
    catch(err){
        console.log(err)
    }
}

contact_form.text_file.onchange = readTxtFile;
/**
 * This function reads the file uploaded by the user and places its contents into the 'Message' text area.
 */
function readTxtFile(){
    let file_reader = new FileReader();
    file_reader.readAsText(this.files[0]);
    // When a file is loaded, it will be read and the contents will be placed in the message text area.
    file_reader.onload = function(){
        contact_form.message.value = file_reader.result;
        
        addFile(contact_form.text_file.value);
        
        // Clears the 'Message' text area
        contact_form.text_file.value = '';
        
        parseMessage.call(contact_form.message);
    }
}
contact_form.recentFiles.onchange = function(){   
    
    // When a file is loaded, it will be read and the contents will be placed in the message text area.
    contact_form.message.value = this.value;

}
contact_form.delOption.onclick= function(){
    // If there are no elements, notify and do nothing.
    if(contact_form.recentFiles.selectedOptions.length == 0){
        console.log("There are no options to remove");
        return;
    }
    let fileName = contact_form.recentFiles.selectedOptions[0].innerHTML;
    
    // Removes the file from the 'recentFiles' select element
    contact_form.recentFiles.remove(contact_form.recentFiles.selectedIndex);
    
    // Removes the filename from the 'files' array
    delete files[files.indexOf(fileName)];
    files.length -= 1;
    
    console.log(files);
    
    // Clears the 'Message' text area
    contact_form.message.value = '';
}

contact_form.email.onchange = getEmailDomain;

function getEmailDomain(){
    let email_parts = this.value.split('@')
    
    switch (email_parts[1]) {
        case "gmail.com":
            console.log("This email is linked to a Google Account");
            break;
        case "liberty.edu":
            console.log("Oh, you go to Liberty University! Neat.");
            if(email === "gwalker48@liberty.edu"){
                console.log("Wait a minute... YOU ARE ME!!! What are you doing here?");
            }
            break;
        default:
            console.log(`${email_parts[0]} is from ${email_parts[1]}`);
            break;
    }
}

contact_form.message.onchange = parseMessage;
/**
 * This function parses the message in the 'Message' text area and find the number of occurrences of each word.
 */
function parseMessage(){
    // Parses the message, finding all words
    let message_words = this.value.split(/[\s,!?;.:]+/g);
    message_words.pop();
    // Changes the case of all words to make capitalization irrelevant
    message_words = message_words.map(word=>word.toLowerCase());
    
    // Creates a dictionary that contains each word in the message and the number of times it occurs.
    const occurrences = {};
    message_words.forEach(word => {
        if(occurrences[word]){
            occurrences[word] += 1;
        }
        else {
            occurrences[word] = 1;
        }
    })
    // Sorts the dictionary by value, largest number of occurrences first.
    let sortedOccurrences = Object.fromEntries(
        Object.entries(occurrences).sort(([,x], [,y]) => x-y).reverse()
    )
    // Logs the dictionary object to the console.
    console.log(sortedOccurrences)
}