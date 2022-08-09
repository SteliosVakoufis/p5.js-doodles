var cells = [];

function showMaze() {
    for (let i = 0; i < cells.length; i++){
        cells[i].show();
    }
}

function initCells() {
    let h_cells = 20, v_cells = h_cells, ws = h_cells, i = 0;

    for (let x = 0; x < width; x += h_cells){
        for (let y = 0; y < height; y += v_cells){
            cells.push(new mazeCell({x: x, y: y}, ws, i));
            i++;
        }
    }
}

function makeMaze() {
    let bounds = [0, cells.length - 1];
    let jump = width / cells[0].wall_size;
    let i = floor(random(cells.length));
    // let i = 0;
    cells[i].visited = true

    while (true) {
        let choices = [];
        
        //top
        let ii = i - 1
        if ((ii % jump) != (jump - 1) && ii > 0){
            if (!cells[ii].visited){
                choices.push([ii, "TOP"]);
            }
        }

        //right
        ii = i + jump;
        if (ii <= bounds[1]){
            if (!cells[ii].visited){
                choices.push([ii, "RIGHT"]);
            }
        }

        //bottom
        ii = i + 1;
        if ((ii % jump) != bounds[0]){
            if (!cells[ii].visited){
                choices.push([ii, "BOTTOM"]);
            }
        }

        //left
        ii = i - jump;
        if (ii >= bounds[0]){
            if (!cells[ii].visited){
                choices.push([ii, "LEFT"]);
            }
        }

        if (choices.length == 0){
            let temp = []
            for (let j = 0; j < cells.length; j++){
                if (!cells[j].visited){
                    temp.push(j);
                }
            }
            if (temp.length == 0){
                break;
            }else{
                i = temp[floor(random(temp.length))];
                cells[i].visited = true;
            }
        }else{
            let rand_num = floor(random(choices.length));

            switch (choices[rand_num][1]){
                case "TOP":
                    cells[i].walls[0] = false;
                    cells[choices[rand_num][0]].walls[2] = false;
                    break;
                case "RIGHT":
                    cells[i].walls[1] = false;
                    cells[choices[rand_num][0]].walls[3] = false;
                    break;
                case "BOTTOM":
                    cells[i].walls[2] = false;
                    cells[choices[rand_num][0]].walls[0] = false;
                    break;
                case "LEFT":
                    cells[i].walls[3] = false;
                    cells[choices[rand_num][0]].walls[1] = false;
                    break;
            }

            cells[choices[rand_num][0]].visited = true;
            i = choices[rand_num][0];
        }
    }
}

function makeMazeInDraw() {
    let bounds = [0, cells.length - 1];
    let jump = width / cells[0].wall_size;
    let i = floor(random(cells.length));
    // let i = 0;
    cells[i].visited = true

    let choices = [];
    
    //top
    let ii = i - 1
    if ((ii % jump) != (jump - 1) && ii > 0){
        if (!cells[ii].visited){
            choices.push([ii, "TOP"]);
        }
    }

    //right
    ii = i + jump;
    if (ii <= bounds[1]){
        if (!cells[ii].visited){
            choices.push([ii, "RIGHT"]);
        }
    }

    //bottom
    ii = i + 1;
    if ((ii % jump) != bounds[0]){
        if (!cells[ii].visited){
            choices.push([ii, "BOTTOM"]);
        }
    }

    //left
    ii = i - jump;
    if (ii >= bounds[0]){
        if (!cells[ii].visited){
            choices.push([ii, "LEFT"]);
        }
    }

    if (choices.length == 0){
        let temp = []
        for (let j = 0; j < cells.length; j++){
            if (!cells[j].visited){
                temp.push(j);
            }
        }
        if (temp.length == 0){
            
        }else{
            i = temp[floor(random(temp.length))];
            cells[i].visited = true;
        }
    }else{
        let rand_num = floor(random(choices.length));

        switch (choices[rand_num][1]){
            case "TOP":
                cells[i].walls[0] = false;
                cells[choices[rand_num][0]].walls[2] = false;
                break;
            case "RIGHT":
                cells[i].walls[1] = false;
                cells[choices[rand_num][0]].walls[3] = false;
                break;
            case "BOTTOM":
                cells[i].walls[2] = false;
                cells[choices[rand_num][0]].walls[0] = false;
                break;
            case "LEFT":
                cells[i].walls[3] = false;
                cells[choices[rand_num][0]].walls[1] = false;
                break;
        }

        cells[choices[rand_num][0]].visited = true;
        i = choices[rand_num][0];
    }
}

class mazeCell {
    constructor(p, ws, i){
        this.index = i;
        this.walls = [true, true, true, true];
        this.wall_size = ws;
        this.pos = p;
        this.visited = false;
        this.corners = this.calcCorners();
    }

    show() {
        // strokeWeight(1);
        // stroke(0, 100);
        // text(this.index, this.pos.x + this.wall_size / 2, this.pos.y + this.wall_size / 1.7);


        strokeWeight(4);
        stroke(0);

        //TOP
        if (this.walls[0]) {            
            line(this.corners[0][0], this.corners[0][1], this.corners[1][0], this.corners[1][1]);
        }
        //RIGHT
        if (this.walls[1]) {            
            line(this.corners[1][0], this.corners[1][1], this.corners[2][0], this.corners[2][1]);
        }
        //BOTTOM
        if (this.walls[2]) {            
            line(this.corners[2][0], this.corners[2][1], this.corners[3][0], this.corners[3][1]);
        }
        //LEFT
        if (this.walls[3]) {
            line(this.corners[3][0], this.corners[3][1], this.corners[0][0], this.corners[0][1]);
        }
    }

    calcCorners() {
        return [[this.pos.x, this.pos.y],
                [this.pos.x + this.wall_size, this.pos.y],
                [this.pos.x + this.wall_size, this.pos.y + this.wall_size],
                [this.pos.x, this.pos.y + this.wall_size]];
    }
}
