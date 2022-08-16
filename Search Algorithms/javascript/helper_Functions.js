function setupDisplaySettings(){
    frameRate(60);
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

function visualizeSolution(solved_maze, current_maze){
    if (solved_maze == -1) return current_maze;
	for (let i = 1; i < solved_maze.length - 1; i++){
		current_maze[solved_maze[i][0]][solved_maze[i][1]] = "*";
	}

    return current_maze;
}


// Helper Functions for Solver.js
function findIndex (maze, ch){
    for (let i = 0; i < maze.length; i++){
        for (let j = 0; j < maze.length; j++){
            if (maze[i][j] == ch) return [i, j];
        }
    }
    return [-1, -1];
}

function isValidPosition(maze, neighbour){
    let obstacle = "@";
    let i = neighbour[0], j = neighbour[1];
    if (maze[i] !== undefined){
        if (maze[i][j] !== undefined){
            if (maze[i][j] != obstacle){
                return true;
            }
        }
    }
    return false;
}

function isAlreadyThere(neighbour, predecessors){
    for (let i = 0; i < predecessors.length; i++){
        if (predecessors[i][0][0] == neighbour[0] &&
            predecessors[i][0][1] == neighbour[1]){
                return true;
            }
    }
    return false;
}

function areEqual(a, b){
    return (a[0] == b[0] && a[1] == b[1]);
}

function findPath(predecessors, start, finish){
    let result = [];
    let current = finish;
    result.push(current);

    while (!areEqual(current, start)){
        for (let i = 0; i < predecessors.length; i++){
            if (areEqual(predecessors[i][0], current)){
                current = predecessors[i][1].slice();
                break;
            }
        }
        result.push(current);
    }
    return result.reverse();
}

function manhattanDistance(a, b){
    return abs(a[0] - b[0]) + abs(a[1], b[1]);
}
