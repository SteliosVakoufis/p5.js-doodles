var mazes = [];
var current_maze = [];
var solved_maze;

function preload(){
	mazes = loadJSON("../mazes/mazes.json");
	console.log(mazes);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	setupDisplaySettings();
	current_maze = selectMaze(mazes, "default");
	setupMazeDisplaySettings(current_maze);
	setupMazeColors();

	solved_maze = dfs(current_maze);

	for (let i = 1; i < solved_maze.length - 1; i++){
		current_maze[solved_maze[i][0]][solved_maze[i][1]] = "*";
	}
}

function draw() {
	background(175);

	displayMaze(current_maze, displayMazeSettings);

	document.title = "fps: " + round(frameRate()) + " || dT: " + round(deltaTime) + "ms";
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	setupMazeDisplaySettings(current_maze);
}
