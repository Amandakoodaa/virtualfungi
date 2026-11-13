class Branch {
    constructor(parent, pos, dir, start, end) {
        this.pos = pos.copy();
        this.parent = parent;
        this.dir = dir.copy();
        this.origDir = this.dir.copy();
        this.count = 0;
        this.startNode = start;
        this.endNode = end;
    }

    show() {
        if (this.startNode !== null && this.endNode !== null) {
            let a = this.startNode.pos.copy().mult(scl);
            let b = this.endNode.pos.copy().mult(scl);

            //line(a.x, a.y, b.x, b.y);
            let d = dist(a.x, a.y, b.x, b.y);

            for (let i = 0; i < d; i++) {
                let step = map(i, 0, d, 0, 1);
                const x = lerp(a.x, b.x, step);
                const y = lerp(a.y, b.y, step);
                const r = 1.5;
                fill(0);
                noStroke();
                ellipse(x, y, r, r);
            }
            let density = this.startNode.branches.length;

            // blendMode(ADD)
            //density === 3 dots good for something
            if (density >= 3) {
                noStroke();
                fill(0);
                circle(a.x, a.y, density * 2.5);
                circle(b.x, b.y, density * 2);
                randomSeed(seed + a * b);
                circle(random(-10, 10) + a.x, random(-10, 10) + a.y, random(3, 4));
            }


        }
    }
}