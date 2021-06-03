    const canvas  = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    drawRect(0,0,canvas.width,canvas.height,'white');


let cols, rows;
let c = 20;
let grid = [];
let queue=[];
let start;
let end;

(function create() {
    cols = Math.floor(canvas.width / c);
    rows = Math.floor(canvas.height / c);
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            var cell = new Cell(y,x);
            grid.push(cell);
        }
    }
    console.log(grid);
    start=grid[0];
    inx = grid.length-1;
    end=grid[5];
}());

(function draw() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
       start.drawCell('green');
       end.drawCell('red');
       let fps =60;
       setInterval(Bfs(start,end) , 1000 / fps);
}());


function drawRect(x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

function drawLine(x,y,z,u){
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(z, u);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}


function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}


function Cell(i,j){
    this.i=i;
    this.j=j;
    this.s = c;
    this.parent;
    this.walls = [true,true,true,true];
    this.visited =false;

    this.checkNeighbors = function () {
        let neighbors=[];
    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];

    if (top && !top.visited) {
        neighbors.push(top);
    }
    if (right && !right.visited) {
        neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
        neighbors.push(bottom);
    }
    if (left && !left.visited) {
        neighbors.push(left);
    }
    if (neighbors.length > 0) {
            return neighbors;
    } 
};

    this.show = function () {
        let x = this.i * this.s;
        let y = this.j * this.s;
        if (this.walls[0]) {
            drawLine(x, y, x + this.s, y);
        }
        if (this.walls[1]) {
            drawLine(x + this.s, y, x + this.s, y + this.s);
        }
        if (this.walls[2]) {
            drawLine(x + this.s, y + this.s, x, y + this.s);
        }
        if (this.walls[3]) {
            drawLine(x, y + this.s, x, y);
        }
    };

    this.drawCell = function (color) {
        let x = this.i * this.s;
        let y = this.j * this.s;
        drawRect(x, y, this.s, this.s, color);
        this.show();
    };
}
/// bfs algorithm  

/*
    1. mark node as visited (true)
    2. enqueue the visited node 
    3. dequeue node as queue not empty
    4. check node neighbours  & adding them in array 
    5. mark neighbour node as visited 
    6. mark neighbour's node parent as the current node 
    7. enqueue neighbour's node to the queue
    8. looping from no. 3 as queue not empty 

*/

function Bfs(curnode,endnode){
    curnode.visited=true;
    queue.push(curnode);
    while (queue.length > 0) {
        curnode = queue.shift();
        if(curnode.visited)
            curnode.drawCell('yellow');
        neighbors = curnode.checkNeighbors();
        for (let i = 0; i < neighbors.length ; i++) {
            neighbors[i].visited = true;
            neighbors[i].parent = curnode;
            queue.push(neighbors[i]);
            while (neighbors[i] === endnode) {
                for (let i = 0; i < neighbors.length; i++) {
                    neighbors[i].parent.drawCell('purple');
                    console.log(neighbors);
                }
            }  
        }

    }
}