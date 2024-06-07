var boxes = document.querySelectorAll(".button");
var resetbtn = document.querySelector(".reset-button");
var newbtn = document.querySelector(".new-button");
var winmsg = document.querySelector(".win-msg");
var msg = document.querySelector("#msg");


//to track which player is playing i.e. Player X or Player O;
var turnO = true;

// a 2d array to store all the winning pattern
const winpatterns = [[0, 1, 2],
                     [0, 3, 6],
                     [0, 4, 8],
                     [1, 4, 7],
                     [2, 4, 6],
                     [2, 5, 8],
                     [3, 4, 5],
                     [6, 7, 8]];


const resetGame = () => {
    turnO = true;
    enableBtn();
    winmsg.classList.add("hide");
}

// because an event needs to be triggered when a button is clicked,
//we need to add event listeners in all the buttons

boxes.forEach(box => {
    box.addEventListener("click", () => {
        //console.log("Box was clicked");         # this point can be use to trace error if any.

        if(turnO === true){        //this is for player O's turn, i.e, when turnO is true.
            box.innerHTML = "O";
            turnO = false;
        } else {                    //this is for player X's turn, i.e, when turnO is false.
            box.innerHTML = "X";
            turnO = true;
        }

        box.disabled = true;       // this is done because after a box/button has value(i.e either "X" or "O") it can't be changed or undone

        // function call to check the winner
        checkWinner();
    })
});

const checkWinner = () => {
    for(pattern of winpatterns){
        var pos1Val = boxes[pattern[0]].innerHTML;
        var pos2Val = boxes[pattern[1]].innerHTML;
        var pos3Val = boxes[pattern[2]].innerHTML;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {   //the winner can't be decided if any of the position is empty.
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log(pos1Val, "Winner");    // after the three position value matches, this will give the winner in the console.
                
                showWinner(pos1Val);
            }
        }
    }
};

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations! Winner is ${winner}.`;
    winmsg.classList.remove("hide");        //as soon as the winner is found the hide will be removed from the win-msg container
    // to display the winner

    disableBtn();   //after a player has been chosen as a winner all the the other btn's/boxes will be disabled.
}

const disableBtn = () => {
    for (var box of boxes) {
        box.disabled = true;
    }
}

const enableBtn = () => {
    for (var box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
