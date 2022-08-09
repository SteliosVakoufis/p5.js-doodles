let inputMode = 0;

function mouseDragged(e){
    //LEFT CLICK - SPAWN MATERIALS
    if (e.buttons == 1){
        update_CanvasArray({x: mouseX, y: mouseY});
    }
}

function mouseWheel(e) {
    if (e.delta < 0){
        //SCROLL UP
        changeInputMode(1);
    }else{
        //SCROLL DOWN
        changeInputMode(-1);
    }
}

function changeInputMode(input){
    let modes = idColors.length - 1;

    inputMode += input;

    if (inputMode > modes){
        inputMode = 0;
    }else if (inputMode < 0){
        inputMode = modes;
    }
}
