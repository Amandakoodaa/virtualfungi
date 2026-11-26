

class Network {
    constructor(grid) {
        this.nodes = [];
        this.branches = [];
        this.grid = grid;
        this.growingTips = [];
        this.nextTips = [];
        this.active = true;
        this.newBranches = [];
        this.growing = true;
        this.conflicts = conflicts;

        let pos = createVector(this.grid.x / 2, this.grid.y / 2);

        let startNode = new Node(pos);

        if (this.grid.addNode(startNode)) {
            let dir = createVector(random(-100, 100), random(-100, 100)).normalize();

            this.nodes.push(startNode);
            this.growingTips.push(startNode);

            let root = new Branch(null, pos, dir, startNode, null);
            this.branches.push(root);
            startNode.branches.push(root);
            this.newBranches.push(root);
        }
    }

    nutrientInfluence(node) {
        let x = Math.round(node.pos.x);
        let y = Math.round(node.pos.y);
        let num = 0;
        let dir = createVector(0, 0);

        for (let nutrient of this.conflicts) {
            let diff = p5.Vector.sub(nutrient.pos, node.pos);
            let dSquare = diff.magSq();

            if (dSquare > 0 && dSquare < nutrient.radius * nutrient.radius) {
                diff.normalize();
                let strength = nutrient.strength / dSquare;
                dir.add(diff.mult(strength));
                num++;
            }
        }
        if (dir.magSq() > 0) {
            dir.normalize();
        }

        return { dir: dir, density: num };
    }

    neighbourInfluence(node) {
        let num = 0;
        //let nutrient = 0;

        let x = Math.round(node.pos.x);
        let y = Math.round(node.pos.y);
        //Neighbour influence values x and y
        let x2 = 0;
        let y2 = 0;
        //Square of neighboring area range
        let square = range * range;
        // Get the range for neighbours
        let minX = Math.max(0, x - range);
        let maxX = Math.min(this.grid.x - 1, x + range);

        let minY = Math.max(0, y - range);
        let maxY = Math.min(this.grid.y - 1, y + range);
        //Go through range
        for (let i = minX; i <= maxX; i++) {
            for (let j = minY; j <= maxY; j++) {

                let candidate = this.grid.getElement(i, j);

                if (candidate !== 0 && candidate !== node) {

                    let x3 = node.pos.x - candidate.pos.x;
                    let y3 = node.pos.y - candidate.pos.y;

                    let dSquare = x3 * x3 + y3 * y3;

                    if (dSquare > 0 && dSquare < square) {
                        //let brightness = this.grid.getPixel(i, j).grey;
                        //let nutriValue = brightness / 255;
                        x2 += (x3 / dSquare)// * nutriValue;
                        y2 += (y3 / dSquare)// * nutriValue;
                        //nutrient += nutriValue;
                        num++;
                    }
                }
            }
        }
        //Distance
        const dis = sqrt(x2 * x2 + y2 * y2);
        // Check for invalid distance of x2 and y2
        if (dis > 0) {
            //Invert distance so hypha tip doesn't grow towards neighbours
            const invertDis = 1 / Math.sqrt(dis);
            x2 *= invertDis;
            y2 *= invertDis;
        }

        return { dir: createVector(x2, y2), density: num };
    }

    branch(dir, node) {
        let side = Math.floor(Math.random() * 2) * 2 - 1;
        let angle = side * random(0.15, 0.9) + randomGaussian() * branchNoise;
        let dir2 = dir.copy().rotate(angle).normalize();

        let pos2 = node.pos.copy().add(dir2.copy().mult(growthStep));
        let x2 = Math.round(pos2.x);
        let y2 = Math.round(pos2.y);

        if (this.grid.inBounds(x2, y2) && this.grid.getElement(x2, y2) === 0) {
            let node2 = new Node(pos2);
            if (this.grid.addNode(node2)) {
                let pBranch = node.branches[node.branches.length - 1];
                let branch2 = new Branch(pBranch, node.pos, dir2, node, node2);
                this.nodes.push(node2);
                this.branches.push(branch2);
                node.branches.push(branch2);
                node2.branches.push(branch2);
                this.nextTips.push(node2);
                this.newBranches.push(branch2);
            }
        }


    }


    grow() {
        this.nextTips = [];

        for (let i = 0; i != this.growingTips.length; i++) {
            let node = this.growingTips[i];

            if (node.branches.length > 0) {
                let pBranch = node.branches[node.branches.length - 1];
                //Forward persistent
                let dir = pBranch.dir.copy().mult(forwardPersistence);
                //Neighbour avoidance
                let neighbour = this.neighbourInfluence(node);
                //Nutrient influence
                let nutrient = this.nutrientInfluence(node);
                let avoid = neighbour.dir;
                let density = neighbour.density;

                dir.add(avoid.mult(neighbourAvoidance));
                dir.add(nutrient.dir.mult(nutrientWeight));

                let noiseValue = randomGaussian() * noiseV;
                dir.rotate(noiseValue);
                dir.normalize();

                let newPos = node.pos.copy().add(dir.copy().mult(growthStep));

                let x = Math.round(newPos.x);
                let y = Math.round(newPos.y);

                if (this.grid.inBounds(x, y)) {
                    if (this.grid.getElement(x, y) === 0) {
                        let newNode = new Node(newPos);


                        if (this.grid.addNode(newNode)) {
                            let newBranch = new Branch(pBranch, node.pos, dir, node, newNode);
                            this.nodes.push(newNode);
                            this.branches.push(newBranch);
                            node.branches.push(newBranch);
                            newNode.branches.push(newBranch);
                            this.nextTips.push(newNode);
                            this.newBranches.push(newBranch);
                            let conflict = this.conflicts.find(n => p5.Vector.dist(n.pos, newPos) < 1);
                            if (conflict) {
                                conflict.found = true;
                                this.conflicts = this.conflicts.filter(n => n !== conflict);
                                console.log(this.conflicts.length)
                            }

                            if (density < branchingD) {
                                this.branch(dir, newNode);
                            }
                        }
                    } else if (node.growthAttempt < maxAttempts) {
                        this.nextTips.push(node);
                        node.growthAttempt++;
                    }
                }


            }

        }
        let hold = this.growingTips;
        this.growingTips = this.nextTips;
        this.nextTips = hold;
        //console.log(this.branches.length)
        if (hold.length === 0 || this.branches.length > 5000) {
            this.growing = false;
        }
    }

    shrink() {
        let steps = 10;
        this.branches.length = max(this.branches.length - steps, 0);
        this.nodes.length = max(this.nodes.length - steps, 1);
        if (this.nodes.length === 1) {
            this.growing = true;
            this.nodes[0].growthAttempt = 0;
            this.growingTips = [];
            this.newBranches = [];
            this.growingTips.push(this.nodes[0]);
            this.nodes[0].branches.pop();
            this.grid.empty();
            conflicts.forEach(n => n.found = false);
            conflicts.forEach(n => n.soundPayed = false);
            this.conflicts = conflicts;
            background(col);
        }
    }
    show() {
        if (this.growing) {
            for (let branch of this.newBranches) {
                branch.show();
            }
            for (let tip of this.growingTips) {
                tip.show()
            }
        } else {
            for (let branch of this.branches) {
                branch.show();
                blendMode(REMOVE)
                //image(img, 0, 0);
                blendMode(BLEND)
            }

        }
        this.newBranches = [];

    }
}