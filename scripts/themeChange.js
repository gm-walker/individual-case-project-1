var themeToggleCount = 0;
const themeChanger = document.getElementById("theme-chng").children[0];

function readCookie(){
    let cookies = {};
    if(document.cookie){
        let cookieList = document.cookie.split("; ");
        cookieList.forEach((items)=>{
            let cookie = items.split("=");
            let name = cookie[0]
            let value = decodeURIComponent(cookie[1]);
            cookies[name] = value;
        })
        return cookies;
    }
}
if(readCookie()['theme'] == 'dark'){
    themeChanger.checked = true;
    document.body.setAttribute('data-theme', "dark");
}

function toggleTheme() {
    // Retrieves the current theme being utilized
    document.cookie = `theme=${document.body.getAttribute('data-theme')}`;
    
    if(readCookie()['theme'] === 'dark'){
        document.body.setAttribute('data-theme', "light");
        document.cookie = "theme=light";
    }
    else {
        document.body.setAttribute('data-theme', "dark");
        document.cookie = "theme=dark";
    }
    // The number of times the theme has been changed is increased by one each time.
    themeToggleCount += 1;
    // Then, the number of theme changes is logged to the console.
    console.log(`Theme has been changed ${themeToggleCount} time(s).`)
}