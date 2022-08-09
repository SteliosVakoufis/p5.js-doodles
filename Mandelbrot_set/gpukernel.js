const gpu = new GPU();

const calcIterations = gpu.createKernel(function(max_iterations, a_read, b_read, ca, cb, n_read){
    debugger;
    let a = a_read, b = b_read, n = n_read;

    for (let i = 0; i < max_iterations; i++){
        let aa = (a * a) - (b * b);
        let bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (a + b > 16){
            break;
        }
        n++;
    }
    return [a, b, n];
}).setOutput([1])

const calculateMandlebrot = gpu.createKernel(function(loc_x, loc_y, w, h, z){
    debugger;
    let x = this.thread.x;
    let y = this.thread.y;


    let max_iterations = 255;
    let pixel_brightness = 255;

    let a = (((x + loc_x) / w) * 4 - 2) * z;
    let b = (((y + loc_y) / h) * 4 - 2) * z;

    let ca = a;
    let cb = b;

    let n = 0;

    let c_r = 0,
    c_g = 0,
    c_b = 0;

    for (let i = 0; i < max_iterations; i++){
        let aa = (a * a) - (b * b);
        let bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (a + b > 16){
            break;
        }
        n++;
    }

    c_r = pixel_brightness * (n / max_iterations) * (max_iterations / 255);
    c_g = pixel_brightness * (n / max_iterations) * (max_iterations / 400);
    c_b = pixel_brightness * (n / max_iterations) * (max_iterations / 255);

    if (n == max_iterations){
        c_r = 0;
        c_g = 0;
        c_b = 0;
    }

    let r = [c_r, c_g, c_b];
    return r;
}).setOutput([720, 720]);

var v_w, v_h;
