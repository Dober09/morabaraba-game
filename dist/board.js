"use strict";
// Draw border
let canvas = document.querySelector("#canvas");
canvas.width = 320;
const grid = {
    "square": { "x": 20, "y": 20, "w": 280, "h": 280 },
    "horizontal": { "startX": 20, "endX": 300, "startY": 160, "endY": 160, },
    "vertical": { "startX": 160, "endX": 160, "startY": 20, "endY": 300, },
    "diagonal": { "startX": 20, "endX": 300, "startY": 20, "endY": 300, },
    "reversediagonal": { "startX": 20, "endX": 300, "startY": 300, "endY": 20, },
};
class Drawboard {
    constructor(canvas, coord) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.draw(coord);
    }
    square(coord) {
        this.ctx.strokeRect(coord.square.x, coord.square.y, coord.square.w, coord.square.h);
    }
    line(startX, startY, endX, endY) {
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
    }
    draw(coord) {
        this.square(coord);
        // horizontal line
        this.line(coord.horizontal.startX, coord.horizontal.startY, coord.horizontal.endX, coord.horizontal.endY);
        // vertical line
        this.line(coord.vertical.startX, coord.vertical.startY, coord.vertical.endX, coord.vertical.endY);
        // diagional
        this.line(coord.diagonal.startX, coord.diagonal.startY, coord.diagonal.endX, coord.diagonal.endY);
        // reversediagonal
        this.line(coord.reversediagonal.startX, coord.reversediagonal.startY, coord.reversediagonal.endX, coord.reversediagonal.endY);
    }
}
// new Drawboard(canvas,grid);
