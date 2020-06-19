let tank;
let ground;

function preload() {
}

function setup() {
  createCanvas(400, 400);
  tank = new Tank(width/2, height/2, 20, 10);
}

function draw() {
  background(220);
  fill(0);
  rectMode(CENTER);
  tank.display();

  //Movement keys

  // w key
  if (keyIsDown(87)) {
  }
  // s key
  if (keyIsDown(83)) {
  }
  //d key
  if (keyIsDown(68)) {
    tank.a += 1
  }
  //a key
  if (keyIsDown(65)) {
    tank.a -= 1
  }
}

let isMoving = false;
let direction = 0;


class Tank {

  constructor(x, y, a, speed) {
    this.a = a;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  move(x, y, a) {
    this.a += a*this.speed;
    this.x += x*this.speed;
    this.y += y*this.speed;
  }

  display() {
    push();
    translate(this.x,this.y);
    rotate(radians(this.a));
    rect(0, 0, 50, 50);
    pop();
  }
}