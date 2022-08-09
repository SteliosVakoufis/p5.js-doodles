var towns = [];
var shortestPath = [];
var distance = 1000000000;

function setup() {
	let num = 9;
	createCanvas(500, 500);
	towns = generateTowns(num);
	// asyncCalcShortestPath();
	print(towns);
}

function draw() {
	background(175);

	// towns = randomizeTowns(towns);
	showTowns(towns, 25, false);
	calcShortestPath(towns);
	showTowns(shortestPath, 255, true);

	document.title = "fps: " + round(frameRate()) + " || dT: " + round(deltaTime) + "ms";
}

async function asyncCalcShortestPath(){
	while (calcShortestPath(towns)){
	}
}