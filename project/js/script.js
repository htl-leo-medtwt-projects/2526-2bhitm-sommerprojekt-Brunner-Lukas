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
                      'Logge dich als Administrator ein, damit du Zugriff auf das System hast und es verlassen kannst.',
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
    </div>`;
}