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
new Drawboard(canvas, grid);
let isPlayerOneTurn = true;
let isPickedUp = true;
let turnsPlayed = 0;
let playerOnePoints = [];
let playerTwoPoints = [];
let emptySpot = [];
let oldX;
let oldY;
const boundry = 20;
canvas.addEventListener("click", (ev) => {
    let mx = ev.offsetX;
    let my = ev.offsetY;
    let x, y;
    console.log(points);
    console.log(`Detect the correct position clicked ${detectPosostionClicked(points, mx, my, boundry)}`);
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
            if (isPickedUp) {
                // let {x,y}:any = clickCorrectPosition(playerOnePoints,mx,my)
                isPickedUp = pickedUpPiece(points, x, y);
                oldX = x;
                oldY = y;
            }
            else {
                let oldPoints = points;
                // let {x,y}:any = clickCorrectPosition(points,mx,my)
                console.log(isCorrectPositionToMoveTo(oldPoints, oldX, oldY, { x, y }));
                console.log("player One");
                console.log(playerOnePoints);
                console.log("free space");
                console.log(oldPoints);
                // add the selected value to the list
                // relocate(points,x,y,oldX,oldY)
            }
        }
    }
});
function relocate(emptyPositions, x, y, oldX, oldY, color) {
    if (x && y) {
        if (isCorrectPositionToMoveTo(emptyPositions, oldX, oldY, { x, y })) {
            new Player(x, y, "rgb(255,0,0,0.5)");
        }
        else {
            console.log("cannot create cricle");
        }
    }
    else {
        console.log("cannot move to that posistion");
    }
}
function pickedUpPiece(emptyPositions, x, y) {
    // check if you can pick your piece to be removed then added the position to the empty position
    if (x && y) {
        oldX = x;
        oldY = y;
        new Player(x, y, "").cleartShape();
        // emptyPositions.push({x:oldX,y:oldY})
        return false;
    }
    else {
        console.log("cannot pick up peice that is not yours");
        return true;
    }
}
function isCorrectPositionToMoveTo(e, mx, my, { x, y }) {
    let isMove = false;
    console.log(`Moved to X-${x} and Y-${y}`);
    console.log(`Picked up X-${mx} and Y-${my}`);
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
    return isMove;
}
