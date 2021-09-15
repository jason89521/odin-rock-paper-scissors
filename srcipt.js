let shapes = ['rock', 'paper', 'scissors'];

let classPrefix = 'fa-hand-';
let intervalId = setInterval(changeClass, 250);
let gameoverScore = 3;

let resultDiv = document.querySelector('.result');
let shapeIcons = document.querySelectorAll('.selections > i');
let panel = document.querySelector('.panel');
let msg = document.querySelector('.msg');
let restartBtn = document.querySelector('.panel > button');

let scores = [0, 0]; // 0 for player, 1 for computer.
let scoresDisplay = []; // DOM that displays scores.
scoresDisplay.push(document.querySelector('.player-score'));
scoresDisplay.push(document.querySelector('.computer-score'));
let lock = false; // If true, then player cannot do anything.

addEventListenerToShapeIcons();
restartBtn.addEventListener('click', restartGame);
panel.style.display = 'none';

function restartGame(){
    panel.style.display = 'none';
    lock = false;
    intervalId = setInterval(changeClass, 250);
}

function setScore(idx, newScore) {
    scores[idx] = newScore;
    scoresDisplay[idx].textContent = newScore;
}
/**
 * Add click event to each shape icon.
 */
function addEventListenerToShapeIcons() {
    shapeIcons.forEach((shapeIcon) => {
        shapeIcon.addEventListener("click", function (event) {
            if (lock) return;

            // Play a round, then display the result to user.
            let playerSelection = event.target.getAttribute('data-shape');
            let computerSelection = getComputerSelection();
            computerSelection = 'rock';
            let result = playSingleRound(playerSelection, computerSelection);
            resultDiv.textContent = result;

            // Display which selection the computer select.
            let computerSelectionIcon = document.querySelector('body > i');
            removeLastClass(computerSelectionIcon);
            computerSelectionIcon.classList.add(classPrefix + computerSelection);

            // Set lock true to prevent user do anything.
            lock = true;

            // If user win, play's score plus one, else computer's score plus one.
            if (result === 'Win!') setScore(0, scores[0] + 1);
            else if (result === 'Lose...') setScore(1, scores[1] + 1);

            clearInterval(intervalId);
            determineWinner();

        });
    });
}

// If there is a winner, finish the gane.Otherwise, continue.
function determineWinner(){
    if (scores[0] === gameoverScore || scores[1] === gameoverScore) {
        if (scores[0] === gameoverScore) {
            msg.textContent = 'You win this game!';
        }
        else {
            msg.textContent = 'You lose this game!';
        }
        setScore(0, 0);
        setScore(1, 0);
        panel.style.display = '';
    } else {
        // Stop the interval that change the display of computer's selection.
        // When time's up, register the interval again, and release the lock.
        setTimeout(() => {
            intervalId = setInterval(changeClass, 250);
            lock = false;
        }, 1000);
    }
}

/**
 * Return what computer select.
 * @returns {string} Rock, Paper or scissors
 */
function getComputerSelection() {
    let idx = Math.floor(Math.random() * 3);
    return shapes[idx];
}

/**
 * Turning a shape to a number that is the shape's index in array 'shapes'.
 * @param {string} shape 
 * @returns {number} The shape's number in array 'shapes'
 */
function mapShapeToNumber(shape) {
    shape = shape.toLocaleLowerCase();
    for (let i = 0; shapes.length; i++) {
        if (shape === shapes[i])
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
function playSingleRound(playerSelection, computerSelection) {
    let playerNumber = mapShapeToNumber(playerSelection);
    let computerNumber = mapShapeToNumber(computerSelection);
    let difference = playerNumber - computerNumber;

    if (difference === 0) {
        return 'Tie.';
    } else if (difference === -1 || difference === 2) {
        return 'Lose...';
    } else {
        return 'Win!';
    }
}

/**
 * 
 * @param {Element} element 
 */
function removeLastClass(element) {
    let classList = element.classList;
    let toBeRemoved = classList.item(classList.length - 1);
    classList.remove(toBeRemoved);
}

function changeClass() {
    let classList = document.querySelector('body > i').classList;
    let toBeRemoved = classList.item(classList.length - 1);

    let randomIdx = Math.floor(Math.random() * 3);
    let newClass = classPrefix + shapes[randomIdx];
    if (toBeRemoved === newClass) {
        changeClass();
        return;
    }

    classList.remove(toBeRemoved);
    classList.add(newClass);
}

