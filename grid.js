class Grid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.grid = new Array(x * y).fill(0);

    }

    empty() {
        this.grid = new Array(this.x * this.y).fill(0);
    }

    inBounds(x, y) {
        let bounds = x >= 0 && x < this.x && y >= 0 && y < this.y;
        //let bounds = dist(this.x / 2, this.y / 2, x, y) > min(this.x, this.y)
        return bounds;
    }

    getIndex(x, y) {
        return (y * this.x) + x;
    }

    getElement(x, y) {
        return this.grid[this.getIndex(x, y)];
    }


    addNode(node) {
        let x = Math.round(node.pos.x);
        let y = Math.round(node.pos.y);

        if (this.inBounds(x, y)) {
            let i = this.getIndex(x, y);
            if (this.grid[i] === 0) {
                this.grid[i] = node;
                // let colors = this.getPixel(x, y);
                // node.grey = colors.grey;
                return true;
            }
        }
        return false;

    }

}