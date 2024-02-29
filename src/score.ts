const notLose = document.querySelector(".isWinner") as HTMLDivElement
const p = document.querySelector("#para") as HTMLParagraphElement
const btn = document.querySelector(".btn") as HTMLButtonElement




function isThreeItemsInList(playerList:list[]){
    return playerList.length === 3 ? true: false
}



function isWinner(playerList:list[]):boolean{

    if (playerList[0].x === playerList[1].x && playerList[1].x === playerList[2].x ){
        return true
    }else if (playerList[0].y === playerList[1].y && playerList[1].y === playerList[2].y ){
        return true
    }else if(playerList.some(point => point.x === 160 && point.y === 160)&&
    playerList.some(point => point.x === 20 && point.y === 300)&&
    playerList.some(point => point.x === 300 && point.y === 20)){
        return true
    }else if(playerList.some(point => point.x === 160 && point.y === 160)&&
    playerList.some(point => point.x === 20 && point.y === 20)&&
    playerList.some(point => point.x === 300 && point.y === 300)){
        return true
    }else{

        return false
    }

}

function displayWinner(isWin:boolean,number:string){
    if(isWin){
        notLose.style.display = "block"
        if(number == "one"){
            p.innerHTML = "Player One Won"
            p.classList.add("one")
            btn.classList.add("one")
            p.classList.remove("two")
            btn.classList.remove("two")
        }else{

            p.innerHTML = "Player Two Won"
            p.classList.add("two")
            btn.classList.add("two")
            p.classList.remove("one")
            btn.classList.remove("one")
        }
    }

}


btn.addEventListener("click",(e)=>{
    location.reload()
    notLose.style.display = "none"
})