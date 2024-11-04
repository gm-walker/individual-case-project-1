var themeToggleCount = 0;
const themeChanger = document.getElementById("theme-chng").children[0];
    /*
        Code security is critical for the safe use and storage of state 
        information because it ensures that sensitive information can never be 
        accessed by those who are unauthorized to view/modify that information. In 
        my case, I have utilized cookies for a cosmetic purpose only (to store the 
        state of the 'data-theme' attribute). To further improve my website's 
        security, I could ensure that cookies are created to store information 
        related solely to the cosmetics of the website.
    */
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
    // Notifies the user that they've changed the theme
    window.alert(`You've changed the theme!`)
    // Then, the number of theme changes is logged to the console.
    console.log(`Theme has been changed ${themeToggleCount} time(s).`)
}