function StartThirdLevel(){
    document.body.innerHTML = `
    <div id="backgroundThirdRoom">
    <div id="firstStickyNote" onclick="showFirstRiddleTip()"></div>
    <div id="secondStickyNote" onclick="showSecondRiddleTip()"></div>
    <div id="firstRiddle">
    <h2>01001110</h2>
    <h2>00110011</h2>
    <h2>01010100</h2>
    </div>
    <div id="secondRiddle">
    <h2>function unlockServer() {
        let code = 1234
        if (code == 5987) {
            return "ACCESS GRANTED"
        } else {
            return "ACCESS DENIED"
        }
    }</h2>
    </div>
    </div>`;
}

function showFirstRiddleTip(){
        document.body.innerHTML = `
    <div id="backgroundThirdRoom">
     <div id="StickyNoteTip1">
        <div id="text">
            <div id="closeTip" onclick="StartThirdLevel()">Back</div>
            <h2>Hint: Binary code can be converted to text using an ASCII table.</h2>
            <h2>You can convert binary to decimal by:

            Multiplying each binary digit by 2 raised to its position (starting from 0 on the right), then adding the results.

            Example:
            1011₂ = (1×2³) + (0×2²) + (1×2¹) + (1×2⁰)
            = 8 + 0 + 2 + 1 = 11₁₀</h2>
            <h2>Use the ASCII table to find the corresponding characters for each binary code.</h2>
        </div>
    </div>
    </div>`;
}


