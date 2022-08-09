var bgIMG;
var bgIMGFcol;

var discsParams = [
	[100, -0.01, 0, false],
	[25, 0.08, 0, false],
	[50, -0.03, 0, false],
	[60, 0.05, 0, true],
	[5, 0.25, 0, false],
	[35, -0.01, 0, true]
]

function initDiscs(){
	discs = [];
	if (discsParams.length != 0){
		buildDiscs();
	}
	bgIMG = createImage(width, height);
	background(0, 255);
}

function setup() {
	createCanvas(500, 500);
	bgIMGFcol = color(191, 64, 191, 45);
	bgIMG = createImage(width, height);
	// fillBGImage(color(175, 1));
	initDiscs();
}

function draw() {
	background(25);
	image(bgIMG, 0, 0);

	displayDiscs();

	document.title = "fps: " + round(frameRate()) + " || dT: " + round(deltaTime) + "ms";
}

function fillBGImage(c){
	bgIMG.loadPixels();
	for (let x = 0; x < bgIMG.width; x++){
		for (let y = 0; y < bgIMG.height; y++){
			bgIMG.set(x, y, c);
		}
	}
	bgIMG.updatePixels();
}

function saveBGIMG(){
	bgIMG.save("IMG", "png");
}