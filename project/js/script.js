function openHowTo(){
    document.body.innerHTML =
    `<div id="background">
        <div id="HowToBox"></div>
        <div id="HowToBox1"></div>
        <div id="HowToBox2"></div>
        <div id="Back-Button" onclick="BackToStart()"></div>
    </div>`;
}

function BackToStart(){
    document.body.innerHTML =
    `<div id="background">
        <div id="Logo"></div>
        <div id="start-button"></div>
        <div id="leaderboard-button"></div>
        <div id="howTo-button" onclick="openHowTo()"></div>
    </div>`;
}