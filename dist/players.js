"use strict";
class Player {
    ;
    constructor(x, y, color) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = 20;
        this.y = 20;
        this.raduis = 15;
        this.x = x;
        this.y = y;
        this.color = color;
        this.draw();
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.raduis, 0, Math.PI * 2, true);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    cleartShape() {
        this.ctx.clearRect(this.x - this.raduis, this.y - this.raduis, 40, 40);
    }
}
let isPlayerOneTurn = true;
let turnsPlayed = 0;
let playerOnePoints = [];
let playerTwoPoints = [];
let isPickedUp = true;
let oldValue;
const boundry = 30;
canvas.addEventListener("click", (ev) => {
    let mx = ev.offsetX;
    let my = ev.offsetY;
    let x, y;
    if (turnsPlayed < 6) {
        if (isPlayerOneTurn) {
            playersTurn(points, { x, y }, { mx, my }, false, playerOnePoints, "rgb(255,0,0,0.5)", "one");
        }
        else {
            playersTurn(points, { x, y }, { mx, my }, true, playerTwoPoints, "rgb(0,0,255,0.5)", "two");
        }
    }
    else {
        if (isPlayerOneTurn) {
            playerTurns("1");
            // first select a peice to remove on the board
            if (isPickedUp) {
                playTurnTwo(playerOnePoints, points, { mx, my });
            }
            else {
                isPlayerOneTurn = playerTurnThree(points, playerOnePoints, { mx, my }, true, "rgb(255,0,0,0.5)", "one");
                if (!isPlayerOneTurn) {
                    isPickedUp = true;
                    playerTurns("2");
                }
            }
        }
        else {
            if (isPickedUp) {
                playTurnTwo(playerTwoPoints, points, { mx, my });
            }
            else {
                // console.log(oldValue)
                isPlayerOneTurn = playerTurnThree(points, playerTwoPoints, { mx, my }, false, "rgb(0,0,255,0.5)", "two");
                if (isPlayerOneTurn) {
                    isPickedUp = true;
                    playerTurns("1");
                }
            }
        }
    }
});
new Drawboard(canvas, grid);
