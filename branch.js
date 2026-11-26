class Branch {
    constructor(parent, pos, dir, start, end) {
        this.pos = pos.copy();
        this.parent = parent;
        this.dir = dir.copy();
        this.origDir = this.dir.copy();
        this.random = random();

        this.startNode = start;
        this.endNode = end;
        if (this.startNode !== null && this.endNode !== null) {

            this.a = this.startNode.pos.copy().mult(scl);
            this.b = this.endNode.pos.copy().mult(scl);
        }
    }

    show() {
        if (this.startNode !== null && this.endNode !== null) {

            let a = this.startNode.pos.copy().mult(scl);
            let b = this.endNode.pos.copy().mult(scl);
            stroke(250);
            strokeWeight(2);
            line(a.x, a.y, b.x, b.y);

            if (this.random >= 0.8) {
                noStroke();
                fill(255);
                randomSeed(seed);
                circle(a.x, a.y, 7);
                circle(b.x, b.y, 8);
                let x = random(-100, 100) * this.dir.x + a.x;
                let y = random(-100, 100) * this.dir.y + a.y;
                circle(x, y, 1.5);
                if (this.random > 0.9) {
                    circle(x, y, 3);
                }
            }


        }
    }
}