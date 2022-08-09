var generate_Button;

function setup() {
	createCanvas(500, 500);
	generateNewMaze();

	generate_Button = createButton("Generate");
	generate_Button.mousePressed(generateNewMaze);
}

function draw() {
	background(175);

	showMaze();

	document.title = "fps: " + round(frameRate()) + " || dT: " + round(deltaTime) + "ms";
}

function generateNewMaze(){
	cells = [];
	initCells();
	makeMaze();
}
