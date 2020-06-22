let tank;
let ground;
let weapon;
let padding;
let bazooka;

function preload() {
  // BACKGROUND IMAGE
  ground = createImg('https://cutewallpaper.org/21/minecraft-dirt-background/Images-of-Dirt-Background-Minecraft-wwwindustriousinfo.png');
  ground.hide();
}

function setup() {

  // RESOLUTION
  createCanvas(800, 600);

  // TANK CONFIGURATION
  weapon = new Weapon('#1e6920', [0, 0, 30, 30], [0,-32, 7, 35], [0, -50, 15, 5]);
  bazooka = new Weapon('#1e6920', [0, 0, 30, 30], [0, -28, 20, 25], [0, -40, 25, 5]);

  tank = new Tank(width/2, height/2, 0, 0, 3, 2.5, weapon);

  // Map Configuration
  map = new Map(width/2,height/2);
  padding = 50;
}

function draw() {

  ///////////////////////////////////////////////////////
  // DISPLAY
  ///////////////////////////////////////////////////////

  background(0);
  map.display();
  tank.display();

  //testing
  fill(255);
  text('map:',100, 30);
  text(map.x,100,50);
  text(map.y,100,70);

  text('tank:',300, 30);
  text(tank.x,300,50);
  text(tank.y,300,70);
  text(tank.angle,300,90);

  text(ground.width/2,600,70);

  ///////////////////////////////////////////////////////
  // User Control
  ///////////////////////////////////////////////////////

  // MOVEMENT

  let allowTurn = true;

  // W key
  if (keyIsDown(87) || keyIsDown(77)) {
    // left and right
    if((map.x - sin(tank.angle)*tank.dspeed) >= (ground.width/2 + width/2) - padding) {
      allowTurn = false;
      if((tank.angle > -90 && tank.angle < 90) || tank.angle > 270)
        tank.angle += 1*tank.tspeed;
      else
        tank.angle -= 1*tank.tspeed;
    } else if((map.x - sin(tank.angle)*tank.dspeed) <= (width/2 - ground.width/2) + padding) {
      allowTurn = false;
      if((tank.angle > -270 && tank.angle < -180) || (tank.angle > 90 && tank.angle < 180))
        tank.angle += 1*tank.tspeed;
      else
        tank.angle -= 1*tank.tspeed;

    } else if((map.y + cos(tank.angle)*tank.dspeed) >= (ground.height/2 + height/2) - padding) {
      allowTurn = false;
      if(tank.angle > 0 && tank.angle < 180)
        tank.angle += 1*tank.tspeed;
      else
        tank.angle -= 1*tank.tspeed;
    } else if((map.y + cos(tank.angle)*tank.dspeed) <= (height/2 - ground.height/2) + padding) {
      allowTurn = false;
      if((tank.angle > 180 && tank.angle < 360) || tank.angle < 0 && tank.angle > -180)
        tank.angle += 1*tank.tspeed;
      else
        tank.angle -= 1*tank.tspeed;
    } else {
      allowTurn = true;
      map.update(-sin(tank.angle)*tank.dspeed,cos(tank.angle)*tank.dspeed);
    }
  }

  // A key
  if ((keyIsDown(65) || keyIsDown(97)) && allowTurn === true) {
    tank.angle -= 1*tank.tspeed;
  }

  // S key
  if (keyIsDown(83) || keyIsDown(115)) {
        // left and right
        if((map.x + sin(tank.angle)*tank.dspeed) >= (ground.width/2 + width/2) - padding || (map.x + sin(tank.angle)*tank.dspeed) <= (width/2 - ground.width/2) + padding) {
          allowTurn = false;
          tank.angle -= 1*tank.tspeed;
        // top and bottom
        } else if((map.y - cos(tank.angle)*tank.dspeed) >= (ground.height/2 + height/2) - padding || (map.y - cos(tank.angle)*tank.dspeed) <= (height/2 - ground.height/2) + padding) {
          allowTurn = false;
          tank.angle -= 1*tank.tspeed;
        } else {
          allowTurn = true;
          map.update(sin(tank.angle)*tank.dspeed,-cos(tank.angle)*tank.dspeed);
        }
  }

  // D key
  if ((keyIsDown(68) || keyIsDown(100)) && allowTurn === true) {
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
    this.bspeed = bspeed;
  }

  display() {
    push();
    translate(this.x,this.y);
    fill('#5e5e5e');
    ellipse(0,0,10,10);
    pop();
  }

  update() {
    this.x += cos(this.a)*this.bspeed;
    this.y += sin(this.a)*this.bspeed;
  }
}
class Weapon {
  constructor(color, head, barrel, nozzle) {
    this.c = color;
    this.h = head;
    this.b = barrel;
    this.n = nozzle;
  }
  color() {
    return fill(this.c);
  }
  head() {
    return rect(this.h[0], this.h[1], this.h[2], this.h[3]);
  }
  barrel() {
    return rect(this.b[0], this.b[1], this.b[2], this.b[3]);
  }
  nozzle() {
    return rect(this.n[0], this.n[1], this.n[2], this.n[3]);
  }
}

class Tank {
  constructor(x, y, angle, turretAngle, dspeed, tspeed, weapon) {
    this.x = x
    this.y = y;
    this.angle = angle;
    this.turretAngle = turretAngle;
    this.dspeed = dspeed;
    this.tspeed = tspeed;
    this.weapon = weapon;
  }

  display() {
    // setup
    push();
    translate(this.x,this.y);
    this.angle = this.angle % 360;
    ///////////////////////////////////////////////////////
    // Tank Body
    ///////////////////////////////////////////////////////
    push();
    rotate(this.angle);
    rectMode(CENTER);

    // Tracks
    fill('#5e5e5e');
    rect(30,0,15,75);
    rect(-30,0,15,75);
    var i;
    for(i = 0; i < 11; i++)
      line(23,i*7-10/2*7,37,i*7-10/2*7);
    for(i = 0; i < 11; i++)
      line(-37,i*7-10/2*7,-23,i*7-10/2*7);

    // Chassis
    fill('#1e6920');
    var chassis = () => rect(0, 0, 50, 70);
    chassis();
    
    rect(0,30, 40, 10);
    line(-20,27.5,20,27.5);
    line(-20,30,20,30);
    line(-20,32.5,20,32.5);

    //Lights
    fill('#fcba03');
    ellipse(-17,-32,8,8);
    ellipse(17,-32,8,8);
    fill('#1e6920');
    rect(-17,-29,10,4);
    rect(17,-29,10,4);
    //Lights glow
    fill(255, 238, 0,10);
    noStroke();
    for(i = 0; i < 10; i++) {
    arc(-17,-30,5*i,10*i,-120,-60);
    arc(17,-30,5*i,10*i,-120,-60);
    }

    pop();
    
    
    ///////////////////////////////////////////////////////
    //TANK TURRET
    ///////////////////////////////////////////////////////
    push();
    angleMode(DEGREES);
    this.turretAngle = atan2(mouseY - height / 2, mouseX - width / 2)+90;
    rotate(this.turretAngle);
    rectMode(CENTER);
    //HEAD
    fill('#1e6920');
    this.weapon.head();
    //BARREL
    this.weapon.barrel();
    //NOZZLE
    this.weapon.nozzle();
    pop();

    pop();
  }
  
  shoot() {
      var start = abs(this.weapon.n[1]);
      bullets.push(new Bullet(width/2-map.x+sin(this.turretAngle)*start,height/2-map.y-cos(this.turretAngle)*start,this.turretAngle-90,10));
  }

  updateShots() {
    //for length of bullet array
    var i;
    for(i = 0; i < bullets.length; i++) {
        bullets[i].display();
        bullets[i].update();
    }
  }
  borderControl() {
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
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    image(ground, 0, 0);
    tank.updateShots();
    pop();
  }
}