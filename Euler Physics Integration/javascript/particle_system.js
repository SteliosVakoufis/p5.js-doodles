const pSystem = new PIXI.ParticleContainer(pCount, {rotation: true, maxSize: pCount});

const drag = 0.9;
const maxPspeed = 8;
const attractionForce = 0.6;
const pScale = 1.4;

function init_ParticleSystem(){
    app.stage.addChild(pSystem);
    addParticles(pCount, pSystem);
}

function addParticles(pCount){
    const texture = PIXI.Texture.from('../assets/arrow_white.png');
    for (let i = 0; i < pCount; i++){
        const p = new PIXI.Sprite(texture);
        p.anchor.set(0.5);
        p.alpha = 0.09;

        // let r = Math.floor(Math.random() * 255), 
        //     g = Math.floor(Math.random() * 255),
        //     b = Math.floor(Math.random() * 255);

        // let tint = rgbToHex(r, g, b);

        // p.tint = tint;
        p.tint = "0x4c00a3";
        p.scale.set((Math.random() * 0.3 + Math.random() * 0.1) * pScale);

        // p.x = width / 2;
        // p.y = height / 2;

        p.x = Math.random() * width;
        p.y = Math.random() * height;

        p.mass = Math.random() * 10 + Math.random() * 150;
        // p.mass = 1;
        p.acceleration = {x: 0, y: 0};
        p.velocity = {x: 0, y: 0};

        pSystem.addChild(p);
    }
}

function updateParticles(p){
    let len = p.children.length;
    for (let i = 0; i < len; i++){
        
        p.children[i].velocity.x += p.children[i].acceleration.x / p.children[i].mass;
        p.children[i].velocity.y += p.children[i].acceleration.y / p.children[i].mass;
        
        let pMag = getVectorMagnitude(p.children[i].velocity.x, p.children[i].velocity.y);
        if (pMag > maxPspeed){
            let v = setVectorMagnitude(p.children[i].velocity.x, p.children[i].velocity.y, maxPspeed, pMag);
            p.children[i].velocity.x = v.x;
            p.children[i].velocity.y = v.y;
        }

        p.children[i].rotation = Math.atan2(p.children[i].velocity.y, p.children[i].velocity.x) + Math.PI/2;

        p.children[i].x += p.children[i].velocity.x;
        p.children[i].y += p.children[i].velocity.y;

        constrainEdges(i, p);
    }
}

function constrainEdges(i, p){
    if (p.children[i].x < 0 || p.children[i].x > width){
        p.children[i].acceleration.x *= -1
        p.children[i].velocity.x *= -1
        p.children[i].x = p.children[i].x < 0 ? 1 : width - 1;
    }
    if (p.children[i].y < 0 || p.children[i].y > height){
        p.children[i].acceleration.y *= -1
        p.children[i].velocity.y *= -1
        p.children[i].y = p.children[i].y < 0 ? 1 : height - 1;
    }
}

function attractParticles(pos, p){
    let len = p.children.length;
    for (let i = 0; i < len; i++){
        let force = {x: pos.x - p.children[i].x, y: pos.y - p.children[i].y};
        force = normalizeVector(force);
        p.children[i].acceleration.x = (attractionForce * force.x) + (p.children[i].acceleration.x * 0.98);
        p.children[i].acceleration.y = (attractionForce * force.y) + (p.children[i].acceleration.y * 0.98);
    }
}

let pShow = {value: 0, step: 1, end: 25};
let pShowRestart = {value: 0, step: 1, end: 250};
let randomMover = {pos: {x: width/2, y: height/2 }};

function particle_show(p){
    let iter = Math.floor(Math.random() * 4);

    let dir = Math.floor(Math.random() * 5);
    let offset = 40;
    let center = {x: width / 2, y: height / 2};

    attractParticles(randomMover.pos, p);

    pShow.value += pShow.step;
    if (pShow.step > 0){
        attractParticles(center, p);
    }
    if (pShow.value >= pShow.end || pShow.value <= 0){
        pShow.end = Math.floor(Math.random() * 50 + 50);
        pShow.step *= -1;
        randomMover.pos = {x: (Math.random() * height), y: (Math.random() * width)};
        // randomMover.pos = {x: width / 2, y: height / 2};
    }

    for (let i = 0; i < iter; i++){
        dir = Math.floor(Math.random() * 5);
        offset = 40;
        center = {x: width / 2, y: height / 2};
        switch (dir){
            case 0:
                center.y += offset;
                break;
            case 1:
                center.x += offset;
                break;
            case 2:
                center.y -= offset;
                break;
            case 3:
                center.x -= offset;
                break;
            case 4:
                dir = Math.floor(Math.random() * 4);
                switch (dir){
                    case 0:
                        center.y = 0;
                        break;
                    case 1:
                        center.x = width;
                        break;
                    case 2:
                        center.y = height;
                        break;
                    case 3:
                        center.x = 0;
                        break;
                }
        }
        attractParticles(center, p);
    }

    pShowRestart.value += pShowRestart.step;
    if (pShowRestart.value >= pShowRestart.end){
        let len = p.children.length;
        for (let i = 0; i < len; i++){
            p.children[i].acceleration.x = 0;
            p.children[i].acceleration.y = 0;
            // p.children[i].velocity.x = 0;
            // p.children[i].velocity.y = 0;
        }
        pShowRestart.end = Math.random() * 100 + 25;
        pShowRestart.value = 0;
    }
}
