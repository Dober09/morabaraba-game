const  points:list[]= [
    {x:20,y:20},
    {x:20,y:160},
    {x:20,y:300},
    {x:160,y:20},
    {x:160,y:160},
    {x:160,y:300},
    {x:300,y:20},
    {x:300,y:160},
    {x:300,y:300},
]

const playerTurnOneTwo:any = document.querySelector("#playerTurn") as HTMLSpanElement

const error = document.querySelector(".Error") as HTMLSpanElement

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


function detectPosostionClicked (arrayList:list[],mx:number,my:number ,boundry:number):boolean{ 
    let isWithinTheBoundry = false
    arrayList.map((point,idx)=>{
        if((point.x+boundry > mx && point.x-boundry < mx) && (point.y+boundry > my && point.y-boundry < my)) {
            // remove that value from the overralll list
            isWithinTheBoundry = true
        }
    })
     return isWithinTheBoundry

}


function playersTurn(arrayList:list[],{x,y}:any,{mx,my}:any,playerOne:boolean,playerList:list[],color:string,number:string):void{
    if (detectPosostionClicked(arrayList,mx,my,boundry)){
        arrayList.map((point,idx)=>{
            if((point.x+boundry > mx && point.x-boundry < mx) && (point.y+boundry > my && point.y-boundry < my)) {
                // remove that value from the overralll list
                arrayList.splice(idx,1)
                x= point.x
                y = point.y

            }
        })
        new Player(x,y,color)
        playerList.push({x,y})
    
        if(isThreeItemsInList(playerList) && isWinner(playerList)){
            displayWinner(true,number)
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
    let isblock 
    error.style.color = "red"
    if (detectPosostionClicked(playerPoints,mx,my,boundry)){
            
        playerPoints.filter((point,idx)=>{
            if((point.x+boundry > mx && point.x-boundry < mx) && (point.y+boundry > my && point.y-boundry < my)) {
                        isblock = isBlocked(e,point.x,point.y)
                    
                        if(!isblock){
                            new Player(point.x,point.y,"").cleartShape()
                            oldValue =playerPoints.splice(idx,1)[0] 
                            new Drawboard(canvas,grid)
                            error.innerHTML = ""
                           
                        }else{
                            console.log("cannot move that chip")

                            error.innerHTML = "Cannot move that chip is blockes"
                        }
                    

                 
            }
        })
        if (!isblock){
            
            isPickedUp =false
        } 
        
        
    }else{
        console.log("cannot pick up peice that is not yours")
        error.innerHTML = "Cannot move that chip its not yours"
        
    }
}


function playerTurnThree(points:list[],playerList:list[],{mx,my}:any,isPlayerOneTurn:boolean,color:string,number:string){
    let isPlayerOne = isPlayerOneTurn
    points.filter((point,idx)=>{
        if((point.x+boundry > mx && point.x-boundry < mx) && (point.y+boundry > my && point.y-boundry < my)) {
            if( isCorrectPositionToMoveTo(points,oldValue.x,oldValue.y,point.x,point.y)) {
                // push values in the orderd list
                points.push({x:oldValue.x,y:oldValue.y})
                playerList.push(point)
                // create the circle
                    new Player(point.x,point.y,color) 
                    // remove that coordinate from that list
                    points.splice(idx,1)
                    if(isThreeItemsInList(playerList) && isWinner(playerList)){
                        displayWinner(true,number)
                    }
                    
                    isPlayerOne =!isPlayerOneTurn
                }else{
                    console.log("cannot draw shape")
                }
            }

        })
        return isPlayerOne
}


function isBlocked(e:list[],x:number,y:number){
    console.log(x)
    console.log(y)


    if((x === 20  && y === 20)&&isCorrectPositionToMoveTo(e,x,y,20,160)|| isCorrectPositionToMoveTo(e,x,y,160,20) || isCorrectPositionToMoveTo(e,x,y,160,160)){
        return false
    } else if((x === 20  && y === 160)&&isCorrectPositionToMoveTo(e,x,y,20,20)|| isCorrectPositionToMoveTo(e,x,y,20,300) || isCorrectPositionToMoveTo(e,x,y,160,160)){
        return false
    } else if((x === 20  && y === 300)&&isCorrectPositionToMoveTo(e,x,y,20,160)|| isCorrectPositionToMoveTo(e,x,y,160,300) || isCorrectPositionToMoveTo(e,x,y,160,160)){
        return false
    } 
    
    else if((x === 160  && y === 20)&&isCorrectPositionToMoveTo(e,x,y,20,20)|| isCorrectPositionToMoveTo(e,x,y,300,20) || isCorrectPositionToMoveTo(e,x,y,160,160)){
        return false
    } else if((x === 160  && y === 300)&&isCorrectPositionToMoveTo(e,x,y,300,300)|| isCorrectPositionToMoveTo(e,x,y,20,300) || isCorrectPositionToMoveTo(e,x,y,160,160)){
        return false
    } 
    
    else if((x === 300  && y === 20)&&isCorrectPositionToMoveTo(e,x,y,160,20)|| isCorrectPositionToMoveTo(e,x,y,300,160) || isCorrectPositionToMoveTo(e,x,y,160,160)){
        return false
    } else if((x === 300  && y === 160)&&isCorrectPositionToMoveTo(e,x,y,300,20)|| isCorrectPositionToMoveTo(e,x,y,300,300) || isCorrectPositionToMoveTo(e,x,y,160,160)){
        return false
    } else if((x === 300  && y === 300)&&isCorrectPositionToMoveTo(e,x,y,300,160)|| isCorrectPositionToMoveTo(e,x,y,160,300) || isCorrectPositionToMoveTo(e,x,y,160,160)){
        return false
    }else if((x === 160 && y== 160)){
        return false
    }else{

        return true
    }
   
}

function isCorrectPositionToMoveTo(e:list[],mx:any,my:any,x?:number,y?:number):boolean{

    let isMove:boolean = false 
   
    // console.log(`Moved to X-${x} and Y-${y}`)
    // console.log(`Picked up X-${mx} and Y-${my}`)
   
    
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

   

      return  isMove


  
}