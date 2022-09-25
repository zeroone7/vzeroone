import Utils from "./utils";
import Particle from "./particle";

export default class Shooting {
    _ctx: CanvasRenderingContext2D;
    _width: number;
    _height: number;
    _rawForce: number;
    _forceAngle: number;
    _forceSpeed: number;
    _isShooting: boolean;
    _gun: { x: number, y: number, angle: number };
    _target: { x: number, y: number, radius: number };
    _bullet: Particle;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, bullet: Particle,
        gun: { x: number, y: number, angle: number }, target: { x: number, y: number, radius: number }) {
        this._ctx = ctx;
        this._width = width;
        this._height = height;
        this._rawForce = 0,
        this._forceAngle = 0,
        this._forceSpeed = .1,
        this._isShooting = false,
        this._gun = gun;
        this._target = target;
        this._bullet = bullet;
        this._bullet.radius = 7;

        this.setTarget();
        window.addEventListener("keydown", e => this.onKeyDown(e));
        window.addEventListener("mousedown", e => this.onMouseDown(e));
    }

    onKeyDown(e: KeyboardEvent) {
        switch (e.key) {
            case "w":
                if (!this._isShooting) {
                    this.shoot();
                }
                break;
        
            default:
                break;
        }
    }

    onMouseDown(e: MouseEvent) {
        window.addEventListener("mousemove", e => this.onMouseMove(e));
        window.addEventListener("mouseup", e => this.onMouseUp(e));
        this.aimGun(e.clientX, e.clientY);
    }

    onMouseMove(e: MouseEvent) {
        this.aimGun(e.clientX, e.clientY);
    }

    onMouseUp(e: MouseEvent) {
        window.removeEventListener("mousemove", e => this.onMouseMove(e));
        window.removeEventListener("mouseup", e => this.onMouseUp(e));
        this.aimGun(e.clientX, e.clientY);
    }


    setTarget() {
        this._target.x = Utils.randomRange(200, this._width);
        this._target.y = this._height;
        this._target.radius = Utils.randomRange(10, 40);
    }

    checkTarget() {
        if (Utils.circleCollision(this._target, this._bullet)) {
            this.setTarget();
        }
    }

    aimGun(mouseX: number, mouseY: number) {
        this._gun.angle = Utils.clamp(Math.atan2(mouseY - this._gun.y, mouseX - this._gun.x), -Math.PI / 2, -.3);
    }

    shoot() {
        const force = Utils.map(this._rawForce, -1, 1, 2, 20);
        this._bullet.x = this._gun.x + Math.cos(this._gun.angle) * 40;
        this._bullet.y = this._gun.y + Math.sin(this._gun.angle) * 40;
        this._bullet.speed = force;
        this._bullet.angle = this._gun.angle;
        this._isShooting = true;
    }

    draw() {
        this._ctx.clearRect(0, 0, this._width, this._height);

        this._ctx.fillStyle = "#ccc";
        this._ctx.fillRect(10, this._height - 10, 20, -100);

        this._ctx.fillStyle = "#666";
        this._ctx.fillRect(10, this._height - 10, 20, Utils.map(this._rawForce, -1, 1, 0, -100));

        this._ctx.fillStyle = "#000";
        this._ctx.beginPath();
        this._ctx.arc(this._gun.x, this._gun.y, 24, 0, Math.PI * 2, false);
        this._ctx.fill();

        this._ctx.save();
            this._ctx.translate(this._gun.x, this._gun.y);
            this._ctx.rotate(this._gun.angle);
            this._ctx.fillRect(0, -8, 40, 16);
        this._ctx.restore();

        this._bullet.draw(this._ctx);

        this._ctx.fillStyle = "red";
        this._ctx.beginPath();
        this._ctx.arc(this._target.x, this._target.y, this._target.radius, 0, Math.PI * 2, false);
        this._ctx.fill();
    }

    update() {
        if (!this._isShooting) {
            this._forceAngle += this._forceSpeed;
        }

        this._rawForce = Math.sin(this._forceAngle);

        if (this._isShooting) {
            this._bullet.update();
            this.checkTarget();
        }
        this.draw();

        if (this._bullet.y > this._height) {
            this._isShooting = false;
        }

        requestAnimationFrame(this.update);
    }
}