import Utils from "./utils";

export default class Grid {
    private _ctx: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    private _size: number;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, size: number) {
        this._ctx = ctx;
        this._width = width;
        this._height = height;
        this._size = size;

        document.body.addEventListener("mousemove", e => this.onMouseMove(e));
    }

    onMouseMove(e: MouseEvent) {
        this._ctx.clearRect(0, 0, this._width, this._height);
        this.draw();

        const x = Utils.roundNearest(e.clientX, this._size),
            y = Utils.roundNearest(e.clientY, this._size);

        this._ctx.beginPath();
        this._ctx.arc(x, y, 20, 0, Math.PI * 2, false);
        this._ctx.fill();
    }

    draw() {
        this._ctx.beginPath();
        this._ctx.strokeStyle = "#ccc";

        for (let x = 0; x <= this._width; x += this._size) {
            this._ctx.moveTo(x, 0);
            this._ctx.lineTo(x, this._height);
        }

        for (let y = 0; y <= this._height; y += this._size) {
            this._ctx.moveTo(0, y);
            this._ctx.lineTo(this._width, y);
        }

        this._ctx.stroke();
    }
}