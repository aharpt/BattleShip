
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
function gameTest() {
    yMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    xMoves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (gamePlay(testBoard, xMoves[i], yMoves[j]) == "Hit") {
                console.log("Hit: (" + xMoves[i] + ", " + yMoves[j] + ")");
            }
            if (gamePlay(testBoard, xMoves[i], yMoves[j]) == "Sink") {
                console.log("Sink: (" + xMoves[i] + ", " + yMoves[j] + ")");
            }
        }
    }
}

gameTest();
