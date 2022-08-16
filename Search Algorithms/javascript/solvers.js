//generator functions dont forget xd
// Neighbour offsets
const offsets = {
    "up": [-1, 0],
    "right": [0, 1],
    "down": [1, 0],
    "left": [0, -1]
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
                if (neighbour == finish) break; // <- not sure about this one
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

// Breadth First Search algorithm
function bfs(maze){
    let start = findIndex(maze, "S"),
        finish = findIndex(maze, "F");
    let queue = new Queue();
    queue.enqueue(start);
    let predecessors = [];
    predecessors.push([start, [null, null]]);
    let offset_keys = Object.keys(offsets);

    while (!queue.is_empty){
        let current_cell = queue.dequeue();
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
                if (neighbour == finish) break; // <- not sure about this one
                if (isValidPosition(maze, neighbour) && 
                    !isAlreadyThere(neighbour, predecessors)
                    ){
                    predecessors.push([neighbour, current_cell]);
                    queue.enqueue(neighbour);
                }
            }
        }
    }

    return -1;
}

// CORRECT PREDECESSORS FOR DEFAULT MAZE --BFS--
// {
//     (0, 0): None, 
//     (0, 1): (0, 0), 
//     (1, 0): (0, 0), 
//     (0, 2): (0, 1), 
//     (2, 0): (1, 0), 
//     (0, 3): (0, 2), 
//     (3, 0): (2, 0), 
//     (1, 3): (0, 3), 
//     (3, 1): (3, 0), 
//     (2, 3): (1, 3), 
//     (3, 2): (3, 1), 
//     (3, 3): (2, 3), 
//     (2, 2): (2, 3)
// }

function aStar(maze){
    
}
