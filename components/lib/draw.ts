import Utils from "./utils";

type Point = {
  x: number;
  y: number;
};

type Line = {
  startPoint: Point;
  endPoint: Point;
};

export default class Draw {
  static arc(
    ctx: CanvasRenderingContext2D,
    points: Array<Point> | Point,
    radius: number = 4,
    color: string = "black",
    mode: "fill" | "stroke" = "fill"
  ) {
    mode === "fill" ? (ctx.fillStyle = color) : (ctx.strokeStyle = color);
    if (Array.isArray(points)) {
      for (let i = 0; i < points.length; i++) {
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, radius, 0, Math.PI * 2, false);
        mode === "fill" ? ctx.fill() : ctx.stroke();
      }
    } else {
      ctx.beginPath();
      ctx.arc(points.x, points.y, radius, 0, Math.PI * 2, false);
      mode === "fill" ? ctx.fill() : ctx.stroke();
    }
  }

  static stroke(
    ctx: CanvasRenderingContext2D,
    points: Array<Point>,
    color: string = "black",
    mode: "fill" | "stroke" = "stroke"
  ) {
    mode === "stroke" ? (ctx.strokeStyle = color) : (ctx.fillStyle = color);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    mode === "stroke" ? ctx.stroke() : ctx.fill();
  }

  static lines(
    ctx: CanvasRenderingContext2D,
    lines: Array<Line>,
    color: string = "black",
    mode: "fill" | "stroke" = "stroke"
  ) {
    mode === "stroke" ? (ctx.strokeStyle = color) : (ctx.fillStyle = color);
    ctx.beginPath();
    for (let i = 0; i < lines.length; i++) {
      ctx.moveTo(lines[i].startPoint.x, lines[i].startPoint.y);
      ctx.lineTo(lines[i].endPoint.x, lines[i].endPoint.y);
    }
    mode === "stroke" ? ctx.stroke() : ctx.fill();
  }

  static label(
    ctx: CanvasRenderingContext2D,
    name: string,
    x: number,
    y: number,
    color: string = "black",
    offsetX: number = 10,
    offsetY: number = 10
  ) {
    ctx.fillStyle = color;
    ctx.fillText(name, x + offsetX, y + offsetY);
    ctx.fillText(
      `(${Utils.roundToPlaces(x, 0)}, ${Utils.roundToPlaces(y, 0)})`,
      x + offsetX * 3,
      y + offsetY
    );
  }

  static koch(
    ctx: CanvasRenderingContext2D,
    p0: Point,
    p1: Point,
    limit: number,
    slice: number
  ) {
    const dx = p1.x - p0.x,
      dy = p1.y - p0.y,
      dist = Math.sqrt(dx * dx + dy * dy),
      unit = dist / slice,
      angle = Math.atan2(dy, dx),
      pA = { x: p0.x + dx / slice, y: p0.y + dy / slice },
      pC = { x: p1.x - dx / slice, y: p1.y - dy / slice },
      pB = {
        x: pA.x + Math.cos(angle - Math.PI / slice) * unit,
        y: pA.y + Math.sin(angle - Math.PI / slice) * unit,
      };

    if (limit > 0) {
      this.koch(ctx, p0, pA, limit - 1, 3);
      this.koch(ctx, pA, pB, limit - 1, 3);
      this.koch(ctx, pB, pC, limit - 1, 3);
      this.koch(ctx, pC, p1, limit - 1, 3);
    } else {
      this.stroke(ctx, [p0, pA, pB, pC, p1]);
    }
  }

  static kochAnimation(
    ctx: CanvasRenderingContext2D,
    p0: Point,
    p1: Point,
    limit: number,
    t: number
  ) {
    const dx = p1.x - p0.x,
      dy = p1.y - p0.y,
      dist = Math.sqrt(dx * dx + dy * dy),
      unit = dist * t,
      angle = Math.atan2(dy, dx),
      pA = { x: p0.x + dx * t, y: p0.y + dy * t },
      pC = { x: p1.x - dx * t, y: p1.y - dy * t },
      pB = {
        x: pA.x + Math.cos(angle - Math.PI * t) * unit,
        y: pA.y + Math.sin(angle - Math.PI * t) * unit,
      };

    if (limit > 0) {
      this.kochAnimation(ctx, p0, pA, limit - 1, t);
      this.kochAnimation(ctx, pA, pB, limit - 1, t);
      this.kochAnimation(ctx, pB, pC, limit - 1, t);
      this.kochAnimation(ctx, pC, p1, limit - 1, t);
    } else {
      this.stroke(ctx, [p0, pA, pB, pC, p1]);
    }
  }

  static sierpinski(
    ctx: CanvasRenderingContext2D,
    p0: Point,
    p1: Point,
    p2: Point,
    limit: number
  ) {
    if (limit > 0) {
      const pA = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 },
        pB = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 },
        pC = { x: (p2.x + p0.x) / 2, y: (p2.y + p0.y) / 2 };

      this.sierpinski(ctx, p0, pA, pC, limit - 1);
      this.sierpinski(ctx, pA, p1, pB, limit - 1);
      this.sierpinski(ctx, pC, pB, p2, limit - 1);
    } else {
      this.stroke(ctx, [p0, p1, p2], "black", "fill");
    }
  }

  static sierpinskiAnimation(
    ctx: CanvasRenderingContext2D,
    p0: Point,
    p1: Point,
    p2: Point,
    limit: number,
    tx: number,
    ty: number
  ) {
    if (limit > 0) {
      const pA = { x: p0.x + (p1.x - p0.x) * tx, y: p0.y + (p1.y - p0.y) * ty },
        pB = { x: p1.x + (p2.x - p1.x) * tx, y: p1.y + (p2.y - p1.y) * ty },
        pC = { x: p2.x + (p0.x - p2.x) * tx, y: p2.y + (p0.y - p2.y) * ty };

      this.sierpinskiAnimation(ctx, p0, pA, pC, limit - 1, tx, ty);
      this.sierpinskiAnimation(ctx, pA, p1, pB, limit - 1, tx, ty);
      this.sierpinskiAnimation(ctx, pC, pB, p2, limit - 1, tx, ty);
    } else {
      this.stroke(ctx, [p0, p1, p2], "black", "fill");
    }
  }
}
