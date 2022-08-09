var loc, 
    zoom, 
    zoom_sensitivity, 
    hold_loc;

var loc_sets = [
    {x: 0, y: 0, z: .5, zs: .01},
    {x: -2098.100500050932, y: -6443.6696001759265, z: 0.01300099999999993, zs: 0.001},
    {x: 4271.556400006084, y: -7549.8339999754535, z: 0.020999999999999974, zs: 0.0001}
];

function init_loc(){
    let set = 0;
    loc = {x: loc_sets[set].x, y: loc_sets[set].y};
    zoom = loc_sets[set].z;
    zoom_sensitivity = loc_sets[set].zs;
    hold_loc = {x: 0, y: 0};
}

function mouseWheel(e){
    if(e.delta < 0){
        zoom -= zoom_sensitivity;
    }else if (e.delta > 0){
        zoom += zoom_sensitivity;
    }
    zoom = clamp(zoom, 0.0000001, 2);
    loc.x += loc.x * (zoom * zoom_sensitivity);
    loc.y += loc.y * (zoom * zoom_sensitivity);

    // loc.x = zoom;
    // loc.y = zoom;
    info();
}

function mousePressed(e){
    if (e.button == 0){
        hold_loc.x = mouseX;
        hold_loc.y = mouseY;
    }
    if (e.button == 2){
        info();
    }
}

function mouseDragged(){
    if (mouseIsPressed){
        let nx = hold_loc.x - mouseX;
        let ny = hold_loc.y - mouseY;
        loc.x +=  nx * (deltaTime / 50);
        loc.y +=  ny * (deltaTime / 50);
        hold_loc.x = mouseX;
        hold_loc.y = mouseY;
    }
}

function clamp(v, vmin, vmax){
    return v <= vmin ? vmin : v >= vmax ? vmax : v;
}

function info(){
  print("Location: [" + loc.x + ", " + loc.y + "]" + " \nZoom: " + zoom + " ZoomSensitivity: " + zoom_sensitivity);
}