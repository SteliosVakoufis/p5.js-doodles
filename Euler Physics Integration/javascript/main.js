let app;
let width = 800*1.4, height = 600*1.4;

let pCount = 45000;

function setup(){
    let options = {
        width: width,
        height: height,
        backgroundColor: 0x000000
    };

    app = new PIXI.Application(options);
    document.body.appendChild(app.view);

    app.ticker.add(draw);
    // init_eventHandler();
    init_ParticleSystem();
}

function draw(){

    particle_show(pSystem);

    if (app.renderer.plugins.interaction.mouse.pressure > 0){
        attractParticles(app.renderer.plugins.interaction.mouse.global, pSystem);
    }

    updateParticles(pSystem);
	document.title = "fps: " + Math.floor(app.ticker.FPS);
}

function init_eventHandler(){
    let bg = new PIXI.Sprite();
    bg.width = width;
    bg.height = height;
    bg.interactive = true;
    bg.on('mousedown', (e) => mouseClicked(e));
    bg.on('mouseup', (e) => mouseClicked(e));
    app.stage.addChild(bg);
}

let attractiveMouse = false;
function mouseClicked(e){
    console.log(app.renderer.plugins.interaction.mouse);
    
    // if (e.type = 'mousedown'){
    //     attractiveMouse = true;
    // }else if (e.type = 'mouseup'){
    //     attractiveMouse = false;
    // }
    // console.log(attractiveMouse);
}
