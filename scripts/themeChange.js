var themeToggleCount = 0;
const themeChanger = document.getElementById("theme-chng").children[0];

if(sessionStorage.getItem("theme")){
    document.body.setAttribute('data-theme', sessionStorage.getItem("theme"));
    if(sessionStorage.theme == "dark"){
        themeChanger.checked = true;
    }
}

function toggleTheme() {
    // Retrieves the current theme being utilized
    sessionStorage.setItem("theme", document.body.getAttribute('data-theme'));
    
    if(String(sessionStorage.theme) === 'dark'){
        document.body.setAttribute('data-theme', "light");
        sessionStorage.theme = "light";
    }
    else {
        document.body.setAttribute('data-theme', "dark");
        sessionStorage.theme = "dark";
    }
    // The number of times the theme has been changed is increased by one each time.
    themeToggleCount += 1;
    // Then, the number of theme changes is logged to the console.
    console.log(`Theme has been changed ${themeToggleCount} time(s).`)
}