function initDiscSliders(){
    let dcount = document.getElementById("discsSlider").value;

    document.getElementById("controls").innerHTML = "";
    for (let i = 0; i < dcount; i++){
        var slider = document.createElement('input');
        slider.id = "DiamDisc";
        slider.className = "DiamDisc";
        slider.type = 'range';
        slider.min = 15;
        slider.max = 50;
        slider.value = 30;
        slider.step = 0.05;
        slider.onchange = initDiscParams;
        document.getElementById("controls").appendChild(slider);

        var slider = document.createElement('input');
        slider.id = "RotSpeed";
        slider.className = "DiamDisc";
        slider.type = 'range';
        slider.min = -0.1;
        slider.max = 0.1;
        slider.value = 0;
        slider.step = 0.0001;
        slider.onchange = initDiscParams;
        document.getElementById("controls").appendChild(slider);

        var checkbox = document.createElement('input');
        checkbox.id = "isDrawer";
        checkbox.className = "isDrawer";
        checkbox.type = 'checkbox';
        checkbox.onchange = initDiscParams;
        document.getElementById("controls").appendChild(checkbox);

        document.getElementById("controls").appendChild(document.createElement('br'));
    }
}

function initDiscParams(){
    let diamDisc = document.querySelectorAll('[id^="DiamDisc"]');
    let rotSpeed = document.querySelectorAll('[id^="RotSpeed"]');
    let isDrawer = document.querySelectorAll('[id^="isDrawer"]');

    discsParams = [];

    for (let i = 0; i < diamDisc.length; i++){
        let params = [float(diamDisc[i].value), float(rotSpeed[i].value), 0, isDrawer[i].checked];
        discsParams.push(params);
    }

    initDiscs();
}
