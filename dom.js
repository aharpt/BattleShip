/* when the user fires at an opponent's ship */
const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

let checkLetter = (value) => {
  for (let i = 0; i < columns.length; i++) {
    if (value[0] === columns[i]) {
      return true;
    }
  }

  return false;
};

let checkNumber = (value) => {
  for (let i = 0; i < rows.length; i++) {
    if (value[1] === rows[i]) {
      return true;
    }
  }

  return false;
};

document.querySelector("#fire-box .btn").onclick = function() {
  let value = document.getElementById("playerGuess").value;
  let isValidLetter = checkLetter(value);
  let isValidNumber = checkNumber(value);

  if (value.length !== 2) {
    console.log("You must enter a string of exactly two characters that comprises a letter followed by a number (for example 'A1')");
  }
  else if (!isValidLetter) {
    console.log("You entered an invalid first character. Your first character must be a letter from A-J");
  }
  else if (!isValidNumber) {
    console.log("You entered an invalid second character. Your second character must be a number from 1-10");
  }
  else {
    console.log("You entered a valid shot");
    // Call fire/miss methods
  }


}

/* How to add a class to an element in JavaScript : https://stackoverflow.com/questions/507138/how-do-i-add-a-class-to-a-given-element */
// document.getElementById(value).classList.remove("btn-secondary");
// document.getElementById(value).classList.add("btn-success");
