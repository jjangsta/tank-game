class Bullet {
    constructor(position, angle, speed, weapon) {
      this.position = position;
      this.angle = angle;
      this.speed = speed;
      this.weapon = weapon;
    }

    display() {
      push();
      translate(this.position.x,this.position.y);
      this.weapon.color();
      this.weapon.bulletType();
      pop();
    }

    update() {
      this.position.x += cos(this.angle)*this.speed;
      this.position.y += sin(this.angle)*this.speed;
    }
  }
