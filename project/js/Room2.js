function StartSecondLevel(){
    stopRoom3BackgroundSound();
    document.body.innerHTML = 
    `<div id="backgroundSecondRoom">
        <div id="LogoSecondRoom"></div>
        <div id="Profile" onclick="ShowProfile()"></div>
            <div id="container">
                <div id="picture1"></div>
                <div id="picture2"></div>
                <div id="picture3"></div>
                <div id="picture4"></div>
                <div id="picture5"></div>
                <div id="picture6"></div>
            </div>
            ${secondRoomInfoButton()}
    </div>`;
    addTimer();
}

function ShowProfile(){
    document.body.innerHTML = 
    `<div id="backgroundSecondRoom">
        <button id="BackButton" onclick="StartSecondLevel()" aria-label="Zurück">X</button>
        <div id="LogoSecondRoom"></div>
        <div id="ProfileOpen">
            <div id="profilePicture"></div>
            <div id="profileName">Max Mustermann</div>
        </div>
            <div id="CodeInput">
                <input type="text" id="codeInputField" placeholder="Enter code">
            </div>
            <button id="submitCodeButton" onclick="checkCode()">Submit</button>
            ${secondRoomInfoButton()}
    </div>`;
    addTimer();
}

function checkCode(){
    code = document.getElementById("codeInputField").value;
    console.log(code);
    if (code === "7k3kx2"){
        LoadingScreenThirdRoom();
    }
}

const room2Tips = [
    'Nutze den Zoom deines Browsers oder achte auf Kontraste. Die Zeichen sind oft in dunklen Ecken oder feinen Mustern versteckt.',
    'Notiere dir die Zeichen am besten in der Reihenfolge, in der du die Posts im Feed findest.',
    'Der Klick auf das Profil öffnet die versteckte Eingabemaske. Dort gehört der komplette Code hinein.'
];

let currentRoom2Tip = 0;

function secondRoomInfoButton(){
    return `<button id="room1InfoButton" onclick="openRoom2Info()" aria-label="Info zu Raum 2">I</button>`;
}

function openRoom2Info(){
    closeRoom2Info();
    currentRoom2Tip = 0;

    document.body.insertAdjacentHTML('beforeend', `
        <div id="room1InfoOverlay">
            <div id="room1InfoPanel">
                <button id="room1InfoClose" onclick="closeRoom2Info()" aria-label="Info schließen">X</button>
                <p class="room1InfoKicker">Raum 2</p>
                <h2>Die Datenströme von Momento</h2>
                <p>Du hast das Tor durchbrochen, doch jetzt befindest du dich im pulsierenden Herzstück des Netzwerks: der Social-Media-Plattform Momento. Hier teilen User Bruchstücke ihrer Realität, doch hinter der glänzenden Oberfläche des Feeds verbirgt sich ein Code.</p>

                <h3>Deine Mission</h3>
                <p><strong>Die Fragmente finden:</strong> Durchsuche die geposteten Bilder nach versteckten, kryptischen Zeichen.</p>
                <p><strong>Die Verifizierung:</strong> Rufe das Profil auf und gib die gesammelten Zeichen in der richtigen Reihenfolge ein.</p>

                <h3>Hinweis vom System</h3>
                <p class="systemHint">"Ein Bild sagt mehr als tausend Worte, aber für ein geschultes Auge transportiert es Daten. Schaue genau hin, wo die Pixel Pixel sein sollten."</p>

                <div id="room1TipBox">
                    <button id="room1TipButton" onclick="showRoom2Tip()">Tipp anzeigen</button>
                    <p id="room1TipText">Klicke auf den Tipp-Button, wenn du einen Hinweis brauchst.</p>
                </div>
            </div>
        </div>
    `);
    addTimer();
}

function closeRoom2Info(){
    let overlay = document.getElementById('room1InfoOverlay');
    if (overlay) overlay.remove();
}

function showRoom2Tip(){
    let tipText = document.getElementById('room1TipText');
    let tipButton = document.getElementById('room1TipButton');
    if (!tipText || !tipButton) return;

    tipText.textContent = room2Tips[currentRoom2Tip];
    currentRoom2Tip = (currentRoom2Tip + 1) % room2Tips.length;
    tipButton.textContent = currentRoom2Tip === 0 ? 'Tipps neu starten' : 'Nächster Tipp';
}
