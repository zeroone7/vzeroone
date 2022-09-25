import Utils from "./utils";

export default class Chart {
    private _ctx: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    private _data: number[];
    private _minVal: number;
    private _maxVal: number;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, data: number[]) {
        // const values = [ 7, 5, 21, 18, 33, 12, 27, 188, 9, 23, 14, 6, 31, 25, 17, 13, 29 ],
        this._ctx = ctx;
        this._width = width;
        this._height = height;
        this._data = data;
        this._minVal = Math.min.apply(null, data);
        this._maxVal = Math.max.apply(null, data);
    }

    draw() {
        // 라인 그리기
        this._ctx.beginPath();
        for (let i = 0; i < this._data.length; i++) {
            const normVal = Utils.normal(this._data[i], this._minVal, this._maxVal),
                x = this._width / (this._data.length - 1) * i,
                y = this._height - this._height * normVal;

            if (i === 0) {
                this._ctx.moveTo(x, y);
            } else {
                this._ctx.lineTo(x, y);
            }
        }
        this._ctx.stroke();

        // 점 그리기
        for (let i = 0; i < this._data.length; i++) {
            const normVal = Utils.normal(this._data[i], this._minVal, this._maxVal),
                x = this._width / (this._data.length - 1) * i,
                y = this._height - this._height * normVal;

            this._ctx.beginPath();
            this._ctx.arc(x, y, 4, 0, Math.PI * 2, false);
            this._ctx.fill();
        }
    }
}