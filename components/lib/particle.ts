type Spring = {
  point: { x: number; y: number };
  length: number;
  k: number;
};

export default class Particle {
  private _x: number;
  private _y: number;
  private _vx: number;
  private _vy: number;
  private _mass: number;
  private _radius: number;
  private _bounce: number;
  private _friction: number;
  private _gravity: number;
  private _springs: Array<Spring>;
  private _gravitations: Array<Particle>;

  constructor(
    x: number = 0,
    y: number = 0,
    speed: number = 0,
    dir: number = 0,
    grav: number = 0
  ) {
    this._x = x;
    this._y = y;
    this._vx = Math.cos(dir) * speed;
    this._vy = Math.sin(dir) * speed;
    this._mass = 1;
    this._radius = 0;
    this._bounce = -1;
    this._friction = 1;
    this._gravity = grav;
    this._springs = [];
    this._gravitations = [];
  }

  get x() {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  get vx() {
    return this._vx;
  }

  set vx(value: number) {
    this._vx = value;
  }

  get vy() {
    return this._vy;
  }

  set vy(value: number) {
    this._vy = value;
  }

  get mass() {
    return this._mass;
  }

  set mass(value: number) {
    this._mass = value;
  }

  get radius() {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
  }

  get bounce() {
    return this._bounce;
  }

  set bounce(value: number) {
    this._bounce = value;
  }

  get friction() {
    return this._friction;
  }

  set friction(value: number) {
    this._friction = value;
  }

  get speed() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  set speed(speed: number) {
    this.vx = Math.cos(this.angle) * speed;
    this.vy = Math.sin(this.angle) * speed;
  }

  get angle() {
    return Math.atan2(this.vy, this.vx);
  }

  set angle(direction: number) {
    this.vx = Math.cos(direction) * this.speed;
    this.vy = Math.sin(direction) * this.speed;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    radius: number = 5,
    color: string = "black",
    mode: string = "fill"
  ) {
    mode === "fill" ? (ctx.fillStyle = color) : (ctx.strokeStyle = color);
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
    mode === "fill" ? ctx.fill() : ctx.stroke();
  }

  update() {
    this.handleSprings();
    this.handleGravitations();
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this._gravity;
    this.x += this.vx;
    this.y += this.vy;
  }

  accelerate(ax: number, ay: number) {
    this.vx += ax;
    this.vy += ay;
  }

  angleTo(other: Particle) {
    return Math.atan2(other.y - this.y, other.x - this.x);
  }

  distanceTo(other: Particle) {
    const dx = other.x - this.x,
      dy = other.y - this.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  addGravitation(particle: Particle) {
    this.removeGravitation(particle);
    this._gravitations.push(particle);
  }

  removeGravitation(particle: Particle) {
    for (let i = 0; i < this._gravitations.length; i += 1) {
      if (particle === this._gravitations[i]) {
        this._gravitations.splice(i, 1);
        return;
      }
    }
  }

  gravitateTo(other: Particle) {
    const dx = other.x - this.x,
      dy = other.y - this.y,
      distSQ = dx * dx + dy * dy,
      distance = Math.sqrt(distSQ),
      force = other.mass / distSQ,
      ax = (dx / distance) * force,
      ay = (dy / distance) * force;

    this.vx += ax;
    this.vy += ay;
  }

  handleGravitations() {
    for (let i = 0; i < this._gravitations.length; i += 1) {
      this.gravitateTo(this._gravitations[i]);
    }
  }

  addSpring(spring: Spring) {
    this.removeSpring(spring);
    this._springs.push({
      point: spring.point,
      length: spring.length,
      k: spring.k,
    });
  }

  removeSpring(spring: Spring) {
    for (let i = 0; i < this._springs.length; i += 1) {
      if (spring.point === this._springs[i].point) {
        this._springs.splice(i, 1);
        return;
      }
    }
  }

  springTo(spring: Spring) {
    const dx = spring.point.x - this.x,
      dy = spring.point.y - this.y,
      distance = Math.sqrt(dx * dx + dy * dy),
      springForce = (distance - length) * spring.k;
    (this.vx += (dx / distance) * springForce),
      (this.vy += (dy / distance) * springForce);
  }

  handleSprings() {
    for (let i = 0; i < this._springs.length; i += 1) {
      const spring = this._springs[i];
      this.springTo(spring);
    }
  }

  checkBoundary(particle: Particle, width: number, height: number) {
    if (particle.x + particle.radius > width) {
      particle.x = width - particle.radius;
      particle.vx *= particle.bounce;
    }
    if (particle.x - particle.radius < 0) {
      particle.x = particle.radius;
      particle.vx *= particle.bounce;
    }
    if (particle.y + particle.radius > height) {
      particle.y = height - particle.radius;
      particle.vy *= particle.bounce;
    }
    if (particle.y - particle.radius < 0) {
      particle.y = particle.radius;
      particle.vy *= particle.bounce;
    }
  }
}
