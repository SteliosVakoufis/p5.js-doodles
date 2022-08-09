class Particle{
    constructor(pos){
        this.pos = pos;
        this.R = 124;
        this.S = 18;
        this.B = 14.0/3.0;
        this.radius = 0.05;
        this.dt = 0.005;
        this.col = {r: random(100,255),g: random(0,100),b: random(0,200)};
    }

    run(){
        this.draw();
        this.update();
        // print(this.pos);
    }

    draw(){
        // noStroke();
        // fill(255);
        // ellipse(this.pos.x, this.pos.y);
        stroke(this.col.r, this.col.g, this.col.b);
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        sphere(this.radius, 3, 3);
        pop();
    }

    update(){
        this.pos.x += (this.S * (this.pos.y - this.pos.x)) * this.dt;
        this.pos.y += (this.pos.x * (this.R - this.pos.z) - this.pos.y) * this.dt;
        this.pos.z += ((this.pos.x * this.pos.y) - (this.B * this.pos.z)) * this.dt;
        // this.pos.x += (this.pos.x * this.pos.z);
        // this.pos.y += (this.pos.x * this.pos.x - this.pos.y);
        // this.pos.z += (1 - 4 * this.pos.x);
        // print(this.pos);
    }
}
