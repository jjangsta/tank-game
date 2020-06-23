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
    bulletType() {
      return ellipse(0, 0, this.b[2], this.b[2]);
    }
  }
