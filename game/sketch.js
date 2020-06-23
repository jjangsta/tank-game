let player;
let ground;
let weapon;
let padding;
let bazooka;
var bullets = [];

function preload() {
  spacemono = loadFont('assets/SpaceMono-Regular.ttf');
  ground = loadImage('assets/ground.png');
}

function setup() {
  // RESOLUTION
  createCanvas(800, 600, WEBGL);

  // TANK CONFIGURATION
  weapon = new Weapon('#1e6920', [0, 0, 30, 30], [0, -32, 7, 35], [0, -52, 15, 5]);
  bazooka = new Weapon('#1e6920', [0, 0, 30, 30], [0, -28, 20, 25], [0, -44, 25, 5]);
  //player = new playerTank(createVector(width / 2, height / 2), 0, 0, 3, 2.5, weapon);
  player = new playerTank(createVector(width / 2, height / 2), 0, 0, 3, 2.5, bazooka);

  // Map Configuration
  playground = new Map(0, 0);
  padding = 50;

  textFont(spacemono);
  textSize(15);
}

function draw() {

  ///////////////////////////////////////////////////////
  // DISPLAY
  ///////////////////////////////////////////////////////

  background(0);
  camera(player.position.x,player.position.y,500,player.position.x,player.position.y,0,0,1,0);

  playground.display();
  player.display();
  player.drive();
  player.controlTurret();
  player.updateShots();

  //TESTING
  fill(255);
  text('player:', 300+player.position.x, 30+player.position.y);
  text(round(player.position.x),300+player.position.x, 50+player.position.y);
  text(round(player.position.y),300+player.position.x, 70+player.position.y);
  text(player.bodyAngle, 300+player.position.x, 90+player.position.y);

}
