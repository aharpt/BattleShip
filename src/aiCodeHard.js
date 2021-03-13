// JavaScript source code
function easyGuess() {
    let posA = 1;
    let posB = 1;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; i++) {
            if (myBoard1[i][j] == 'S') {
                posA = i + 1;
                posB = j + 1;
            }
        }
    }
    let guessID = String.fromCharCode(posA + 64);
    guessID = guessID + "" + posB;

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