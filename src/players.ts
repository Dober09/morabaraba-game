
class Player{
    private canvas : HTMLCanvasElement = canvas
    private ctx :  CanvasRenderingContext2D =this.canvas.getContext("2d") as CanvasRenderingContext2D;;
    private x:number = 20
    private y:number = 20
    private raduis:number = 20
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
       
        // decrease list

        isPlayerOneTurn =playerOne
        turnsPlayed +=1
    }else{
        console.log("Invalid Posion has to be closer to the point")
    }
}




new Drawboard(canvas,grid)

let isPlayerOneTurn:boolean = true
let isPickedUp:boolean = true
let turnsPlayed = 0
let playerOnePoints :list[] = []
let playerTwoPoints : list[] = []
let emptySpot:list[]=[]
let oldX:number
let oldY:number
const boundry = 20 
canvas.addEventListener("click",(ev):void=>{
    let mx = ev.offsetX;
    let my = ev.offsetY;
    let x:any,y:any

    console.log(points)
    console.log(`Detect the correct position clicked ${detectPosostionClicked(points,mx,my,boundry)}`)
    if ( turnsPlayed < 6 ){

        if (isPlayerOneTurn){
            playersTurn(points,{x,y},{mx,my},false,playerOnePoints,"rgb(255,0,0,0.5)")
        }else{
            playersTurn(points,{x,y},{mx,my},true,playerTwoPoints,"rgb(0,0,255,0.5)")
        
        }
    }else{

        if (isPlayerOneTurn){
            // first select a peice to remove on the board
          
            if (isPickedUp){
                // let {x,y}:any = clickCorrectPosition(playerOnePoints,mx,my)
                isPickedUp = pickedUpPiece(points,x,y)
                oldX = x
                oldY = y
            }else{
                let oldPoints = points
                // let {x,y}:any = clickCorrectPosition(points,mx,my)
               console.log( isCorrectPositionToMoveTo(oldPoints,oldX,oldY,{x,y}))
                console.log("player One")
                console.log(playerOnePoints)
                console.log("free space")
                console.log(oldPoints)
                // add the selected value to the list
               
                // relocate(points,x,y,oldX,oldY)
             
            }

        }
     
    }
    
})


function relocate(emptyPositions:list[],x:number,y:number,oldX:number,oldY:number,color?:string){
   
    if(x && y){
        if(isCorrectPositionToMoveTo(emptyPositions,oldX,oldY,{x,y})){
           
            new Player(x,y,"rgb(255,0,0,0.5)")
        
    }else{
        console.log("cannot create cricle")
       }

    }else{
        console.log("cannot move to that posistion")
    }
}


function pickedUpPiece(emptyPositions:list[],x:number,y:number):boolean{
    // check if you can pick your piece to be removed then added the position to the empty position
    if (x && y){
        oldX =x
        oldY = y
        new Player(x,y,"").cleartShape()
        // emptyPositions.push({x:oldX,y:oldY})
      
        return false
        
    }else{
        console.log("cannot pick up peice that is not yours")
        return true
    }
}



function isCorrectPositionToMoveTo(e:list[],mx:any,my:any,{x,y}:any):boolean{

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
    }
    

      return  isMove


  
}

