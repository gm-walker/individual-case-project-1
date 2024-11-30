const quoteField = document.getElementById("quote");

fetch("https://bible-api.com/?random=verse?translation=kjv")
    .then(response => response.json())
    .then(verse => quoteField.innerHTML = `${verse.text}<br><strong>${verse.reference}</strong>`)
    .catch(error => window.alert(error))