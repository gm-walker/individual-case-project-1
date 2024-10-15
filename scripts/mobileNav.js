const expandNav = () => {
    var page_links = document.getElementById("pageLinks");
    if (page_links.style.display === "block"){
        page_links.style.display = "none";
    }
    else {
        page_links.style.display = "block";
        
    }
};