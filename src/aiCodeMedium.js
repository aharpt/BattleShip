// JavaScript source code
let gotHit = false;
let hitList = [];

function easyGuess() {
    let posA = 1;
    let posB = 1;
    let guessID = "A1";
    if (gotHit) {
        guessID = hitList.shift();
        if (guessID[2] === undefined) {
            posA = guessID[0].charCodeAt(0) - 64;
            posB = guessID[1];
        } else {
            posA = guessID[0].charCodeAt(0) - 64;
            posB = 9;
        }
        if (hitList.length == 0) {
            gotHit = false;
        }
    }
    else {
        posA = Math.floor(Math.random() * 10) + 1;
        posB = Math.floor(Math.random() * 10) + 1;

        guessID = String.fromCharCode(posA + 64);
        guessID = guessID + "" + posB;
    }
    

    for (let i = 0; i < $tiles.length; i++) {
        if ($tiles[i].id == guessID) {
            console.log(guessID)
            if ($($tiles[i]).hasClass("btn-success")) {
                shipHitS();
                alert("Computer got a Hit!");
                $($tiles[i]).addClass("btn-danger");
                decrementShips(myBoard1, $($tiles[i]));
                isGameOver = checkForGameEnd(myBoard1);

                if (isGameOver) {
                    $("#player1OuterContainer").addClass("outer-container");
                    //$("#player2OuterContainer").addClass("outer-container");
                    document.body.innerHTML = "<h2 id='playerWon' class='lead'>Game Over, Computer Won!</h2>";
                }

                if (posA + 1 <= 10) {
                    hitID1 = String.fromCharCode(posA + 65) + "" + posB;
                    hitList.push(hitID1);
                    gotHit = true;
                }
                if (posA - 1 > 0) {
                    hitID2 = String.fromCharCode(posA + 63) + "" + posB;
                    hitList.push(hitID2);
                    gotHit = true;
                }
                if (posB + 1 <= 10) {
                    hitID3 = String.fromCharCode(posA + 64) + "" + (posB - 1);
                    hitList.push(hitID3);
                    gotHit = true;
                }
                if (posB - 1 > 0) {
                    hitID4 = String.fromCharCode(posA + 64) + "" + (posB + 1);
                    hitList.push(hitID4);
                    gotHit = true;
                }

                setTimeout(changeTurn, 2, isGameOver);

            }
            else {
                console.log("AI trying to miss at: " + guessID);
                if ($($tiles[i]).hasClass("btn-dark")) {
                    console.log("Fail...AI Already guess here");
                    easyGuess();
                }
                else {
                    console.log("success miss.");
                    shipMissS();
                    alert("Computer Missed.");
                    $($tiles[i]).addClass("btn-dark");
                    setTimeout(changeTurn, 2, isGameOver);
                }
            }

        }
    }
}