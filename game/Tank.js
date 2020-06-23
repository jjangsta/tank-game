class Tank {
    constructor(position, bodyAngle, turretAngle, driveSpeed, traverseSpeed, weapon) {
      this.position = position;
      this.bodyAngle = bodyAngle;
      this.turretAngle = turretAngle;
      this.driveSpeed = driveSpeed;
      this.traverseSpeed = traverseSpeed;
      this.weapon = weapon;
    }

    display() {
      // setup
      push();
      translate(this.position.x,this.position.y);
      this.bodyAngle = this.bodyAngle % 360;
      ///////////////////////////////////////////////////////
      // Tank Body
      ///////////////////////////////////////////////////////
      push();
      rotate(this.bodyAngle);
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
      translate(0,0,1);
      fill('#1e6920');
      rect(0, 0, 50, 70);

      rect(0,30, 40, 10);
      line(-20,27.5,20,27.5);
      line(-20,30,20,30);
      line(-20,32.5,20,32.5);

      //Lights
      fill('#fcba03');
      ellipse(-17,-32,8,8);
      ellipse(17,-32,8,8);
      fill('#1e6920');
      translate(0,0,1);
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
      translate(0,0,30);
      angleMode(DEGREES);
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
        bullets.push(new Bullet(createVector(this.position.x-playground.x+sin(this.turretAngle)*start,this.position.y-playground.y-cos(this.turretAngle)*start), this.turretAngle-90, 10, this.weapon));
    }

    updateShots() {
      //for length of bullet array
      var i;
      for(i = 0; i < bullets.length; i++) {
          bullets[i].display();
          bullets[i].update();
      }
    }

    drive() {
      // MOVEMENT

      let allowTurn = true;

      // W key
      if (keyIsDown(87) || keyIsDown(77)) {
        this.updatePosition(createVector(sin(this.bodyAngle) * this.driveSpeed, -cos(this.bodyAngle) * this.driveSpeed));
      }

      // A key
      if ((keyIsDown(65) || keyIsDown(97)) && allowTurn === true) {
        this.bodyAngle -= this.traverseSpeed;
      }

      // S key
      if (keyIsDown(83) || keyIsDown(115)) {
        this.updatePosition(createVector(-sin(this.bodyAngle) * this.driveSpeed, cos(this.bodyAngle) * this.driveSpeed));

      }

      // D key
      if ((keyIsDown(68) || keyIsDown(100)) && allowTurn === true) {
        this.bodyAngle += this.traverseSpeed;
      }

      // MANUAL SHOOT (OLD)
      // Left mouse
      if (mouseButton === LEFT) {
        this.shoot();
        mouseButton = null;
      }
    }

    updatePosition(movement) {
      this.position.x += movement.x;
      this.position.y += movement.y;
    }

    controlTurret() {
      this.turretAngle = atan2(mouseY - height / 2, mouseX - width / 2)+90;
    }

    updateTurret() {}
  }
