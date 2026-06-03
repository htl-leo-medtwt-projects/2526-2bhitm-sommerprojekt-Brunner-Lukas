function StartSecondLevel(){
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
            ${firstRoomInfoButton()}
    </div>`;
    addTimer();
}

function ShowProfile(){
    document.body.innerHTML = 
    `<div id="backgroundSecondRoom">
        <div id="BackButton" onclick="StartSecondLevel()">Back</div>
        <div id="LogoSecondRoom"></div>
        <div id="ProfileOpen">
            <div id="profilePicture"></div>
            <div id="profileName">Max Mustermann</div>
        </div>
            <div id="CodeInput">
                <input type="text" id="codeInputField" placeholder="Enter code">
                <div id="submitCodeButton" onclick="checkCode()">Submit</div>
            </div>
            ${firstRoomInfoButton()}
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
    'Genau hinsehen: Die Zeichen könnten sich in den Mustern eines Kleidungsstücks, in den Schatten an einer Wand oder im Hintergrund eines Urlaubsfotos verstecken.',
    'Die Reihenfolge: Wenn du mehrere Zeichen findest, probiere aus, ob die Reihenfolge der Posts (z.B. von oben nach unten oder chronologisch) den korrekten Code ergibt.',
    'Das Profil-Menü: Erst wenn du dir mit dem Code sicher bist, klicke auf das Profil-Icon oder den Profil-Namen, um das geheime Eingabefeld zu öffnen.'
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
                <h2>Die algorithmische Fassade</h2>
                <p>Der Login war erfolgreich, du bist im System! Doch statt tiefer Systemdateien landest du auf der Timeline des Social-Media-Netwzerks Momento. Aber lass dich nicht täuschen: Das System nutzt die Bilder, um wichtige Daten vor unbefugten Blicken zu verbergen.</p>

                <h3>Deine Mission</h3>
                <p><strong>Die Timeline scannen:</strong> Schau dir die geposteten Bilder auf der Seite ganz genau an. In ihnen sind Buchstaben oder Zahlen versteckt.</p>
                <p><strong>Das Schloss knacken:</strong> Klicke auf das Profil des Users, um das Eingabefeld zu öffnen, und gib den gefundenen Code ein.</p>

                <h3>Hinweis vom System</h3>
                <p class="systemHint">"Ein Bild sagt mehr als tausend Worte – und manchmal verbirgt es genau die Kombination, die du brauchst. Traue deinen Augen nicht zu schnell, die Wahrheit steckt im Detail."</p>

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
