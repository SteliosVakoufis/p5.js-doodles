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

    let visited = [];

    while (!stack.is_empty){
        let current_cell = stack.pop();
        if (areEqual(current_cell, finish)){
            visited = visited.filter(pos => 
                pos.toString() !== start.toString() &&
                pos.toString() !== finish.toString()
            )
            return [visited, findPath(predecessors, start, finish)];
            // return predecessors;
        }else{
            for (key of Object.keys(offsets)){
                let row_offset = offsets[key][0];
                let col_offset = offsets[key][1];
                let neighbour = [
                    current_cell[0] + row_offset,
                    current_cell[1] + col_offset
                ];
                // if (neighbour == finish) break; // <- not sure about this one
                if (isValidPosition(maze, neighbour) &&
                !isAlreadyThere(neighbour, predecessors)){
                    predecessors.push([neighbour, current_cell]);
                    visited.push(neighbour);
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

    let visited = [];

    while (!queue.is_empty){
        let current_cell = queue.dequeue();
        if (areEqual(current_cell, finish)){
            visited = visited.filter(pos => 
                pos.toString() !== start.toString() &&
                pos.toString() !== finish.toString()
            )
            return [visited, findPath(predecessors, start, finish)];
            // return predecessors;
        }else{
            for (key of Object.keys(offsets)){
                let row_offset = offsets[key][0];
                let col_offset = offsets[key][1];
                let neighbour = [
                    current_cell[0] + row_offset,
                    current_cell[1] + col_offset
                ];
                // if (neighbour == finish) break; // <- not sure about this one
                if (isValidPosition(maze, neighbour) &&
                !isAlreadyThere(neighbour, predecessors)){
                    predecessors.push([neighbour, current_cell]);
                    visited.push(neighbour);
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
    let start = findIndex(maze, "S"),
        finish = findIndex(maze, "F");

    let pQueue = new Heap();
    pQueue.put(-1, start);
    
    let predecessors = [];
    predecessors.push([start, [null, null]]);

    let visited = [];

    while(!pQueue.is_empty){
        let current_cell = pQueue.get();

        if (areEqual(current_cell, finish)){
            visited = visited.filter(pos => 
                pos.toString() !== start.toString() &&
                pos.toString() !== finish.toString()
            )
            return [visited, findPath(predecessors, start, finish)];
        }else{
            for (key of Object.keys(offsets)){
                let row_offset = offsets[key][0];
                let col_offset = offsets[key][1];
                let neighbour = [
                    current_cell[0] + row_offset,
                    current_cell[1] + col_offset
                ];
                if (isValidPosition(maze, neighbour) &&
                !isAlreadyThere(neighbour, predecessors)){
                    f_value = manhattanDistance(neighbour, start) +
                    manhattanDistance(neighbour, finish);
                    pQueue.put(f_value, neighbour);
                    predecessors.push([neighbour, current_cell]);
                    visited.push(neighbour);
                }
            }
        }

    }


    return -1;
}

// CORRECT PREDECESSORS FOR DEFAULT MAZE --aStar--
// {
//     (0, 0): None, 
//     (0, 1): (0, 0), 
//     (1, 0): (0, 0), 
//     (0, 2): (0, 1), 
//     (0, 3): (0, 2), 
//     (1, 3): (0, 3), 
//     (2, 0): (1, 0), 
//     (2, 3): (1, 3), 
//     (3, 0): (2, 0), 
//     (3, 3): (2, 3), 
//     (2, 2): (2, 3), 
//     (3, 1): (3, 0), 
//     (3, 2): (3, 1)
// }

// function aStar(maze){
//     let start = findIndex(maze, "S"),
//         finish = findIndex(maze, "F");

//     let pQueue = new Heap();
//     pQueue.put(0, start);

//     let predecessors = [];
//     predecessors.push([start, [null, null]]);

//     let g_values = [];
//     g_values.push([start, 0]);
//     print(g_values);

//     let visited = [];

//     while(!pQueue.is_empty){
//         let current_cell = pQueue.get();
//         if (areEqual(current_cell, finish)){
//             visited = visited.filter(pos => 
//                 pos.toString() != start.toString() &&
//                 pos.toString() != finish.toString()
//             )
//             return [visited, findPath(predecessors, start, finish)];
//             // return predecessors;
//         }else{
//             for (key of Object.keys(offsets)){
//                 let row_offset = offsets[key][0];
//                 let col_offset = offsets[key][1];
//                 let neighbour = [
//                     current_cell[0] + row_offset,
//                     current_cell[1] + col_offset
//                 ];
//                 // if (neighbour == finish) break; // <- not sure about this one
//                 // print();
//                 if (isValidPosition(maze, neighbour) && 
//                     !isAlreadyThere(neighbour, g_values)
//                     ){
//                     let g_value = manhattanDistance(neighbour, start);
//                     let h_value = manhattanDistance(neighbour, finish);
//                     let f_value = g_value + h_value;
//                     g_values.push([neighbour, g_value])
//                     predecessors.push([neighbour, current_cell]);
//                     visited.push(neighbour);
//                     pQueue.put(f_value, neighbour);
//                 }
//             }
//         }
//     }

//     return -1;
// }