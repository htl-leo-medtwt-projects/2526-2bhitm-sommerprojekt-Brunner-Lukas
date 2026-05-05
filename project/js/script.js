function openHowTo(){
    document.body.innerHTML =
    `<div id="background">
        <div id="HowToBox"></div>
        <div id="HowToBox1"></div>
        <div id="HowToBox2"></div>
        <div id="Back-Button" onclick="backToStart()"></div>
    </div>`;
}



function StartGame(){
    document.body.innerHTML = 
    `<div id="backgroundStart">
        <div id="typedOutput"></div>
    </div>`;

    setTimeout(() => {
        const typed = new Typed('#typedOutput', {
            strings: ['Willkommen zu Web Escape!',
                      'Du hast versucht dich in das System einzuloggen, aber es ist etwas schief gelaufen.',
                      'Du bist in dem System gefangen und musst nun versuchen zu entkommen.',
                      'Logge dich mit deinem Namen als Username ein, damit du Zugriff auf das System hast und es verlassen kannst.',
                      'Ich hoffe du hast dein Passwort nicht vergessen',
                      'Aber das System wird dir nicht so einfach Zugriff gewähren.',
                      'Viel Erfolg!'
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 2000,
            startDelay: 1000,
            loop: false,
            showCursor: false
        });
}, 100);
setTimeout(() => {
    StartFirstLevel();
}, 50000);
}



function getError(){
    document.body.innerHTML = 
    `<div id="backgroundFirstRoom">
        <div id="firstLevel"></div>
        <div id="logo"></div>
        <div id="console" onclick="openConsole()">console</div>
        <div id="text">Login to your account</div>
        <input type="text" id="userNameInput" placeholder="Username">
        <div id="error">Invalid password</div>
        <input type="text" id="passwordInput" placeholder="Password">
        <div id="loginButton" onclick="getError()"></div>
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
        <div id="text">Login to your account</div>
        <input type="text" id="userNameInput" placeholder="Username">
        <div id="error">Invalid password</div>
        <input type="text" id="passwordInput" placeholder="Password">
        <div id="loginButton" onclick="checkPassword()"></div>
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

function openLeaderBoard(){
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
    document.body.innerHTML = 
    `<div id="backgroundFirstRoom">
        <div id="firstLevel"></div>
        <div id="logo"></div>
        <div id="textFirstLevel">Login to your account</div>
        <input type="text" id="userNameInput" placeholder="Username">
        <input type="text" id="passwordInput" placeholder="Password">
        <div id="loginButton" onclick="saveUsername(); getError();"></div>
    </div>`;
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
        finishGame();
     //   StartSecondLevel();
    }
}

let timerSeconds = 1800;
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
                alert('Zeit abgelaufen!');
                backToStart();
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
    showComplete();
    localStorage.removeItem('timerSeconds');
}

function saveScore(name, time) {
    let scores = JSON.parse(localStorage.getItem('scores') || '[]');
    scores.push({ name: name, time: time });
    scores.sort((a, b) => b.time - a.time);
    scores = scores.slice(0, 5);
    localStorage.setItem('scores', JSON.stringify(scores));
}

function showComplete() {
    let min = Math.floor(timerSeconds / 60);
    let sec = timerSeconds % 60;
    let timeText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    
    document.body.innerHTML = `
        <div id="background">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: rgba(0, 0, 0, 0.95); border: 4px solid #00ff41; border-radius: 20px; 
                        padding: 50px; text-align: center; box-shadow: 0 0 50px rgba(0, 255, 65, 0.8);">
                <h2 style="font-size: 48px; color: #00ff41; margin-bottom: 20px; text-shadow: 0 0 20px #00ff41;">
                    GESCHAFFT!
                </h2>
                <div style="font-size: 56px; font-family: 'Courier New', monospace; margin: 30px 0; 
                            color: #ffd700; text-shadow: 0 0 20px #ffd700;">
                    ${timeText}
                </div>
                <p style="font-size: 18px; color: #00ff41;">Zeit übrig</p>
                <button onclick="openLeaderBoard()" 
                        style="background: rgba(0, 0, 0, 0.8); border: 3px solid #00ff41; 
                               border-radius: 10px; padding: 15px 40px; margin-top: 30px; 
                               font-size: 18px; font-weight: bold; color: #00ff41; cursor: pointer;">
                    Zum Leaderboard
                </button>
            </div>
        </div>
    `;
}

function resetTimer() {
    stopTimer();
    timerSeconds = 1800;
    localStorage.removeItem('timerSeconds');
}

function addTimer() {
    if (document.getElementById('timer')) return;
    
    let div = document.createElement('div');
    div.id = 'timer';
    div.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: rgba(0, 0, 0, 0.9);
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
    
    let html = '';
    
    for (let i = 0; i < 3; i++) {
        let pos = i === 0 ? 'top: 28%; left: 50%;' : 
                  i === 1 ? 'top: 35%; left: 20%;' : 
                            'top: 35%; left: 80%;';
        
        let color = i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : '#cd7f32';
        
        if (scores[i]) {
            let min = Math.floor(scores[i].time / 60);
            let sec = scores[i].time % 60;
            let timeText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
            
            html += `
                <div style="position: absolute; ${pos} transform: translateX(-50%); text-align: center;">
                    <div style="font-size: 20px; font-weight: bold; color: ${color}; 
                                text-shadow: 0 0 10px ${color}; margin-bottom: 8px; max-width: 150px;">
                        ${scores[i].name}
                    </div>
                    <div style="font-size: 24px; color: ${color}; text-shadow: 0 0 15px ${color}; 
                                font-family: 'Courier New', monospace; font-weight: bold;">
                        ${timeText}
                    </div>
                </div>
            `;
        }
    }
    
    for (let i = 3; i < 5; i++) {
        if (scores[i]) {
            let min = Math.floor(scores[i].time / 60);
            let sec = scores[i].time % 60;
            let timeText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
            let topPos = i === 3 ? '75%' : '85%';
            
            html += `
                <div style="position: absolute; top: ${topPos}; left: 50%; transform: translateX(-50%);
                            background: rgba(0, 0, 0, 0.7); border: 2px solid #00ff41; border-radius: 10px;
                            padding: 10px 20px; display: flex; align-items: center; gap: 20px; min-width: 400px;
                            box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);">
                    <div style="font-size: 28px; font-weight: bold; color: #00ff41; min-width: 40px;">
                        ${i + 1}.
                    </div>
                    <div style="flex: 1;">
                        <div style="font-size: 18px; font-weight: bold; color: #00ff41; margin-bottom: 5px;">
                            ${scores[i].name}
                        </div>
                        <div style="font-size: 16px; font-family: 'Courier New', monospace; color: #00ff41;
                                    text-shadow: 0 0 8px #00ff41;">
                            ${timeText}
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    text.innerHTML = html;
}