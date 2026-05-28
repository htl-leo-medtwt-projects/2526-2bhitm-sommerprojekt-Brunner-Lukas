let room4Pc = {
    left: {
        label: "PC 01",
        name: "Syntax Terminal",
        quests: [
            {
                title: "Loop",
                headline: "Die verschlossene Schleife",
                type: "order",
                text: "Der for-Loop ist durcheinandergeraten. Ziehe die Teile in die richtige Reihenfolge.",
                pieces: ["i < 5;", "{ console.log(i); }", "i++)", "for", "(let i = 0;"],
                solution: ["for", "(let i = 0;", "i < 5;", "i++)", "{ console.log(i); }"],
                code: "94"
            },
            {
                title: "CSS",
                headline: "Das CSS-Styling",
                type: "css",
                text: "Der Button ist unsichtbar. Ziehe alle CSS-Eigenschaften auf den Button.",
                pieces: ["opacity: 1;", "display: block;", "background-color: red;"],
                solution: ["background-color: red;", "display: block;", "opacity: 1;"],
                code: "R4-02"
            },
            {
                title: "Keks",
                headline: "Die Keks-Funktion",
                type: "order",
                text: "Sortiere die Funktion so, dass sie einen fertigen Keks zurueckgibt.",
                pieces: ["}", "return \"Keks fertig\";", "function bake(temp)", "{"],
                solution: ["function bake(temp)", "{", "return \"Keks fertig\";", "}"],
                code: "R4-03"
            },
            {
                title: "HTML",
                headline: "HTML-Struktur",
                type: "order",
                text: "Baue eine einfache Liste. Die Tags muessen richtig geschachtelt sein.",
                pieces: ["</ul>", "<li>Item</li>", "<ul>"],
                solution: ["<ul>", "<li>Item</li>", "</ul>"],
                code: "R4-04"
            },
            {
                title: "Symbol",
                headline: "Das Semikolon des Schicksals",
                type: "choice",
                text: "Am Ende einer wichtigen Zeile fehlt ein Zeichen.",
                choices: [",", ".", ":", ";"],
                answer: ";",
                code: "R4-05"
            }
        ]
    },
    center: {
        label: "PC 02",
        name: "Logic Terminal",
        quests: [
            {
                title: "Index",
                headline: "Der Off-by-One Bug",
                type: "input",
                text: "Ein Array hat 3 Elemente: [\"Gold\", \"Silber\", \"Bronze\"]. Der Code sagt console.log(items[3]). Welche Zahl muss statt 3 stehen?",
                answers: ["2"],
                code: "R4-06"
            },
            {
                title: "Boolean",
                headline: "Boolean-Tuerschloss",
                type: "boolean",
                text: "Das Schloss oeffnet sich nur, wenn (A && B) || C true ergibt.",
                code: "R4-07"
            },
            {
                title: "Typen",
                headline: "Datentyp-Wirrwarr",
                type: "input",
                text: "Was ergibt \"10\" + 5 in JavaScript?",
                answers: ["105"],
                code: "A4H"
            },
            {
                title: "Fibonacci",
                headline: "Die Fibonacci-Zahl",
                type: "input",
                text: "Ergaenze die Zahlenreihe: 1, 1, 2, 3, 5, 8, ?",
                answers: ["13"],
                code: "9A2"
            },
            {
                title: "Regex",
                headline: "Regex-Suche",
                type: "choice",
                text: "Welcher regulaere Ausdruck findet alle Zahlen in einem Text?",
                choices: ["[a-z]+", "\\d+", "\\s+", "true|false"],
                answer: "\\d+",
                code: "R4-10"
            }
        ]
    },
    right: {
        label: "PC 03",
        name: "Web Terminal",
        quests: [
            {
                title: "Inspektor",
                headline: "Der Inspektor",
                type: "input",
                text: "Die Loesung steht im Schatten. Oeffne die Entwicklertools und suche im HTML-Kommentar.",
                comment: "SCHATTEN-42",
                answers: ["schatten-42"],
                code: "R4-11"
            },
            {
                title: "Konsole",
                headline: "Die verborgene Konsole",
                type: "input",
                text: "Rede mit der Seite. Tippe hello() in die JavaScript-Konsole und gib das Passwort hier ein.",
                answers: ["konsole-73"],
                code: "R4-12"
            },
            {
                title: "Farbe",
                headline: "Farbcodes raten",
                type: "color",
                text: "Ein Feld hat die Hintergrundfarbe #00FF00. Welche Farbe ist das?",
                answers: ["green", "gruen", "grün", "neon"],
                code: "R4-13"
            },
            {
                title: "Z-Index",
                headline: "Z-Index Stapeln",
                type: "zindex",
                text: "Die Zahl liegt ganz unten. Gib einen z-index ein, der sie nach vorne bringt.",
                answer: 5,
                code: "R4-14"
            },
            {
                title: "Roboter",
                headline: "Der Pfad des Roboters",
                type: "order",
                text: "Ziehe die Befehle in die richtige Reihenfolge, damit der Roboter das Ziel erreicht.",
                pieces: ["turnRight()", "move()", "move()"],
                solution: ["move()", "turnRight()", "move()"],
                code: "R4-15"
            }
        ]
    }
};

let solvedRoom4 = {};
let draggedPiece = "";

function hello(){
    alert("Passwort: KONSOLE-73");
}

function StartFourthLevel(){
    document.body.innerHTML =
    `<div id="backgroundFourthRoom">
        <div id="pcLeft" onclick="openRoom4Pc('left')">PC 01</div>
        <div id="pcCenter" onclick="openRoom4Pc('center')">PC 02</div>
        <div id="pcRight" onclick="openRoom4Pc('right')">PC 03</div>
        <div id="room4ComputerOverlay"></div>
    </div>`;
}

function openRoom4Pc(pcName, questNumber = 0){
    let pc = room4Pc[pcName];
    let quest = pc.quests[questNumber];
    let overlay = document.getElementById("room4ComputerOverlay");
    let nav = "";

    for (let i = 0; i < pc.quests.length; i++) {
        let active = i === questNumber ? " activeQuest" : "";
        let solved = solvedRoom4[pcName + i] ? " solvedQuest" : "";
        nav += `<div class="room4QuestTab${active}${solved}" onclick="openRoom4Pc('${pcName}', ${i})">${pc.quests[i].title}</div>`;
    }

    let questLockText = solvedRoom4[pcName + questNumber] ? "Code unlocked." : "Locked until solved.";

    overlay.style.display = "block";
    overlay.innerHTML =
    `<div id="room4Computer">
        <div id="room4ComputerTop">
            <div id="room4ComputerTitle">${pc.label} - ${pc.name}</div>
            <div id="room4Close" onclick="closeRoom4Pc()">X</div>
        </div>
        <div id="room4QuestNav">${nav}</div>
        <div id="room4QuestBox">
            <h2>${quest.headline}</h2>
            <p>${quest.text}</p>
            ${getRoom4Quest(pcName, questNumber)}
            <div id="room4Error"></div>
            <div id="room4QuestLockStatus">${questLockText}</div>
        </div>
        <div id="room4CodeBox">
            <h3>CODE PARTS</h3>
            <p>All code parts on this computer.</p>
            <div id="room4CodeParts">${getRoom4CodeParts(pcName, questNumber)}</div>
        </div>
    </div>`;
    addTimer();
}

function getRoom4CodeParts(pcName, questNumber){
    let pc = room4Pc[pcName];
    let html = "";

    for (let i = 0; i < pc.quests.length; i++) {
        let active = i === questNumber ? " activeCodePart" : "";
        let locked = solvedRoom4[pcName + i] ? "" : " lockedCodePart";
        let code = solvedRoom4[pcName + i] ? pc.quests[i].code : "LOCKED";

        html += `<div class="room4CodePart${active}${locked}">
            <span>${pc.quests[i].title}</span>
            <strong>${code}</strong>
        </div>`;
    }

    return html;
}

function getRoom4Quest(pcName, questNumber){
    let quest = room4Pc[pcName].quests[questNumber];
    let html = "";

    if (quest.type === "order") {
        html += `<div class="room4Pieces">`;
        for (let i = 0; i < quest.pieces.length; i++) {
            html += `<div class="room4Piece" draggable="true" data-piece="${getRoom4Attribute(quest.pieces[i])}" ondragstart="dragRoom4Piece(event)">${getRoom4Text(quest.pieces[i])}</div>`;
        }
        html += `</div><div class="room4Slots">`;
        for (let i = 0; i < quest.solution.length; i++) {
            html += `<div class="room4Slot" data-piece="" ondragover="allowRoom4Drop(event)" ondrop="dropRoom4Piece(event)">${i + 1}</div>`;
        }
        html += `</div><div class="room4Check" onclick="checkRoom4('${pcName}', ${questNumber})">CHECK</div>`;
    }

    if (quest.type === "css") {
        html += `<div class="room4Pieces">`;
        for (let i = 0; i < quest.pieces.length; i++) {
            html += `<div class="room4Piece" draggable="true" data-piece="${quest.pieces[i]}" ondragstart="dragRoom4Piece(event)">${quest.pieces[i]}</div>`;
        }
        html += `</div>
        <div id="cssButton" ondragover="allowRoom4Drop(event)" ondrop="dropRoom4Css(event)">DROP CSS HERE</div>
        <div id="cssList"></div>
        <div class="room4Check" onclick="checkRoom4('${pcName}', ${questNumber})">CHECK</div>`;
    }

    if (quest.type === "choice") {
        html += `<div class="room4Choices">`;
        for (let i = 0; i < quest.choices.length; i++) {
            html += `<div class="room4Choice" onclick="checkRoom4Choice('${pcName}', ${questNumber}, '${encodeURIComponent(quest.choices[i])}')">${getRoom4Text(quest.choices[i])}</div>`;
        }
        html += `</div>`;
    }

    if (quest.type === "input" || quest.type === "color") {
        if (quest.comment) {
            html += `<!-- ${quest.comment} -->`;
        }
        if (quest.type === "color") {
            html += `<div id="colorPreview">#00FF00</div>`;
        }
        html += `<input type="text" id="room4Answer" placeholder="Enter answer" onkeydown="room4Enter(event, '${pcName}', ${questNumber})">
        <div class="room4Check" onclick="checkRoom4('${pcName}', ${questNumber})">CHECK</div>`;
    }

    if (quest.type === "boolean") {
        html += `<div id="booleanBox">
            <label>A <input type="checkbox" id="switchA"></label>
            <label>B <input type="checkbox" id="switchB" checked></label>
            <label>C <input type="checkbox" id="switchC"></label>
        </div>
        <div id="logicText">(A && B) || C</div>
        <div class="room4Check" onclick="checkRoom4('${pcName}', ${questNumber})">CHECK</div>`;
    }

    if (quest.type === "zindex") {
        html += `<div id="zStack">
            <div id="numberLayer">42</div>
            <div id="middleLayer"></div>
            <div id="frontLayer"></div>
        </div>
        <input type="number" id="room4Answer" placeholder="z-index" oninput="changeZIndex()" onkeydown="room4Enter(event, '${pcName}', ${questNumber})">
        <div class="room4Check" onclick="checkRoom4('${pcName}', ${questNumber})">CHECK</div>`;
    }
    addTimer();
    return html;
}

function dragRoom4Piece(event){
    draggedPiece = event.target.dataset.piece;
    event.dataTransfer.setData("text/plain", draggedPiece);
}

function allowRoom4Drop(event){
    event.preventDefault();
}

function dropRoom4Piece(event){
    event.preventDefault();
    let piece = event.dataTransfer.getData("text/plain") || draggedPiece;
    event.currentTarget.dataset.piece = piece;
    event.currentTarget.textContent = piece;
    event.currentTarget.classList.add("slotFilled");
}

function dropRoom4Css(event){
    event.preventDefault();
    let piece = event.dataTransfer.getData("text/plain") || draggedPiece;
    let button = document.getElementById("cssButton");
    let list = document.getElementById("cssList");

    if (button.dataset.css && button.dataset.css.includes(piece)) return;

    button.dataset.css = button.dataset.css ? button.dataset.css + "|" + piece : piece;
    list.innerHTML += `<div>${piece}</div>`;

    if (piece === "background-color: red;") button.style.backgroundColor = "red";
    if (piece === "display: block;") button.style.display = "block";
    if (piece === "opacity: 1;") {
        button.style.opacity = "1";
        button.innerHTML = "CSS-OK";
    }
}

function room4Enter(event, pcName, questNumber){
    if (event.key === "Enter") {
        checkRoom4(pcName, questNumber);
    }
}

function checkRoom4Choice(pcName, questNumber, answer){
    checkRoom4(pcName, questNumber, decodeURIComponent(answer));
}

function checkRoom4(pcName, questNumber, choiceAnswer = ""){
    let quest = room4Pc[pcName].quests[questNumber];
    let correct = false;

    if (quest.type === "order") {
        let slots = document.querySelectorAll(".room4Slot");
        correct = true;
        for (let i = 0; i < quest.solution.length; i++) {
            if (slots[i].dataset.piece !== quest.solution[i]) correct = false;
        }
    }

    if (quest.type === "css") {
        let button = document.getElementById("cssButton");
        let css = button.dataset.css ? button.dataset.css.split("|") : [];
        correct = true;
        for (let i = 0; i < quest.solution.length; i++) {
            if (!css.includes(quest.solution[i])) correct = false;
        }
    }

    if (quest.type === "choice") {
        correct = choiceAnswer.trim().toLowerCase() === quest.answer.trim().toLowerCase();
    }

    if (quest.type === "input" || quest.type === "color") {
        let answer = document.getElementById("room4Answer").value.trim().toLowerCase();
        for (let i = 0; i < quest.answers.length; i++) {
            if (answer === quest.answers[i].toLowerCase()) correct = true;
        }
    }

    if (quest.type === "boolean") {
        let a = document.getElementById("switchA").checked;
        let b = document.getElementById("switchB").checked;
        let c = document.getElementById("switchC").checked;
        correct = (a && b) || c;
    }

    if (quest.type === "zindex") {
        let z = document.getElementById("room4Answer").value;
        correct = Number(z) >= quest.answer;
    }

    if (correct) {
        solvedRoom4[pcName + questNumber] = true;
        openRoom4Pc(pcName, questNumber);
    } else {
        document.getElementById("room4Error").innerHTML = "Wrong answer. Try again.";
        setTimeout(() => {
            if (document.getElementById("room4Error")) document.getElementById("room4Error").innerHTML = "";
        }, 2000);
    }
}

function changeZIndex(){
    document.getElementById("numberLayer").style.zIndex = document.getElementById("room4Answer").value;
}

function getRoom4Text(text){
    return String(text).replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function getRoom4Attribute(text){
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function closeRoom4Pc(){
    document.getElementById("room4ComputerOverlay").style.display = "none";
    document.getElementById("room4ComputerOverlay").innerHTML = "";
}
