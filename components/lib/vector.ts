export default class Vector {
	private _x: number;
	private _y: number;

	constructor(x: number = 0, y: number = 0) {
		this._x = x;
		this._y = y;
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

	get angle() {
		return Math.atan2(this.y, this.x);
	}

	set angle(angle: number) {
		this.x = Math.cos(angle) * this.length;
		this.y = Math.sin(angle) * this.length;
	}

	get length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	set length(length: number) {
		this.x = Math.cos(this.angle) * length;
		this.y = Math.sin(this.angle) * length;
	}

	add(other: Vector) {
		return new Vector(this.x + other.x, this.y + other.y);
	}

	subtract(other: Vector) {
		return new Vector(this.x - other.x, this.y - other.y);
	}

	multiply(value: number) {
		return new Vector(this.x * value, this.y * value);
	}

	divide(value: number) {
		return new Vector(this.x / value, this.y / value);
	}

	addTo(other: Vector) {
		this.x += other.x;
		this.y += other.y;
	}

	subtractFrom(other: Vector) {
		this.x -= other.x;
		this.y -= other.y;
	}

	multiplyBy(value: number) {
		this.x *= value;
		this.y *= value;
	}

	divideBy(value: number) {
		this.x /= value;
		this.y /= value;
	}
}