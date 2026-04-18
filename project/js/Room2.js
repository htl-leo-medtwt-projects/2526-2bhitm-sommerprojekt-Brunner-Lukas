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
    </div>`;
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
    </div>`;
}

function checkCode(){
    code = document.getElementById("codeInputField").value;
    console.log(code);
    if (code === "7k3kx2"){
        StartThirdLevel();
    }
}