// A constructor for an object that stores information about a web resource.
function Source (name, url, description, provider) {
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
        console.log(`${name} was added to the Resources array.`)
    }
}
const displaySources = (resources, section) => {
    section.innerHTML = '';
    
    // Accesses a 'div' element and displays all sources within it
    switch(resources.length){
        case 0:
            console.log("Unfortunately, you don't have any sources. Try and add some!");
            break;
        case 1:
            console.log("Yipee! You have a source to look at!");
            resources.forEach((source) => {
                section.innerHTML += `<div class="resource"><h3><a href="${source.url}">${source.name}</a></h3><p>${source.description}</p></div>`;
            });
            break;
        case 2:
            console.log("Oooh! We've got two sources! Yay!");
            resources.forEach((source) => {
                section.innerHTML += `<div class="resource"><h3><a href="${source.url}">${source.name}</a></h3><p>${source.description}</p></div>`;
            });
            break;
        default:
            resources.forEach((source) => {
                section.innerHTML += `<div class="resource"><h3>${source.name}</h3><p>${source.description}</p><p>${source.provider}</p></div>`
            });
            console.log("Nice, we've got quite a few resources to look at.");
            break;
    }
};

addSource(
    "How Animation Works - 3 Basic Principles", 
    "https://www.youtube.com/watch?v=1KPfsCrmWzk", 
    "Animation has the reputation of being a difficult art medium. In this video, let's reveal the true basics of animation to make the learning process easier.", 
    "NobleFrugal Studio"
);

addSource(
    "The Beauty of Bezier Curves",
    "https://www.youtube.com/watch?v=aVwxzDHniEw",
    "They're used for animation, text rendering, and all sorts of curved shapes! But how do they actually work? well, like, that's what the video is about, so, watch it to find out etc!!",
    "Freya Holmer"
);

displaySources(resources, bibliography);