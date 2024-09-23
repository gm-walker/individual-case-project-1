// A constructor for an object that stores information about a web resource.
const Source = (name, url, description, provider) => {
    this.name = name;
    this.url = url;
    this.description = description;
    this.provider = provider;
}

const resources = [];
const bibliography = document.getElementById("bib-items");

function addSource (name, url, desc, provider){
    if(name == ""){
        alert("ERR: No Name for Source");
    }
    else {
        resources.push(new Source(name, url, desc, provider));
    }
}

function writeSourceToSection(section, source){
    section.innerHTML += `<div class="resource"><h3>${source.name}</h3><p>${source.description}</p><p>${source.provider}</p></div>`
}

const displaySources = (section) => {
    section.innerHTML = '';
    
    // Accesses a 'div' element and displays all sources within it
    switch(resources.length){
        case 0:
            console.log("Unfortunately, you don't have any sources. Try and add some!");
            break;
        case 1:
            console.log("Yipee! You have a source to look at!");
            
            break;
        case 2:
            console.log("Oooh! We've got two sources! Yay!");
        default:
            resources.forEach();
            console.log("Nice, we've got quite a few resources to look at.");
            break;
    }
};

