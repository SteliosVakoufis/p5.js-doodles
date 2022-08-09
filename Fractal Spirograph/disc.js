class Disc{
    constructor(start, diameter, step, offset){
        this.start = start;
        this.diameter = diameter;
        this.offset = offset;
        this.step = step;
        this.end = {x: 0, y: 0};
        this.dir = 0;
    }

    run(){
        this.update();
        // this.draw();
    }

    update(){
        this.dir += this.step;
        this.end.x = (sin(this.dir) * (this.diameter/2 + this.offset)) + this.start.x;
        this.end.y = (cos(this.dir) * (this.diameter/2 + this.offset)) + this.start.y;
    }
    
    paintDraw(){
        noFill();
        stroke(255, 155);
        strokeWeight(2);
        point(this.end.x, this.end.y);
    }

    draw(){
        fill(255,0);
        stroke(200);
        strokeWeight(1);
        circle(this.start.x, this.start.y, this.diameter);

        noFill();
        stroke(0);
        strokeWeight(1);
        point(this.end.x, this.end.y);
    }

}