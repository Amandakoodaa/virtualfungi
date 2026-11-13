class Grid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.grid = new Array(x * y).fill(0);

    }
    // europe latitude 30-73, lontitude 20-45
    //ALL cordinates inside these values

    empty() {
        this.grid = new Array(this.x * this.y).fill(0);
    }
    /*
        getPixel(x, y) {
            let i = ((y * scl * video.width) + x * scl) * 4;
            let r = video.pixels[i + 0];
            let g = video.pixels[i + 1];
            let b = video.pixels[i + 2];
            let grey = (r + b + g) / 3;
    
            return { r: r, g: g, b: b, grey: grey };
        }
    */
    inBounds(x, y) {
        let bounds = x >= 0 && x < this.x && y >= 0 && y < this.y;
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