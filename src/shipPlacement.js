/****** BattleShip.js FILE *******/

//a test board setup with 5 ships of
//size 5, 4, 3, 2, and 1
//board is a 10x10
testBoard = [['5','O','O','O','O','O','O','O','O','1'],
             ['5','O','O','O','O','O','O','3','3','3'],
             ['5','O','O','O','2','O','O','O','O','O'],
             ['5','O','O','O','2','O','O','O','O','O'],
             ['5','O','O','O','O','O','O','4','O','O'],
             ['O','O','O','O','O','O','O','4','O','O'],
             ['O','O','O','O','O','O','O','4','O','O'],
             ['O','O','O','O','O','O','O','4','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O']]

//processing the array[0] and array[1] of the position array
//and translating it into a board for gameplay()
function arrayTranslate (horizontals, verticals) {
    for (let i = 0; i < horizontals.length(); i++) {
        for (let j = 0; j < verticals.length(); j++) {
            //define this once we know if there is a set number or a variable number of ships
        }
    }
}

//gamePlay takes in a 2D array board, move coordinates,
//and returns either a hit, miss, or sink
function gamePlay(boardArray, moveX, moveY) {
    //moveX is 1 through 10, moveY is A through J
    //(0,0) is the top left of the array
    //translating the user input into array coords
    //moveY scales from 0-9
    //moveX gets the Ascii of the char and scales it from 0-9
    moveY -= 1;
    moveX = moveX.charCodeAt(0) - 65;
    if (boardArray[moveY][moveX] != 'O') {
        console.log("Inside gamePlay()");
        //Check for a sink, find if the hit tile was
        //the last of its ship
        var currentShip = boardArray[moveY][moveX];
        var aboveEmpty = true;
        var belowEmpty = true;
        var rightEmpty = true;
        var leftEmpty = true;

        //checking one tile above
        if ((moveY-1 >= 0)) {
            if (boardArray[moveY-1][moveX] == currentShip) {
                aboveEmpty = false;
            }
        }

        //checking one tile below
        if ((moveY+1) <= 9) {
            if (boardArray[moveY+1][moveX] == currentShip) {
                belowEmpty = false;
            }
        }

        //checking one tile left
        if ((moveX-1 >= 0)) {
            if (boardArray[moveY][moveX-1] == currentShip) {
                leftEmpty = false;
            }
        }

        //checking one tile right
        if ((moveX+1) <= 9) {
            if (boardArray[moveY][moveX+1] == currentShip) {
                rightEmpty = false;
            }
        }

        if (aboveEmpty && belowEmpty && rightEmpty && leftEmpty) {
            return("Sink");
        }
        else {
            return("Hit");
        }
    }
    else {
        return("Miss");
    }
}

//a small console based test suite for the gameplay
//looping hits across the board
function gameTest($board) {
    yMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    xMoves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if ($($board[i][j]).hasClass("btn-danger")) {
                alert("Hit: (" + xMoves[i] + ", " + yMoves[j] + ")");
            }
            // if (gamePlay(board, xMoves[i], yMoves[j]) == "Sink") {
            //     alert("Sink: (" + xMoves[i] + ", " + yMoves[j] + ")");
            // }
        }
    }
}


// get all board tiles from my board
let $tiles = $(".myBoard1 button");

// orientation of ship placement
let orientation = "neither";

//will later store 2D arrays of the coordiantes for the players ships.
//The arrays are filled with the returnIdsOfShip function. The largest ships are stored at the beginning of the array and the 1x1 ship is stored in the end.
let player1Ships = [];
let player2Ships = [];

/*
  1. shipIdLetters and shipIdNumbers hold a list of their respective values.
   You can access an entire id by accessing the same index in both arrays.
   For instance, shipIdLetters[0] + shipIdNumbers[0] will give entire id of 0th element
  2. shipIds is a 2d array.  shipIds[0] holds shipIdLetters array, shipIds[1] holds shipIdNumbers

*/

/**
 * @returns 2d array shipIds that holds ship coordinates that have a ship on them
 */

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
let myBoard1 = [['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O']];

/* When a Button on Player1's Place Ships Board is Clicked */
let numberOfShipsPlaced;
$(".myBoard1 button").click(function() {

  /* DOM Manipulation */

  $(".myBoard1 button").attr("disabled", "true");
  $(this).removeAttr("disabled");
  $(this).removeClass("btn-secondary").addClass("btn-success");
  // get id of button clicked
  let clickedId = $(this).attr("id");
  console.log(clickedId);

/* Change Board */

  let boardToChange;
  if (clickedId[2] === undefined) {
    boardToChange = clickedId[0].charCodeAt(0) - 65 + "" + (clickedId[1] - 1);
  } else {
    boardToChange = clickedId[0].charCodeAt(0) - 65 + "" + 9;
  }
  console.log(boardToChange);

  myBoard1[boardToChange[0]][boardToChange[1]] = "S";
  console.log(myBoard1);

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
    if (($tiles[i].id === rowDownID || $tiles[i].id === rowUpID) && orientation !== "horizontal" && ($($tiles[i]).hasClass("btn-success") === false)) {
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
    if (($tiles[i].id === columnDownID || $tiles[i].id === columnUpID) && orientation !== "vertical" && ($($tiles[i]).hasClass("btn-success") === false)) {
      $tiles[i].disabled = false;
    }
  }
});

/**
 * Function to call when Ship is Placed
 */
let doneWithPlacingShip = function($board) {
  for (let i = 0; i < $board.length; i++) {
    if ($($board[i]).hasClass("btn-success")) {
      $board[i].disabled = true;
    }
  }
};

/* Get the Number of Ships Placed */
let numOfShips = 0;
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
          else
          {
              player2Ships = returnIdsOfShip();
          }
      doneWithPlacingShip($board);
      numOfShips = 1;
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
        else
        {
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
          else
          {
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
          else
          {
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
          else
          {
              player2Ships = returnIdsOfShip();
          }
      doneWithPlacingShip($board);
      numOfShips = 5;
      orientation = prompt("Do you want your next ship to be horizontal or vertical? (Press 'Cancel' to stop placing ships)");
      break;

    case 21:
      /* DOM */
      alert("Sixth Ship Placed");
      $(myBoardBtns).removeAttr("disabled");

      if (location.pathname.split("BattleShip")[1] == "/player1.html")
          //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
      {
          player1Ships = returnIdsOfShip();
      }
      else
      {
          player2Ships = returnIdsOfShip();
      }
      doneWithPlacingShip($board);
      numOfShips = 6;
      $(".myBoard1 button").attr("disabled", "true");
      break;

    default:
      break;
  }

  return numOfShips;

}

/* Code For 'Done Placing Ships' button */
$("#done1Btn").click(function() {
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
    $("#player1OuterContainer").toggleClass("outer-container");
    $("#player2OuterContainer").toggleClass("outer-container");
  }

  $("#done1Btn").hide();
  for (let i = 0; i < $tiles.length; i++) {
    $tiles[i].disabled = true;
  }
});

/****** PLAYER 2 CODE *******/
let myBoard2 = [['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O']];

let $tiles2 = $(".myBoard2 button");
let orientation2 = "neither";

$(".myBoard2 button").click(function() {

    /* DOM Manipulation */
    $(".myBoard2 button").attr("disabled", "true");
    $(this).removeAttr("disabled");
    $(this).removeClass("btn-secondary").addClass("btn-success");
    // get id of button clicked
    let clickedId = $(this).attr("id");
    console.log(clickedId);

  /* Change Board */

    let boardToChange;
    if (clickedId[2] === undefined) {
      boardToChange = clickedId[0].charCodeAt(0) - 65 + "" + (clickedId[1] - 1);
    } else {
      boardToChange = clickedId[0].charCodeAt(0) - 65 + "" + 9;
    }
    console.log(boardToChange);

    myBoard2[boardToChange[0]][boardToChange[1]] = "S";
    console.log(myBoard2);

    let areMoreShips = whenTileClicked2($tiles2, ".myBoard2 button");

    /* Checks if there are more ships to place */
    if (areMoreShips) {
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
    for (let i = 0; i < $tiles2.length; i++) {
      if (($tiles2[i].id === rowDownID || $tiles2[i].id === rowUpID) && orientation2 !== "horizontal" && ($($tiles2[i]).hasClass("btn-success") === false)) {
        $tiles2[i].disabled = false;
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

    for (let i = 0; i < $tiles2.length; i++) {
      if (($tiles2[i].id === columnDownID || $tiles2[i].id === columnUpID) && orientation2 !== "vertical" && ($($tiles2[i]).hasClass("btn-success") === false)) {
        $tiles2[i].disabled = false;
      }
    }
  }
});

/* Get the Number of Ships Placed */
function whenTileClicked2($board, myBoardBtns) {
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
          else
          {
              player2Ships = returnIdsOfShip();
          }
      doneWithPlacingShip($board);
      break;

    case 3:
      if (numberOfShipsPlaced > 1) {
          /* DOM */
          alert("Second Ship Placed");
          $(myBoardBtns).removeAttr("disabled");

          if (location.pathname.split("BattleShip")[1] == "/player1.html")
              //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
          {
              player1Ships = returnIdsOfShip();
          }
          else
          {
              player2Ships = returnIdsOfShip();
          }
          doneWithPlacingShip($board);
          if (numberOfShipsPlaced > 2) {
            orientation2 = prompt("Do you want your next ship to be horizontal or vertical?");
          } else {
            $("#done2Btn").trigger("click");
            $(".myBoard2 button").attr("disabled", "true");
            return false;
          }
      } else {
        $(".myBoard2 button").attr("disabled", "true");
        return false;
      }
      break;

    case 6:
      if (numberOfShipsPlaced > 2) {
        /* DOM */
        alert("Third Ship Placed");
        $(myBoardBtns).removeAttr("disabled");

            if (location.pathname.split("BattleShip")[1] == "/player1.html")
                //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
            {
                player1Ships = returnIdsOfShip();
            }
            else
            {
                player2Ships = returnIdsOfShip();
            }
        doneWithPlacingShip($board);
        if (numberOfShipsPlaced > 3) {
          orientation2 = prompt("Do you want your next ship to be horizontal or vertical?");
        }
        else {
          $("#done2Btn").trigger("click");
          $(".myBoard2 button").attr("disabled", "true");
          return false;
        }
      } else {
        $(".myBoard2 button").attr("disabled", "true");
        return false;
      }
      break;

    case 10:
      if (numberOfShipsPlaced > 3) {
        /* DOM */
        alert("Fourth Ship Placed");
        $(myBoardBtns).removeAttr("disabled");

            if (location.pathname.split("BattleShip")[1] == "/player1.html")
                //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
            {
                player1Ships = returnIdsOfShip();
            }
            else
            {
                player2Ships = returnIdsOfShip();
            }
        doneWithPlacingShip($board);
        if (numberOfShipsPlaced > 4) {
          orientation2 = prompt("Do you want your next ship to be horizontal or vertical?");
        } else {
          $("#done2Btn").trigger("click");
          $(".myBoard2 button").attr("disabled", "true");
          return false;
        }
      } else {
        $(".myBoard2 button").attr("disabled", "true");
        return false;
      }
      break;

    case 15:
      if (numberOfShipsPlaced > 4) {
        /* DOM */
        alert("Fifth Ship Placed");
        $(myBoardBtns).removeAttr("disabled");

            if (location.pathname.split("BattleShip")[1] == "/player1.html")
                //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
            {
                player1Ships = returnIdsOfShip();
            }
            else
            {
                player2Ships = returnIdsOfShip();
            }
        doneWithPlacingShip($board);
        if (numberOfShipsPlaced > 5) {
          orientation2 = prompt("Do you want your next ship to be horizontal or vertical?");
        } else {
          $("#done2Btn").trigger("click");
          $(".myBoard2 button").attr("disabled", "true");
          return false;
        }
      } else {
        $(".myBoard2 button").attr("disabled", "true");
        return false;
      }
      break;

    case 21:
      if (numberOfShipsPlaced > 5) {
        /* DOM */
        alert("Sixth Ship Placed");
        $(myBoardBtns).removeAttr("disabled");

        if (location.pathname.split("BattleShip")[1] == "/player1.html")
            //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
        {
            player1Ships = returnIdsOfShip();
        }
        else
        {
            player2Ships = returnIdsOfShip();
        }
        doneWithPlacingShip($board);
        $(".myBoard2 button").attr("disabled", "true");
      } else {
        $(".myBoard2 button").attr("disabled", "true");
        return false;
      }
    break;

    default:
      break;
  }

  return true;
}



// Update myBoard1 when #done2Btn is clicked
$("#done2Btn").click(function() {
  console.log("Hello done2Btn");
  let successLength = 0;

    for (let i = 0; i < $tiles2.length; i++) {
      if ($($tiles2[i]).hasClass("btn-success")) {
        successLength++;
      }
    }

    if (successLength === 0) {
      alert("Please place at least one ship");
    } else {
      alert("Opponent's Turn");
      $("#player1OuterContainer").toggleClass("outer-container");
      $("#player2OuterContainer").toggleClass("outer-container");
    }

    $("#done2Btn").hide();
    for (let i = 0; i < $tiles2.length; i++) {
      $tiles2[i].disabled = true;
    }
});


/*******   FIRE CODE  ********/
let $tiles3 = $(".enemyBoard1 button");

let enemyBoard1 = [['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O']];

function changeTurn(gameOver) {
  if (!gameOver) {
    alert("Opponent's Turn");
    $("#player1OuterContainer").toggleClass("outer-container");
    $("#player2OuterContainer").toggleClass("outer-container");
  }
}

function decrementShips(board, _this) {
  /* Change Board */

    let clickedId = _this.attr("id");

    let boardToChange;
    if (clickedId[2] === undefined) {
      boardToChange = clickedId[0].charCodeAt(0) - 65 + "" + (clickedId[1] - 1);
    } else {
      boardToChange = clickedId[0].charCodeAt(0) - 65 + "" + 9;
    }
    console.log(boardToChange);
    board[boardToChange[0]][boardToChange[1]] = "O";
    console.log(board);

}

function checkForGameEnd(board, _this) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] === "S") {
        return false;
      }
    }
  }

  return true;
}

function isShipSunk(boardBtns, tileHit) {
  let idOfTileHit = $(tileHit).attr("id");

  // get tile in row above (smaller number)
  let rowDownNumber;
  rowDownNumber = parseInt(idOfTileHit[1]) + 1;

  if (idOfTileHit[2] !== undefined) {
    rowDownNumber = parseInt((idOfTileHit[1] + "" + idOfTileHit[2])) + 1;
  }

  let rowDownID = idOfTileHit[0] + "" + rowDownNumber;
  let $rowDownButton;

  for (let i = 0; i < boardBtns.length; i++) {
    if ($(boardBtns[i]).attr("id") === rowDownID) {
      $rowDownButton = boardBtns[i];
    }
  }

  // get tile in row below (bigger number)
  let rowUpNumber;
  rowUpNumber = parseInt(idOfTileHit[1]) - 1;

  if (idOfTileHit[2] !== undefined) {
    rowUpNumber = parseInt((idOfTileHit[1] + "" + idOfTileHit[2])) - 1;
  }

  let rowUpID = idOfTileHit[0] + "" + rowUpNumber;
  let $rowUpButton;

  for (let i = 0; i < boardBtns.length; i++) {
    if ($(boardBtns[i]).attr("id") === rowUpID) {
      $rowUpButton = boardBtns[i];
    }
  }

  /* For Columns */

  // get tile in column down (following letter)
  let columnDownLetter = idOfTileHit[0].charCodeAt(0);
  columnDownLetter += 1;

  let newLetter1 = String.fromCharCode(columnDownLetter);
  let columnDownID;
  columnDownID = newLetter1 + "" + idOfTileHit[1];

  if (idOfTileHit[2] !== undefined) {
    columnDownID = columnDownID + "" + idOfTileHit[2];
  }

  let $columnDownButton;

  for (let i = 0; i < boardBtns.length; i++) {
    if ($(boardBtns[i]).attr("id") === columnDownID) {
      $columnDownButton = boardBtns[i];
    }
  }

  // get tile in column above (preceding letter)
  let columnUpLetter = idOfTileHit[0].charCodeAt(0);
  columnUpLetter -= 1;

  let newLetter2 = String.fromCharCode(columnUpLetter);
  let columnUpID;
  columnUpID = newLetter2 + "" + idOfTileHit[1];

  if (idOfTileHit[2] !== undefined) {
    columnUpID = columnUpID + "" + idOfTileHit[2];
  }

  let $columnUpButton;

  for (let i = 0; i < boardBtns.length; i++) {
    if ($(boardBtns[i]).attr("id") === columnUpID) {
      $columnUpButton = boardBtns[i];
    }
  }

// check if any adjacent tiles have the class btn-success
  if ($($rowDownButton).hasClass("btn-success") || $($rowUpButton).hasClass("btn-success") || $($columnDownButton).hasClass("btn-success") || $($columnUpButton).hasClass("btn-success")) {
    return false;
  }

  return true;

}

$(".enemyBoard1 button").click(function() {
  let clickedId = $(this).attr("id");
  let isGameOver = false;

  for (let i = 0; i < $tiles2.length; i++) {
    if ($tiles2[i].id == clickedId) {
      if ($($tiles2[i]).hasClass("btn-success")) {
        alert("You got a Hit!");
        $(this).addClass("btn-danger");

        let didShipSink = isShipSunk($tiles3, $(this));

        if (didShipSink) {
          alert("You sunk a ship!");
        }

        decrementShips(myBoard2, $(this));
        isGameOver = checkForGameEnd(myBoard2, $tiles2[i]);

        if (isGameOver) {
          $("#player1OuterContainer").addClass("outer-container");
          $("#player2OuterContainer").addClass("outer-container");
          document.body.innerHTML = "<p>Game Over. Player 1 Won</p>";
        }

      } else {
        alert("You Missed.");
        $(this).addClass("btn-dark");
      }

      setTimeout(changeTurn, 2000, isGameOver);
    }
  }
});

/***** Enemy Board 2 *****/
let $tiles4 = $(".enemyBoard1 button");

let enemyBoard2 = [['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O'],
             ['O','O','O','O','O','O','O','O','O','O']];

$(".enemyBoard2 button").click(function() {
  let clickedId = $(this).attr("id");
  let isGameOver = false;

  for (let i = 0; i < $tiles.length; i++) {
    if ($tiles[i].id == clickedId) {
      if ($($tiles[i]).hasClass("btn-success")) {
        alert("You got a Hit!");
        $(this).addClass("btn-danger");

        decrementShips(myBoard1, $(this));
        isGameOver = checkForGameEnd(myBoard1, $(this));

        if (isGameOver) {
          $("#player1OuterContainer").addClass("outer-container");
          $("#player2OuterContainer").addClass("outer-container");
          document.body.innerHTML = "<p>Game Over. Player 2 Won</p>";
        }


      } else {
        alert("You Missed.");
        $(this).addClass("btn-dark");
      }

      setTimeout(changeTurn, 2000, isGameOver);
    }
  }
});
