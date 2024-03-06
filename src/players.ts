
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






let isPlayerOneTurn:boolean = true
let turnsPlayed = 0
let playerOnePoints :list[] = []
let playerTwoPoints : list[] = []
let isPickedUp:boolean = true
let oldValue:list

const boundry = 30


canvas.addEventListener("click",(ev):void=>{
    let mx = ev.offsetX;
    let my = ev.offsetY;
    let x:any,y:any

    if ( turnsPlayed < 6 ){

        if (isPlayerOneTurn){
            playersTurn(points,{x,y},{mx,my},false,playerOnePoints,"rgb(255,0,0,0.5)","one")
        }else{  
            playersTurn(points,{x,y},{mx,my},true,playerTwoPoints,"rgb(0,0,255,0.5)","two") 
        }
        
    }else{
        
        
        if (isPlayerOneTurn){
            playerTurns("1")
            
            // first select a peice to remove on the board
        
            if (isPickedUp){

                playTurnTwo(playerOnePoints,points,{mx,my})
                           
            }else{
              
               
               isPlayerOneTurn= playerTurnThree(points,playerOnePoints,{mx,my},true,"rgb(255,0,0,0.5)","one")

              
              
                if (!isPlayerOneTurn){
                    isPickedUp = true
                    playerTurns("2")
                }
            }

        }else{
            
           
            if (isPickedUp){
                playTurnTwo(playerTwoPoints,points,{mx,my})
                           
            }else{
                // console.log(oldValue)
               isPlayerOneTurn= playerTurnThree(points,playerTwoPoints,{mx,my},false,"rgb(0,0,255,0.5)","two")
               if (isPlayerOneTurn){
                isPickedUp = true
                playerTurns("1")
            }
              
             
            }
        }
      
     
    }
    
})






new Drawboard(canvas,grid)