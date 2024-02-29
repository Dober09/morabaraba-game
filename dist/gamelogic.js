"use strict";
const playerTurnOneTwo = document.querySelector("#playerTurn");
function playerTurns(playerTurn) {
    var _a, _b, _c, _d;
    if (playerTurn === "1") {
        playerTurnOneTwo.innerHTML = playerTurn;
        (_a = playerTurnOneTwo.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove("two");
        (_b = playerTurnOneTwo.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("one");
    }
    else {
        playerTurnOneTwo.innerHTML = playerTurn;
        (_c = playerTurnOneTwo.parentElement) === null || _c === void 0 ? void 0 : _c.classList.remove("one");
        (_d = playerTurnOneTwo.parentElement) === null || _d === void 0 ? void 0 : _d.classList.add("two");
    }
}
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
function playersTurn(points, { x, y }, { mx, my }, playerOne, playerList, color, number) {
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
        if (isThreeItemsInList(playerList) && isWinner(playerList)) {
            displayWinner(true, number);
        }
        turnsPlayed % 2 == 1 ? playerTurns("1") : playerTurns("2");
        // decrease list
        isPlayerOneTurn = playerOne;
        turnsPlayed += 1;
    }
    else {
        console.log("Invalid Posion has to be closer to the point");
    }
}
// const  points:list[]= [
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
function hasToMove(e, x, y) {
    if ((x === 20 && y === 20) && isCorrectPositionToMoveTo(e, x, y, points[1]) && isCorrectPositionToMoveTo(e, x = 20, y = 20, points[3])) {
        return true;
    }
    // return true
}
function playTurnTwo(playerPoints, e, { mx, my }) {
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
function playerTurnThree(points, playerList, { mx, my }, isPlayerOneTurn, color, number) {
    let isPlayerOne = isPlayerOneTurn;
    points.filter((point, idx) => {
        if ((point.x + boundry > mx && point.x - boundry < mx) && (point.y + boundry > my && point.y - boundry < my)) {
            if (isCorrectPositionToMoveTo(points, oldValue.x, oldValue.y, point)) {
                // push values in the orderd list
                points.push({ x: oldValue.x, y: oldValue.y });
                playerList.push(point);
                // create the circle
                new Player(point.x, point.y, color);
                // remove that coordinate from that list
                points.splice(idx, 1);
                if (isThreeItemsInList(playerList) && isWinner(playerList)) {
                    displayWinner(true, number);
                }
                isPlayerOne = !isPlayerOneTurn;
            }
            else {
                console.log("cannot draw shape");
            }
        }
    });
    return isPlayerOne;
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
    else if ((mx === 20 && my === 300) && e.some((item) => (item.x === x && item.y === y) && ((x === 20 && y === 160) || (x === 160 && y === 160) || (x === 160 && y === 300)))) {
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
    // if(isMove){
    //     e.push({x:mx,y:my})
    //     playerPoints.push({x,y})
    // }
    return isMove;
}
