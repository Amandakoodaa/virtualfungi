let network;
let grid;
let col = 30;
let video;
let w;
let h;
let seed = 1;
let ecoCommunes = [];

let inc = 0.01;
let scl = 4;
let cols, rows;

async function setup() {
    let w = windowWidth;
    let h = windowHeight;

    /*video = createCapture(VIDEO, { flipped: true });

    await new Promise(resolve => {
        video.elt.onloadedmetadata = resolve;
    });

    video.size(w, h);
    // video.hide();*/

    let response = await fetch('GEN_Europe_Members_Aspiring_member_ecovillage.geojson');
    let data = await response.json();

    ecoCommunes = data.features;

    response = await fetch('GEN_Europe_Members_Full_member_ecovillage.geojson');
    data = await response.json();

    ecoCommunes = ecoCommunes.concat(data.features);
    ecoCommunes = ecoCommunes.map(i => i.properties);

    console.log(ecoCommunes);
    createCanvas(w, h);

    cols = floor(w / scl);
    rows = floor(h / scl);

    grid = new Grid(cols, rows);

    network = new Network(grid);
    //frameRate(30);

}

function draw() {
    if (network) {
        //video.loadPixels();
        //background(col);
        if (network.active) {
            if (network.growing) {
                network.grow();
            } else {
                network.shrink();
            }
        }

        network.show();
    }

}

function mouseClicked() {
    if (network) {
        background(255);
        grid = new Grid(cols, rows);
        network = new Network(grid);
    }
}

function keyPressed() {
    if (key === ' ' && network) {
        network.active = !network.active;
    }
}

