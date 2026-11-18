class Branch {
    constructor(parent, pos, dir, start, end) {
        this.pos = pos.copy();
        this.parent = parent;
        this.dir = dir.copy();
        this.origDir = this.dir.copy();
        this.random = random();

        this.startNode = start;
        this.endNode = end;
    }

    show() {
        if (this.startNode !== null && this.endNode !== null) {

            let a = this.startNode.pos.copy().mult(scl);
            let b = this.endNode.pos.copy().mult(scl);
            noStroke();

            blendMode(BLEND)

            //line(a.x, a.y, b.x, b.y);
            let d = dist(a.x, a.y, b.x, b.y);

            for (let i = 0; i < d; i++) {
                let step = map(i, 0, d, 0, 1);
                const x = lerp(a.x, b.x, step);
                const y = lerp(a.y, b.y, step);
                const r = 4;
                fill(0);
                noStroke();
                ellipse(x, y, r, r);
            }

            for (let i = 10; i <= 50; i += 10) {
                fill(255, 10)
                blendMode(SOFT_LIGHT)
                circle(a.x, a.y, i)
            }
            blendMode(BLEND)
            let density = this.startNode.branches.length;

            // blendMode(ADD)
            //density === 3 dots good for something
            if (this.random >= 0.6) {
                noStroke();
                fill(0);
                circle(a.x, a.y, 8);
                circle(b.x, b.y, 5);
                randomSeed(seed);
                let x = random(-100, 100) * this.dir.x + a.x;
                let y = random(-100, 100) * this.dir.y + a.y;
                circle(x, y, 6);
                for (let i = 10; i <= 50; i += 10) {
                    fill(255, 40)
                    blendMode(SOFT_LIGHT)
                    circle(x, y, i)
                }
                blendMode(BLEND);
            }


        }
    }
}