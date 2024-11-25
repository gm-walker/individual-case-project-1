// This file contains the scripts for the Trivia game (CSCN 315 Assignment #10-11)

const trivia_q = [
    {
        question: "In what book were the 12 Principles of Animation introduced?",
        options:{
            "The Illusion of Life: Disney Animation": true,
            "The Animator's Survival Kit": false,
        }
    },
    {
        question: "Who was the father of animation?",
        options:{
            "Walt Disney": false,
            "Richard Williams": false,
            "Émile Cohl": true,
        }
    },
    {
        question: "Who worked with Robert Zemeckis to blend live action and animation?",
        options:{
            "Stephen Spielberg": false,
            "Richard Williams": true,
            "Dale Baer": false,
        }
    }
];
var score = 0;

document.getElementById("trivia-start").onclick = () => {
    displayQuestion(trivia_q[0]);
}

function displayNextQuestion(){
    let question = document.getElementById("t_question");
    let curIndex = trivia_q.findIndex((q) => q.question.toUpperCase() === question.innerText.toUpperCase())
    if(curIndex + 1 < trivia_q.length){
        displayQuestion(trivia_q[curIndex+1]);
    }
}

function displayQuestion(question) {
    // Displays the question and its options on the page.
    let trivia_area = document.getElementById("trivia-game");

    // Set up trivia frame
    trivia_area.innerHTML = `<h1 id="t_question">${question.question}</h1><div id="trivia-options"></div><div id="trivia-field"></div><button id="trivia-next">Answer</button>`
    
    let trivia_options = document.getElementById("trivia-options");
    
    let i = 1;
    for(const keys in question.options){
        trivia_options.innerHTML += `<div id="q_${i}" class="t_option" draggable="true">${keys}</div>`;
        i++;
    }
    // For all options...
    document.querySelectorAll(`div[draggable="true"]`).forEach((option)=>{
        option.addEventListener("dragstart", (event) => {
            const dt = event.dataTransfer;
            dt.setData("html", event.target.id);
            dt.effectAllowed = "copy";
        })
    });
    // When an option is dropped into over the field...
    document.getElementById("trivia-field").addEventListener("drop", (event)=>{
        const data = event.dataTransfer.getData("html");
        const selected = document.getElementById(data);
        // If there is no child...
        if(event.target.firstChild == null){
            event.target.appendChild(selected.cloneNode(selected));
        }
        // Otherwise...
        else{
            let old = event.currentTarget.firstChild;
            event.currentTarget.replaceChild(selected.cloneNode(selected), old);
        }
    })
    // When an option is being dragged over the field...
    document.getElementById("trivia-field").addEventListener("dragover", (event)=>{
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    })

    // When the answer button is clicked...
    document.getElementById("trivia-next").onclick = (event)=>{
        let question = document.getElementById("t_question");
        let curIndex = trivia_q.findIndex((q) => q.question.toUpperCase() == question.innerText.toUpperCase())
        let selected = document.getElementById("trivia-field").firstChild.innerText;
        checkAnswer(trivia_q, curIndex, selected);
        console.log(curIndex)
        console.log(trivia_q.length);
        // If the question is the final question...
        if(curIndex == (trivia_q.length - 1)){
            event.currentTarget.innerText = "done";
            event.currentTarget.onclick = showFinalScreen;
        }
        // Otherwise...
        else{
            event.currentTarget.innerText = "next";
            event.currentTarget.onclick = displayNextQuestion;
        }

    }
}

function checkAnswer(trivia, qIndex, response){
    // Checks the answer selected by the user
    if(trivia[qIndex].options[response]){
        // If correct...
        window.alert("This answer is correct.")
        score++;
    }
    else{
        // Otherwise...
        window.alert("This answer is incorrect.")
    }
}

function showFinalScreen(){
    // Displays the final screen, showing the number of questions the user got right.
    const screen = document.getElementById("trivia-game");
    screen.innerHTML = `<h1>Congrats!</h1><p>You've answered all of the questions.<br>You've answered ${score} question(s) correctly out of ${trivia_q.length}.</p><br><button onclick="displayQuestion(trivia_q[0])">play again</button>`;

}