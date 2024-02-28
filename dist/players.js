"use strict";
class Player {
    ;
    constructor(x, y, color) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = 20;
        this.y = 20;
        this.raduis = 20;
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
const points = [
    { x: 20, y: 20 },
    { x: 20, y: 160 },
    { x: 20, y: 300 },
    { x: 160, y: 20 },
    { x: 160, y: 160 },
    { x: 160, y: 300 },
    { x: 300, y: 20 },
    { x: 300, y: 160 },
    { x: 300, y: 300 },
];
function detectPosostionClicked(points, mx, my, boundry) {
    let isWithinTheBoundry = false;
    points.map((point, idx) => {
        if ((point.x + boundry > mx && point.x - boundry < mx) && (point.y + boundry > my && point.y - boundry < my)) {
            // remove that value from the overralll list
            isWithinTheBoundry = true;
        }
    });
    return isWithinTheBoundry;
}
function playersTurn(points, { x, y }, { mx, my }, playerOne, playerList, color) {
    if (detectPosostionClicked(points, mx, my, boundry)) {
        points.map((point, idx) => {
            if ((point.x + boundry > mx && point.x - boundry < mx) && (point.y + boundry > my && point.y - boundry < my)) {
                // remove that value from the overralll list
                points.splice(idx, 1);
                x = point.x;
                y = point.y;
            }
        });
        new Player(x, y, color);
        playerList.push({ x, y });
        // decrease list
        isPlayerOneTurn = playerOne;
        turnsPlayed += 1;
    }
    else {
        console.log("Invalid Posion has to be closer to the point");
    }
}
function playTurnTwo(playerPoints, { mx, my }) {
    if (detectPosostionClicked(playerPoints, mx, my, boundry)) {
        playerPoints.filter((point, idx) => {
            if ((point.x + boundry > mx && point.x - boundry < mx) && (point.y + boundry > my && point.y - boundry < my)) {
                new Player(point.x, point.y, "").cleartShape();
                oldValue = playerPoints.splice(idx, 1)[0];
                new Drawboard(canvas, grid);
            }
        });
        isPickedUp = false;
    }
    else {
        console.log("cannot pick up peice that is not yours");
    }
}
function playerTurnThree(points, playerPoints, { mx, my }, isPlayerOneTurn, color) {
    let isPlayerOne = isPlayerOneTurn;
    points.filter((point, idx) => {
        if ((point.x + boundry > mx && point.x - boundry < mx) && (point.y + boundry > my && point.y - boundry < my)) {
            if (isCorrectPositionToMoveTo(points, playerPoints, oldValue.x, oldValue.y, point)) {
                new Player(point.x, point.y, color);
                points.splice(idx, 1);
                isPlayerOne = !isPlayerOneTurn;
            }
        }
    });
    return isPlayerOne;
}
let isPlayerOneTurn = true;
let turnsPlayed = 0;
let playerOnePoints = [];
let playerTwoPoints = [];
let isPickedUp = true;
let oldValue;
const boundry = 20;
canvas.addEventListener("click", (ev) => {
    let mx = ev.offsetX;
    let my = ev.offsetY;
    let x, y;
    if (turnsPlayed < 6) {
        if (isPlayerOneTurn) {
            playersTurn(points, { x, y }, { mx, my }, false, playerOnePoints, "rgb(255,0,0,0.5)");
        }
        else {
            playersTurn(points, { x, y }, { mx, my }, true, playerTwoPoints, "rgb(0,0,255,0.5)");
        }
    }
    else {
        if (isPlayerOneTurn) {
            // first select a peice to remove on the board
            console.log("Player One List");
            console.log(playerOnePoints);
            if (isPickedUp) {
                playTurnTwo(playerOnePoints, { mx, my });
            }
            else {
                console.log(oldValue);
                isPlayerOneTurn = playerTurnThree(points, playerOnePoints, { mx, my }, true, "rgb(255,0,0,0.5)");
                if (!isPlayerOneTurn) {
                    isPickedUp = true;
                }
            }
        }
        else {
            // console.log(playerTwoPoints)
            if (isPickedUp) {
                console.log("Player Two List");
                console.log(playerOnePoints);
                playTurnTwo(playerTwoPoints, { mx, my });
            }
            else {
                console.log(oldValue);
                isPlayerOneTurn = playerTurnThree(points, playerTwoPoints, { mx, my }, false, "rgb(0,0,255,0.5)");
                if (isPlayerOneTurn) {
                    isPickedUp = true;
                }
            }
        }
        console.log("Free space");
        console.log(points);
    }
});
function isCorrectPositionToMoveTo(e, playerPoints, mx, my, { x, y }) {
    let isMove = false;
    // console.log(`Moved to X-${x} and Y-${y}`)
    // console.log(`Picked up X-${mx} and Y-${my}`)
    if ((mx === 20 && my === 20) && e.some((item) => (item.x === x && item.y === y) && ((x === 20 && y === 160) || (x === 160 && y === 160) || (x === 160 && y === 20)))) {
        isMove = true;
    }
    else if ((mx === 20 && my === 160) && e.some((item) => (item.x === x && item.y === y) && ((x === 20 && y === 20) || (x === 160 && y === 160) || (x === 20 && y === 300)))) {
        isMove = true;
    }
    else if ((mx === 20 && my === 300) && e.some((item) => (item.x === x && item.y === y) && ((x === 20 && y === 160) || (x === 160 && y === 160) || (x === 1600 && y === 300)))) {
        isMove = true;
    }
    else if ((mx === 160 && my === 20) && e.some((item) => (item.x === x && item.y === y) && ((x === 20 && y === 20) || (x === 160 && y === 160) || (x === 300 && y === 20)))) {
        isMove = true;
    }
    else if ((mx === 160 && my === 300) && e.some((item) => (item.x === x && item.y === y) && ((x === 300 && y === 300) || (x === 160 && y === 160) || (x === 20 && y === 300)))) {
        isMove = true;
    }
    else if ((mx === 300 && my === 20) && e.some((item) => (item.x === x && item.y === y) && ((x === 160 && y === 20) || (x === 160 && y === 160) || (x === 300 && y === 160)))) {
        isMove = true;
    }
    else if ((mx === 300 && my === 160) && e.some((item) => (item.x === x && item.y === y) && ((x === 300 && y === 20) || (x === 160 && y === 160) || (x === 300 && y === 300)))) {
        isMove = true;
    }
    else if ((mx === 300 && my === 300) && e.some((item) => (item.x === x && item.y === y) && ((x === 160 && y === 300) || (x === 160 && y === 160) || (x === 300 && y === 160)))) {
        isMove = true;
    }
    else if ((mx === 160 && my === 160) && e.some(item => item.x === x && item.y === y)) {
        isMove = true;
    }
    if (isMove) {
        e.push({ x: mx, y: my });
        playerPoints.push({ x, y });
    }
    return isMove;
}
new Drawboard(canvas, grid);
