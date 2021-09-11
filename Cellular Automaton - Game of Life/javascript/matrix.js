class Matrix {
    constructor(res){
        this.sBias = 0.80;
        this.res = res;
        this.pos = createVector(0, 0, 1);
        this.matrix = Array(this.res * this.res).fill().map(() => int(random(0, 2) * random(0, 1) * this.sBias));
        // this.matrix = Array(this.res * this.res).fill(0);  
        this.matrixImage = createImage(this.res, this.res);

        this.states = [color(0, 0, 175), color(0)];
        
        this.pause = false;

        this.update_Matrix_Image();
        this.center_Matrix();
    }

    center_Matrix(){
        if (width > height){
            this.pos.z = (height / this.res);
            this.pos.x = (width / this.pos.z / 2) - this.res / 2;
        }else{
            this.pos.z = (width / this.res);
            this.pos.y = (height / this.pos.z / 2) - this.res / 2;
        }
    }

    update_Matrix_Image(){
        this.matrixImage.loadPixels();
        for (let i = 0; i < this.res * this.res; i++) {
            let offset = i * 4;
            let state = this.states[this.matrix[i]];
            this.matrixImage.pixels[offset] = red(state);
            this.matrixImage.pixels[offset + 1] = green(state);
            this.matrixImage.pixels[offset + 2] = blue(state);
            this.matrixImage.pixels[offset + 3] = alpha(state);
        }
        this.matrixImage.updatePixels();
    }

    run(){
        if (!this.pause){
            let m = this.matrix.slice();
            for (let i = 0; i < this.matrix.length; i++){
                if (i % this.res == 0 || i < this.res || i > this.matrix.length - this.res || i % this.res == this.res - 1){
                    m[i] = 0;
                    continue;
                }
                let c = this.calc_live_Neighbour_Cells(i);
                if (this.matrix[i] == 1){
                    //LIVE CELL
                    //1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                    if (c < 2) m[i] = 0;
                    //2. Any live cell with two or three live neighbours lives on to the next generation.
                    else if (c == 2 || c == 3) m[i] = 1;
                    //3. Any live cell with more than three live neighbours dies, as if by overpopulation.
                    else if (c > 3) m[i] = 0;
                }else{
                    //DEAD CELL
                    //4.Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                    if (c == 3) m[i] = 1;
                }
            }
            this.matrix = m;
        }
        this.update_Matrix_Image();
    }

    calc_live_Neighbour_Cells(i){
        return (
            this.matrix[i - this.res - 1] + 
            this.matrix[i - this.res] + 
            this.matrix[i - this.res + 1] + 
            this.matrix[i - 1] + 
            this.matrix[i + 1] + 
            this.matrix[i + this.res - 1] + 
            this.matrix[i + this.res] + 
            this.matrix[i + this.res + 1]
        );
    }

    change_Cell_State(pos){
        pos.div(this.pos.z)
        pos.sub(this.pos);

        if (this.pos.x == 0 && pos.y < this.res && pos.y > 0){
            let index = int(floor(pos.y) + floor(pos.x) * this.res);
            this.matrix[index] = this.matrix[index] == 1 ? 0 : 1;
        }else if(this.pos.y == 0 && pos.x < this.res && pos.x > 0){
            let index = int(floor(pos.x) + floor(pos.y) * this.res);
            this.matrix[index] = this.matrix[index] == 1 ? 0 : 1;
        }
    }

    display(){
        push();

        scale(this.pos.z);
        image(this.matrixImage, this.pos.x, this.pos.y);
        
        pop();
    }

}
