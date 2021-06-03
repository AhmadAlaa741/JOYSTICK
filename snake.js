const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


let grid=[];
let open=[];
let closed=[];
let neighbours;
let path;

(function create() {
    cols = Math.floor(canvas.width / c);
    rows = Math.floor(canvas.height / c);
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            var cell = new Cell(y, x);
            grid.push(cell);
        }
    }
});


///snake object >> function = obj
function Snake() {
    
    this.x = 0;
    this.y = 0;
    this.size = 10;
    this.xSpeed = this.size;
    this.ySpeed = 0;
    this.score;
    this.total = 0;
    this.tail = [];

    this.draw = function () {
        ctx.fillStyle = "white";
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x,this.tail[i].y, this.size, this.size);
            ctx.strokestyle = "black";
            ctx.strokeRect(this.tail[i].x, this.tail[i].y, this.size, this.size);
        }
        ctx.fillRect(this.x, this.y, this.size, this.size);  
    }


    this.update = function () {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        this.tail[this.total - 1] = {
            x: this.x, y: this.y
        };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x > canvas.width) {
            this.x = 0;
        }

        if (this.y > canvas.height) {
            this.y = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width;
        }

        if (this.y < 0) {
            this.y = canvas.height;
        }
    }
    

    this.controller = function (direction) {
        switch (direction) {
            case 'Up':
                this.xSpeed = 0;
                this.ySpeed = - this.size;
                break;
            case 'Down':
                this.xSpeed = 0;
                this.ySpeed = this.size;
                break;
            case 'Left':
                this.xSpeed = - this.size;
                this.ySpeed = 0;
                break;
            case 'Right':
                this.xSpeed = this.size;
                this.ySpeed = 0;
                break;
        }
    }

    this.eat = function (fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }
        return false;
    }

    this.lose = function () {
        for (var i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                this.total = 0;
                this.score = this.total;
                this.tail = [];
            }
        }

    }


}

function Fruit() {
    this.x;
    this.y;
    this.size = 10;
    this.color = "red";

    this.FruitRand = function () {
        this.x = (Math.floor(Math.random() * 29)+ 1) * this.size;
        this.y = (Math.floor(Math.random() * 29) + 1) * this.size;
    }

    this.draw = function () {
        ctx.fillStyle =this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}













var snake;

(function gameloop() {
    snake = new Snake();
    fruit = new Fruit();
    //fruit.draw();
    fruit.FruitRand();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.FruitRand();
        }
        snake.lose();

    }, 65);
}());

window.addEventListener('keydown', ((evt) => {
    const direct = evt.key.replace('Arrow', '');
    snake.controller(direct);
}));