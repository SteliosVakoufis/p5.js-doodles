var ids = [], idColors = [], idBehaviors = [], idPriorities = [];
var canvasIMG, canvasArray = [];

function preload(){
	ids = loadJSON("./IDs.json");
}

function setup() {
	createCanvas(300, 300);

	canvasIMG = createImage(width, height);

	//LOAD ALL POSSIBLE COLORS AND BEHAVIORS
	for (let i = 0; i < Object.keys(ids).length; i++){
		let c = color(ids[i].color[0], ids[i].color[1], ids[i].color[2]);
		idColors.push(c);

		let b = ids[i].behavior;
		idBehaviors.push(b);

		let p = ids[i].priority;
		idPriorities.push(p);
	}
	
	init_CanvasArray();
}

function draw() {
	background(175);

	image(canvasIMG, 0, 0);
	run_CanvasArray_Physics(5);

	display_ui();
	document.title = "fps: " + round(frameRate()) + " || dT: " + round(deltaTime) + "ms";
}