// A constructor for an object that stores information about a web resource.
function Source (id, name, url, e_url, description, provider) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.embedUrl = e_url;
    this.description = description;
    this.provider = provider;
}

const resources = [];
const bibliography = document.getElementById("bib-items");

function addSource (id, name, url, e_url, desc, provider){
    if(name == ""){
        alert("ERR: No Name for Source");
    }
    else {
        resources.push(new Source(id, name, url, e_url, desc, provider));
        console.log(`${name} was added to the Resources array.`)
    }
}
const displaySources = (resources, section) => {
    section.innerHTML = '';
    
    resources.forEach((source) => {
        section.innerHTML += `<div id="${source.id}" class="resource">
        <h3><a href="${source.url}" target="_blank">${source.name}</a></h3>
        <p>${source.description}</p>
        </div>`;
    });
};
addSource(
    "1KPfsCrmWzk",
    "How Animation Works - 3 Basic Principles", 
    "https://www.youtube.com/watch?v=1KPfsCrmWzk", 
    "https://www.youtube.com/embed/1KPfsCrmWzk",
    "Animation has the reputation of being a difficult art medium. In this video, let's reveal the true basics of animation to make the learning process easier.", 
    "NobleFrugal Studio"
);

addSource(
    "aVwxzDHniEw",
    "The Beauty of Bezier Curves",
    "https://www.youtube.com/watch?v=aVwxzDHniEw",
    "https://www.youtube.com/embed/aVwxzDHniEw",
    "They're used for animation, text rendering, and all sorts of curved shapes! But how do they actually work? well, like, that's what the video is about, so, watch it to find out etc!!",
    "Freya Holmer"
);

displaySources(resources, bibliography);