import Utils from "./utils";
import Easing from "./easing";
import Particle from "./particle";
import Model from "./model";
import Draw from "./draw";
// import Vector from "./vector";
// import Chart from "./chart";
// import Grid from "./grid";
// FIXME: import BezierCurve from "./bezierCurve";
// FIXME: import Shooting from "./shooting";

type Point = {
  x: number;
  y: number;
};

type Circle = {
  x: number;
  y: number;
  radius: number;
};

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Line = {
  startPoint: Point;
  endPoint: Point;
};

type Spring = {
  point: Point;
  length: number;
  k: number;
};

window.onload = function () {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement,
        targetCanvas = document.getElementById("target") as HTMLCanvasElement,
        ctx = canvas.getContext("2d") as CanvasRenderingContext2D,
        tctx = targetCanvas.getContext("2d") as CanvasRenderingContext2D,
        width = canvas.width = targetCanvas.width = window.innerWidth,
        height = canvas.height = targetCanvas.height = window.innerHeight,
        centerX = width / 2,
        centerY = height / 2;

    let points: any = [],
        sticks: any = [],
        forms: any = [],
        images: any = [],
        bounce = .9,
        gravity = .5,
        friction = .999;

    points.push({ x: 100, y: 100, oldx: 50, oldy: 150 });
    points.push({ x: 200, y: 100, oldx: 200, oldy: 100 });
    points.push({ x: 200, y: 200, oldx: 200, oldy: 200 });
    points.push({ x: 100, y: 200, oldx: 100, oldy: 200 });
    points.push({ x: 550, y: 100, oldx: 550, oldy: 100, pinned: true });
    points.push({ x: 400, y: 100, oldx: 400, oldy: 100 });
    points.push({ x: 250, y: 100, oldx: 250, oldy: 100 });

    sticks.push({ p0: points[0], p1: points[1], length: Utils.distance(points[0], points[1]) });
    sticks.push({ p0: points[1], p1: points[2], length: Utils.distance(points[1], points[2]) });
    sticks.push({ p0: points[2], p1: points[3], length: Utils.distance(points[2], points[3]) });
    sticks.push({ p0: points[3], p1: points[0], length: Utils.distance(points[3], points[0]) });
    sticks.push({ p0: points[0], p1: points[2], length: Utils.distance(points[0], points[2]), hidden: true });
    sticks.push({ p0: points[4], p1: points[5], length: Utils.distance(points[4], points[5]) });
    sticks.push({ p0: points[5], p1: points[6], length: Utils.distance(points[5], points[6]) });
    sticks.push({ p0: points[6], p1: points[0], length: Utils.distance(points[6], points[0]) });

    forms.push({ path: [ points[0], points[1], points[2], points[3] ], color: "green"});
    images.push({ path: [ points[0], points[1], points[2], points[3]], img: loadImage("./img/cat.jpg")});

    function loadImage(url: string) {
        const img = new Image();
        img.src = url;
        return img;
    }

    function updatePoints() {
        for (let i = 0; i < points.length; i++) {
            const p = points[i];

            if (!p.pinned) {
                const vx = (p.x - p.oldx) * friction,
                    vy = (p.y - p.oldy) * friction;

                p.oldx = p.x;
                p.oldy = p.y;
                p.x += vx;
                p.y += vy;
                p.y += gravity;
            }
        }
    }

    function constrainPoints() {
        for (let i = 0; i < points.length; i++) {
            const p = points[i];

            if (!p.pinned) {
                const vx = (p.x - p.oldx) * friction,
                    vy = (p.y - p.oldy) * friction;

                if (p.x > width) {
                    p.x = width;
                    p.oldx = p.x + vx * bounce;
                } else if (p.x < 0) {
                    p.x = 0;
                    p.oldx = p.x + vx * bounce;
                }

                if (p.y > height) {
                    p.y = height;
                    p.oldy = p.y + vy * bounce;
                } else if (p.y < 0) {
                    p.y = 0;
                    p.oldy = p.y + vy * bounce;
                }
            }
        }
    }

    function updateSticks() {
        for (let i = 0; i < sticks.length; i++) {
            const s = sticks[i],
                dx = s.p1.x - s.p0.x,
                dy = s.p1.y - s.p0.y,
                dist = Math.sqrt(dx * dx + dy * dy),
                diff = s.length - dist,
                percent = diff / dist / 2,
                offsetX = dx * percent,
                offsetY = dy * percent;

            if (!s.p0.pinned) {
                s.p0.x -= offsetX;
                s.p0.y -= offsetY;
            }

            if (!s.p1.pinned) {
                s.p1.x += offsetX;
                s.p1.y += offsetY;
            }
        }
    }

    function renderPoints() {
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            Draw.arc(ctx, p, 5);
        }
    }

    function renderSticks() {
        for (let i = 0; i < sticks.length; i++) {
            const s = sticks[i];
            
            if (!s.hidden) {
                ctx.beginPath();
                ctx.strokeStyle = s.color ? s.color : "black";
                ctx.lineWidth = s.width ? s.width : 1;
                ctx.moveTo(s.p0.x, s.p0.y);
                ctx.lineTo(s.p1.x, s.p1.y);
                ctx.stroke();
            }
        }
    }

    function renderForms() {
        for (let i = 0; i < forms.length; i++) {
            const f = forms[i];

            ctx.beginPath();
            ctx.fillStyle = f.color;
            ctx.moveTo(f.path[0].x, f.path[0].y);
            for (let j = 1; j < f.path.length; j++) {
                ctx.lineTo(f.path[j].x, f.path[j].y);
            }
            ctx.fill();
        }
    }

    function renderImages() {
        for (let i = 0; i < images.length; i++) {
            const image = images[i],
                w = Utils.distance(image.path[0], image.path[1]),
                h = Utils.distance(image.path[0], image.path[3]),
                dx = image.path[1].x - image.path[0].x,
                dy = image.path[1].y - image.path[0].y,
                angle = Math.atan2(dy, dx);

            ctx.save();
                ctx.translate(image.path[0].x, image.path[0].y);
                ctx.rotate(angle);
                ctx.drawImage(image.img, 0, 0, w, h);
            ctx.restore();
        }
    }

    function update() {
        updatePoints();
        // Trade-Off.
        for (let i = 0; i < 5; i++) {
            updateSticks();
            constrainPoints();
        }
        ctx.clearRect(0, 0, width, height);
        // renderPoints();
        renderSticks();
        // renderForms();
        // renderImages();

        requestAnimationFrame(update);
    }
    update();
}