var discs = [];

class Disc{
    constructor(p, d, rs, offset, id){
        print(p, d, rs, offset, id);
        this.position = p;
        this.diameter = d;
        this.isDrawer = id;
        this.radius = this.diameter / 2
        this.offset = this.radius + offset;
        this.rotationSpeed = rs;
        this.rotation = 0;
        this.direction = {x: 0, y: 0};
        this.update();
        this.lastPos = {x: this.direction.x, y: this.direction.y};
    }

    run(){
        this.display();
        this.update();

        if (this.isDrawer){
            // bgIMGFcol = color(random(255), random(255), random(255), 255);

            // stroke(191, 64, 191, random(100, 255));
            // strokeWeight(random(0,3));
            // stroke(168, 51, 5, 100);
            // strokeWeight(4);
            // line(this.lastPos.x, this.lastPos.y, this.direction.x, this.direction.y);

            // stroke(41, 25, 189, 255);
            // strokeWeight(3);
            // line(this.lastPos.x, this.lastPos.y, this.direction.x, this.direction.y);

            // stroke(207, 37, 150, 255);
            // strokeWeight(2);
            // line(this.lastPos.x, this.lastPos.y, this.direction.x, this.direction.y);

            // stroke(46, 210, 242, 255);
            // strokeWeight(1);
            // line(this.lastPos.x, this.lastPos.y, this.direction.x, this.direction.y);

            bgIMG.loadPixels();
            bgIMG.set(this.direction.x, this.direction.y, bgIMGFcol);
            bgIMG.updatePixels();
            this.lastPos = {x: this.direction.x, y: this.direction.y};
        }
    }

    update(){
        this.direction.x = sin(this.rotation) * this.offset + this.position.x;
        this.direction.y = cos(this.rotation) * this.offset + this.position.y;

        this.rotation += this.rotationSpeed;
    }

    display(){
        noFill();
        strokeWeight(2);
        stroke(145, 100, 0, 25);
        circle(this.position.x, this.position.y, this.diameter);

        // strokeWeight(4);
        // stroke(0, 255);
        // point(this.position.x, this.position.y);

        strokeWeight(3);
        stroke(255, 150);
        point(this.direction.x, this.direction.y);
    }
}

function buildDiscs(){

    for (let i = 0; i < discsParams.length - 1; i ++){
        discsParams[i][2] = discsParams[i + 1][0] / 2;
    }

	let disc = new Disc(
        {x: width/2, y: height/2},
        discsParams[0][0],
        discsParams[0][1],
        discsParams[0][2],
        discsParams[0][3]
        );
    disc.update();
	discs.push(disc);

    for (let i = 1; i < discsParams.length; i++){
        disc = new Disc(
            discs[i - 1].direction,
            discsParams[i][0],
            discsParams[i][1],
            discsParams[i][2], 
            discsParams[i][3]
        );
        disc.update();
        discs.push(disc);
    }
}

function displayDiscs(){
    for (let i = 0; i < discs.length; i++){
        discs[i].run();
        if (i != 0){
            discs[i].position = discs[i - 1].direction;
        }
    }
}
