function setupDisplaySettings(){
    rectMode(CORNER);
    strokeWeight(1);
    stroke(255);
}

function selectMaze(mazes, key){
    let maze = mazes[key].slice();
    return maze;
}

var displayMazeSettings = {
    "length": 0,
    "blockSize": 0,
    "blockSpacing": 0,
    "startDrawPos": [0, 0]
}

function setupMazeDisplaySettings(maze){
    let length = maze.length;

    displayMazeSettings["length"] = length;

    if (windowHeight < windowWidth){
        let blockSize = windowHeight / length;
        displayMazeSettings["blockSize"] = blockSize;
        displayMazeSettings["startDrawPos"] = [
            windowHeight == windowWidth ? 0 : 
            abs(windowWidth - windowHeight) / 2,
            0
        ];
    }else{
        let blockSize = windowWidth / length;
        displayMazeSettings["blockSize"] = blockSize;
        displayMazeSettings["startDrawPos"] = [
            0,
            windowHeight == windowWidth ? 0 :
            abs(windowWidth - windowHeight) / 2
        ];
    }
}

let mazeColors;

function setupMazeColors(){
    mazeColors = {
        "S": color("#e3c530"),
        "F": color("#5e4dbf"),
        "#": color("#76c1c2"),
        "@": color("#151717"),
        "*": color("#f55c51")
    };
}

function displayMaze(maze, DMS){
    let pos = DMS["startDrawPos"].slice();
    let size = DMS["blockSize"];
    for (let i = 0; i < DMS["length"]; i++){
        for (let j = 0; j < DMS["length"]; j++){
            fill(mazeColors[maze[i][j]]);
            rect(pos[0], pos[1], size);
            pos[0] += size;
        }
        pos[0] = DMS["startDrawPos"][0]
        pos[1] += size;
    }
}
