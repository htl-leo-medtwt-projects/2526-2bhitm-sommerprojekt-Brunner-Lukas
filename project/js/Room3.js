function StartThirdLevel(){
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
    </div>`;
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
                <div id="closeTip" onclick="StartThirdLevel()">← Back</div>
                <p><b>Hint: Binary → Decimal</b></p>
                <p>Multiply each bit by 2 to the power of its position (right = 0), then add all results.</p>
                <p>Example:<br>
                1011 =<br>
                (1×2³)+(0×2²)<br>+(1×2¹)+(1×2⁰)<br>
                = 8+0+2+1 = <b>11</b></p>
                <p>Then use the ASCII table to find the letter!</p>
            </div>
        </div>
    </div>`;
}

function showSecondRiddleTip(){
    document.body.innerHTML = `
    <div id="backgroundThirdRoom">
        <div id="StickyNoteTip1">
            <div id="text">
                <div id="closeTip" onclick="StartThirdLevel()">← Back</div>
                <p><b>Hint: The Code</b></p>
                <p>The variable starts with one value...</p>
                <p>The if-check expects a different one.</p>
                <p>What value makes the condition <b>true</b>?</p>
                <p>The answer is already written in the code.</p>
            </div>
        </div>
    </div>`;
}

function checkThirdLevel(){
    const binary = document.getElementById('binaryAnswer').value.trim().toUpperCase();
    const server = document.getElementById('serverCode').value.trim();
    const error = document.getElementById('thirdLevelError');

    if (binary === 'N3T' && server === '5987') {
        StartFourthLevel();
    } else {
        error.textContent = 'ACCESS DENIED – check your answers.';
        setTimeout(() => { error.textContent = ''; }, 2500);
    }
}