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
  startPoint: Point,
  endPoint: Point,
};

export default class Utils {
  static normal(value: number, min: number, max: number) {
    return (value - min) / (max - min);
  }

  static lerp(normal: number, min: number, max: number) {
    return (max - min) * normal + min;
  }

  static map(
    value: number,
    srcmin: number,
    srcmax: number,
    destmin: number,
    destmax: number
  ) {
    return this.lerp(this.normal(value, srcmin, srcmax), destmin, destmax);
  }

  static clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
  }

  static distance(point: Point, other: Point) {
    const dx = other.x - point.x,
      dy = other.y - point.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  static distanceXY(x0: number, y0: number, x1: number, y1: number) {
    const dx = x1 - x0,
      dy = y1 - y0;

    return Math.sqrt(dx * dx + dy * dy);
  }

  static circleCollision(circle: Circle, other: Circle) {
    return (
      this.distance({ x: circle.x, y: circle.y }, { x: other.x, y: other.y}) <=
      circle.radius + other.radius
    );
  }

  static circlePointCollision(x: number, y: number, circle: Circle) {
    return this.distanceXY(x, y, circle.x, circle.y) < circle.radius;
  }

  static inRange(value: number, min: number, max: number) {
    return value >= Math.min(min, max) && value <= Math.max(min, max);
  }

  static pointInRect(x: number, y: number, rect: Rectangle) {
    return (
      this.inRange(x, rect.x, rect.x + rect.width) &&
      this.inRange(y, rect.y, rect.y + rect.height)
    );
  }

  static rangeIntersect(
    min0: number,
    max0: number,
    min1: number,
    max1: number
  ) {
    return (
      Math.max(min0, max0) >= Math.min(min1, max1) &&
      Math.min(min0, max0) <= Math.max(min1, max1)
    );
  }

  static rectIntersect(rect: Rectangle, other: Rectangle) {
    return (
      this.rangeIntersect(
        rect.x,
        rect.x + rect.width,
        other.x,
        other.x + other.width
      ) &&
      this.rangeIntersect(
        rect.y,
        rect.y + rect.height,
        other.y,
        other.y + other.height
      )
    );
  }

  // 두 라인 위에 있지 않은 범위도 교차.
  static lineIntersect(line: Line, other: Line) {
    const A1 = line.endPoint.y - line.startPoint.y,
      B1 = line.startPoint.x - line.endPoint.x,
      C1 = A1 * line.startPoint.x + B1 * line.startPoint.y,
      A2 = other.endPoint.y - other.startPoint.y,
      B2 = other.startPoint.x - other.endPoint.x,
      C2 = A2 * other.startPoint.x + B2 * other.startPoint.y,
      denominator = A1 * B2 - A2 * B1;

    if (denominator === 0) {
      return null;
    }

    return {
      x: (B2 * C1 - B1 * C2) / denominator,
      y: (A1 * C2 - A2 * C1) / denominator,
    } as Point;
  }

  // static lineIntersect(p0: Point, p1: Point, p2: Point, p3: Point) {
  //   const A1 = p1.y - p0.y,
  //     B1 = p0.x - p1.x,
  //     C1 = A1 * p0.x + B1 * p0.y,
  //     A2 = p3.y - p2.y,
  //     B2 = p2.x - p3.x,
  //     C2 = A2 * p2.x + B2 * p2.y,
  //     denominator = A1 * B2 - A2 * B1;

  //   if (denominator === 0) {
  //     return null;
  //   }

  //   return {
  //     x: (B2 * C1 - B1 * C2) / denominator,
  //     y: (A1 * C2 - A2 * C1) / denominator,
  //   } as Point;
  // }

  // 두 라인 위에 있는 범위만 교차.
  static segementIntersect(line: Line, other: Line) {
    const A1 = line.endPoint.y - line.startPoint.y,
      B1 = line.startPoint.x - line.endPoint.x,
      C1 = A1 * line.startPoint.x + B1 * line.startPoint.y,
      A2 = other.endPoint.y - other.startPoint.y,
      B2 = other.startPoint.x - other.endPoint.x,
      C2 = A2 * other.startPoint.x + B2 * other.startPoint.y,
      denominator = A1 * B2 - A2 * B1;

    const intersectX = (B2 * C1 - B1 * C2) / denominator,
      intersectY = (A1 * C2 - A2 * C1) / denominator,
      rx0 = (intersectX - line.startPoint.x) / (line.endPoint.x - line.startPoint.x),
      ry0 = (intersectY - line.startPoint.y) / (line.endPoint.y - line.startPoint.y),
      rx1 = (intersectX - other.startPoint.x) / (other.endPoint.x - other.startPoint.x),
      ry1 = (intersectY - other.startPoint.y) / (other.endPoint.y - other.startPoint.y);

    if (
      ((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
      ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))
    ) {
      return { x: intersectX, y: intersectY } as Point;
    } else {
      return null;
    }
  }

  // static segementIntersect(p0: Point, p1: Point, p2: Point, p3: Point) {
  //   const A1 = p1.y - p0.y,
  //     B1 = p0.x - p1.x,
  //     C1 = A1 * p0.x + B1 * p0.y,
  //     A2 = p3.y - p2.y,
  //     B2 = p2.x - p3.x,
  //     C2 = A2 * p2.x + B2 * p2.y,
  //     denominator = A1 * B2 - A2 * B1;

  //   const intersectX = (B2 * C1 - B1 * C2) / denominator,
  //     intersectY = (A1 * C2 - A2 * C1) / denominator,
  //     rx0 = (intersectX - p0.x) / (p1.x - p0.x),
  //     ry0 = (intersectY - p0.y) / (p1.y - p0.y),
  //     rx1 = (intersectX - p2.x) / (p3.x - p2.x),
  //     ry1 = (intersectY - p2.y) / (p3.y - p2.y);

  //   if (
  //     ((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
  //     ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))
  //   ) {
  //     return { x: intersectX, y: intersectY } as Point;
  //   } else {
  //     return null;
  //   }
  // }

  static getMousePos(
    canvas: HTMLCanvasElement | null,
    e: MouseEvent,
    width: number,
    height: number
  ) {
    const rect = canvas?.getBoundingClientRect()!;

    return {
      x: ((e.clientX - rect.left) / (rect.right - rect.left)) * width,
      y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * height,
    };
  }

  static getSelectPoint(
    points: Array<Point>,
    clientX: number,
    clientY: number,
    offset: number = 10
  ) {
    for (let i = 0; i < points.length; i++) {
      const point = points[i],
        dx = point.x - clientX,
        dy = point.y - clientY,
        dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < offset) {
        return point;
      }
    }
  }

  static checkCollision(obj: any, other: any) {
    for (let i = 0; i < obj.points.length; i++) {
      const p0 = obj.points[i],
        p1 = obj.points[(i + 1) % obj.points.length];

      for (let j = 0; j < other.points.length; j++) {
        const p2 = other.points[j],
          p3 = other.points[(j + 1) % other.points.length];

        if (Utils.segementIntersect({ startPoint: p0, endPoint: p1 }, { startPoint: p2, endPoint: p3 })) {
          return true;
        }
      }
    }
    return false;
  }

  static degreesToRads(degrees: number) {
    return (degrees / 180) * Math.PI;
  }

  static radsToDegrees(radians: number) {
    return (radians * 180) / Math.PI;
  }

  static randomRange(min: number, max: number) {
    return min + Math.random() * (max - min);
  }

  static randomInt(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  static randomDist(min: number, max: number, iter: number) {
    let total = 0;

    for (let i = 0; i < iter; i++) {
      total += Utils.randomRange(min, max);
    }

    return total / iter;
  }

  static roundToPlaces(value: number, places: number) {
    const mult = Math.pow(10, places);

    return Math.round(value * mult) / mult;
  }

  static roundNearest(value: number, nearest: number) {
    return Math.round(value / nearest) * nearest;
  }

  static quadraticBezier(
    v0: Point,
    v1: Point,
    v2: Point,
    t: number,
    pFinal: Point
  ) {
    pFinal.x =
      Math.pow(1 - t, 2) * v0.x + (1 - t) * 2 * t * v1.x + t * t * v2.x;

    pFinal.y =
      Math.pow(1 - t, 2) * v0.y + (1 - t) * 2 * t * v1.y + t * t * v2.y;

    return pFinal;
  }

  static cubicBezier(
    v0: Point,
    v1: Point,
    v2: Point,
    v3: Point,
    t: number,
    pFinal: Point
  ) {
    pFinal.x =
      Math.pow(1 - t, 3) * v0.x +
      Math.pow(1 - t, 2) * 3 * t * v1.x +
      (1 - t) * 3 * t * t * v2.x +
      t * t * t * v3.x;

    pFinal.y =
      Math.pow(1 - t, 3) * v0.y +
      Math.pow(1 - t, 2) * 3 * t * v1.y +
      (1 - t) * 3 * t * t * v2.y +
      t * t * t * v3.y;

    return pFinal;
  }

  static multiCurve(
    ctx: CanvasRenderingContext2D,
    points: Array<Point>,
    color: string = "black"
  ) {
    let p0, p1, midx, midy;

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 2; i++) {
      p0 = points[i];
      p1 = points[i + 1];
      midx = (p0.x + p1.x) / 2;
      midy = (p0.y + p1.y) / 2;

      ctx.quadraticCurveTo(p0.x, p0.y, midx, midy);
    }

    p0 = points[points.length - 2];
    p1 = points[points.length - 1];

    ctx.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
    ctx.stroke();
  }
}
