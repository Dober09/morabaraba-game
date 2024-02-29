"use strict";
const notLose = document.querySelector(".isWinner");
function isThreeItemsInList(playerList) {
    return playerList.length === 3 ? true : false;
}
function isWinner(playerList) {
    if (playerList[0].x === playerList[1].x && playerList[1].x === playerList[2].x) {
        return true;
    }
    else if (playerList[0].y === playerList[1].y && playerList[1].y === playerList[2].y) {
        return true;
    }
    else if (playerList.some(point => point.x === 160 && point.y === 160) &&
        playerList.some(point => point.x === 20 && point.y === 300) &&
        playerList.some(point => point.x === 300 && point.y === 20)) {
        return true;
    }
    else if (playerList.some(point => point.x === 160 && point.y === 160) &&
        playerList.some(point => point.x === 20 && point.y === 20) &&
        playerList.some(point => point.x === 300 && point.y === 300)) {
        return true;
    }
    else {
        return false;
    }
}
function displayWinner(isWin) {
    if (isWin) {
        notLose.style.display = "block";
    }
}
