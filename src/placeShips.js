/* Make the modal not close clicking on outside of modal : Stack Overflow https://stackoverflow.com/questions/22207377/disable-click-outside-of-bootstrap-modal-area-to-close-modal#:~:text=On%20Options%20chapter%2C%20in%20the,will%20prevent%20closing%20the%20modal. */
$('.modal').modal({backdrop: "static", keyboard: false});
let numberOfShips = 0;


function changeURL() {
  window.location.href = "./player1.html";
}

if (location.pathname.split("BattleShip")[1] == "/placeShips.html") {

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
  }
}

export {numberOfShips};
