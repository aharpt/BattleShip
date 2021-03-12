// get all board tiles from my board
let $tiles = $(".myBoard1 button");

// orientation of ship placement
let orientation = "neither";
let isGameOver = false;
//will later store 2D arrays of the coordiantes for the players ships.
//The arrays are filled with the returnIdsOfShip function. The largest ships are stored at the beginning of the array and the 1x1 ship is stored in the end.
let player1Ships = [];
let player2Ships = [];
//Sound Effects
function shipHitS() {
    let sound = new Audio('Sound Effects/explosion.mp3');
    sound.play();
}
function shipMissS() {
    let sound = new Audio('Sound Effects/WaterSploosh.mp3');
    sound.play();
}
function backgroudS() {
    let sound = new Audio('Sound Effects/BackgroundMusic.mp3');
    sound.play();
}

function returnIdsOfShip() {
    let shipIds = [];
    let shipIdLetters = [];
    let shipIdNumbers = [];
    for (let i = 0; i < $tiles.length; i++) {
        if ($($tiles[i]).hasClass("btn-success")) {
            shipIdLetters.push($tiles[i].id[0]);
            if ($tiles[i].id[2] === undefined) {
                shipIdNumbers.push($tiles[i].id[1]);
            } else {
                let tempId = $tiles[i].id[1] + "" + $tiles[i].id[2];
                shipIdNumbers.push(tempId);
            } // end if
        } // end if
    } // end for

    shipIds[0] = shipIdLetters;
    shipIds[1] = shipIdNumbers;

    return shipIds;
}

/* When a Board Tile is Clicked */
// charCodeAt(0) - 65
let myBoard1 = [['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']];

/* When a Button on Player1's Place Ships Board is Clicked */
let numberOfShipsPlaced;
let specialCase=false;
/**
 * @event click event callback function for Player 1's ship placement
 */
$(".myBoard1 button").click(function () {

    /* DOM Manipulation */

    $(".myBoard1 button").attr("disabled", "true");
    $(this).removeAttr("disabled");
    $(this).removeClass("btn-secondary").addClass("btn-success");
    // get id of button clicked
    let clickedId = $(this).attr("id");

    /* Change Board */

    let boardToChange;
    if (clickedId[2] === undefined) {
        boardToChange = clickedId[0].charCodeAt(0) - 65 + "" + (clickedId[1] - 1);
    } else {
        boardToChange = clickedId[0].charCodeAt(0) - 65 + "" + 9;
    }

    myBoard1[boardToChange[0]][boardToChange[1]] = "S";

    numberOfShipsPlaced = whenTileClicked($tiles, ".myBoard1 button");
    console.log("number of Ships Placed: " + numberOfShipsPlaced);

    /* Checks Which Spaces Are Open for the Ship */

    // Row Code
    let rowDownNumber;
    rowDownNumber = parseInt(clickedId[1]) + 1;

    if (clickedId[2] !== undefined) {
        rowDownNumber = parseInt((clickedId[1] + "" + clickedId[2])) + 1;
    }

    let rowDownID = clickedId[0] + "" + rowDownNumber;
    let rowUpNumber;
    rowUpNumber = parseInt(clickedId[1]) - 1;

    if (clickedId[2] !== undefined) {
        rowUpNumber = parseInt((clickedId[1] + "" + clickedId[2])) - 1;
    }

    let rowUpID = clickedId[0] + "" + rowUpNumber;
    for (let i = 0; i < $tiles.length; i++) {
        if (($tiles[i].id === rowDownID || $tiles[i].id === rowUpID) && orientation !== "horizontal" && ($($tiles[i]).hasClass("btn-success") === false&&!specialCase)) {
            $tiles[i].disabled = false;
        }
    }

    // Column Code
    let columnDownLetter = clickedId[0].charCodeAt(0);
    columnDownLetter += 1;

    let newLetter1 = String.fromCharCode(columnDownLetter);
    let columnDownID;
    columnDownID = newLetter1 + "" + clickedId[1];

    if (clickedId[2] !== undefined) {
        columnDownID = columnDownID + "" + clickedId[2];
    }

    let columnUpLetter = clickedId[0].charCodeAt(0);
    columnUpLetter -= 1;

    let newLetter2 = String.fromCharCode(columnUpLetter);
    let columnUpID;
    columnUpID = newLetter2 + "" + clickedId[1];

    if (clickedId[2] !== undefined) {
        columnUpID = columnUpID + "" + clickedId[2];
    }

    for (let i = 0; i < $tiles.length; i++) {
        if (($tiles[i].id === columnDownID || $tiles[i].id === columnUpID) && orientation !== "vertical" && ($($tiles[i]).hasClass("btn-success") === false&&!specialCase)) {
            $tiles[i].disabled = false;
        }
    }
});

/**
 * @description Function to call when Ship is Placed
 * @param {array} $board A jQuery representation of all DOM elements that match a particular selector
 */
let doneWithPlacingShip = function ($board) {
    for (let i = 0; i < $board.length; i++) {
        if ($($board[i]).hasClass("btn-success")) {
            $board[i].disabled = true;
        }
    }
};

let numOfShips = 0;
$('#done1Btn').prop('disabled', true);
/**
 * @description Logic for when a board tile on the ship placement board for player 1 is clicked
 * @param {array} $board A jQuery representation of all DOM elements that match a particular selector
 * @param {array} myBoardBtns A jQuery representation of all DOM elements that match a particular selector
 * @returns numOfShips that contains the number of ships placed
 */
function whenTileClicked($board, myBoardBtns) {
    let numOfShipTiles = 0;
    for (let i = 0; i < $board.length; i++) {
        if ($($board[i]).hasClass("btn-success")) {
            numOfShipTiles++;
        }
    }

    switch (numOfShipTiles) {
        case 1:
            /* DOM */
            alert("First Ship Placed");
            $(myBoardBtns).removeAttr("disabled");

            if (location.pathname.split("BattleShip")[1] == "/player1.html")
            //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
            {
                player1Ships = returnIdsOfShip();
            }
            else {
                player2Ships = returnIdsOfShip();
            }
            doneWithPlacingShip($board);
            numOfShips = 1;
            $('#done1Btn').prop('disabled', false);
            break;

        case 3:
            /* DOM */
            alert("Second Ship Placed");
            $(myBoardBtns).removeAttr("disabled");

            if (location.pathname.split("BattleShip")[1] == "/player1.html")
            //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
            {
                player1Ships = returnIdsOfShip();
            }
            else {
                player2Ships = returnIdsOfShip();
            }
            doneWithPlacingShip($board);
            numOfShips = 2;
            orientation = prompt("Do you want your next ship to be horizontal or vertical? (Press 'Cancel' to stop placing ships)");
            break;

        case 6:
            /* DOM */
            alert("Third Ship Placed");
            $(myBoardBtns).removeAttr("disabled");

            if (location.pathname.split("BattleShip")[1] == "/player1.html")
            //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
            {
                player1Ships = returnIdsOfShip();
            }
            else {
                player2Ships = returnIdsOfShip();
            }
            doneWithPlacingShip($board);
            numOfShips = 3;
            orientation = prompt("Do you want your next ship to be horizontal or vertical? (Press 'Cancel' to stop placing ships)");
            break;

        case 10:
            /* DOM */
            alert("Fourth Ship Placed");
            $(myBoardBtns).removeAttr("disabled");

            if (location.pathname.split("BattleShip")[1] == "/player1.html")
            //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
            {
                player1Ships = returnIdsOfShip();
            }
            else {
                player2Ships = returnIdsOfShip();
            }
            doneWithPlacingShip($board);
            numOfShips = 4;
            orientation = prompt("Do you want your next ship to be horizontal or vertical? (Press 'Cancel' to stop placing ships)");
            break;

        case 15:
            /* DOM */
            alert("Fifth Ship Placed");
            $(myBoardBtns).removeAttr("disabled");

            if (location.pathname.split("BattleShip")[1] == "/player1.html")
            //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
            {
                player1Ships = returnIdsOfShip();
            }
            else {
                player2Ships = returnIdsOfShip();
            }
            doneWithPlacingShip($board);
            numOfShips = 5;
            orientation = prompt("Do you want your next ship to be horizontal or vertical? (Press 'Cancel' to stop placing ships)");
            break;

        case 21:
            specialCase=true
            /* DOM */
            alert("Sixth Ship Placed");
            $(myBoardBtns).removeAttr("disabled");

            if (location.pathname.split("BattleShip")[1] == "/player1.html")
            //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
            {
                player1Ships = returnIdsOfShip();
            }
            else {
                player2Ships = returnIdsOfShip();
            }
            doneWithPlacingShip($board);
            numOfShips = 6;
            $(".myBoard1 button").attr("disabled", "true");
            alert("Opponent's Turn");
            aiShipPlace();
            for (let i = 0; i < $tiles.length; i++) {
              $tiles3[i].disabled = false;
            }
            break;

        default:
            break;
    }

    return numOfShips;

}

/* Code For 'Done Placing Ships' button */
/**
 * @event click for when Player 1's 'Done Placing Ships' button is clicked
 */
$("#done1Btn").click(function () {
    let successLength = 0;
    for (let i = 0; i < $tiles.length; i++) {
        if ($($tiles[i]).hasClass("btn-success")) {
            successLength++;
        }
    }

    if (successLength === 0) {
        alert("Please place at least one ship");
    } else {
        alert("Opponent's Turn");
        aiShipPlace();
        //$("#player1OuterContainer").toggleClass("outer-container");
        //$("#player2OuterContainer").toggleClass("outer-container");
    }

    $("#done1Btn").hide();
    for (let i = 0; i < $tiles.length; i++) {
        $tiles[i].disabled = true;
        $tiles3[i].disabled = false;
    }

    console.log(myBoard1)
});

/****** AI *******/
let myBoard2 = [['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']];

//let $tiles2 = $(".myBoard2 button");
let orientation2 = "neither";

// JavaScript source code
// Haven't coded yet but guess works!
function aiShipPlace() {

    alert("Computer has placed their ships!")
}

function easyGuess() {
    let posA = Math.floor(Math.random() * 10) + 1;
    let posB = Math.floor(Math.random() * 10) + 1;

    let guessID = String.fromCharCode(posA + 65);
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
                shipMissS();
                $($tiles[i]).addClass("btn-dark");
                if($(this).hasClass("btn-dark")){
                  alert("Already guessed this square.");
                  continue;
                }
                else{
                  alert("Computer Missed.");
                  $(this).addClass("btn-dark");
                  setTimeout(changeTurn, 2, isGameOver);
                }
            }

        }
    }
}

/**
 * @description Takes in a player board and the tile clicked, and checks if the game is over
 * @param {array} board An array of a player board
 * @returns true if game is over, false otherwise
 */
function checkForGameEnd(board) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (board[i][j] === "S") {
                return false;
            }
        }
    }

    return true;
}

/*******   FIRE CODE  ********/
let $tiles3 = $(".enemyBoard1 button");
let enemyBoard1 = [['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']];

for (let i = 0; i < $tiles.length; i++) {
  $tiles3[i].disabled = true;
}
/**
 * @description Changes the turn to the next player as long as the current turn did not result in the game ending
 * @param {boolean} gameOver A parameter that evaluates to true if the game is over, false otherwise
 */
function changeTurn(gameOver) {
    if (!gameOver) {
        alert("Players's Turn");
        //$("#player1OuterContainer").toggleClass("outer-container");
        //$("#player2OuterContainer").toggleClass("outer-container");
    }
}

/**
 * @description takes a player board, and the tile that was clicked, and decrements the number of ship spaces left to hit
 * @param {array} board An array of a player board
 * @param {object} _this A reference to the board tile clicked
 */
function decrementShips(board, _this) {
    /* Change Board */

    let clickedId = _this.attr("id");

    let boardToChange;
    if (clickedId[2] === undefined) {
        boardToChange = clickedId[0].charCodeAt(0) - 65 + "" + (clickedId[1] - 1);
    } else {
        boardToChange = clickedId[0].charCodeAt(0) - 65 + "" + 9;
    }
    console.log("boardtoChange: " + boardToChange);
    board[boardToChange[0]][boardToChange[1]] = "O";
    console.log("board: " + board);
}

/**
 * @event click for when Player 1 shoots at Player 2's ships
 */
$(".enemyBoard1 button").click(function () {
    let clickedId = $(this).attr("id");
    if (clickedId[2] === undefined) {
        boardShot = clickedId[0].charCodeAt(0) - 65 + "" + (clickedId[1] - 1);
    } else {
        boardShot = clickedId[0].charCodeAt(0) - 65 + "" + 9;
    }

    if (myBoard2[boardShot[0]][boardShot[1]] == "S") {
        shipHitS();
        alert("You got a Hit!");
        $(this).addClass("btn-danger");
        decrementShips(myBoard2, $(this));

        isGameOver = checkForGameEnd(myBoard2);

        if (isGameOver) {
            $("#player1OuterContainer").addClass("outer-container");
            //$("#player2OuterContainer").addClass("outer-container");
            document.body.innerHTML = "<h2 id='playerWon' class='lead'>Game Over, Player 1 Won!</h2>";
        }

    } else {
        shipMissS();
        alert("You Missed.");
        $(this).addClass("btn-dark");
    }

    if (!isGameOver) {
        alert("Computer's Turn");
        easyGuess();
    }
});
