const quoteField = document.getElementById("quote");

fetch("https://bible-api.com/?random=verse?translation=kjv")
    // Parse the retrieved JSON object
    .then(response => response.json())
    // Inserts HTML containing the verse and the reference in the designated paragraph element
    .then(verse => quoteField.innerHTML = `${verse.text}<br><strong>${verse.reference}</strong>`)
    // If something goes wrong, alert the client.
    .catch(error => window.alert(error))