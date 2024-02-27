"use strict";
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
    return false;
}
