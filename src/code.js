// get all board tiles from my board
let $tiles = $(".myBoard1 button");

// orientation of ship placement
let orientation = "neither";

//will later store 2D arrays of the coordiantes for the players ships.
//The arrays are filled with the returnIdsOfShip function. The largest ships are stored at the beginning of the array and the 1x1 ship is stored in the end.
let player1Ships = [];
let player2Ships = [];
//Sound Effects
function shipHitS()
{
  let sound = new Audio('Sound Effects/explosion.mp3');
  sound.play();
}
function shipMissS()
{
  let sound = new Audio('Sound Effects/WaterSploosh.mp3');
  sound.play();
}
function backgroudS()
{
  let sound = new Audio('Sound Effects/BackgroundMusic.mp3');
  sound.play();
}
/**
 * @description 1. shipIdLetters and shipIdNumbers hold a list of their respective values.
   You can access an entire id by accessing the same index in both arrays.
   For instance, shipIdLetters[0] + shipIdNumbers[0] will give entire id of 0th element
  2. shipIds is a 2d array.  shipIds[0] holds shipIdLetters array, shipIds[1] holds shipIdNumbers
 * @returns 2d array shipIds that holds ship coordinates that have a ship placed on them
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
/**
 * @event click event callback function for Player 1's ship placement
 */
$(".myBoard1 button").click(function() {

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
 * @description Function to call when Ship is Placed
 * @param {array} $board A jQuery representation of all DOM elements that match a particular selector
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
          else
          {
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
/**
 * @event click for when Player 1's 'Done Placing Ships' button is clicked
 */
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

/**
 * @event click event callback function for  Player 2's ship placment
 */
$(".myBoard2 button").click(function() {
    /* DOM Manipulation */
    $(".myBoard2 button").attr("disabled", "true");
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

    myBoard2[boardToChange[0]][boardToChange[1]] = "S";

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
/**
 * @description Logic for when a board tile on player 2's ship placement board is clicked
 * @param {array} $board A jQuery representation of all DOM elements that match a particular selector
 * @param {array} myBoardBtns A jQuery representation of all DOM elements that match a particular selector
 * @returns true if all six ships are placed, false otherwise
 */
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

      if (numberOfShipsPlaced === 1) {
        $("#done2Btn").trigger("click");
        $(".myBoard2 button").attr("disabled", "true");
        return false;
      }
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
/**
 * @event click for when Player 2's 'Done Placing Ships' button is clicked
 */
$("#done2Btn").click(function() {
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
    if (successLength !== 0) {
    for (let i = 0; i < $tiles2.length; i++) {
      $tiles2[i].disabled = true;
      $tiles3[i].disabled = false;
      $tiles4[i].disabled = false;
    }
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


/**
 * @description Changes the turn to the next player as long as the current turn did not result in the game ending
 * @param {boolean} gameOver A parameter that evaluates to true if the game is over, false otherwise
 */
function changeTurn(gameOver) {
  if (!gameOver) {
    alert("Opponent's Turn");
    $("#player1OuterContainer").toggleClass("outer-container");
    $("#player2OuterContainer").toggleClass("outer-container");
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
 * @description Takes in a player board and the tile clicked, and checks if the game is over
 * @param {array} board An array of a player board
 * @param {object} _this A reference to the board tile clicked
 * @returns true if game is over, false otherwise
 */
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

/**
 * @event click for when Player 1 shoots at Player 2's ships
 */
$(".enemyBoard1 button").click(function() {
  let clickedId = $(this).attr("id");
  let isGameOver = false;

  for (let i = 0; i < $tiles2.length; i++) {
    if ($tiles2[i].id == clickedId) {
      if ($($tiles2[i]).hasClass("btn-success")) {
        shipHitS();
        alert("You got a Hit!");
        $(this).addClass("btn-danger");
        decrementShips(myBoard2, $(this));

        isGameOver = checkForGameEnd(myBoard2, $tiles2[i]);

        if (isGameOver) {
          $("#player1OuterContainer").addClass("outer-container");
          $("#player2OuterContainer").addClass("outer-container");
          document.body.innerHTML = "<h2 id='playerWon' class='lead'>Game Over, Player 1 Won!</h2>";
        }

      } else {
        shipMissS();
        alert("You Missed.");
        $(this).addClass("btn-dark");
      }

      setTimeout(changeTurn, 2, isGameOver);
    }
  }
});

/***** Enemy Board 2 *****/
let $tiles4 = $(".enemyBoard2 button");

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

$("#done2Btn").hide();
for (let i = 0; i < $tiles.length; i++) {
  $tiles3[i].disabled = true;
  $tiles4[i].disabled = true;
}
/**
 * @event click for when Player 2 shoots at Player 1's ships
 */
$(".enemyBoard2 button").click(function() {
  let clickedId = $(this).attr("id");
  let isGameOver = false;

  for (let i = 0; i < $tiles.length; i++) {
    if ($tiles[i].id == clickedId) {
      if ($($tiles[i]).hasClass("btn-success")) {
        shipHitS();
        alert("You got a Hit!");
        $(this).addClass("btn-danger");
        decrementShips(myBoard1, $(this));
        isGameOver = checkForGameEnd(myBoard1, $(this));

        if (isGameOver) {
          $("#player1OuterContainer").addClass("outer-container");
          $("#player2OuterContainer").addClass("outer-container");
          document.body.innerHTML = "<h2 id='playerWon' class='lead'>Game Over, Player 2 Won!</h2>";
        }


      } else {
        shipMissS();
        alert("You Missed.");
        $(this).addClass("btn-dark");
      }

      setTimeout(changeTurn, 2, isGameOver);
    }
  }
});
