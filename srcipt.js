/**
 * 3 shapes
 */
let shapes = ['rock', 'paper', 'scissors'];
/**
 * Return what computer select.
 * @returns {string} Rock, Paper or scissors
 */
function getComputerSelection(){
    let idx = Math.floor(Math.random() * 3);
    console.log(shapes[idx]);
    return shapes[idx];
}

/**
 * Turning a shape to a number that is the shape's index in array 'shapes'.
 * @param {string} shape 
 * @returns {number} The shape's number in array 'shapes'
 */
function mapShapeToNumber(shape){
    shape = shape.toLocaleLowerCase();
    for(let i = 0; shapes.length; i++){
        if(shape === shapes[i])
            return i;
    }

    // Error occurs when the shape is not in the array 'shapes'.
    return NaN;
}

/**
 * Play a single game, then return the result.
 * @param {string} playerSelection 
 * @param {string} computerSelection 
 * @returns The result of the game.
 */
function singleRound(playerSelection, computerSelection){
    let playerNumber = mapShapeToNumber(playerSelection);
    let computerNumber = mapShapeToNumber(computerSelection);
    let difference = playerNumber - computerNumber;

    if(difference === 0){
        return 'Tie.';
    }else if(difference === -1 || difference === 2){
        return 'Lose...';
    }else{
        return 'Win!';
    }
}

function game(rounds = 5){
    for(let i = 0; i < rounds; i++){
        let playerSelection = window.prompt("Type your selection.");
        console.log(singleRound(playerSelection, getComputerSelection()));
    }
}

const playerSelection = 'RocK';
console.log(singleRound(playerSelection, getComputerSelection()));
game();