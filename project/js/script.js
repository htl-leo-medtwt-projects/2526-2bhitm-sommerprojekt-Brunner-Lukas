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
        <div id="start-button"></div>
        <div id="leaderboard-button"></div>
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