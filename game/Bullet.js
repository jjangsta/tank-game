class Bullet {
    constructor(position, angle, speed) {
      this.position = position;
      this.angle = angle;
      this.speed = speed;
    }

    display() {
      push();
      translate(this.position.x,this.position.y);
      fill('#5e5e5e');
      ellipse(0,0,10,10);
      pop();
    }

    update() {
      this.position.x += cos(this.angle)*this.speed;
      this.position.y += sin(this.angle)*this.speed;
    }
  }
