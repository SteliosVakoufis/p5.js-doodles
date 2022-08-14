var mazes = [];
var current_maze = [];

function preload(){
	mazes = loadJSON("../mazes/mazes.json");
	console.log(mazes);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	setupDisplaySettings(current_maze);
	current_maze = selectMaze(mazes, "default");
	setupMazeDisplaySettings(current_maze);
	setupMazeColors();
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