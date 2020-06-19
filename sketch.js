let tank;
let ground;

function preload() {
  ground = createImg('https://cutewallpaper.org/21/minecraft-dirt-background/Images-of-Dirt-Background-Minecraft-wwwindustriousinfo.png');
  ground.hide();
}

function setup() {
  createCanvas(800, 600);
  tank = new Tank(width/2, height/2, 0, 2, 2);
  map = new Map(width/2, height/2);
}

function draw() {

  map.display();
  tank.display();

  //Movement keys

  // w key
  if (keyIsDown(87)) {
    map.update(-sin(tank.a)*tank.dspeed,cos(tank.a)*tank.dspeed);
  }
  // s key
  if (keyIsDown(83)) {
    map.update(sin(tank.a)*tank.dspeed,-cos(tank.a)*tank.dspeed);
  }
  //d key
  if (keyIsDown(68))
    tank.a += 1*tank.tspeed;
  //a key
  if (keyIsDown(65))
    tank.a -= 1*tank.tspeed;
}

class Tank {
  constructor(x, y, a, dspeed, tspeed) {
    this.a = a;
    this.x = x;
    this.y = y;
    this.dspeed = dspeed;
    this.tspeed = tspeed;
  }

  display() {

    //body setup
    push();
    translate(this.x,this.y);
    this.a = this.a % 360;

    push();
    rotate(this.a);

    //body
    rectMode(CENTER);
    rect(0, 0, 60, 70);

    //temporary info
    textAlign(LEFT);
    text(this.a, 30,0);
    text('cos: ' + cos(radians(this.a)), 30,30);
    text('sin: ' + sin(radians(this.a)), 30,40);

    pop();
    
    push();
    //turret
    angleMode(DEGREES);
    rotate(atan2(mouseY - height / 2, mouseX - width / 2)+90);
    ellipse(0,0,40,40);
    rectMode(CENTER);
    rect(0,-24,10,10);
    pop();
  }
}

class Map {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(x, y) {
    this.x += x;
    this.y += y;
  }

  display() {
    imageMode(CENTER);
    image(ground, this.x, this.y);
  }
}