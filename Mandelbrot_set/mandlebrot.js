function cpuGenerate(){
    let max_iterations = 500;

    loadPixels();
    for (let x = 0; x < width; x++){
        for (let y = 0; y < height; y++){
            let pixel_index = (x + y * width) * 4;
            let pixel_brightness = 255;

            let a = (((x + loc.x) / -width) * (zoom * 2)) + zoom;
            let b = (((y + loc.y) / -height) * (zoom * 2)) + zoom;

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

                if (a + b > 167){
                    break;
                }
                n++;
            }

            c_r = pixel_brightness * (n / max_iterations) * 0.5 * 1,
            c_g = pixel_brightness * (n / max_iterations) * 0.9 * 1,
            c_b = pixel_brightness * (n / max_iterations) * 0.9 * 2;

            if (n == max_iterations){
                c_r = 0;
                c_g = 0;
                c_b = 0;
            }

            pixels[pixel_index + 0] = c_r;
            pixels[pixel_index + 1] = c_g;
            pixels[pixel_index + 2] = c_b;
            pixels[pixel_index + 3] = 255;
        }
    }

    updatePixels();
}

function gpuGenerate1(){
    let max_iterations = 100;

    loadPixels();
    for (let x = 0; x < width; x++){
        for (let y = 0; y < height; y++){
            let pixel_index = (x + y * width) * 4;
            let pixel_brightness = 255;

            let a = (((x + loc.x) / -width) * (zoom * 2)) + zoom;
            let b = (((y + loc.y) / -height) * (zoom * 2)) + zoom;

            let ca = a;
            let cb = b;

            let n = 0;

            let c_r = 0,
            c_g = 0,
            c_b = 0;
            
            let r = calcIterations(max_iterations, a, b, ca, cb, n);
            if (x == 0 && y == 0){
                print(r);
            }

            a = r[0][0];
            b = r[0][1];
            n = r[0][2];

            c_r = pixel_brightness * (n / max_iterations) * 0.5 * 1,
            c_g = pixel_brightness * (n / max_iterations) * 0.9 * 1,
            c_b = pixel_brightness * (n / max_iterations) * 0.9 * 2;

            if (n == max_iterations){
                c_r = 0;
                c_g = 0;
                c_b = 0;
            }

            pixels[pixel_index + 0] = c_r;
            pixels[pixel_index + 1] = c_g;
            pixels[pixel_index + 2] = c_b;
            pixels[pixel_index + 3] = 255;
        }
    }
    updatePixels();
}

function gpuGenerate2(){
    let p = calculateMandlebrot(loc.x, loc.y, width, height, zoom);
    loadPixels();
    let pixel_index = 0, i = 0;
    for (let x = 0; x < width; x++){
        for (let y = 0; y < height; y++){
            pixels[pixel_index + 0] = p[x][y][0];
            pixels[pixel_index + 1] = p[x][y][1];
            pixels[pixel_index + 2] = p[x][y][2];
            pixels[pixel_index + 3] = 255;
            pixel_index += 4;
            i++;
        }
    }
    updatePixels();
    // noLoop();
}