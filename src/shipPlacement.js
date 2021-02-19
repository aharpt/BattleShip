/* change dom */
$("#placePlayer1ShipsButton").click(function() {
  alert("Player 2's Turn")
  console.log("Hello World");
  $("#player1OuterContainer").toggleClass("outer-container");
  $("#player2OuterContainer").toggleClass("outer-container");
});

$("#placePlayer2ShipsButton").click(function() {
  alert("Player 1's Turn");
  $("#player1OuterContainer").toggleClass("outer-container");
  $("#player2OuterContainer").toggleClass("outer-container");
});


// get all board tiles from my board
let $tiles = $("#myBoard button");

// orientation of ship placement
let orientation = "neither";

//will later store 2D arrays of the coordiantes for the players ships.
//The arrays are filled with the returnIdsOfShip function. The largest ships are stored at the beginning of the array and the 1x1 ship is stored in the end.
let player1Ships = [];
let player2Ships = [];

// player1 myBoard
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

/*
  1. shipIdLetters and shipIdNumbers hold a list of their respective values.
   You can access an entire id by accessing the same index in both arrays.
   For instance, shipIdLetters[0] + shipIdNumbers[0] will give entire id of 0th element
  2. shipIds is a 2d array.  shipIds[0] holds shipIdLetters array, shipIds[1] holds shipIdNumbers

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


$("#myBoard button").click(function() {
  // disable all buttons
  $("#myBoard button").attr("disabled", "true");

  // remove disabled attribute from button clicked
  $(this).removeAttr("disabled");

  // remove class btn-secondary and add class btn-success
  $(this).removeClass("btn-secondary").addClass("btn-success");

  // get id of button clicked
  let clickedId = $(this).attr("id");
  console.log(clickedId);

  /* Row Code */

  // get id of button one row down
  let rowDownNumber;
  rowDownNumber = parseInt(clickedId[1]) + 1;

  if (clickedId[2] !== undefined) {
    rowDownNumber = parseInt((clickedId[1] + "" + clickedId[2])) + 1;
  }

  let rowDownID = clickedId[0] + "" + rowDownNumber;
  // console.log("rowDownID: " + rowDownID);

  // get id of button one row up
  let rowUpNumber;
  rowUpNumber = parseInt(clickedId[1]) - 1;

  if (clickedId[2] !== undefined) {
    rowUpNumber = parseInt((clickedId[1] + "" + clickedId[2])) - 1;
  }

  let rowUpID = clickedId[0] + "" + rowUpNumber;
  // console.log("rowUpID: " + rowUpID);

  // remove disabled attribute from button one row adjacent
  for (let i = 0; i < $tiles.length; i++) {
    if (($tiles[i].id === rowDownID || $tiles[i].id === rowUpID) && orientation !== "horizontal") {
      $tiles[i].disabled = false;
    }
  }

/* Column Code */


  // get id of button one column down
  let columnDownLetter = clickedId[0].charCodeAt(0);
  columnDownLetter += 1;

  // get back to new letter
  let newLetter1 = String.fromCharCode(columnDownLetter);
  let columnDownID;
  columnDownID = newLetter1 + "" + clickedId[1];

  if (clickedId[2] !== undefined) {
    columnDownID = columnDownID + "" + clickedId[2];
  }


  // get id of button one column up
  let columnUpLetter = clickedId[0].charCodeAt(0);
  columnUpLetter -= 1;

  // get back to new letter
  let newLetter2 = String.fromCharCode(columnUpLetter);
  let columnUpID;
  columnUpID = newLetter2 + "" + clickedId[1];

  if (clickedId[2] !== undefined) {
    columnUpID = columnUpID + "" + clickedId[2];
  }


  // remove disabled attribute from button one column adjacent
  for (let i = 0; i < $tiles.length; i++) {
    if (($tiles[i].id === columnDownID || $tiles[i].id === columnUpID) && orientation !== "vertical") {
      $tiles[i].disabled = false;
    }
  }
});

/* When Ship is Placed */

let doneWithPlacingShip = function() {
  for (let i = 0; i < $tiles.length; i++) {
    if ($($tiles[i]).hasClass("btn-success")) {
      $tiles[i].disabled = true;
    }
  }
};

/* Take Care of ship length */
// Figure out same number of Ships

$("#myBoard button").click(function() {
let numOfShipTiles = 0;
for (let i = 0; i < $tiles.length; i++) {
  if ($($tiles[i]).hasClass("btn-success")) {
    numOfShipTiles++;
  }
}

switch (numOfShipTiles) {
  case 1:
    alert("First Ship Placed");
    $("#myBoard button").removeAttr("disabled");
        if (location.pathname.split("BattleShip")[1] == "/player1.html")
            //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
        {
            player1Ships = returnIdsOfShip();
        }
        else
        {
            player2Ships = returnIdsOfShip();
        }
    doneWithPlacingShip();
    break;

  case 3:
      alert("Second Ship Placed");
      $("#myBoard button").removeAttr("disabled");
      //returnIdsOfShip();
          if (location.pathname.split("BattleShip")[1] == "/player1.html")
              //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
          {
              player1Ships = returnIdsOfShip();
          }
          else
          {
              player2Ships = returnIdsOfShip();
          }
      doneWithPlacingShip();
      orientation = prompt("Do you want your next ship to be horizontal or vertical?");
    break;

  case 6:
    alert("Third Ship Placed");
    $("#myBoard button").removeAttr("disabled");
    //returnIdsOfShip();
        if (location.pathname.split("BattleShip")[1] == "/player1.html")
            //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
        {
            player1Ships = returnIdsOfShip();
        }
        else
        {
            player2Ships = returnIdsOfShip();
        }
    doneWithPlacingShip();
    orientation = prompt("Do you want your next ship to be horizontal or vertical?");
    break;

  case 10:
    alert("Fourth Ship Placed");
    $("#myBoard button").removeAttr("disabled");
    //returnIdsOfShip();
        if (location.pathname.split("BattleShip")[1] == "/player1.html")
            //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
        {
            player1Ships = returnIdsOfShip();
        }
        else
        {
            player2Ships = returnIdsOfShip();
        }
    doneWithPlacingShip();
    orientation = prompt("Do you want your next ship to be horizontal or vertical?");
    break;

  case 15:
    alert("Fifth Ship Placed");
    $("#myBoard button").removeAttr("disabled");
    //returnIdsOfShip();
        if (location.pathname.split("BattleShip")[1] == "/player1.html")
            //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
        {
            player1Ships = returnIdsOfShip();
        }
        else
        {
            player2Ships = returnIdsOfShip();
        }
    doneWithPlacingShip();
    orientation = prompt("Do you want your next ship to be horizontal or vertical?");
    break;

  case 21:
    alert("Sixth Ship Placed");
    $("#myBoard button").removeAttr("disabled");
    //returnIdsOfShip();
    if (location.pathname.split("BattleShip")[1] == "/player1.html")
        //when it is player 1s turn the ships are stored for that player otherwise the ships are stored under player 2
    {
        player1Ships = returnIdsOfShip();
    }
    else
    {
        player2Ships = returnIdsOfShip();
    }
    doneWithPlacingShip();
    break;

  default:
    break;
}

});

/* Code For 'Done Placing Ships' button */

function changeLocation(url) {
  window.location.href = url;
}

/* change to #placePlayer1ShipsButton, placePlayer2ShipsButton */
// $(".btn-outline-success").click(function() {
// let successLength = 0;
//
//   for (let i = 0; i < $tiles.length; i++) {
//     if ($($tiles[i]).hasClass("btn-success")) {
//       successLength++;
//     }
//   }
//
//   if (successLength === 0) {
//     alert("Please place at least one ship");
//   } else {
//     if (location.pathname.split("BattleShip")[1] == "/player1.html") {
//       alert("Player 2's turn");
//       setTimeout(changeLocation, 1000, "./player2.html");
//     } else if (location.pathname.split("BattleShip")[1] == "/player2.html") {
//       alert("Player 1's turn");
//       for (let i = 0; i < $tiles.length; i++) {
//         $tiles[i].disabled = true;
//       }
//       setTimeout(changeLocation, 1000, "./player1.html");
//     }
//   }
//
//
// });
