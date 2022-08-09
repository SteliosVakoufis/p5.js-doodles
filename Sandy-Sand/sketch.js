var sim_resolution = 2;
var sim = [];
var sand_particles = [];

function setup() {
	frameRate(75);
	createCanvas(640, 380);
	document.addEventListener('contextmenu', event => event.preventDefault());

	initSim();
}

function draw() {
	background(0);
	showSim();
	runSim();
	document.title = "fps: " + round(frameRate()) + " || dT: " + round(deltaTime) + "ms";
}

function initSim(){
	for (let y = 0; y < height; y += sim_resolution){
		for (let x = 0; x < width; x += sim_resolution){
			sim.push({x: x, y: y, col: 0, updated: false});
		}
	}
}

function showSim(){
	let sc = color(sandColor);
	let wc = color(wallColor);
	// stroke(100);
	noStroke();
	for (let i = 0; i < sim.length; i++){
		if (sim[i].col == sandColor){
			fill(sc);
			rect(sim[i].x, sim[i].y, sim_resolution, sim_resolution);
		}else if (sim[i].col == wallColor){
			fill(wc);
			rect(sim[i].x, sim[i].y, sim_resolution, sim_resolution);
		}
	}
}
