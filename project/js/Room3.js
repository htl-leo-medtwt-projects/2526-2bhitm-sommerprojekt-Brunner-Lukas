function StartThirdLevel(){
    startRoom3BackgroundSound();
    document.body.innerHTML = `
    <div id="backgroundThirdRoom">
        <div id="firstStickyNote" onclick="showFirstRiddleTip()"></div>
        <div id="secondStickyNote" onclick="showSecondRiddleTip()"></div>
        <div id="hiddenAsciiNote" onclick="showAsciiTable()"></div>
        <div id="firstRiddle">
            <h2>01001110</h2>
            <h2>00110011</h2>
            <h2>01010100</h2>
        </div>
        <div id="secondRiddle">
            <pre>function unlockServer() {
  let code = 1234
  if (code == 5987) {
    return "ACCESS GRANTED"
  } else {
    return "ACCESS DENIED"
  }
}</pre>
        </div>
        <div id="codeInputArea">
            <div id="codeInputLabel">DECODED WORD:</div>
            <input type="text" id="binaryAnswer" maxlength="10" placeholder="???" />
            <div id="codeInputLabel2">SERVER CODE:</div>
            <input type="text" id="serverCode" maxlength="10" placeholder="????" />
            <button id="submitThirdLevel" onclick="checkThirdLevel()">ENTER</button>
            <div id="thirdLevelError"></div>
        </div>
        <div id="asciiOverlay">
            <div id="asciiOverlayContent">
                <div id="asciiOverlayTitle">ASCII REFERENCE TABLE</div>
                <table id="asciiOverlayTable">
                    <tr><th>Dec</th><th>Chr</th><th>Dec</th><th>Chr</th></tr>
                    <tr><td>48</td><td>0</td><td>65</td><td>A</td></tr>
                    <tr><td>49</td><td>1</td><td>66</td><td>B</td></tr>
                    <tr><td>50</td><td>2</td><td>67</td><td>C</td></tr>
                    <tr><td>51</td><td>3</td><td>68</td><td>D</td></tr>
                    <tr><td>52</td><td>4</td><td>69</td><td>E</td></tr>
                    <tr><td>53</td><td>5</td><td>70</td><td>F</td></tr>
                    <tr><td>54</td><td>6</td><td>71</td><td>G</td></tr>
                    <tr><td>55</td><td>7</td><td>72</td><td>H</td></tr>
                    <tr><td>56</td><td>8</td><td>73</td><td>I</td></tr>
                    <tr><td>57</td><td>9</td><td>74</td><td>J</td></tr>
                    <tr><td></td><td></td><td>75</td><td>K</td></tr>
                    <tr><td></td><td></td><td>76</td><td>L</td></tr>
                    <tr><td></td><td></td><td>77</td><td>M</td></tr>
                    <tr><td></td><td></td><td>78</td><td>N</td></tr>
                    <tr><td></td><td></td><td>79</td><td>O</td></tr>
                    <tr><td></td><td></td><td>80</td><td>P</td></tr>
                    <tr><td></td><td></td><td>81</td><td>Q</td></tr>
                    <tr><td></td><td></td><td>82</td><td>R</td></tr>
                    <tr><td></td><td></td><td>83</td><td>S</td></tr>
                    <tr><td></td><td></td><td>84</td><td>T</td></tr>
                    <tr><td></td><td></td><td>85</td><td>U</td></tr>
                    <tr><td></td><td></td><td>86</td><td>V</td></tr>
                    <tr><td></td><td></td><td>87</td><td>W</td></tr>
                    <tr><td></td><td></td><td>88</td><td>X</td></tr>
                    <tr><td></td><td></td><td>89</td><td>Y</td></tr>
                    <tr><td></td><td></td><td>90</td><td>Z</td></tr>
                </table>
                <div id="asciiOverlayClose" onclick="hideAsciiTable()">[ CLOSE ]</div>
            </div>
        </div>
        ${thirdRoomInfoButton()}
    </div>`;
    addTimer();
}

const room3Tips = [
    'Wandle jeden Binärcode zuerst in eine Dezimalzahl um. Danach suchst du diese Zahl in der ASCII-Tabelle.',
    'Die drei übersetzten ASCII-Zeichen ergeben zusammen das Wort für das erste Eingabefeld.',
    'Beim Code-Stück ist wichtig, welcher Wert die if-Bedingung wahr macht. Der gesuchte Server-Code steht bereits im Code.'
];

let currentRoom3Tip = 0;

function thirdRoomInfoButton(){
    return `<button id="room1InfoButton" onclick="openRoom3Info()" aria-label="Info zu Raum 3">I</button>`;
}

function openRoom3Info(){
    closeRoom3Info();
    currentRoom3Tip = 0;

    document.body.insertAdjacentHTML('beforeend', `
        <div id="room1InfoOverlay">
            <div id="room1InfoPanel">
                <button id="room1InfoClose" onclick="closeRoom3Info()" aria-label="Info schließen">X</button>
                <p class="room1InfoKicker">Raum 3</p>
                <h2>Das Herz des Mainframes</h2>
                <p>Die visuelle Fassade bricht weg und du stehst tief im Serverraum. Das Summen der Kühlung liegt in der Luft, während das System in seiner reinsten Sprache spricht: Einsen und Nullen.</p>

                <h3>Deine Mission</h3>
                <p><strong>Die Übersetzung:</strong> Wandle die Binärcodes in Dezimalzahlen um und übersetze diese mit der ASCII-Tabelle in lesbare Zeichen.</p>
                <p><strong>Die Code-Extraktion:</strong> Analysiere das Code-Stück und finde heraus, welcher Wert die Funktion freischaltet.</p>

                <h3>Hinweis vom System</h3>
                <p class="systemHint">"Maschinen denken nicht in Worten. Sie denken in Signalen und Pausen. Finde die Logik im Quelltext, übersetze das Flüstern der Server und der Weg zum Kern wird sich offenbaren."</p>

                <div id="room1TipBox">
                    <button id="room1TipButton" onclick="showRoom3Tip()">Tipp anzeigen</button>
                    <p id="room1TipText">Klicke auf den Tipp-Button, wenn du einen Hinweis brauchst.</p>
                </div>
            </div>
        </div>
    `);
    addTimer();
}

function closeRoom3Info(){
    let overlay = document.getElementById('room1InfoOverlay');
    if (overlay) overlay.remove();
}

function showRoom3Tip(){
    let tipText = document.getElementById('room1TipText');
    let tipButton = document.getElementById('room1TipButton');
    if (!tipText || !tipButton) return;

    tipText.textContent = room3Tips[currentRoom3Tip];
    currentRoom3Tip = (currentRoom3Tip + 1) % room3Tips.length;
    tipButton.textContent = currentRoom3Tip === 0 ? 'Tipps neu starten' : 'Nächster Tipp';
}

function showAsciiTable(){
    document.getElementById('asciiOverlay').style.display = 'flex';
}

function hideAsciiTable(){
    document.getElementById('asciiOverlay').style.display = 'none';
}

function showFirstRiddleTip(){
    document.body.innerHTML = `
    <div id="backgroundThirdRoom">
        <div id="StickyNoteTip1">
            <div id="text">
                <div id="closeTip" onclick="StartThirdLevel()">← Zurück</div>
                <p><b>Hinweis: Binär → Dezimal</b></p>
                <p>Multipliziere jedes Bit mit 2 hoch seiner Position (rechts = 0) und addiere anschließend alle Ergebnisse.</p>
                <p>Beispiel:<br>
                1011 =<br>
                (1×2³)+(0×2²)<br>+(1×2¹)+(1×2⁰)<br>
                = 8+0+2+1 = <b>11</b></p>
                <p>Nutze danach die ASCII-Tabelle, um den Buchstaben zu finden!</p>
            </div>
        </div>
    </div>`;
    addTimer();
}

function showSecondRiddleTip(){
    document.body.innerHTML = `
    <div id="backgroundThirdRoom">
        <div id="StickyNoteTip1">
            <div id="text">
                <div id="closeTip" onclick="StartThirdLevel()">← Zurück</div>
                <p><b>Hinweis: Der Code</b></p>
                <p>Die Variable startet mit einem Wert...</p>
                <p>Die if-Abfrage erwartet aber einen anderen.</p>
                <p>Welcher Wert macht die Bedingung <b>wahr</b>?</p>
                <p>Die Antwort steht bereits im Code.</p>
            </div>
        </div>
    </div>`;
    addTimer();
}

function checkThirdLevel(){
    const binary = document.getElementById('binaryAnswer').value.trim().toUpperCase();
    const server = document.getElementById('serverCode').value.trim();
    const error = document.getElementById('thirdLevelError');

    if (binary === 'N3T' && server === '5987') {
        stopRoom3BackgroundSound();
        LoadingScreenFourthRoom();
    } else {
        error.textContent = 'ZUGRIFF VERWEIGERT - überprüfe deine Antworten.';
        setTimeout(() => { error.textContent = ''; }, 2500);
    }
}
