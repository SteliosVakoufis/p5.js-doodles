let matrix;
let resolution = 100;
let iterationsPerSecond = 14;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(iterationsPerSecond);
	matrix = new Matrix(resolution);
}

function draw() {
	background(175);

	matrix.run();
	matrix.display();

	// line(width/2, 0, width/2, height);
	// line(0, height/2, width, height/2);
	run_UI();
	document.title = "fps: " + round(frameRate()) + " || dT: " + round(deltaTime) + "ms";
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	matrix = new Matrix(resolution);
}

function mouseClicked(e){
	matrix.change_Cell_State(createVector(e.x, e.y));
}

function keyPressed(e){
	if (e.code == 'Space'){
		matrix.pause = !matrix.pause;
	}
	if (e.code == "KeyC"){
		matrix.matrix = Array(matrix.res * matrix.res).fill(0);
	}
	if (e.code == "KeyR"){
		matrix.matrix = Array(matrix.res * matrix.res).fill().map(() => int(random(0, 2) * random(0, 1) * matrix.sBias));
	}
}
