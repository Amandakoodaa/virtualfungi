class Grid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.grid = new Array(x * y).fill(0);

        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++)
                if (dist(x / 2, y / 2, i, j) > x / 2) {
                    this.grid[(j * this.x) + i] = -1;
                }
        }
        /*
                for (let i of ecoCommunes) {
                    // europe latitude 30-73, lontitude -20-45
                    let x1 = round(map(i.Longitude, -20, 45, 0, this.x)) * scl;
                    let y1 = round(map(i.Latitude, 30, 73, 0, this.y)) * scl;
                    circle(x1, y1, 10)
                    this.grid[this.getIndex(x1, y1)] = i;
                }*/
    }

    empty() {
        this.grid = new Array(this.x * this.y).fill(0);
    }

    getNutrients(x, y) {
        let a = ecoCommunes.find(i => (round(map(i.Longitude, -20, 45, 0, this.x)) * scl == x) && (round(map(i.Latitude, 30, 73, 0, this.y)) * scl == y));
        //console.log(a);
    }

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