let tank;
function setup() {
  createCanvas(400, 400);
  tank = new Tank(0, 0, 20, 10);
}

function draw() {
  background(220);
  fill(0);
  tank.display(); 
}

let isMoving = false;
let direction = 0;

function keyTyped() {
  if (key === 'w') {
  }
  if (key === 'a') {
    isMoving = true;
    direction = -1;
  }
  if (key === 's') {
  }
  if (key === 'd') {
    isMoving = true;
    direction = 1;
  }
}

class Tank {

  constructor(x, y, a, speed) {
    this.a = a;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  move() {

  }

  display() {
    push();
    translate(width/2,height/2);
    rect(this.x, this.y, 50, 50);
    pop();
  }
}