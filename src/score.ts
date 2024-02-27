function isThreeItemsInList(playerList:list[]):boolean{
    return playerList.length === 3 ? true : false
}



function isWinner(playerList:list[]):boolean{

    if (playerList[0].x === playerList[1].x && playerList[1].x === playerList[2].x ){
        return true
    }else if (playerList[0].y === playerList[1].y && playerList[1].y === playerList[2].y ){
        return true
    }

    return false
}