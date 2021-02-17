(function () {
  'use strict';

  $('.modal').modal();

  let numberOfShips;

  function changeURL() {
    window.location.href = "./player1.html";
  }

  document.getElementById("placeShips").onclick = function() {
    numberOfShips = document.getElementById("numberOfShips").value;

    if (numberOfShips > 0 && numberOfShips < 7) {
      $(".modal").modal("hide");
      // call placeShips() method

      // after placeShips()

      changeURL();
    }
    else if (document.getElementById("modalBody").lastChild !== document.querySelector(".modalError")) {
      let p = document.createElement("p");
      p.innerText = "Please give an integer between 1 and 6 (inclusive).";
      p.classList.add("modalError");

      document.getElementById("modalBody").append(p);
    }
  };

}());
