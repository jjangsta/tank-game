class Map {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    display() {
      push();
      translate(this.x, this.y);
      image(ground, 0, 0);
      pop();
    }
  }
