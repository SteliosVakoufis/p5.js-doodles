var mazes = [];
var current_maze = [];
var solved_maze = [[], []];

function preload(){
	mazes = loadJSON("../mazes/mazes.json");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	setupDisplaySettings();
	current_maze = selectMaze(mazes, "maze_01");
	setupMazeDisplaySettings(current_maze);
	setupMazeColors();

	// solved_maze = dfs(current_maze);
	// solved_maze = bfs(current_maze);
	solved_maze = aStar(current_maze);

}

function draw() {
	background(175);

	displayMaze(current_maze, displayMazeSettings);
	current_maze = animateSolvedMaze(solved_maze, current_maze);

	document.title = "fps: " + round(frameRate()) + " || dT: " + round(deltaTime) + "ms";
}

function animateSolvedMaze(solved_maze, current_maze){
	if (solved_maze[0].length){
		let visited = solved_maze[0].shift();
		current_maze[visited[0]][visited[1]] = "!"
	}
	else if (solved_maze[1].length){
		let visited = solved_maze[1].shift();
		current_maze[visited[0]][visited[1]] = "*"
	}
	return current_maze;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	setupMazeDisplaySettings(current_maze);
}
