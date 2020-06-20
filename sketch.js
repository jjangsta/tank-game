let tank;
let ground;
let weapon;

function preload() {
  // Background Image
  ground = createImg('https://cutewallpaper.org/21/minecraft-dirt-background/Images-of-Dirt-Background-Minecraft-wwwindustriousinfo.png');
  ground.hide();
}

function setup() {
  // Resolution
  createCanvas(800, 600);
  weapon = new Weapon('Michelle', 5000, 0.05, 10, 10);

  // Tank Configuration
  tank = new Tank(width/2, height/2, 0, 0, 2, 2, 100, weapon);

  // Map Configuration
  map = new Map(width/2, height/2);

  for (let i = 0; i < 1; i++) {
    bullets.push(new Bullet(width/2,height/2,0,1));
  }
}

function draw() {

  /////////////////////////////////////////////////////////////////
  // Display
  /////////////////////////////////////////////////////////////////

  background(255);
  map.display();
  tank.display();

  /////////////////////////////////////////////////////////////////
  // User Control
  /////////////////////////////////////////////////////////////////

  // MOVEMENT
  // W key
  if (keyIsDown(87) || keyIsDown(77)) {
    map.update(-sin(tank.angle)*tank.dspeed,cos(tank.angle)*tank.dspeed);
  }

  // A key
  if (keyIsDown(65) || keyIsDown(97)) {
    tank.angle -= 1*tank.tspeed;
  }

  // S key
  if (keyIsDown(83) || keyIsDown(115)) {
    map.update(sin(tank.angle)*tank.dspeed,-cos(tank.angle)*tank.dspeed);
  }

  // D key
  if (keyIsDown(68) || keyIsDown(100)) {
    tank.angle += 1*tank.tspeed;
  }

  // MANUAL SHOOT (OLD)
  // Left mouse
  if (mouseButton === LEFT) {
    tank.shoot();
    mouseButton = null;
  }
}

var bullets = [];

class Bullet {
  constructor(x, y, a, bspeed) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.speed = bspeed;
  }

  display() {
    push();
    translate(this.x,this.y);
    ellipse(0,0,10,10);
    text(this.x,50,50);
    pop();
  }

  update() {
    this.x += cos(this.a);
    this.y += sin(this.a);
  }
}

class Tank {
  constructor(x, y, angle, turretAngle, dspeed, tspeed, Weapon) {
    this.x = x
    this.y = y;
    this.angle = angle;
    this.turretAngle = turretAngle;
    this.dspeed = dspeed;
    this.tspeed = tspeed;
    this.weapon = Weapon;
  }

  display() {
    // Tank body setup
    push();
    translate(this.x,this.y);
    this.angle = this.angle % 360;

    push();
    rotate(this.angle);

    rectMode(CENTER);
    rect(0, 0, 60, 80);

    //temporary info
    textAlign(LEFT);

    pop();
    push();
    
    // Tank Turret
    angleMode(DEGREES);
    this.turretAngle = atan2(mouseY - height / 2, mouseX - width / 2)+90;
    rotate(this.turretAngle);
    ellipse(0,0,40,40);
    rectMode(CENTER);
    rect(0,-24,10,10);
    pop();
    pop();
    
    text(bullets.length,50,50);
  }
  
  shoot() {
    //if (this.weapon.ammo > 0) {
      //this.weapon.ammo -= 1;
      //let bullet = new Bullet(this.x, this.y, this.a, 1);

      bullets.push(new Bullet(width/2-map.x,height/2-map.y,this.turretAngle-90,1));
    //}

  }

  updateShots() {
    //for length of bullet array
    
    
    var i;
    for(i = 0; i < bullets.length; i++) {
        bullets[i].display();
        bullets[i].update();
    }
  }


  reload() {
    this.weapon.ammo = maxAmmo;
  }
}

class Weapon {
  constructor(name, damage, speed, size, maxAmmo) {
    this.name = name;
    this.damage = damage;
    this.speed = speed; 
    this.size = size;
    this.ammo = maxAmmo;
    this.maxAmmo = maxAmmo;
  }
}

// class Bullet {
//   constructor(bx, by, mx, my, bs) {
//     this.x = bx;
//     this.y = by;
//     this.mx = mx;
//     this.my = my;
//     // this.dir = bd;
//     this.s = bs;
//   }
// }

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
    push();
    translate(this.x, this.y);
    image(ground, 0, 0);
    tank.updateShots();
    pop();
  }
}