var sandColor = 150,
    wallColor = 200;

function mouseDragged(e){
    if (e.buttons == 1){
        spawnSandParticle(e, sandColor);
    }
    if (e.buttons == 2){
        spawnSandParticle(e, wallColor);
    }
}

function spawnSandParticle(e, c){
    let xx = Math.ceil(e.x / sim_resolution);
    let yy = Math.ceil(e.y / sim_resolution);

    let pos = (yy * width / sim_resolution) + xx - (width / sim_resolution);
    sim[pos].col = c;
}

function runSim(){
    let row_size = width / sim_resolution,
        sim_size = sim.length;
    
    for (let i = 0; i < sim_size; i++){
        if (sim[i].col == sandColor){
            if (!sim[i].updated){
                let ii = i % row_size;
                if (i + row_size < sim_size && sim[i + row_size].col == 0){
                    sim[i].col = 0;
                    sim[i + row_size].col = sandColor;
                    sim[i + row_size].updated = true;
                }
                else if (i + row_size - 1 < sim_size && sim[i + row_size - 1].col == 0){
                    sim[i].col = 0;
                    sim[i + row_size - 1].col = sandColor;
                    sim[i + row_size - 1].updated = true;
                }
                else if (i + row_size + 1 < sim_size && sim[i + row_size + 1].col == 0){
                    sim[i].col = 0;
                    sim[i + row_size + 1].col = sandColor;
                    sim[i + row_size + 1].updated = true;
                }
            }else{
                sim[i].updated = false;
            }
        }
    }
}
