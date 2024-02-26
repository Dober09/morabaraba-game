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
function clickCorrectPosition(points, mx, my) {
    //returns value if the selected point is within the boundry in the list given 
    const boundry = 20;
    let position = { x: null, y: null };
    points.map((point, idx) => {
        if ((point.x + boundry > mx && point.x - boundry < mx) && (point.y + boundry > my && point.y - boundry < my)) {
            // remove that value from the overralll list
            points.splice(idx, 1);
            position = point;
        }
    });
    return position;
}
function placeGamePeices(isPlayerOneTurn, { x, y }) {
    if (isPlayerOneTurn) {
        if (x && y) {
            new Player(x, y, "red");
            playerOnePoints.push({ x, y });
            isPlayerOneTurn = false;
        }
        else {
            console.log("Invalid Posion has to be closer to the point");
        }
    }
    else {
        if (x && y) {
            new Player(x, y, "blue");
            playerTwoPoints.push({ x, y });
            isPlayerOneTurn = true;
        }
        else {
            console.log("Invalid Posion has to be closer to the point");
        }
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
canvas.addEventListener("click", (ev) => {
    let mx = ev.offsetX;
    let my = ev.offsetY;
    if (turnsPlayed < 6) {
        let { x, y } = clickCorrectPosition(points, mx, my);
        if (isPlayerOneTurn) {
            if (x && y) {
                new Player(x, y, "red");
                playerOnePoints.push({ x, y });
                // decrease list
                isPlayerOneTurn = false;
                turnsPlayed += 1;
            }
            else {
                console.log("Invalid Posion has to be closer to the point");
            }
        }
        else {
            if (x && y) {
                new Player(x, y, "blue");
                playerTwoPoints.push({ x, y });
                isPlayerOneTurn = true;
                turnsPlayed += 1;
            }
            else {
                console.log("Invalid Posion has to be closer to the point");
            }
        }
    }
    else {
        if (isPlayerOneTurn) {
            playOn(isPickedUp, playerOnePoints, mx, my, oldX, oldY);
        }
    }
});
function playOn(isPickedUp, playerPositions, mx, my, oldX, oldY) {
    // first select a peice to remove on the board
    if (isPickedUp) {
        let { x, y } = clickCorrectPosition(playerPositions, mx, my);
        if (x && y) {
            oldX = x;
            oldY = y;
            new Player(x, y, "red").cleartShape();
            isPickedUp = false;
        }
        else {
            console.log("cannot pick up peice that is not yours");
        }
    }
    else {
        let { x, y } = clickCorrectPosition(points, mx, my);
        // selecte the position  to move to
        points.push({ x: x, y: y });
        console.log(points);
        if (x && y) {
            if (isOkToMove(points, oldX, oldY, { x, y })) {
                new Player(x, y, "red");
                //    isPlayerOneTurn = false
            }
            else {
                console.log("cannot create cricle");
            }
            // console.log(`do i move ${movePeice(points,oldX,oldY)}`)
        }
        else {
            console.log("cannot move to that posistion");
        }
    }
}
function isOkToMove(e, mx, my, { x, y }) {
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
    else if ((mx === 160 && my === 160) && (e.some((item) => (item.x === x && item.y === y)))) {
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
// const  pointss:list[]= [
//     {x:20,y:20},
//     {x:20,y:160},
//     {x:20,y:300},
//     {x:160,y:20},
//     {x:160,y:160},
//     {x:160,y:300},
//     {x:300,y:20},
//     {x:300,y:160},
//     {x:300,y:300},
// ]
