class Node {
    constructor(pos) {
        this.pos = pos.copy();
        this.branches = [];
        this.growthAttempt = 0;
        this.grey;
    }

    show() {
        strokeWeight(0.3);
        stroke(0)
        fill(0, 0);
        circle(this.pos.x * scl, this.pos.y * scl, 10);
    }
}
