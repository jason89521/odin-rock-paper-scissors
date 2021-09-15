# How to start the game

## `let intervalId = setInterval(changeClass, 250);`
The `changeClass` method randomly change the class of computer's shape.
I use setInterval, to periodically change the class randomly.

## `addEventListenerToShapeIcons();`
This method add click event listener to each shape icon whitch user can
click on. The callback of event listener will play a round, display the result of the round and which selection the computer select, and determine which one is winner.