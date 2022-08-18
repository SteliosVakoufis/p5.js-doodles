var mazes = [];
var current_maze = [];
var solved_maze = [[], []];

function preload(){
	mazes = loadJSON("../mazes/mazes.json");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	setupDisplaySettings();
	
	setupMazeColors();
	// current_maze = selectMaze(mazes, "maze_01");
	current_maze = generateExperimentalMaze(15);

	setupMazeDisplaySettings(current_maze);

	// solved_maze = dfs(current_maze);
	// solved_maze = bfs(current_maze);
	solved_maze = aStar(current_maze);

}

function draw() {
	background(175);

	displayMaze(current_maze, displayMazeSettings);
	if (animateSolvedMaze(solved_maze, current_maze)){
		current_maze = generateExperimentalMaze(15);
		setupMazeDisplaySettings(current_maze);
		solved_maze = aStar(current_maze);
	}

	document.title = "fps: " + round(frameRate()) + " || dT: " + round(deltaTime) + "ms";
}

function animateSolvedMaze(solved_maze, current_maze){
	if (solved_maze[0] === undefined || solved_maze[1] === undefined){
		return true;
	}

	if (solved_maze[0].length != 0){
		let visited = solved_maze[0].shift();
		current_maze[visited[0]][visited[1]] = "!";
		return false;
	}
	else if (solved_maze[1].length != 0){
		let visited = solved_maze[1].shift();
		current_maze[visited[0]][visited[1]] = "*";
		return false;
	}
	return true;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	setupMazeDisplaySettings(current_maze);
}
