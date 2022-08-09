function generateTowns(c){
    let margin = 7;
	let t = [];
    let w = width - width/margin * 2;
    let h = height - height/margin * 2;
	for (let i = 0; i < c; i++){
		let x = floor(random(w)) + width/margin;
		let y = floor(random(h)) + height/margin;
		t.push({x: x, y: y, id: i});
	}
	return t;
}

function serializeTowns(c){
	let t = [];
	for (let i = 0; i < c; i++){
		t.push(i);
	}
	return t;
}

function showTowns(t, a, n){
	stroke(0, a);
	noFill();
	for (let i = 0; i < t.length - 1; i++){
		line(t[i].x, t[i].y, t[i+1].x, t[i+1].y)
	}
    if (n){
        for (let i = 0; i < t.length; i++){
            noFill();
            stroke(0);
            ellipse(t[i].x, t[i].y, 10);
            textAlign(CENTER);
            stroke(0, 100, 0);
            text(i + 1, t[i].x, t[i].y - 15);
        }
    }
}

function randomizeTowns(t){
    let temp_array = t.slice();
    let return_array = [];
    
    while (temp_array.length != 0){
        let rand = floor(random(temp_array.length));

        return_array.push(temp_array[rand]);

        temp_array.splice(rand, 1);
    }

    for (let i = 0; i < return_array.length - 1; i++){
        stroke(0, 25);
        noFill();
        line(return_array[i].x, return_array[i].y, return_array[i+1].x, return_array[i+1].y);
    }

    let temp_distance = 0;
    for (let i = 0; i < return_array.length - 1; i++){
        temp_distance += calculateDistance(return_array[i], return_array[i+1]);
    }

    if (temp_distance < distance){
        print("new distance! " + temp_distance);
        distance = temp_distance;
        return return_array;
    }else{
        return t;
    }
}

function calcShortestPath(t){
    let temp_array = t.slice();

    // Find the largest x such that P[x]<P[x+1].
    // (If there is no such x, P is the last permutation.)
    // Find the largest y such that P[x]<P[y].
    // Swap P[x] and P[y].
    // Reverse P[x+1 .. n].

    //STEP 1
    let largestI = -1;
    for (let i = 0; i < temp_array.length - 1; i++){
        if (temp_array[i].id < temp_array[i+1].id){
            largestI = i;
        }
    }
    if (largestI == -1){
        print("finished");
        noLoop();
        return false;
    }

    //STEP 2
    let largestY = -1;
    for (let y = 0; y < temp_array.length; y++){
        if (temp_array[largestI].id < temp_array[y].id){
            largestY = y;
        }
    }

    //STEP 3
    swap(temp_array, largestI, largestY);

    //STEP 4
    let endArray = temp_array.splice(largestI + 1);
    endArray.reverse();
    temp_array = temp_array.concat(endArray);

    if (calcPathDistance(temp_array)){
        shortestPath = temp_array.slice();
        print("New shortest path discovered! Distance: " + distance);
    }

    towns = temp_array;
    return true;
}

function swap(t, i, y){
    let tempVar = t[i];
    t[i] = t[y];
    t[y] = tempVar;
}

function calcPathDistance(t){
    let temp_distance = 0;
    for (let i = 0; i < t.length - 1; i++){
        temp_distance += calculateDistance(t[i], t[i+1]);
    }

    if (temp_distance < distance){
        distance = temp_distance;
        return true;
    }else{
        return false;
    }
}

function calculateDistance(a, b){
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}
