/* when the user fires at an opponent's ship */
const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

document.querySelector("#fire-box .btn").onclick = function() {
  let value = document.getElementById("playerGuess").value;

  console.log(value);
}
