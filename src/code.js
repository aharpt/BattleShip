// get all board tiles from my board
let $tiles = $("#myBoard button");

$("#myBoard button").click(function() {
  // disable all buttons
  $("#myBoard button").attr("disabled", "true");

  // remove disabled attribute from button clicked
  $(this).removeAttr("disabled");

  // remove class btn-secondary and add class btn-success
  $(this).removeClass("btn-secondary").addClass("btn-success");

  // get id of button clicked
  let clickedId = $(this).attr("id");
  // console.log(clickedId);

  /* Row Code */

  // get id of button one row down
  let rowDownNumber = parseInt(clickedId[1]) + 1;
  let rowDownID = clickedId[0] + "" + rowDownNumber;
  // console.log("rowDownID: " + rowDownID);

  // get id of button one row up
  let rowUpNumber = parseInt(clickedId[1]) - 1;
  // console.log("rowUpNumber: " + rowUpNumber);
  let rowUpID = clickedId[0] + "" + rowUpNumber;
  // console.log("rowUpID: " + rowUpID);

  // remove disabled attribute from button one row down
  for (let i = 0; i < $tiles.length; i++) {
    if ($tiles[i].id === rowDownID || $tiles[i].id === rowUpID) {
      $tiles[i].disabled = false;
    }
  }

/* Column Code */


  // get id of button one column down
  let columnDownLetter = clickedId[0].charCodeAt(0);
  columnDownLetter += 1;

  // get back to new letter
  let newLetter1 = String.fromCharCode(columnDownLetter);
  let columnDownID = newLetter1 + "" + clickedId[1];
  // console.log("adjacentColumnID: " + adjacentColumnID);


  // get id of button one column up
  let columnUpLetter = clickedId[0].charCodeAt(0);
  columnUpLetter -= 1;

  // get back to new letter
  let newLetter2 = String.fromCharCode(columnUpLetter);
  let columnUpID = newLetter2 + "" + clickedId[1];


  // remove disabled attribute from button one column down
  for (let i = 0; i < $tiles.length; i++) {
    if ($tiles[i].id === columnDownID || $tiles[i].id === columnUpID) {
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
// first ship must be length one
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
    doneWithPlacingShip();
    break;

  case 3:
    alert("Second Ship Placed");
    $("#myBoard button").removeAttr("disabled");
    doneWithPlacingShip();
    break;

  case 6:
    alert("Third Ship Placed");
    $("#myBoard button").removeAttr("disabled");
    doneWithPlacingShip();
    break;

  case 10:
    alert("Fourth Ship Placed");
    $("#myBoard button").removeAttr("disabled");
    doneWithPlacingShip();
    break;

  case 15:
    alert("Fifth Ship Placed");
    $("#myBoard button").removeAttr("disabled");
    doneWithPlacingShip();
    break;

  case 21:
    alert("Sixth Ship Placed");
    $("#myBoard button").removeAttr("disabled");
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

$(".btn-outline-success").click(function() {
let successLength = 0;

  for (let i = 0; i < $tiles.length; i++) {
    if ($($tiles[i]).hasClass("btn-success")) {
      successLength++;
    }
  }

  if (successLength === 0) {
    alert("Please place atleast one ship");
  } else {
    if (location.pathname.split("BattleShip")[1] == "/player1.html") {
      alert("Player 2's turn");
      setTimeout(changeLocation, 1000, "./player2.html");
    } else if (location.pathname.split("BattleShip")[1] == "/player2.html") {
      alert("Player 1's turn");
      setTimeout(changeLocation, 1000, "./player1.html");
    }
  }



});
