function update_CanvasIMG(){
	canvasIMG.loadPixels();
    let pos = 0;
	for (let i = 0; i < canvasIMG.width; i++){
		for (let y = 0; y < canvasIMG.height; y++){
			canvasIMG.set(y, i, idColors[canvasArray[pos].id]);
            pos++;
		}
	}
	canvasIMG.updatePixels();
}

function init_CanvasArray(){
    for (let i = 0; i < width * height; i++){
        canvasArray[i] = {id : 0, updated : false};
    }
    update_CanvasIMG();
}

function update_CanvasArray(update){
    let pos = update.y * width + update.x;
    if (pos >= 0 && pos <= width * height){
        canvasArray[pos - height - 1].id = inputMode;
        canvasArray[pos - height].id = inputMode;
        canvasArray[pos - height + 1].id = inputMode;
        canvasArray[pos - 1].id = inputMode;
        canvasArray[pos].id = inputMode;
        canvasArray[pos + 1].id = inputMode;
        canvasArray[pos + height - 1].id = inputMode;
        canvasArray[pos + height].id = inputMode;
        canvasArray[pos + height + 1].id = inputMode;
    }
}

function run_CanvasArray_Physics(speed){
    for (let c = 0; c < speed; c++){
        for (let i = 0; i < canvasArray.length; i++){
            canvasArray[i].updated = false;
        }
    
        for (let i = 0; i < canvasArray.length; i++){
            if (canvasArray[i].id != 0){
                calculate_physics(i);
            }
        }
    }

    update_CanvasIMG();
}

function calculate_physics(pos){
    if (!canvasArray[pos].updated){
        canvasArray[pos].updated = true;
        let ogID = canvasArray[pos].id;
        let bias = 0;
        //CHECK UP
        bias = -height;
        if (physPrioCheck(pos, bias) && idBehaviors[canvasArray[pos].id][1] != 0){
            canvasArray[pos].id = canvasArray[pos + bias].id;
            canvasArray[pos + bias].id = ogID;
            return 0;
        }
        //CHECK UP - LEFT
        bias = -height - 1;
        if (physPrioCheck(pos, bias) && idBehaviors[canvasArray[pos].id][0] != 0){
            canvasArray[pos].id = canvasArray[pos + bias].id;
            canvasArray[pos + bias].id = ogID;
            return 0;
        }
        //CHECK UP - RIGHT
        bias = -height + 1;
        if (physPrioCheck(pos, bias) && idBehaviors[canvasArray[pos].id][2] != 0){
            canvasArray[pos].id = canvasArray[pos + bias].id;
            canvasArray[pos + bias].id = ogID;
            return 0;
        }
        //CHECK DOWN
        bias = height;
        if (physPrioCheck(pos, bias) && idBehaviors[canvasArray[pos].id][7] != 0){
            canvasArray[pos].id = canvasArray[pos + height].id;
            canvasArray[pos + height].id = ogID;
            return 0;
        }
        //CHECK DOWN - LEFT
        bias = height - 1;
        if (physPrioCheck(pos, bias) && idBehaviors[canvasArray[pos].id][6] != 0){
            canvasArray[pos].id = canvasArray[pos + bias].id;
            canvasArray[pos + bias].id = ogID;
            return 0;
        }
        //CHECK DOWN - RIGHT
        bias = height + 1;
        if (physPrioCheck(pos, bias) && idBehaviors[canvasArray[pos].id][8] != 0){
            canvasArray[pos].id = canvasArray[pos + bias].id;
            canvasArray[pos + bias].id = ogID;
            return 0;
        }
        //CHECK LEFT
        bias = -1;
        if (physPrioCheck(pos, bias) && idBehaviors[canvasArray[pos].id][3] != 0){
            canvasArray[pos].id = canvasArray[pos + bias].id;
            canvasArray[pos + bias].id = ogID;
            return 0;
        }
        //CHECK RIGHT
        bias = 1;
        if (physPrioCheck(pos, bias) && idBehaviors[canvasArray[pos].id][5] != 0){
            canvasArray[pos].id = canvasArray[pos + bias].id;
            canvasArray[pos + bias].id = ogID;
            return 0;
        }
    }
}

function physPrioCheck(pos, bias){ 
    if ((pos + bias) > canvasArray.length - 1 || (pos + bias) < 0){
        canvasArray[pos].id = 0;
        return false;
    }
    else if (idPriorities[canvasArray[pos + bias].id] < idPriorities[canvasArray[pos].id] 
        && !canvasArray[pos + bias].updated)
    {
        canvasArray[pos + bias].updated = true;
        return true;
    }else{
        return false;
    }
}