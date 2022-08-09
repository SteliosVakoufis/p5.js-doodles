function setVectorMagnitude(x, y, t, m){
    return {x: x * t / m, y: y * t / m};
}

function getVectorMagnitude(x, y){
    return Math.sqrt(x * x + y * y);
}

function normalizeVector(v){
    let mag = getVectorMagnitude(v.x, v.y);
    v.x /= mag;
    v.y /= mag;
    return v;
}
