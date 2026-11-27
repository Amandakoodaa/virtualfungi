let network;
let grid;
let col = 20;
let font;
let w;
let h;
let seed = 1;
let img3;
let img;
let speed = 30;
let count = 0;
let sound;

let searchInput;
let searchText = "";
let dataInfo = [];
let conflicts = [];

let scl = 3;
let cols, rows;

let range = 10;
let branchingD = 14;
let neighbourAvoidance = 0.8;
let nutrientWeight = 2.0;
let forwardPersistence = 1.0;

let noiseV = 0.4;
let branchNoise = 0.3;

let growthStep = 1;
let maxAttempts = 3;

async function setup() {
    w = windowWidth;
    h = windowHeight;

    textFont('Verdana');

    createCanvas(w, h);
    // font = loadFont("photos/IBM_Plex_Mono/IBMPlexMono-BoldItalic.ttf");
    img3 = loadImage('photos/IMG_20220510_0039 (1).jpg');
    sound = loadSound('photos/476836__richwise__phone-short-buzz.wav');
    //https://ejatlas.org/api/v1/conflicts/?limit=4598&offset=&search=
    const response = await fetch('https://ejatlas.org/api/v1/conflicts/?limit=50&offset=&search=')
    const data = await response.json();
    dataInfo = data.results;
    conflicts = dataInfo.map(i => new Conflict(i));
    console.log(conflicts)
    cols = floor(w / scl);
    rows = floor(h / scl);

    grid = new Grid(cols, rows);
    searchInput = select("#searchInput");
    searchInput.elt.addEventListener("keydown", handleSearch);

    network = new Network(grid);
    frameRate(speed);
    pixelDensity(1);
    background(col);
    img = createImage(w, h);
    img.loadPixels();
    for (let i = 0; i < 200000; i++) {
        let x = round(random(0, w));
        let y = round(random(0, h));
        let i = (x + y * w) * 4;
        img.pixels[i + 0] = 0;
        img.pixels[i + 1] = 0;
        img.pixels[i + 2] = 0;
        img.pixels[i + 3] = 255;
    }
    img.updatePixels();

}

function draw() {
    if (network) {
        if (network.active) {
            if (network.growing) {
                network.grow();
            } else {
                background(col, 60);
                network.shrink()
            }
        }
        network.show();
        blendMode(DARKEST);
        image(img3, 0, 0, w, h);
        image(img, 0, 0);
        blendMode(BLEND)
        conflicts.forEach(n => n.show())
    }
}

async function handleSearch(event) {
    if (event.key === "Enter") {
        searchText = searchInput.value();
        console.log("Searching for:", searchText);

        const response = await fetch('https://ejatlas.org/api/v1/conflicts/?search=' + searchText + '&limit=50&offset=0');
        const data = await response.json();
        dataInfo = data.results;
        conflicts = dataInfo.map(i => new Conflict(i));
        console.log(conflicts)

        if (network) {
            grid = new Grid(cols, rows);
            conflicts = dataInfo.map(i => new Conflict(i));
            network = new Network(grid);
            background(col);
            blendMode(DARKEST)
            image(img, 0, 0);
            blendMode(BLEND)
        }
    }
}

function windowResized() {
    w = windowWidth;
    h = windowHeight;

    pixelDensity(1);
    resizeCanvas(w, h);

    cols = floor(w / scl);
    rows = floor(h / scl);

    grid = new Grid(cols, rows);
    conflicts = dataInfo.map(i => new Conflict(i));
    network = new Network(grid);


    img = createImage(w, h);
    img.loadPixels();

    for (let i = 0; i < 200000; i++) {
        let x = floor(random(w));
        let y = floor(random(h));
        let index = (x + y * w) * 4;

        img.pixels[index + 0] = 0;
        img.pixels[index + 1] = 0;
        img.pixels[index + 2] = 0;
        img.pixels[index + 3] = 255;
    }

    img.updatePixels();

    background(col);
}
