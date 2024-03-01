"use strict";
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
function detectPosostionClicked(arrayList, mx, my, boundry) {
    let isWithinTheBoundry = false;
    arrayList.map((point, idx) => {
        if ((point.x + boundry > mx && point.x - boundry < mx) && (point.y + boundry > my && point.y - boundry < my)) {
            // remove that value from the overralll list
            isWithinTheBoundry = true;
        }
    });
    return isWithinTheBoundry;
}
function playersTurn(arrayList, { x, y }, { mx, my }, playerOne, playerList, color, number) {
    if (detectPosostionClicked(arrayList, mx, my, boundry)) {
        arrayList.map((point, idx) => {
            if ((point.x + boundry > mx && point.x - boundry < mx) && (point.y + boundry > my && point.y - boundry < my)) {
                // remove that value from the overralll list
                arrayList.splice(idx, 1);
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
function playTurnTwo(playerPoints, e, { mx, my }) {
    let isblock;
    if (detectPosostionClicked(playerPoints, mx, my, boundry)) {
        playerPoints.filter((point, idx) => {
            if ((point.x + boundry > mx && point.x - boundry < mx) && (point.y + boundry > my && point.y - boundry < my)) {
                isblock = isBlocked(e, point.x, point.y);
                if (!isblock) {
                    new Player(point.x, point.y, "").cleartShape();
                    oldValue = playerPoints.splice(idx, 1)[0];
                    new Drawboard(canvas, grid);
                }
            }
        });
        if (!isblock) {
            isPickedUp = false;
        }
    }
    else {
        console.log("cannot pick up peice that is not yours");
    }
}
function playerTurnThree(points, playerList, { mx, my }, isPlayerOneTurn, color, number) {
    let isPlayerOne = isPlayerOneTurn;
    points.filter((point, idx) => {
        if ((point.x + boundry > mx && point.x - boundry < mx) && (point.y + boundry > my && point.y - boundry < my)) {
            if (isCorrectPositionToMoveTo(points, oldValue.x, oldValue.y, point.x, point.y)) {
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
function isBlocked(e, x, y) {
    console.log(x);
    console.log(y);
    if ((x === 20 && y === 20) && isCorrectPositionToMoveTo(e, x, y, 20, 160) || isCorrectPositionToMoveTo(e, x, y, 160, 20) || isCorrectPositionToMoveTo(e, x, y, 160, 160)) {
        return false;
    }
    else if ((x === 20 && y === 160) && isCorrectPositionToMoveTo(e, x, y, 20, 20) || isCorrectPositionToMoveTo(e, x, y, 20, 300) || isCorrectPositionToMoveTo(e, x, y, 160, 160)) {
        return false;
    }
    else if ((x === 20 && y === 300) && isCorrectPositionToMoveTo(e, x, y, 20, 160) || isCorrectPositionToMoveTo(e, x, y, 160, 300) || isCorrectPositionToMoveTo(e, x, y, 160, 160)) {
        return false;
    }
    else if ((x === 160 && y === 20) && isCorrectPositionToMoveTo(e, x, y, 20, 20) || isCorrectPositionToMoveTo(e, x, y, 300, 20) || isCorrectPositionToMoveTo(e, x, y, 160, 160)) {
        return false;
    }
    else if ((x === 160 && y === 300) && isCorrectPositionToMoveTo(e, x, y, 300, 300) || isCorrectPositionToMoveTo(e, x, y, 20, 300) || isCorrectPositionToMoveTo(e, x, y, 160, 160)) {
        return false;
    }
    else if ((x === 300 && y === 20) && isCorrectPositionToMoveTo(e, x, y, 160, 20) || isCorrectPositionToMoveTo(e, x, y, 300, 160) || isCorrectPositionToMoveTo(e, x, y, 160, 160)) {
        return false;
    }
    else if ((x === 300 && y === 160) && isCorrectPositionToMoveTo(e, x, y, 300, 20) || isCorrectPositionToMoveTo(e, x, y, 300, 300) || isCorrectPositionToMoveTo(e, x, y, 160, 160)) {
        return false;
    }
    else if ((x === 300 && y === 300) && isCorrectPositionToMoveTo(e, x, y, 300, 160) || isCorrectPositionToMoveTo(e, x, y, 160, 300) || isCorrectPositionToMoveTo(e, x, y, 160, 160)) {
        return false;
    }
    else if ((x === 160 && y == 160)) {
        return false;
    }
    else {
        return true;
    }
}
function isCorrectPositionToMoveTo(e, mx, my, x, y) {
    let isMove = false;
    // console.log(`Moved to X-${x} and Y-${y}`)
    // console.log(`Picked up X-${mx} and Y-${my}`)
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
    return isMove;
}
