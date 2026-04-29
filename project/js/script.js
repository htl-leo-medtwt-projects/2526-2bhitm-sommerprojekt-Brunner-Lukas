function openHowTo(){
    document.body.innerHTML =
    `<div id="background">
        <div id="HowToBox"></div>
        <div id="HowToBox1"></div>
        <div id="HowToBox2"></div>
        <div id="Back-Button" onclick="backToStart()"></div>
    </div>`;
}

function backToStart(){
    document.body.innerHTML =
    `<div id="background">
        <div id="Logo"></div>
        <div id="start-button" onclick="StartGame()"></div>
        <div id="leaderboard-button" onclick="openLeaderBoard()"></div>
        <div id="howTo-button" onclick="openHowTo()"></div>
    </div>`;
}

function openLeaderBoard(){
    document.body.innerHTML =
    `<div id="background">
        <div id="tag"></div>
        <div id="leaderboard">
            <div id="leaderboardStand"></div>
            <div id="leaderboardText">
            </div>
        </div>
        <div id="back" onclick="backToStart()"></div>
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

function StartFirstLevel(){
    document.body.innerHTML = 
    `<div id="backgroundFirstRoom">
        <div id="firstLevel"></div>
        <div id="logo"></div>
        <div id="textFirstLevel">Login to your account</div>
        <input type="text" id="userNameInput" placeholder="Username">
        <input type="text" id="passwordInput" placeholder="Password">
        <div id="loginButton" onclick="getError()" onclick="saveUsername()"></div>
    </div>`;
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

function checkPassword(){
    password = document.getElementById("passwordInput").value;
    console.log(password);
    if (password === "password123"){
        StartSecondLevel();
    }
}

function saveUsername(){
    let name = document.getElementById("userNameInput").value;
    localStorage.setItem("playerName", name);
}  