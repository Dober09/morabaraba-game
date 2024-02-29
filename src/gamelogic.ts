const playerTurnOneTwo = document.querySelector("#playerTurn") as HTMLSpanElement


function playerTurns(playerTurn:string){
    if (playerTurn === "1"){
        playerTurnOneTwo.innerHTML = playerTurn
        playerTurnOneTwo.parentElement?.classList.remove("two")
        playerTurnOneTwo.parentElement?.classList.add("one")
    }else{
        playerTurnOneTwo.innerHTML = playerTurn
        playerTurnOneTwo.parentElement?.classList.remove("one")
        playerTurnOneTwo.parentElement?.classList.add("two")
    }

}


function detectPosostionClicked (points:list[],mx:number,my:number ,boundry:number){
    
    let isWithinTheBoundry = false
    points.map((point,idx)=>{
        if((point.x+boundry > mx && point.x-boundry < mx) && (point.y+boundry > my && point.y-boundry < my)) {
            // remove that value from the overralll list
            isWithinTheBoundry = true
        }
    })
     return isWithinTheBoundry

}


function playersTurn(points:list[],{x,y}:any,{mx,my}:any,playerOne:boolean,playerList:list[],color:string):void{
    if (detectPosostionClicked(points,mx,my,boundry)){
        points.map((point,idx)=>{
            if((point.x+boundry > mx && point.x-boundry < mx) && (point.y+boundry > my && point.y-boundry < my)) {
                // remove that value from the overralll list
                points.splice(idx,1)
                x= point.x
                y = point.y

            }
        })
        new Player(x,y,color)
        playerList.push({x,y})
    
        if(isThreeItemsInList(playerList) && isWinner(playerList)){
            displayWinner(true)
        }
       
        turnsPlayed%2==1? playerTurns("1"):playerTurns("2")
        // decrease list

        isPlayerOneTurn =playerOne
        turnsPlayed +=1
    }else{
        console.log("Invalid Posion has to be closer to the point")
    }
}



function playTurnTwo(playerPoints:list[],e:list[],{mx,my}:any){
    
    if (detectPosostionClicked(playerPoints,mx,my,boundry)){
            
        playerPoints.filter((point,idx)=>{
            if((point.x+boundry > mx && point.x-boundry < mx) && (point.y+boundry > my && point.y-boundry < my)) {
                    
                // if(e.some(item=>item.x))
                new Player(point.x,point.y,"").cleartShape()
                console.log(`X ${point.x} Y ${point.y}`)
                oldValue =playerPoints.splice(idx,1)[0] 
                new Drawboard(canvas,grid)
            
            }
        })
        
    
        isPickedUp =false
        
    }else{
        console.log("cannot pick up peice that is not yours")
        
    }
}


function playerTurnThree(points:list[],playerList:list[],{mx,my}:any,isPlayerOneTurn:boolean,color:string){
    let isPlayerOne = isPlayerOneTurn
    points.filter((point,idx)=>{
        if((point.x+boundry > mx && point.x-boundry < mx) && (point.y+boundry > my && point.y-boundry < my)) {
            if( isCorrectPositionToMoveTo(points,playerList,oldValue.x,oldValue.y,point)) {
                    new Player(point.x,point.y,color) 
                    points.splice(idx,1)
                    if(isThreeItemsInList(playerList) && isWinner(playerList)){
                        displayWinner(true)
                    }
                    
                    isPlayerOne =!isPlayerOneTurn
                }else{
                    console.log("cannot draw shape")
                }
            }

        })
        return isPlayerOne
}




function isCorrectPositionToMoveTo(e:list[],playerPoints:list[],mx:any,my:any,{x,y}:any):boolean{

    let isMove:boolean = false 
    console.log('player')
    console.log(playerPoints)
    console.log("space")
    console.log(e)
    console.log(`Moved to X-${x} and Y-${y}`)
    console.log(`Picked up X-${mx} and Y-${my}`)
   
    
    if ((mx === 20 && my === 20) && e.some((item)=>(item.x === x && item.y === y)&&((x === 20 && y === 160) || (x === 160 && y === 160)  || (x === 160 && y === 20))) ){
        isMove = true
    }
    else if ((mx === 20 && my === 160) && e.some((item)=>(item.x === x && item.y === y)&&((x === 20 && y === 20) || (x === 160 && y === 160)  || (x === 20 && y === 300))) ){
        isMove = true
    }
    else if ((mx === 20 && my === 300) && e.some((item)=>(item.x === x && item.y === y)&&((x === 20 && y === 160) || (x === 160 && y === 160)  || (x === 160 && y === 300))) ){
        isMove = true
    }

    else if ((mx === 160 && my === 20) && e.some((item)=>(item.x === x && item.y === y)&&((x === 20 && y === 20) || (x === 160 && y === 160)  || (x === 300 && y === 20))) ){
        isMove = true
    }
    else if ((mx === 160 && my === 300) && e.some((item)=>(item.x === x && item.y === y)&&((x === 300 && y === 300) || (x === 160 && y === 160)  || (x === 20 && y === 300))) ){
        isMove = true
    }

    else if ((mx === 300 && my === 20) && e.some((item)=>(item.x === x && item.y === y)&&((x === 160 && y === 20) || (x === 160 && y === 160)  || (x === 300 && y === 160))) ){
        isMove = true
    }
    else if ((mx === 300 && my === 160) && e.some((item)=>(item.x === x && item.y === y)&&((x === 300 && y === 20) || (x === 160 && y === 160)  || (x === 300 && y === 300))) ){
        isMove = true
    }
    else if ((mx === 300 && my === 300) && e.some((item)=>(item.x === x && item.y === y)&&((x === 160 && y === 300) || (x === 160 && y === 160)  || (x === 300 && y === 160))) ){
        isMove = true
    }else if ((mx === 160 && my === 160) && e.some(item=>item.x === x && item.y === y)){
        isMove = true
    }

    if(isMove){
        e.push({x:mx,y:my})
        playerPoints.push({x,y})
    }

      return  isMove


  
}