function setup() {
  createCanvas(720, 720);
  frameRate(120);
  init_pixels();
  init_loc();
}

function draw() {
  background(0);
  // cpuGenerate();
  gpuGenerate2();
  document.title = "fps: " + round(frameRate()) + " || dT: " + round(deltaTime) + "ms";
}

function init_pixels(){
  v_w = width, v_h = height;
  pixelDensity(1);
}