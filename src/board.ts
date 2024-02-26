
// Draw border
let canvas = document.querySelector("#canvas") as HTMLCanvasElement;
canvas.width  = 320
const grid = {
    "square":{"x":20,"y":20,"w":280,"h":280},
    "horizontal":{"startX":20,"endX":300,"startY":160,"endY":160,},
    "vertical":{"startX":160,"endX":160,"startY":20,"endY":300,},
    "diagonal":{"startX":20,"endX":300,"startY":20,"endY":300,},
    "reversediagonal":{"startX":20,"endX":300,"startY":300,"endY":20,},

}



class Drawboard{
    private canvas : HTMLCanvasElement;
    private ctx :  CanvasRenderingContext2D;

    constructor(canvas:HTMLCanvasElement,coord:any){

        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        
        

        this.draw(coord)
        
    }


    private square(coord:any) : void{
        this.ctx.strokeRect(coord.square.x, coord.square.y, coord.square.w, coord.square.h)
    }

    private line(startX:number,startY:number,endX:number,endY:number): void{
        this.ctx.beginPath()
        this.ctx.moveTo(startX,startY)
        this.ctx.lineTo(endX,endY)
        this.ctx.stroke()
    }


    private draw(coord:any): void{
        this.square(coord)

        // horizontal line
        this.line(coord.horizontal.startX,coord.horizontal.startY,coord.horizontal.endX,coord.horizontal.endY)
        // vertical line
        this.line(coord.vertical.startX,coord.vertical.startY,coord.vertical.endX,coord.vertical.endY)

        // diagional
        this.line(coord.diagonal.startX,coord.diagonal.startY,coord.diagonal.endX,coord.diagonal.endY)
        // reversediagonal
        this.line(coord.reversediagonal.startX,coord.reversediagonal.startY,coord.reversediagonal.endX,coord.reversediagonal.endY)


    }

}


// new Drawboard(canvas,grid);