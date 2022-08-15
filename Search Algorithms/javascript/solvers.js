//generator functions dont forget xd

// Neighbour offsets
const offsets = {
    "up": [-1, 0],
    "right": [0, 1],
    "down": [1, 0],
    "left": [0, -1]
}


// Helper Functions
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

// I hate this function
function isAlreadyThere(neighbour, predecessors){
    for (let i = 0; i < predecessors.length; i++){
        if (predecessors[i][0][0] == neighbour[0] &&
            predecessors[i][0][1] == neighbour[1]){
                return true;
            }
    }
    return false;
}

// Also this one
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


// Depth First Search algorithm
function dfs(maze){
    let start = findIndex(maze, "S"),
        finish = findIndex(maze, "F");
    let stack = new Stack();
    stack.push(start);
    let predecessors = [];
    predecessors.push([start, [null, null]]);
    let offset_keys = Object.keys(offsets);

    while (!stack.is_empty){
        let current_cell = stack.pop();
        if (areEqual(current_cell, finish)){
            return findPath(predecessors, start, finish);
            // return predecessors;
        }else{
            for (let i = 0; i < offset_keys.length; i++){
                let row_offset = offsets[offset_keys[i]][0];
                let col_offset = offsets[offset_keys[i]][1];
                let neighbour = [
                    current_cell[0] + row_offset,
                    current_cell[1] + col_offset
                ];
                if (neighbour == finish) break;
                if (isValidPosition(maze, neighbour) && 
                    !isAlreadyThere(neighbour, predecessors)
                    ){
                    predecessors.push([neighbour, current_cell]);
                    stack.push(neighbour);
                }
            }
        }
    }

    return -1;
}

// CORRECT PREDECESSORS FOR DEFAULT MAZE --DFS--
// {
//     (0, 0): None, 
//     (0, 1): (0, 0), 
//     (1, 0): (0, 0), 
//     (2, 0): (1, 0), 
//     (3, 0): (2, 0), 
//     (3, 1): (3, 0), 
//     (3, 2): (3, 1), 
//     (2, 2): (3, 2), 
//     (3, 3): (3, 2)
// }