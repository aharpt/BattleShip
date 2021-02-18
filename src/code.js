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

  // get id of button one row down
  let adjacentNumber = parseInt(clickedId[1]) + 1;
  let adjacentRowID = clickedId[0] + "" + adjacentNumber;
  console.log(adjacentRowID)

  // remove disabled attribute from button one row down
  let $tiles = $("#myBoard button");
  for (let i = 0; i < $tiles.length; i++) {
    if ($tiles[i].id === adjacentRowID) {
      $tiles[i].disabled = false;
      break;
    }
  }

  // get id of button one column down
  let adjacentLetter = clickedId[0].charCodeAt(0);
  adjacentLetter += 1;
  
  // get back to new letter
  let newLetter = String.fromCharCode(adjacentLetter);
  let adjacentColumnID = newLetter + "" + clickedId[1];

  // remove disabled attribute from button one column down
  for (let i = 0; i < $tiles.length; i++) {
    if ($tiles[i].id === adjacentColumnID) {
      $tiles[i].disabled = false;
      break;
    }
  }
});
