const buttonClickSoundPath = './Sound/ButtonClick.mp3';
const uiSoundVolume = 1;
const backgroundMusicVolume = 0.16;
const introBackgroundMusicVolume = 0.07;
const maxTimerSeconds = 1800;
const levelTransitionDuration = 8500;
const levelTransitionFadeDuration = 1200;
const levelArrivalFadeDuration = 1300;
let backgroundMusicAudio = null;
let room3BackgroundAudio = null;
let introKeyboardAudio = null;
let introKeyboardMonitor = null;
let introKeyboardLastText = "";
let introKeyboardLastChange = 0;

document.addEventListener('click', (event) => {
    startBackgroundMusic();

    if (event.target.closest('button, [onclick], .room4Check, .room4Choice, .room4QuestTab')) {
        playButtonClickSound();
    }

    if (document.getElementById('backgroundThirdRoom') && room3BackgroundAudio && room3BackgroundAudio.paused) {
        startRoom3BackgroundSound();
    }
}, true);

function playButtonClickSound(){
    const sound = new Audio(buttonClickSoundPath);
    sound.volume = uiSoundVolume;
    sound.play().catch(() => {});
}

function startBackgroundMusic(){
    if (!backgroundMusicAudio) {
        backgroundMusicAudio = new Audio('./Sound/BackgroundMusic.mp3');
        backgroundMusicAudio.loop = true;
    }

    backgroundMusicAudio.volume = document.getElementById('backgroundStart') && document.getElementById('typedOutput')
        ? introBackgroundMusicVolume
        : backgroundMusicVolume;

    if (backgroundMusicAudio.paused) {
        backgroundMusicAudio.play().catch(() => {});
    }
}

function startRoom3BackgroundSound(){
    if (!room3BackgroundAudio) {
        room3BackgroundAudio = new Audio('./Sound/Room3BackgroundSound.mp3');
        room3BackgroundAudio.loop = true;
    }

    room3BackgroundAudio.volume = 0.85;
    room3BackgroundAudio.play().catch(() => {});
}

function stopRoom3BackgroundSound(){
    if (!room3BackgroundAudio) return;

    room3BackgroundAudio.pause();
    room3BackgroundAudio.currentTime = 0;
}

function ensureIntroKeyboardAudio(){
    if (!introKeyboardAudio) {
        introKeyboardAudio = new Audio('./Sound/KeyboardClicking.mp3');
        introKeyboardAudio.loop = true;
        introKeyboardAudio.volume = uiSoundVolume;
    }
}

function primeIntroKeyboardSound(){
    ensureIntroKeyboardAudio();
    introKeyboardAudio.volume = 0;

    introKeyboardAudio.play()
        .then(() => {
            introKeyboardAudio.pause();
            introKeyboardAudio.currentTime = 0;
            introKeyboardAudio.volume = uiSoundVolume;
        })
        .catch(() => {
            introKeyboardAudio.volume = uiSoundVolume;
        });
}

function startIntroKeyboardSound(){
    ensureIntroKeyboardAudio();
    introKeyboardAudio.volume = uiSoundVolume;

    if (introKeyboardAudio.paused) {
        introKeyboardAudio.play().catch(() => {});
    }
}

function pauseIntroKeyboardSound(){
    if (!introKeyboardAudio) return;

    introKeyboardAudio.pause();
}

function stopIntroKeyboardSound(){
    stopIntroKeyboardMonitor();
    if (!introKeyboardAudio) return;

    introKeyboardAudio.pause();
    introKeyboardAudio.currentTime = 0;
}

function startIntroKeyboardMonitor(){
    stopIntroKeyboardMonitor();

    let output = document.getElementById('typedOutput');
    if (!output) return;

    introKeyboardLastText = output.textContent;
    introKeyboardLastChange = Date.now();

    introKeyboardMonitor = setInterval(() => {
        let typedOutput = document.getElementById('typedOutput');
        if (!typedOutput) {
            stopIntroKeyboardSound();
            return;
        }

        let currentText = typedOutput.textContent;

        if (currentText !== introKeyboardLastText) {
            introKeyboardLastText = currentText;
            introKeyboardLastChange = Date.now();
            startIntroKeyboardSound();
            return;
        }

        if (Date.now() - introKeyboardLastChange > 140) {
            pauseIntroKeyboardSound();
        }
    }, 45);
}

function stopIntroKeyboardMonitor(){
    if (!introKeyboardMonitor) return;

    clearInterval(introKeyboardMonitor);
    introKeyboardMonitor = null;
}

function openHowTo(){
    stopRoom3BackgroundSound();
    document.body.innerHTML =
    `<div id="background">
        <h1 id="howToTitle">So spielst du</h1>
        <div id="HowToBox" class="howToCard">
            <div class="howToContent">
                <h2>Ziel</h2>
                <p>Entkomme aus dem Momento-System, bevor der Timer abläuft.</p>
                <p>Je mehr Zeit übrig bleibt, desto besser ist dein Platz im Leaderboard.</p>
            </div>
        </div>
        <div id="HowToBox1" class="howToCard">
            <div class="howToContent">
                <h2>Steuerung</h2>
                <p>Klicke auf Profile, Konsolen, Notizen und auffällige Elemente.</p>
                <p>Gefundene Passwörter und Codes gibst du in die passenden Felder ein.</p>
                <p>Der Info-Button gibt dir Tipps, wenn du festhängst.</p>
            </div>
        </div>
        <div id="HowToBox2" class="howToCard">
            <div class="howToContent">
                <h2>Räume</h2>
                <p>1: Login knacken.</p>
                <p>2: Bilder nach Codes durchsuchen.</p>
                <p>3: Binärzahlen und Server-Code lösen.</p>
                <p>4: PC-Aufgaben schaffen und Code-Teile freischalten.</p>
            </div>
        </div>
        <div id="Back-Button" onclick="backToStart()"></div>
    </div>`;
}

const room1Tips = [
    'Der Benutzername: Gib deinen Namen ein, um die Session zu starten.',
    'Das Passwort: Du kennst es nicht? Keine Panik. Ein falscher Versuch könnte eine Schwachstelle im System offenlegen.',
    'Die Konsole: Achte auf visuelle Veränderungen. Wenn das System einen Fehler meldet, erscheint vielleicht ein direkter Zugang zu den Entwickler-Logs. Ein Klick darauf verrät dir mehr, als die Admins von Momento eigentlich zulassen wollten.'
];

let currentRoom1Tip = 0;

function firstRoomInfoButton(){
    return `<button id="room1InfoButton" onclick="openRoom1Info()" aria-label="Info zu Raum 1">I</button>`;
}

function openRoom1Info(){
    closeRoom1Info();
    currentRoom1Tip = 0;

    // Mit Hilfe von KI erstellt; nur für Bugfixes verwendet.
    document.body.insertAdjacentHTML('beforeend', `
        <div id="room1InfoOverlay">
            <div id="room1InfoPanel">
                <button id="room1InfoClose" onclick="closeRoom1Info()" aria-label="Info schließen">X</button>
                <p class="room1InfoKicker">Raum 1</p>
                <h2>Die Pforten von Momento</h2>
                <p>Du stehst vor der ersten Hürde. Das System hat dich erkannt, aber es vertraut dir noch nicht. Um tiefer in die Schaltkreise vorzudringen, musst du dir eine digitale Identität innerhalb des Momento-Netzwerks sichern.</p>

                <h3>Deine Mission</h3>
                <p><strong>Identifikation:</strong> Hinterlege deinen Benutzernamen im System. Das System wird dich ab jetzt unter diesem Namen führen (gespeichert in deinem localStorage).</p>
                <p><strong>Authentifizierung:</strong> Finde das Passwort für den Zugang.</p>

                <h3>Hinweis vom System</h3>
                <p class="systemHint">"Sicherheit ist eine Illusion. Wenn die Vorderseite verschlossen ist, schau dir die Rückseite des Codes an. Manchmal hinterlässt das System Spuren dort, wo normale User niemals hinsehen."</p>

                <div id="room1TipBox">
                    <button id="room1TipButton" onclick="showRoom1Tip()">Tipp anzeigen</button>
                    <p id="room1TipText">Klicke auf den Tipp-Button, wenn du einen Hinweis brauchst.</p>
                </div>
            </div>
        </div>
    `);
}

function closeRoom1Info(){
    let overlay = document.getElementById('room1InfoOverlay');
    if (overlay) overlay.remove();
}

function showRoom1Tip(){
    let tipText = document.getElementById('room1TipText');
    let tipButton = document.getElementById('room1TipButton');
    if (!tipText || !tipButton) return;

    tipText.textContent = room1Tips[currentRoom1Tip];
    currentRoom1Tip = (currentRoom1Tip + 1) % room1Tips.length;
    tipButton.textContent = currentRoom1Tip === 0 ? 'Tipps neu starten' : 'Nächster Tipp';
}



function StartGame(){
    stopRoom3BackgroundSound();
    stopIntroKeyboardSound();
    primeIntroKeyboardSound();
    document.body.innerHTML = 
    `<div id="backgroundStart">
        <div id="typedOutput"></div>
    </div>`;
    startBackgroundMusic();


    setTimeout(() => {
        const typed = new Typed('#typedOutput', {
            strings: ['Willkommen zu Web Escape!',
                      'Du hast versucht, dich in das System einzuloggen, aber es ist etwas schiefgelaufen.',
                      'Du bist im System gefangen und musst nun versuchen, zu entkommen.',
                      'Logge dich mit deinem Namen als Benutzernamen ein, damit du Zugriff auf das System hast und es verlassen kannst.',
                      'Ich hoffe, du hast dein Passwort nicht vergessen!',
                      'Aber das System wird dir nicht so einfach Zugriff gewähren.',
                      'Viel Erfolg!'
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 2000,
            startDelay: 1000,
            loop: false,
            showCursor: false,
            onBegin: startIntroKeyboardMonitor,
            onComplete: stopIntroKeyboardSound
        });
}, 100);
setTimeout(() => {
    stopIntroKeyboardSound();
    StartFirstLevel();
}, 60000);
}



function getError(){
    stopRoom3BackgroundSound();
    document.body.innerHTML = 
    `<div id="backgroundFirstRoom">
        <div id="firstLevel"></div>
        <div id="logo"></div>
        <div id="console" onclick="openConsole()">Konsole</div>
        <div id="text">Melde dich an</div>
        <input type="text" id="userNameInput" placeholder="Benutzername">
        <div id="error">Ungültiges Passwort</div>
        <input type="text" id="passwordInput" placeholder="Passwort">
        <div id="loginButton" onclick="getError()"></div>
        ${firstRoomInfoButton()}
    </div>`;
    addTimer();
}

function openConsole(){
    document.body.innerHTML = 
    `<div id="backgroundFirstRoom">
        <div id="firstLevel"></div>
        <div id="logo"></div>
        <div id="consoleOpen">
            <div id="consoleInput"></div>
        </div>
        <div id="text">Melde dich an</div>
        <input type="text" id="userNameInput" placeholder="Benutzername">
        <div id="error">Ungültiges Passwort</div>
        <input type="text" id="passwordInput" placeholder="Passwort">
        <div id="loginButton" onclick="checkPassword()"></div>
        ${firstRoomInfoButton()}
    </div>`;
    addTimer();

    document.getElementById("consoleInput").textContent = `// Security System v1.0
// ==========================================

function authenticate() {
    const hash = "a3f5b1c"; // encrypted key
    const key = atob("cGFzc3dvcmQxMjM="); // base64
    
    console.log("SYSTEM: Checking credentials...");
    console.log("Hash:", hash);
    console.log("Access: DENIED");
    
    // TODO: remove before deployment
    // admin_password = "password123"
    
    return false;
}

authenticate();`;

password = document.getElementById("passwordInput").value;

}  

function finishGame(){
    completeTimer();
}

function fadeIntoLevel(){
    const fade = document.createElement('div');
    fade.id = 'levelArrivalFade';
    document.body.appendChild(fade);

    requestAnimationFrame(() => {
        fade.classList.add('levelArrivalFadeOut');
    });

    setTimeout(() => {
        if (fade) fade.remove();
    }, levelArrivalFadeDuration);
}

function enterNextLevel(nextLevel){
    nextLevel();
    fadeIntoLevel();
}

function showLoadingScreen(nextLevel, nextRoomName = 'Nächster Raum'){
    document.body.innerHTML =
    `<div id="backgroundStart" class="loadingScreen">
        <div id="transitionPanel">
            <div id="transitionLabel">Level-Übergang</div>
            <div id="typedOutput" class="loadingScreenText"></div>
            <div id="transitionBar"><div id="transitionBarFill"></div></div>
            <div id="transitionDestination">${nextRoomName}</div>
        </div>
    </div>`;
    addTimer();
    updateTimer();

    setTimeout(() => {
        const output = document.getElementById('typedOutput');
        if (!output) return;

        if (typeof Typed === 'undefined') {
            output.textContent = 'Verbindung wird vorbereitet...';
            return;
        }

        new Typed('#typedOutput', {
            strings: [
                'Verbindung wird vorbereitet.',
                'Datenstrom wird stabilisiert...',
                'Sicherheitsprotokolle werden umgangen...',
                'Raum wird geladen...',
                'Gleich geht es weiter...'
            ],
            typeSpeed: 58,
            backSpeed: 18,
            backDelay: 850,
            startDelay: 250,
            loop: false,
            showCursor: false
        });
    }, 100);

    setTimeout(() => {
        const loadingScreen = document.querySelector('.loadingScreen');
        if (loadingScreen) loadingScreen.classList.add('loadingScreenExit');
        setTimeout(() => enterNextLevel(nextLevel), levelTransitionFadeDuration);
    }, levelTransitionDuration);
}

function LoadingScreenSecondRoom(){
    stopRoom3BackgroundSound();
    showLoadingScreen(StartSecondLevel, 'Raum 2: Datenströme');
}

function LoadingScreenThirdRoom(){
    showLoadingScreen(StartThirdLevel, 'Raum 3: Mainframe');
}

function LoadingScreenFourthRoom(){
    stopRoom3BackgroundSound();
    showLoadingScreen(StartFourthLevel, 'Raum 4: Finale');
}


function openLeaderBoard(){
    stopRoom3BackgroundSound();
    stopTimer();
    document.body.innerHTML =
    `<div id="background">
        <div id="tag"></div>
        <div id="leaderboard">
            <div id="leaderboardStand"></div>
            <div id="leaderboardText"></div>
        </div>
        <div id="back" onclick="backToStart()"></div>
    </div>`;
    loadLeaderboard();
}

function backToStart(){
    stopRoom3BackgroundSound();
    stopTimer();
    document.body.innerHTML =
    `<div id="background">
        <div id="Logo"></div>
        <div id="start-button" onclick="StartGame()"></div>
        <div id="leaderboard-button" onclick="openLeaderBoard()"></div>
        <div id="howTo-button" onclick="openHowTo()"></div>
    </div>`;
}

function StartFirstLevel(){
    stopRoom3BackgroundSound();
    stopIntroKeyboardSound();
    startBackgroundMusic();
    if (typeof solvedRoom4 !== 'undefined') solvedRoom4 = {};
    if (typeof room4RobotCommands !== 'undefined') room4RobotCommands = [];
    document.body.innerHTML = 
    `<div id="backgroundFirstRoom">
        <div id="firstLevel"></div>
        <div id="logo"></div>
        <div id="textFirstLevel">Melde dich an</div>
        <input type="text" id="userNameInput" placeholder="Benutzername">
        <input type="text" id="passwordInput" placeholder="Passwort">
        <div id="loginButton" onclick="saveUsername(); getError();"></div>
        ${firstRoomInfoButton()}
    </div>`;
    resetTimer();
    addTimer();
    startTimer();
}

function saveUsername(){
    let name = document.getElementById("userNameInput").value;
    localStorage.setItem("playerName", name);
}

function checkPassword(){
    let password = document.getElementById("passwordInput").value;
    
    if (password === "password123"){
        LoadingScreenSecondRoom();
        //finishGame();
    }
}

let timerSeconds = maxTimerSeconds;
let timerInterval = null;

function startTimer() {
    let saved = localStorage.getItem('timerSeconds');
    if (saved) timerSeconds = parseInt(saved);
    
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timerSeconds > 0) {
                timerSeconds--;
                updateTimer();
                localStorage.setItem('timerSeconds', timerSeconds);
            } else {
                stopTimer();
                showLoseScreen();
            }
        }, 1000);
    }
    updateTimer();
}

function updateTimer() {
    let element = document.getElementById('timer');
    if (element) {
        let min = Math.floor(timerSeconds / 60);
        let sec = timerSeconds % 60;
        element.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        
        if (timerSeconds <= 60) {
            element.style.color = '#ff0000';
        } else if (timerSeconds <= 300) {
            element.style.color = '#ffaa00';
        }
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function completeTimer() {
    stopTimer();
    let name = localStorage.getItem('playerName') || 'Spieler';
    saveScore(name, timerSeconds);
    showWinScreen();
    localStorage.removeItem('timerSeconds');
}

function saveScore(name, time) {
    let scores = JSON.parse(localStorage.getItem('scores') || '[]');
    scores.push({ name: name, time: time });
    scores.sort((a, b) => b.time - a.time);
    scores = scores.slice(0, 5);
    localStorage.setItem('scores', JSON.stringify(scores));
}

function getUsedTimeText() {
    let usedSeconds = Math.max(0, maxTimerSeconds - timerSeconds);
    let min = Math.floor(usedSeconds / 60);
    let sec = usedSeconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function showWinScreen() {
    stopRoom3BackgroundSound();
    stopIntroKeyboardSound();
    let timeText = getUsedTimeText();

    document.body.innerHTML = `
        <div id="backgroundFinish" class="winScreen">
            <div id="endScreenPanel">
                <div id="endScreenTimeLabel">Zeit gebraucht</div>
                <div id="endScreenTime">${timeText}</div>
                <button id="endScreenButton" onclick="openLeaderBoard()">Leaderboard</button>
            </div>
        </div>
    `;
}

function showLoseScreen() {
    stopRoom3BackgroundSound();
    stopIntroKeyboardSound();
    localStorage.removeItem('timerSeconds');

    document.body.innerHTML = `
        <div id="backgroundFinish" class="loseScreen">
            <div id="endScreenPanel">
                <div id="endScreenTimeLabel">Zeit abgelaufen</div>
                <div id="endScreenTime">${formatTime(maxTimerSeconds)}</div>
                <button id="endScreenButton" onclick="backToStart()">Neu starten</button>
            </div>
        </div>
    `;
}

function resetTimer() {
    stopTimer();
    timerSeconds = maxTimerSeconds;
    localStorage.removeItem('timerSeconds');
}

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function addTimer() {
    if (document.getElementById('timer')) return;
    
    let div = document.createElement('div');
    div.id = 'timer';
    div.style.cssText = `
        position: fixed; top: 20px; left: 20px; background: rgba(0, 0, 0, 0.9);
        border: 3px solid #00ff41; border-radius: 10px; padding: 15px 25px;
        font-size: 32px; font-family: 'Courier New', monospace; color: #00ff41;
        text-shadow: 0 0 20px #00ff41; box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
        z-index: 9999;
    `;
    document.body.appendChild(div);
}

function loadLeaderboard() {
    let scores = JSON.parse(localStorage.getItem('scores') || '[]');
    let text = document.getElementById('leaderboardText');
    if (!text) return;

    const podiumClasses = ['podium-1', 'podium-2', 'podium-3'];
    let html = '';

    for (let i = 0; i < 3; i++) {
        if (!scores[i]) continue;
        const min = Math.floor(scores[i].time / 60);
        const sec = scores[i].time % 60;
        const timeText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

        html += `
            <div class="podium-entry ${podiumClasses[i]}">
                <div class="podium-name">${scores[i].name}</div>
                <div class="podium-time">${timeText}</div>
            </div>
        `;
    }

    for (let i = 3; i < 5; i++) {
        if (!scores[i]) continue;
        const min = Math.floor(scores[i].time / 60);
        const sec = scores[i].time % 60;
        const timeText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

        html += `
            <div class="list-entry list-entry-${i + 1}">
                <div class="list-rank">${i + 1}.</div>
                <div>
                    <div class="list-name">${scores[i].name}</div>
                    <div class="list-time">${timeText}</div>
                </div>
            </div>
        `;
    }

    text.innerHTML = html;
}
