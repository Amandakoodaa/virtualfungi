class Conflict {
    constructor(data) {
        this.conflict = data;
        this.pos = createVector(round(random(15, windowWidth - 10) / scl), round(random(10, windowHeight - 10) / scl))
        this.found = false;
        this.strength = 1;
        this.radius = 100;
        //this.points = font.textToPoints(data.name, this.pos.x * scl, this.pos.y * scl, 10, { sampleFactor: 0.2 });
        this.soundPayed = false;
    }

    show() {
        noStroke();
        fill(220);
        circle(this.pos.x * scl, this.pos.y * scl, 1);
        if (this.found) {
            fill(220);
            textSize(11);
            if (!this.soundPayed) {
                //sound.play();
                this.soundPayed = true;
            }
            text(this.conflict.headline, this.pos.x * scl, this.pos.y * scl, width - this.pos.x * scl, height - this.pos.y * scl)
        }
    }
}