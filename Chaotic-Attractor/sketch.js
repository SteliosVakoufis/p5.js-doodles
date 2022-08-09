var particles = [];
var spawn = true;

function setup() {
	createCanvas(500, 500, WEBGL);
	// initParticles(3000);
}

function draw() {
	background(0);

	// rotateY(millis() / 1000);
	orbitControl();
  	rotateY(0.1);
	displayParticles(particles);
	if (mouseIsPressed && spawn){
		initParticles(5);
	}

	document.title = "fps: " + round(frameRate()) + " || dT: " + round(deltaTime) + "ms";
}

function initParticles(count){
	// particles = [];
	for (let i = 0; i < count; i++){
		let pos = {x: mouseX, y: mouseY, z: random(0,10)};
		let p = new Particle(pos);
		particles.push(p);
	}
	// print("Particles have been initialized.", particles);
}

function displayParticles(p){
	p.forEach(e => {
		e.run();
	});
}
