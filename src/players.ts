
class Player{
    private canvas : HTMLCanvasElement = canvas
    private ctx :  CanvasRenderingContext2D =this.canvas.getContext("2d") as CanvasRenderingContext2D;;
    private x:number = 20
    private y:number = 20
    private raduis:number = 15
    private color:string

    constructor(x:number,y:number,color:string){
        this.x =x
        this.y =y
        this.color = color;
        this.draw()
    }

    private draw(){
        this.ctx.beginPath()
        this.ctx.arc(this.x,this.y,this.raduis,0 ,Math.PI*2,true)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
    }

    public cleartShape(){
        this.ctx.clearRect(this.x-this.raduis,this.y-this.raduis,40,40)
        
    }

}

type list ={
    x:number
    y:number
}

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
        if(isThreeItemsInList(playerList)){
            if(isWinner(playerList)){
               turnsPlayed%2==0? console.log(`You win player 1`):console.log(`You win player 2`)
            }
        }
       
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


function playerTurnThree(points:list[],playerPoints:list[],{mx,my}:any,isPlayerOneTurn:boolean,color:string){
    let isPlayerOne = isPlayerOneTurn
    points.filter((point,idx)=>{
        if((point.x+boundry > mx && point.x-boundry < mx) && (point.y+boundry > my && point.y-boundry < my)) {
            if( isCorrectPositionToMoveTo(points,playerPoints,oldValue.x,oldValue.y,point)) {
                    new Player(point.x,point.y,color) 
                    points.splice(idx,1)
                    
                    isPlayerOne =!isPlayerOneTurn
                }
            }

        })
        return isPlayerOne
}


let isPlayerOneTurn:boolean = true
let turnsPlayed = 0
let playerOnePoints :list[] = []
let playerTwoPoints : list[] = []
let isPickedUp:boolean = true
let oldValue:list

const boundry = 15

canvas.addEventListener("click",(ev):void=>{
    let mx = ev.offsetX;
    let my = ev.offsetY;
    let x:any,y:any

    if ( turnsPlayed < 6 ){

        if (isPlayerOneTurn){
            playersTurn(points,{x,y},{mx,my},false,playerOnePoints,"rgb(255,0,0,0.5)")
        }else{
            playersTurn(points,{x,y},{mx,my},true,playerTwoPoints,"rgb(0,0,255,0.5)")
        
        }
        
    }else{
        
        if (isPlayerOneTurn){
            // first select a peice to remove on the board
            console.log("Player One List")
        
            if (isPickedUp){

                playTurnTwo(playerOnePoints,points,{mx,my})
                           
            }else{
                // console.log(oldValue)
               isPlayerOneTurn= playerTurnThree(points,playerOnePoints,{mx,my},true,"rgb(255,0,0,0.5)")
              
                if (!isPlayerOneTurn){
                    isPickedUp = true
                }
            }

        }else{
            // console.log(playerTwoPoints)
            if (isPickedUp){
                console.log("Player Two List")
               
                playTurnTwo(playerTwoPoints,points,{mx,my})
                           
            }else{
                // console.log(oldValue)
               isPlayerOneTurn= playerTurnThree(points,playerTwoPoints,{mx,my},false,"rgb(0,0,255,0.5)")
               if (isPlayerOneTurn){
                isPickedUp = true
            }
              
             
            }
        }
        console.log("Free space")
        console.log(points)
     
    }
    
})





function isCorrectPositionToMoveTo(e:list[],playerPoints:list[],mx:any,my:any,{x,y}:any):boolean{

    let isMove:boolean = false 
    console.log(`Moved to X-${x} and Y-${y}`)
    console.log(`Picked up X-${mx} and Y-${my}`)
   
    
    if ((mx === 20 && my === 20) && e.some((item)=>(item.x === x && item.y === y)&&((x === 20 && y === 160) || (x === 160 && y === 160)  || (x === 160 && y === 20))) ){
        isMove = true
    }
    else if ((mx === 20 && my === 160) && e.some((item)=>(item.x === x && item.y === y)&&((x === 20 && y === 20) || (x === 160 && y === 160)  || (x === 20 && y === 300))) ){
        isMove = true
    }
    else if ((mx === 20 && my === 300) && e.some((item)=>(item.x === x && item.y === y)&&((x === 20 && y === 160) || (x === 160 && y === 160)  || (x === 1600 && y === 300))) ){
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


new Drawboard(canvas,grid)