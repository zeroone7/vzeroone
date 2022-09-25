import Utils from "./utils";

type Circle = {
  x: number;
  y: number;
  radius: number;
};

export default class BezierCurve {
    _ctx: CanvasRenderingContext2D;
    _width: number;
    _height: number;
    _isDragging: boolean;
    _offset: Circle;
    _dragHandle: Circle;
    _handlePoints: Array<Circle>;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, points: Array<Circle>) {
        this._ctx = ctx;
        this._width = width;
        this._height = height;
        this._isDragging = false;
        this._offset = { x: 0, y: 0, radius: 0 };
        this._dragHandle = { x: 0, y: 0, radius: 0 };
        this._handlePoints = points;
        
        document.body.addEventListener("mousedown", e => this.onMouseDown(e));
    }

    onMouseDown(e: MouseEvent) {
        for (let i = 0; i < 4; i++) {
            const handle = this._handlePoints[i];
            if (Utils.circlePointCollision(e.clientX, e.clientY, handle)) {
                this._isDragging = true;

                document.body.addEventListener("mousemove", e => this.onMouseMove(e));
                document.body.addEventListener("mouseup", e => this.onMouseUp(e));

                this._dragHandle = handle;
                this._offset.x = e.clientX - handle.x;
                this._offset.y = e.clientY - handle.y;
                this.draw();
            }
        }
    }

    onMouseMove(e: MouseEvent) {
        this._dragHandle.x = e.clientX - this._offset.x;
        this._dragHandle.y = e.clientY - this._offset.y;
        this.draw();
    }

    onMouseUp(e: MouseEvent) {
        console.log("mouse up");
        
        document.body.removeEventListener("mousemove", e => this.onMouseMove(e));
        document.body.removeEventListener("mouseup", e => this.onMouseUp(e));
        this._isDragging = false;
        this.draw();
    }

    draw() {
        this._ctx.clearRect(0, 0, this._width, this._height);

        this._ctx.beginPath();
        this._ctx.moveTo(this._handlePoints[0].x, this._handlePoints[0].y);
        this._ctx.bezierCurveTo(this._handlePoints[1].x, this._handlePoints[1].y,
            this._handlePoints[2].x, this._handlePoints[2].y, this._handlePoints[3].x, this._handlePoints[3].y);
        this._ctx.stroke();

        this._ctx.fillStyle = "gray";
        for (let i = 0; i < 4; i++) {
            const handle = this._handlePoints[i];
            if (this._isDragging && handle === this._dragHandle) {
                this._ctx.shadowColor = "black";
                this._ctx.shadowOffsetX = 4;
                this._ctx.shadowOffsetY = 4;
                this._ctx.shadowBlur = 8;
            }

            this._ctx.beginPath();
            this._ctx.arc(handle.x, handle.y, handle.radius, 0, Math.PI * 2, false);
            this._ctx.fill();

            this._ctx.shadowColor = "";
            this._ctx.shadowOffsetX = 0;
            this._ctx.shadowOffsetY = 0;
            this._ctx.shadowBlur = 0;
        }
    }
}