
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



function clickCorrectPosition(points:list[],mx:number,my:number):{}{
    //returns value if the selected point is within the boundry in the list given 
    const boundry = 20 
    let position:{} = {x:null,y:null}
    points.map((point,idx)=>{
        if((point.x+boundry > mx && point.x-boundry < mx) && (point.y+boundry > my && point.y-boundry < my)) {
            // remove that value from the overralll list
            points.splice(idx,1)

           position = point
        }
    })
  
    return position

}


function placeGamePeices(isPlayerOneTurn:boolean,{x,y}:any){
    if (isPlayerOneTurn){
        if (x && y){
            new Player(x,y,"red")
            playerOnePoints.push({x,y})
            isPlayerOneTurn =false
        }else{
            console.log("Invalid Posion has to be closer to the point")
        }
    }else{
        if (x && y){
            new Player(x,y,"blue")
            playerTwoPoints.push({x,y})
            isPlayerOneTurn =true
        }else{
            console.log("Invalid Posion has to be closer to the point")
        }
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
canvas.addEventListener("click",(ev):void=>{
    let mx = ev.offsetX;
    let my = ev.offsetY;

  
   
    if ( turnsPlayed < 6 ){
        let {x,y}:any = clickCorrectPosition(points,mx,my)
       
      
        if (isPlayerOneTurn){
            if (x && y){
                new Player(x,y,"red")
                playerOnePoints.push({x,y})
               
                // decrease list

                isPlayerOneTurn =false
                turnsPlayed +=1
            }else{
                console.log("Invalid Posion has to be closer to the point")
            }
        }else{
            if (x && y){
                new Player(x,y,"blue")
                playerTwoPoints.push({x,y})
                  
              

                isPlayerOneTurn =true
                turnsPlayed +=1
            }else{
                console.log("Invalid Posion has to be closer to the point")
            }
        }
    }else{

        if (isPlayerOneTurn){
            
          playOn(isPickedUp,playerOnePoints,mx,my,oldX,oldY)

        }
     
    }
    
})


function playOn(isPickedUp:boolean,playerPositions:list[],mx:number,my:number,oldX:number,oldY:number){
    // first select a peice to remove on the board
    if (isPickedUp){
        let {x,y}:any = clickCorrectPosition(playerPositions,mx,my)
        if (x && y){
         
            oldX =x
            oldY = y
            new Player(x,y,"red").cleartShape()
          
            isPickedUp =false
            
        }else{
            console.log("cannot pick up peice that is not yours")
        }
    }else{
        let {x,y}:any = clickCorrectPosition(points,mx,my)
        // selecte the position  to move to
        
        points.push({x:x,y:y})
        console.log(points)
        if(x && y){
           if(isOkToMove(points,oldX,oldY,{x,y})){
                new Player(x,y,"red")
            //    isPlayerOneTurn = false
        }else{
            console.log("cannot create cricle")
           }
            // console.log(`do i move ${movePeice(points,oldX,oldY)}`)
        }else{
            console.log("cannot move to that posistion")
        }
    }
}



function isOkToMove(e:list[],mx:any,my:any,{x,y}:any):boolean{

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
    else if ((mx === 160 && my === 160) && (e.some((item)=>(item.x === x && item.y === y)))){
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

// const  pointss:list[]= [
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