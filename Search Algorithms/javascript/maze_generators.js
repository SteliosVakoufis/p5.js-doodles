function generateBlankMaze(size){
    let maze = [];
    for (let i = 0; i < size; i++){
        let col = []
        for (let j = 0; j < size; j++){
            col.push("#");
        }
        maze.push(col);
    }
    let start = [int(Math.random() * size), 
        int(Math.random() * size)]
    maze[start[0]][start[1]] = "S";

    let end = [int(Math.random() * size), 
        int(Math.random() * size)];
    while (manhattanDistance(start, end) <= 2){
        end = [int(Math.random() * size), 
            int(Math.random() * size)];
    }
    maze[end[0]][end[1]] = "F";

    return maze;
}

function generateExperimentalMaze(size){
    let maze = [];
    for (let i = 0; i < size; i++){
        let col = []
        for (let j = 0; j < size; j++){
            if (Math.random() * 100 < 55){
                col.push("@");
            }
            col.push("#");
        }
        maze.push(col);
    }
    let start = [int(Math.random() * size), 
        int(Math.random() * size)]
    maze[start[0]][start[1]] = "S";

    let end = [int(Math.random() * size), 
        int(Math.random() * size)];
    while (manhattanDistance(start, end) <= 2){
        end = [int(Math.random() * size), 
            int(Math.random() * size)];
    }
    maze[end[0]][end[1]] = "F";

    return maze;
}