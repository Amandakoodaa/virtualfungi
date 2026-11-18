let network;
let grid;
let col = 10;
let video;
let w;
let h;
let seed = 1;
let ecoCommunes = [];
let img, img2;
let mushrooms = [];

let scl = 4;
let cols, rows;

async function setup() {
    let w = windowWidth;
    let h = windowHeight;
    /*
        let response = await fetch('data/GEN_Europe_Members_Aspiring_member_ecovillage.geojson');
        let data = await response.json();
    
        ecoCommunes = data.features;
    
        response = await fetch('data/GEN_Europe_Members_Full_member_ecovillage.geojson');
        data = await response.json();
    
        ecoCommunes = ecoCommunes.concat(data.features);
    
        response = await fetch('data/GEN_Europe_Members_Ecoproject.geojson');
        data = await response.json();
    
        ecoCommunes = ecoCommunes.concat(data.features);
        ecoCommunes = ecoCommunes.map(i => i.properties);
    
        console.log(ecoCommunes);*/

    img2 = await loadImage('photos/20261019-142031621.png');

    createCanvas(w, h);

    cols = floor(w / scl);
    rows = floor(h / scl);

    grid = new Grid(cols, rows);

    network = new Network(grid);
    //frameRate(30);
    pixelDensity(1);
    background(col);
    img = createImage(w, h);
    img.loadPixels();
    for (let i = 0; i < 10000; i++) {
        let x = round(random(0, width));
        let y = round(random(0, height));
        let i = (x + y * width) * 4;
        img.pixels[i + 0] = 0;
        img.pixels[i + 1] = 0;
        img.pixels[i + 2] = 0;
        img.pixels[i + 3] = 255;
    }
    img.updatePixels();

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
        //blendMode(DARKEST)
        network.show();
        blendMode(DARKEST)
        image(img2, 0, 0, width, height);
        blendMode(REMOVE)
        image(img, 0, 0);
        blendMode(BLEND)

    }



}

function mouseClicked() {
    if (network) {
        grid = new Grid(cols, rows);
        network = new Network(grid);
        background(col);
        blendMode(REMOVE)
        image(img, 0, 0);
        blendMode(BLEND)
    }
}

function keyPressed() {
    if (key === ' ' && network) {
        network.active = !network.active;
    }
}

