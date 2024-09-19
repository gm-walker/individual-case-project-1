var themeToggleCount = 0;
        function toggleTheme() {
            // Retrieves the current theme being utilized
            const curTheme = document.body.getAttribute('data-theme');
            
            if(curTheme === 'dark'){
                document.body.setAttribute('data-theme', 'light');
            }
            else {
                document.body.setAttribute('data-theme', 'dark');
            }
            
            // If the theme is toggled more than 3 times, the paragraph text on the home page turns blue.
            if(themeToggleCount >= 3){
                document.getElementById('bio-txt').style.color = 'blue';
            }
            // The number of times the theme has been changed is increased by one each time.
            themeToggleCount += 1;
            // Then, the number of theme changes is logged to the console.
            console.log(`Theme has been changed ${themeToggleCount} time(s).`)
        }