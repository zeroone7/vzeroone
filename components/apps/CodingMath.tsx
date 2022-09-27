import styles from "../../styles/Canvas.module.css";

import { useRef, useEffect } from "react";
import type { NextPage } from "next";

import Draw from "../lib/draw";
import Utils from "../lib/utils";
import Easing from "../lib/easing";
import Model from "../lib/model";
import Vector from "../lib/vector";
import Particle from "../lib/particle";

type Point = {
  x: number,
  y: number,
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

type Spring = {
  point: Point;
  length: number;
  k: number;
};

type Shape = {
  x: number;
  y: number;
  points: Array<Point>;
  offset: Array<Point>;
}

const CoadingMath: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const targetRef = useRef<HTMLCanvasElement>(null);

  const episode1_randomLine = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }
  };

  const episode2_trigonometry = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.translate(0, height / 2);
    ctx.scale(1, -1);

    for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
      let x = angle * 200,
        y = Math.sin(angle) * 200;

      // 사인 그래프
      ctx.fillStyle = "black";
      ctx.fillRect(x, y, 5, 5);

      // 코사인 그래프
      y = Math.cos(angle) * 200;
      ctx.fillStyle = "red";
      ctx.fillRect(x, y, 5, 5);
    }
  };

  const episode3_moreTrigonometry = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const centerX = width / 2,
      centerY = height / 2;

    let baseAlpha = 0.5,
      offset = 0.5,
      speed = 0.1,
      angle = 0;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      const alpha = baseAlpha + Math.sin(angle) * offset;

      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2, false);
      ctx.fill();

      angle += speed;

      requestAnimationFrame(update);
    };
    update();
  };

  const episode4_code = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const xRes = 10,
      yRes = 11;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "green";
    ctx.font = "12px Courier";
    ctx.translate(width / 2, height / 2);
    ctx.transform(1.5, 0.3, 0.1, 1.5, 0, 0);

    for (let y = -height / 2; y < height / 2; y += yRes) {
      for (let x = -width / 2; x < width / 2; x += xRes) {
        const char = Math.random() < 0.5 ? "0" : "1";
        ctx.fillText(char, x, y);
      }
    }
  };

  const episode4_circle = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const centerX = width / 2,
      centerY = height / 2;

    let radius = 200,
      angle = 0,
      numObject = 20,
      slice = (Math.PI * 2) / numObject,
      x = 0,
      y = 0;

    for (let i = 0; i < numObject; i++) {
      angle = i * slice;
      x = centerX + Math.cos(angle) * radius;
      y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2, false);
      ctx.fill();
    }
  };

  const episode4_bees = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const bees: Array<Bee> = [],
      numBees = 50;

    class Bee {
      private _angleX: number;
      private _angleY: number;
      private _speedX: number;
      private _speedY: number;
      private _radius: number;

      constructor() {
        this._angleX = Math.random() * Math.PI * 2;
        this._angleY = Math.random() * Math.PI * 2;
        this._speedX = Math.random() * 0.1 - 0.05;
        this._speedY = Math.random() * 0.1 - 0.05;
        this._radius = 100 + Math.random() * 100;
      }

      update(ctx: CanvasRenderingContext2D) {
        const x = Math.cos(this._angleX) * this._radius,
          y = Math.sin(this._angleY) * this._radius;
        this._angleX += this._speedX;
        this._angleY += this._speedY;

        ctx.beginPath();
        ctx.arc(width / 2 + x, height / 2 + y, 2, 0, Math.PI * 2, false);
        ctx.fill();
      }
    }

    for (let i = 0; i < numBees; i++) {
      bees.push(new Bee());
    }

    const update = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < numBees; i++) {
        bees[i].update(ctx);
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode5_arctangent = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    let arrowX = width / 2,
      arrowY = height / 2,
      dx,
      dy,
      angle = 0,
      a = 0;

    const hMouseMove = (e: MouseEvent) => {
      dx = e.clientX - arrowX;
      dy = e.clientY - arrowY;
      angle = Math.atan2(dy, dx);
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      arrowX = width / 2 + Math.cos(a) * height * 0.4;
      arrowY = height / 2 + Math.sin(a) * height * 0.4;
      a += 0.01;

      ctx.save();
      ctx.translate(arrowX, arrowY);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(-20, 0);
      ctx.moveTo(20, 0);
      ctx.lineTo(10, -10);
      ctx.moveTo(20, 0);
      ctx.lineTo(10, 10);
      ctx.stroke();
      ctx.restore();

      requestAnimationFrame(update);
    };
    update();
  };

  const episode8_velocity = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const particles: Array<Particle> = [],
      numParticles = 100;

    for (let i = 0; i < numParticles; i++) {
      particles.push(
        new Particle(
          width / 2,
          height / 2,
          Math.random() * 4 + 1,
          Math.random() * Math.PI * 2
        )
      );
    }

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.update();

        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2, false);
        ctx.fill();
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode9_main = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p = new Particle(100, height, 10, -Math.PI / 2);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      p.accelerate(0.1, 0.1);
      p.update();

      ctx.beginPath();
      ctx.arc(p.x, p.y, 10, 0, Math.PI * 2, false);
      ctx.fill();

      requestAnimationFrame(update);
    };
    update();
  };

  const episode9_fireworks = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const particles: Array<Particle> = [],
      numParticles = 100;

    for (let i = 0; i < numParticles; i++) {
      particles.push(
        new Particle(
          width / 2,
          height / 3,
          Math.random() * 5 + 2,
          Math.random() * Math.PI * 2,
          0.1
        )
      );
    }

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.update();

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2, false);
        ctx.fill();
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode10_ship = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const ship = new Particle(width / 2, height / 2, 0, 0);
    const thrust = new Vector();

    let angle = 0;
    let turningLeft = false;
    let turningRight = false;
    let thrusting = false;

    const hKeyDown = (e: KeyboardEvent | MouseEvent) => {
      switch ((e as KeyboardEvent).key) {
        case "w":
          thrusting = true;
          break;
        case "a":
          turningLeft = true;
          break;
        case "d":
          turningRight = true;
          break;
        default:
          break;
      }
    };

    const hKeyUp = (e: KeyboardEvent | MouseEvent) => {
      switch ((e as KeyboardEvent).key) {
        case "w":
          thrusting = false;
          break;
        case "a":
          turningLeft = false;
          break;
        case "d":
          turningRight = false;
          break;
        default:
          break;
      }
    };

    canvasRef?.current?.addEventListener("keydown", hKeyDown);
    canvasRef?.current?.addEventListener("keyup", hKeyUp);

    canvasRef?.current?.removeEventListener("mouseout", hKeyDown);
    canvasRef?.current?.removeEventListener("mouseout", hKeyUp);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      if (turningRight) {
        angle += 0.05;
      }
      if (turningLeft) {
        angle -= 0.05;
      }

      if (thrusting) {
        thrust.length = 0.1;
      } else {
        thrust.length = 0;
      }
      thrust.angle = angle;

      ship.accelerate(thrust.x, thrust.y);
      ship.update();

      if (ship.x > width) {
        ship.x = 0;
      }
      if (ship.x < 0) {
        ship.x = width;
      }
      if (ship.y > height) {
        ship.y = 0;
      }
      if (ship.y < 0) {
        ship.y = height;
      }

      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(-10, -7);
      ctx.lineTo(-10, 7);
      ctx.lineTo(10, 0);

      if (thrusting) {
        ctx.moveTo(-10, 0);
        ctx.lineTo(-18, 0);
      }

      ctx.stroke();
      ctx.restore();

      requestAnimationFrame(update);
    };
    update();
  };

  const episode11_orbit = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const sun = new Particle(width / 2, height / 2);
    const planet = new Particle(width / 2 + 200, height / 2, 10, -Math.PI / 2);

    sun.mass = 20000;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      planet.gravitateTo(sun);
      planet.update();

      sun.draw(ctx, 20, "#ffff00");
      planet.draw(ctx, 4, "#0000ff");

      requestAnimationFrame(update);
    };
    update();
  };

  const episode12_wrapping = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p = new Particle(
      width / 2,
      height / 2,
      3,
      Math.random() * Math.PI * 2
    );

    p.radius = 50;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      p.update();
      p.draw(ctx, p.radius);

      if (p.x - p.radius > width) {
        p.x = -p.radius;
      }
      if (p.x + p.radius < 0) {
        p.x = width + p.radius;
      }
      if (p.y - p.radius > height) {
        p.y = -p.radius;
      }
      if (p.y + p.radius < 0) {
        p.y = height + p.radius;
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode12_bounce = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p = new Particle(
      width / 2,
      height / 2,
      5,
      Math.random() * Math.PI * 2,
      0.1
    );

    p.radius = 40;
    p.bounce = -0.9;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      p.update();
      p.draw(ctx, p.radius);

      if (p.x + p.radius > width) {
        p.x = width - p.radius;
        p.vx = p.vx * p.bounce;
      }
      if (p.x - p.radius < 0) {
        p.x = p.radius;
        p.vx = p.vx * p.bounce;
      }
      if (p.y + p.radius > height) {
        p.y = height - p.radius;
        p.vy = p.vy * p.bounce;
      }
      if (p.y - p.radius < 0) {
        p.y = p.radius;
        p.vy = p.vy * p.bounce;
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode12_regen_extra = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const particles: Array<Particle> = [];

    const update = () => {
      ctx.clearRect(0, 0, width, height);
      console.log(particles.length);

      if (particles.length < 100) {
        const p = new Particle(
          width / 2,
          height,
          Math.random() * 8 + 5,
          -Math.PI / 2 + (Math.random() * 0.2 - 0.1),
          0.1
        );
        p.radius = Math.random() * 10 + 2;
        particles.push(p);
      }

      for (const p of particles) {
        p.update();
        p.draw(ctx, p.radius);

        if (p.y - p.radius > height) {
          p.x = width / 2;
          p.y = height;
          p.speed = Math.random() * 8 + 5;
          p.angle = -Math.PI / 2 + (Math.random() * 0.2 - 0.1);
        }
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode12_removal = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const particles: Array<Particle> = [];

    for (let i = 0; i < 100; i++) {
      const p = new Particle(
        width / 2,
        height / 2,
        Math.random() * 5 + 2,
        Math.random() * Math.PI * 2
      );
      p.radius = 10;
      particles.push(p);
    }

    const removeDeadParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (
          p.x - p.radius > width ||
          p.x + p.radius < 0 ||
          p.y - p.radius > height ||
          p.y + p.radius < 0
        ) {
          particles.splice(i, 1);
        }
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);
      console.log(particles.length);

      for (const p of particles) {
        p.update();
        p.draw(ctx, p.radius);
      }

      removeDeadParticles();
      requestAnimationFrame(update);
    };
    update();
  };

  const episode13_ship2 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const ship = new Particle(width / 2, height / 2);
    const thrust = new Vector();

    let angle = 0;
    let turningLeft = false;
    let turningRight = false;
    let thrusting = false;

    ship.friction = 0.99;

    const hKeyDown = (e: KeyboardEvent | MouseEvent) => {
      switch ((e as KeyboardEvent).key) {
        case "w":
          thrusting = true;
          break;
        case "a":
          turningLeft = true;
          break;
        case "d":
          turningRight = true;
          break;
        default:
          break;
      }
    };

    const hKeyUp = (e: KeyboardEvent | MouseEvent) => {
      switch ((e as KeyboardEvent).key) {
        case "w":
          thrusting = false;
          break;
        case "a":
          turningLeft = false;
          break;
        case "d":
          turningRight = false;
          break;
        default:
          break;
      }
    };

    canvasRef?.current?.addEventListener("keydown", hKeyDown);
    canvasRef?.current?.addEventListener("keyup", hKeyUp);

    canvasRef?.current?.removeEventListener("mouseout", hKeyDown);
    canvasRef?.current?.removeEventListener("mouseout", hKeyUp);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      if (turningRight) {
        angle += 0.05;
      }
      if (turningLeft) {
        angle -= 0.05;
      }

      if (thrusting) {
        thrust.length = 0.1;
      } else {
        thrust.length = 0;
      }
      thrust.angle = angle;

      ship.accelerate(thrust.x, thrust.y);
      ship.update();

      if (ship.x > width) {
        ship.x = 0;
      }
      if (ship.x < 0) {
        ship.x = width;
      }
      if (ship.y > height) {
        ship.y = 0;
      }
      if (ship.y < 0) {
        ship.y = height;
      }

      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(-10, -7);
      ctx.lineTo(-10, 7);
      ctx.lineTo(10, 0);

      if (thrusting) {
        ctx.moveTo(-10, 0);
        ctx.lineTo(-18, 0);
      }

      ctx.stroke();
      ctx.restore();

      requestAnimationFrame(update);
    };
    update();
  };

  const episode13_friction1 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p = new Particle(
      width / 2,
      height / 2,
      10,
      Math.random() * Math.PI * 2
    );
    const friction = new Vector(0.15, 0);

    p.radius = 10;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      friction.angle = p.angle;

      if (p.speed > friction.length) {
        p.vx -= friction.x;
        p.vy -= friction.y;
      } else {
        p.speed = 0;
      }

      p.update();
      p.draw(ctx, p.radius);

      requestAnimationFrame(update);
    };
    update();
  };

  const episode13_friction2 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p = new Particle(
      width / 2,
      height / 2,
      10,
      Math.random() * Math.PI * 2
    );
    const friction = 0.97;

    p.radius = 10;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      p.vx *= friction;
      p.vy *= friction;

      p.update();
      p.draw(ctx, p.radius);

      requestAnimationFrame(update);
    };
    update();
  };

  const episode14_circle_circle = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const c0 = {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 50 + Math.random() * 100,
      },
      c1 = {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 50 + Math.random() * 100,
      };

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height)!;

      c1.x = client.x;
      c1.y = client.y;

      if (Utils.circleCollision(c0, c1)) {
        ctx.fillStyle = "#f66";
      } else {
        ctx.fillStyle = "#999";
      }

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.arc(c0.x, c0.y, c0.radius, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(c1.x, c1.y, c1.radius, 0, Math.PI * 2, false);
      ctx.fill();
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);
  };

  const episode14_circle_point = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const circle = {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 50 + Math.random() * 100,
    };

    const hMouseMove = (event: MouseEvent) => {
      const pos = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!pos) return;

      if (Utils.circlePointCollision(pos?.x, pos?.y, circle)) {
        ctx.fillStyle = "#f66";
      } else {
        ctx.fillStyle = "#999";
      }

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
      ctx.fill();
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);
  };

  const episode14_rect_rect = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const r0 = { x: 200, y: 200, width: -200, height: -100 };
    const r1 = { x: 0, y: 0, width: -100, height: -200 };

    const hMouseMove = (e: MouseEvent) => {
      r1.x = e.clientX - 50;
      r1.y = e.clientY - 100;

      ctx.clearRect(0, 0, width, height);

      if (Utils.rectIntersect(r0, r1)) {
        ctx.fillStyle = "#f66";
      } else {
        ctx.fillStyle = "#999";
      }

      ctx.fillRect(r0.x, r0.y, r0.width, r0.height);
      ctx.fillRect(r1.x, r1.y, r1.width, r1.height);
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);
  };

  const episode14_rect_point = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const rect = { x: 300, y: 200, width: -200, height: -100 };

    canvasRef?.current?.addEventListener("mousemove", (event) => {
      ctx.clearRect(0, 0, width, height);

      const pos = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!pos) return;

      if (Utils.pointInRect(pos.x, pos.y, rect)) {
        ctx.fillStyle = "#f66";
      } else {
        ctx.fillStyle = "#999";
      }

      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
  };

  const episode15_spring = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const pSpring = new Vector(width / 2, height / 2);
    const weight = new Particle(
      Math.random() * width,
      Math.random() * height,
      50,
      Math.random() * Math.PI * 2
    );
    const k = 0.01 + Math.random() * 0.5;

    weight.radius = 20;
    weight.friction = 0.5 + Math.random() * 0.5;

    const hMoveMove = (event: MouseEvent) => {
      const pos = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!pos) return;

      pSpring.x = pos.x;
      pSpring.y = pos.y;
    };

    canvasRef?.current?.addEventListener("mousemove", hMoveMove);
    canvasRef?.current?.removeEventListener("mouseout", hMoveMove);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      const distance = pSpring.subtract(new Vector(weight.x, weight.y));
      const springForce = distance.multiply(k);

      weight.vx += springForce.x;
      weight.vy += springForce.y;
      weight.update();

      weight.draw(ctx, weight.radius);

      ctx.beginPath();
      ctx.arc(pSpring.x, pSpring.y, 4, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(weight.x, weight.y);
      ctx.lineTo(pSpring.x, pSpring.y);
      ctx.stroke();

      requestAnimationFrame(update);
    };
    update();
  };

  const episode16_spring1 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const pSpring = new Vector(width / 2, height / 2);
    const weight = new Particle(
      Math.random() * width,
      Math.random() * height,
      50,
      Math.random() * Math.PI * 2,
      0.5
    );
    const k = 0.1;
    const springLength = 100;

    weight.radius = 20;
    weight.friction = 0.95;

    const hMouseMove = (event: MouseEvent) => {
      const pos = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!pos) return;

      pSpring.x = pos.x;
      pSpring.y = pos.y;
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      const distance = pSpring.subtract(new Vector(weight.x, weight.y));
      distance.length = distance.length - springLength;
      const springForce = distance.multiply(k);

      weight.vx += springForce.x;
      weight.vy += springForce.y;
      weight.update();

      weight.draw(ctx, weight.radius);

      ctx.beginPath();
      ctx.arc(pSpring.x, pSpring.y, 4, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(weight.x, weight.y);
      ctx.lineTo(pSpring.x, pSpring.y);
      ctx.stroke();

      requestAnimationFrame(update);
    };
    update();
  };

  const episode16_triangle_spring = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const pA = new Particle(
      Utils.randomRange(0, width),
      Utils.randomRange(0, height),
      Utils.randomRange(0, 50),
      Utils.randomRange(0, Math.PI * 2),
      0.2
    );
    const pB = new Particle(
      Utils.randomRange(0, width),
      Utils.randomRange(0, height),
      Utils.randomRange(0, 50),
      Utils.randomRange(0, Math.PI * 2),
      0.2
    );
    const pC = new Particle(
      Utils.randomRange(0, width),
      Utils.randomRange(0, height),
      Utils.randomRange(0, 50),
      Utils.randomRange(0, Math.PI * 2),
      0.2
    );
    const k = 0.01;
    const separation = 200;

    pA.friction = 0.9;
    pA.radius = 20;

    pB.friction = 0.9;
    pB.radius = 20;

    pC.friction = 0.9;
    pC.radius = 20;

    const spring = (p0: Particle, p1: Particle, separation: number) => {
      const dx = p0.x - p1.x,
        dy = p0.y - p1.y;

      const distance = new Vector(dx, dy);
      distance.length = distance.length - separation;

      const springForce = distance.multiply(k);

      p1.vx += springForce.x;
      p1.vy += springForce.y;
      p0.vx -= springForce.x;
      p0.vy -= springForce.y;
    };

    const checkEdges = (p: Particle) => {
      if (p.y + p.radius > height) {
        p.y = height - p.radius;
        p.vy = p.vy * -0.95;
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      spring(pA, pB, separation);
      spring(pB, pC, separation);
      spring(pC, pA, separation);

      checkEdges(pA);
      checkEdges(pB);
      checkEdges(pC);

      pA.update();
      pB.update();
      pC.update();

      pA.draw(ctx, pA.radius);
      pB.draw(ctx, pB.radius);
      pC.draw(ctx, pC.radius);

      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.lineTo(pC.x, pC.y);
      ctx.lineTo(pA.x, pA.y);
      ctx.stroke();

      requestAnimationFrame(update);
    };
    update();
  };

  const episode17_spring = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const pSpring = { x: width / 2, y: height / 2 };
    const weight = new Particle(
      Math.random() * width,
      Math.random() * height,
      50,
      Math.random() * Math.PI * 2,
      0.5
    );
    const k = 0.1;
    const springLength = 100;

    weight.radius = 20;
    weight.friction = 0.95;

    const hMouseMove = (event: MouseEvent) => {
      const pos = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!pos) return;

      pSpring.x = pos.x;
      pSpring.y = pos.y;
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      const dx = pSpring.x - weight.x,
        dy = pSpring.y - weight.y,
        distance = Math.sqrt(dx * dx + dy * dy),
        springForce = (distance - springLength) * k,
        ax = (dx / distance) * springForce,
        ay = (dy / distance) * springForce;

      weight.vx += ax;
      weight.vy += ay;
      weight.update();

      weight.draw(ctx, weight.radius);

      ctx.beginPath();
      ctx.arc(pSpring.x, pSpring.y, 4, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(weight.x, weight.y);
      ctx.lineTo(pSpring.x, pSpring.y);
      ctx.stroke();

      requestAnimationFrame(update);
    };
    update();
  };

  const episode17_orbit = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const sun = new Particle(width / 2, height / 2);
    const planet = new Particle(width / 2 + 200, height / 2, 10, -Math.PI / 2);

    sun.mass = 20000;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      planet.gravitateTo(sun);
      planet.update();

      sun.draw(ctx, 20, "#ff0");
      planet.draw(ctx, 4, "#00f");

      requestAnimationFrame(update);
    };
    update();
  };

  const episode18_spring = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const pSpring1 = {
      point: { x: width / 2, y: height / 2 },
      length: 100,
      k: 0.1,
    };
    const pSpring2 = {
      point: {
        x: Utils.randomRange(0, width),
        y: Utils.randomRange(0, height),
      },
      length: 100,
      k: 0.1,
    };

    const weight = new Particle(
      Math.random() * width,
      Math.random() * height,
      50,
      Math.random() * Math.PI * 2,
      0.5
    );

    weight.radius = 20;
    weight.friction = 0.95;
    weight.addSpring(pSpring1);
    weight.addSpring(pSpring2);

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!client) return;

      pSpring1.point.x = client.x;
      pSpring1.point.y = client.y;
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      weight.update();
      weight.draw(ctx, weight.radius);

      ctx.beginPath();
      ctx.arc(pSpring1.point.x, pSpring1.point.y, 4, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(pSpring2.point.x, pSpring2.point.y);
      ctx.lineTo(weight.x, weight.y);
      ctx.lineTo(pSpring1.point.x, pSpring1.point.y);
      ctx.stroke();

      requestAnimationFrame(update);
    };
    update();
  };

  const episode18_multigravity = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const sun1 = new Particle(300, 200, 0, 0);
    const sun2 = new Particle(800, 500, 0, 0);
    const emitter = { x: 100, y: 0 };
    const particles: Array<Particle> = [];
    const numParticles = 100;

    sun1.mass = 10000;
    sun1.radius = 10;
    sun2.mass = 20000;
    sun2.radius = 20;

    for (let i = 0; i < numParticles; i++) {
      const p = new Particle(
        emitter.x,
        emitter.y,
        Utils.randomRange(7, 8),
        Math.PI / 2 + Utils.randomRange(-0.1, 0.1)
      );

      p.addGravitation(sun1);
      p.addGravitation(sun2);
      p.radius = 3;
      particles.push(p);
    }

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      sun1.draw(ctx, sun1.radius, "yellow");
      sun2.draw(ctx, sun2.radius, "yellow");

      for (const p of particles) {
        p.update();
        p.draw(ctx, p.radius);

        if (p.x > width || p.x < 0 || p.y > height || p.y < 0) {
          p.x = emitter.x;
          p.y = emitter.y;
          p.speed = Utils.randomRange(7, 8);
          p.angle = Math.PI / 2 + Utils.randomRange(-0.1, 0.1);
        }
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode19_curve_demo1 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = { x: 50, y: 300 },
      p1 = { x: 200, y: 200 },
      pA = { x: 0, y: 0 };

    let t = 0;

    ctx.scale(1.5, 1.5);

    const lblPoint = (p: { x: number; y: number }, name: string) => {
      ctx.fillStyle = "black";
      ctx.fillText(name, p.x + 10, p.y + 10);
      ctx.fillText("x: " + Math.round(p.x), p.x + 10, p.y + 25);
      ctx.fillText("y: " + Math.round(p.y), p.x + 10, p.y + 40);
    };

    const lblPointLeft = (p: { x: number; y: number }, name: string) => {
      ctx.fillStyle = "gray";
      ctx.fillText(name, p.x - 40, p.y - 40);
      ctx.fillText("x: " + Math.round(p.x), p.x - 40, p.y - 25);
      ctx.fillText("y: " + Math.round(p.y), p.x - 40, p.y - 10);
    };

    const lblT = () => {
      ctx.fillText("t = " + Utils.roundToPlaces(t, 1), 200, 250);
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.arc(p0.x, p0.y, 4, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p1.x, p1.y, 4, 0, Math.PI * 2, false);
      ctx.fill();

      pA.x = Utils.lerp(t, p0.x, p1.x);
      pA.y = Utils.lerp(t, p0.y, p1.y);

      ctx.beginPath();
      ctx.arc(pA.x, pA.y, 4, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(pA.x, pA.y);
      ctx.stroke();

      lblPointLeft(p0, "p0");
      lblPointLeft(p1, "p1");
      lblPoint(pA, "pA");
      lblT();

      t += 0.1;
      t = Math.min(t, 1);
    };
    update();

    canvasRef?.current?.addEventListener("click", update);
    canvasRef?.current?.removeEventListener("mouseout", update);
  };

  const episode19_curve_demo2 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = { x: 50, y: 300 },
      p1 = { x: 200, y: 200 },
      p2 = { x: 400, y: 300 },
      pA = { x: 0, y: 0 },
      pB = { x: 0, y: 0 };

    let t = 0;

    ctx.scale(1.5, 1.5);

    const lblPoint = (p: { x: number; y: number }, name: string) => {
      ctx.fillStyle = "black";
      ctx.fillText(name, p.x + 10, p.y + 10);
      ctx.fillText("x: " + Math.round(p.x), p.x + 10, p.y + 25);
      ctx.fillText("y: " + Math.round(p.y), p.x + 10, p.y + 40);
    };

    const lblPointLeft = (p: { x: number; y: number }, name: string) => {
      ctx.fillStyle = "gray";
      ctx.fillText(name, p.x - 40, p.y - 40);
      ctx.fillText("x: " + Math.round(p.x), p.x - 40, p.y - 25);
      ctx.fillText("y: " + Math.round(p.y), p.x - 40, p.y - 10);
    };

    const lblT = () => {
      ctx.fillText("t = " + Utils.roundToPlaces(t, 1), 200, 250);
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      Draw.arc(ctx, [p0, p1, p2]);

      pA.x = Utils.lerp(t, p0.x, p1.x);
      pA.y = Utils.lerp(t, p0.y, p1.y);

      pB.x = Utils.lerp(t, p1.x, p2.x);
      pB.y = Utils.lerp(t, p1.y, p2.y);

      Draw.arc(ctx, [pA, pB]);
      Draw.lines(ctx, [
        { startPoint: p0, endPoint: pA },
        { startPoint: p1, endPoint: pB },
      ]);

      lblPointLeft(p0, "p0");
      lblPointLeft(p1, "p1");
      lblPointLeft(p2, "p2");
      lblPoint(pA, "pA");
      lblPoint(pB, "pB");
      lblT();

      t += 0.1;
      t = Math.min(t, 1);
    };
    update();

    canvasRef?.current?.addEventListener("click", update);
    canvasRef?.current?.removeEventListener("mouseout", update);
  };

  const episode19_curve_demo3 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = { x: 50, y: 300 },
      p1 = { x: 200, y: 200 },
      p2 = { x: 400, y: 300 },
      pA = { x: 0, y: 0 },
      pB = { x: 0, y: 0 };

    let t = 0,
      maxT = 0;

    ctx.scale(1.5, 1.5);

    const lblPoint = (p: { x: number; y: number }, name: string) => {
      ctx.fillStyle = "black";
      ctx.fillText(name, p.x + 10, p.y + 10);
      ctx.fillText("x: " + Math.round(p.x), p.x + 10, p.y + 25);
      ctx.fillText("y: " + Math.round(p.y), p.x + 10, p.y + 40);
    };

    const lblPointLeft = (p: { x: number; y: number }, name: string) => {
      ctx.fillStyle = "gray";
      ctx.fillText(name, p.x - 40, p.y - 40);
      ctx.fillText("x: " + Math.round(p.x), p.x - 40, p.y - 25);
      ctx.fillText("y: " + Math.round(p.y), p.x - 40, p.y - 10);
    };

    const lblT = () => {
      ctx.fillText("t = " + Utils.roundToPlaces(maxT, 1), 200, 250);
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      Draw.stroke(ctx, [p0, p1, p2], "#ccc");
      Draw.arc(ctx, [p0], 4, "#ccc");
      Draw.arc(ctx, [p1, p2], 4, "black");

      for (t = 0; t <= maxT; t += 0.1) {
        pA.x = Utils.lerp(t, p0.x, p1.x);
        pA.y = Utils.lerp(t, p0.y, p1.y);

        pB.x = Utils.lerp(t, p1.x, p2.x);
        pB.y = Utils.lerp(t, p1.y, p2.y);

        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();
      }

      Draw.arc(ctx, [pA, pB]);

      // lblPointLeft(p0, "p0");
      // lblPointLeft(p1, "p1");
      // lblPointLeft(p2, "p2");
      // lblPoint(pA, "pA");
      // lblPoint(pB, "pB");
      lblT();

      maxT += 0.1;
      maxT = Math.min(t, 1);
    };
    update();

    canvasRef?.current?.addEventListener("click", update);
    canvasRef?.current?.removeEventListener("mouseout", update);
  };

  const episode19_curve_demo4 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = { x: 50, y: 300 },
      p1 = { x: 150, y: 100 },
      p2 = { x: 250, y: 300 },
      pA = { x: 0, y: 0 },
      pB = { x: 0, y: 0 },
      pFinal = { x: 0, y: 0 };

    let t = 0,
      maxT = 0;

    ctx.scale(1.5, 1.5);

    const lblPoint = (p: { x: number; y: number }, name: string) => {
      ctx.fillStyle = "black";
      ctx.fillText(name, p.x + 10, p.y + 10);
      ctx.fillText("x: " + Math.round(p.x), p.x + 10, p.y + 25);
      ctx.fillText("y: " + Math.round(p.y), p.x + 10, p.y + 40);
    };

    const lblPointLeft = (p: { x: number; y: number }, name: string) => {
      ctx.fillStyle = "gray";
      ctx.fillText(name, p.x - 40, p.y - 40);
      ctx.fillText("x: " + Math.round(p.x), p.x - 40, p.y - 25);
      ctx.fillText("y: " + Math.round(p.y), p.x - 40, p.y - 10);
    };

    const lblT = () => {
      ctx.fillText("t = " + Utils.roundToPlaces(maxT, 1), 200, 250);
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      Draw.stroke(ctx, [p0, p1, p2], "#ccc");
      Draw.arc(ctx, [p0, p1, p2], 4, "#ccc");

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      for (t = 0; t <= maxT; t += 0.1) {
        pA.x = Utils.lerp(t, p0.x, p1.x);
        pA.y = Utils.lerp(t, p0.y, p1.y);

        pB.x = Utils.lerp(t, p1.x, p2.x);
        pB.y = Utils.lerp(t, p1.y, p2.y);

        pFinal.x = Utils.lerp(t, pA.x, pB.x);
        pFinal.y = Utils.lerp(t, pA.y, pB.y);

        ctx.lineTo(pFinal.x, pFinal.y);
      }
      ctx.stroke();

      Draw.stroke(ctx, [pA, pB], "gray");
      Draw.arc(ctx, [pA, pB]);
      Draw.arc(ctx, [pFinal], 4, "red");

      ctx.fillStyle = "black";
      // lblPointLeft(p0, "p0");
      // lblPointLeft(p1, "p1");
      // lblPointLeft(p2, "p2");
      // lblPoint(pA, "pA");
      // lblPoint(pB, "pB");
      lblT();

      maxT += 0.1;
      maxT = Math.min(t, 1);
    };
    update();

    canvasRef?.current?.addEventListener("click", update);
    canvasRef?.current?.removeEventListener("mouseout", update);
  };

  const episode19_curve_demo5 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = { x: 50, y: 300 },
      p1 = { x: 150, y: 100 },
      p2 = { x: 250, y: 300 },
      pA = { x: 0, y: 0 },
      pB = { x: 0, y: 0 },
      pFinal = { x: 0, y: 0 };

    let t = 0,
      maxT = 0,
      dir = 0.01;

    ctx.scale(1.5, 1.5);

    const lblPoint = (p: { x: number; y: number }, name: string) => {
      ctx.fillStyle = "black";
      ctx.fillText(name, p.x + 10, p.y + 10);
      ctx.fillText("x: " + Math.round(p.x), p.x + 10, p.y + 25);
      ctx.fillText("y: " + Math.round(p.y), p.x + 10, p.y + 40);
    };

    const lblPointLeft = (p: { x: number; y: number }, name: string) => {
      ctx.fillStyle = "gray";
      ctx.fillText(name, p.x - 40, p.y - 40);
      ctx.fillText("x: " + Math.round(p.x), p.x - 40, p.y - 25);
      ctx.fillText("y: " + Math.round(p.y), p.x - 40, p.y - 10);
    };

    const lblT = () => {
      ctx.fillText("t = " + Utils.roundToPlaces(maxT, 1), 200, 250);
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      Draw.stroke(ctx, [p0, p1, p2], "#ccc");
      Draw.arc(ctx, [p0, p1, p2], 4, "#ccc");

      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      for (t = 0; t <= maxT; t += Math.abs(dir)) {
        pA.x = Utils.lerp(t, p0.x, p1.x);
        pA.y = Utils.lerp(t, p0.y, p1.y);

        pB.x = Utils.lerp(t, p1.x, p2.x);
        pB.y = Utils.lerp(t, p1.y, p2.y);

        pFinal.x = Utils.lerp(t, pA.x, pB.x);
        pFinal.y = Utils.lerp(t, pA.y, pB.y);

        ctx.lineTo(pFinal.x, pFinal.y);
      }
      ctx.stroke();

      Draw.stroke(ctx, [pA, pB], "gray");
      Draw.arc(ctx, [pA, pB]);
      Draw.arc(ctx, [pFinal], 4, "red");

      ctx.fillStyle = "black";
      // lblPointLeft(p0, "p0");
      // lblPointLeft(p1, "p1");
      // lblPointLeft(p2, "p2");
      // lblPoint(pA, "pA");
      // lblPoint(pB, "pB");
      lblT();

      maxT += dir;
      if (maxT >= 1) {
        maxT = 1;
        dir *= -1;
      }
      if (maxT <= 0) {
        maxT = 0;
        dir *= -1;
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode19_curve_demo6 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = { x: 50, y: 300 },
      p1 = { x: 150, y: 100 },
      p2 = { x: 250, y: 300 },
      p3 = { x: 350, y: 200 },
      pA = { x: 0, y: 0 },
      pB = { x: 0, y: 0 },
      pC = { x: 0, y: 0 },
      pM = { x: 0, y: 0 },
      pN = { x: 0, y: 0 },
      pFinal = { x: 0, y: 0 };

    let t = 0,
      maxT = 0,
      dir = 0.005,
      isAnimate = false;

    ctx.scale(1.5, 1.5);

    const lblPoint = (p: { x: number; y: number }, name: string) => {
      ctx.fillStyle = "black";
      ctx.fillText(name, p.x + 10, p.y + 10);
      ctx.fillText("x: " + Math.round(p.x), p.x + 10, p.y + 25);
      ctx.fillText("y: " + Math.round(p.y), p.x + 10, p.y + 40);
    };

    const lblPointLeft = (p: { x: number; y: number }, name: string) => {
      ctx.fillStyle = "gray";
      ctx.fillText(name, p.x - 40, p.y - 40);
      ctx.fillText("x: " + Math.round(p.x), p.x - 40, p.y - 25);
      ctx.fillText("y: " + Math.round(p.y), p.x - 40, p.y - 10);
    };

    const lblT = () => {
      ctx.fillText("t = " + Utils.roundToPlaces(maxT, 2), 200, 50);
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      Draw.stroke(ctx, [p0, p1, p2, p3], "#ccc");
      Draw.arc(ctx, [p0, p1, p2, p3], 4, "#ccc");

      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      for (t = 0; t <= maxT; t += Math.abs(dir)) {
        pA.x = Utils.lerp(t, p0.x, p1.x);
        pA.y = Utils.lerp(t, p0.y, p1.y);

        pB.x = Utils.lerp(t, p1.x, p2.x);
        pB.y = Utils.lerp(t, p1.y, p2.y);

        pC.x = Utils.lerp(t, p2.x, p3.x);
        pC.y = Utils.lerp(t, p2.y, p3.y);

        pM.x = Utils.lerp(t, pA.x, pB.x);
        pM.y = Utils.lerp(t, pA.y, pB.y);

        pN.x = Utils.lerp(t, pB.x, pC.x);
        pN.y = Utils.lerp(t, pB.y, pC.y);

        pFinal.x = Utils.lerp(t, pM.x, pN.x);
        pFinal.y = Utils.lerp(t, pM.y, pN.y);

        ctx.lineTo(pFinal.x, pFinal.y);
      }
      ctx.stroke();

      Draw.stroke(ctx, [pA, pB, pC], "green");
      Draw.stroke(ctx, [pM, pN], "blue");
      Draw.arc(ctx, [pA, pB]);
      Draw.arc(ctx, [pA, pB, pC], 4, "green");
      Draw.arc(ctx, [pM, pN], 4, "blue");
      Draw.arc(ctx, [pFinal], 4, "red");

      ctx.fillStyle = "black";
      // lblPointLeft(p0, "p0");
      // lblPointLeft(p1, "p1");
      // lblPointLeft(p2, "p2");
      // lblPoint(pA, "pA");
      // lblPoint(pB, "pB");
      lblT();

      maxT += dir;
      if (maxT >= 1) {
        maxT = 1;
        dir *= -1;
      }
      if (maxT <= 0) {
        maxT = 0;
        dir *= -1;
      }

      if (isAnimate) {
        requestAnimationFrame(update);
      }
    };
    update();

    canvasRef?.current?.addEventListener("click", () => {
      isAnimate = true;
      update();
    });
    canvasRef?.current?.removeEventListener("mouseout", update);
  };

  const episode19_curve_main1 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = {
        x: Utils.randomRange(0, width),
        y: Utils.randomRange(0, height),
      },
      p1 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      p2 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      p3 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      pFinal = { x: 0, y: 0 };

    Draw.arc(ctx, [p0, p1, p2, p3]);

    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    ctx.stroke();

    for (let t = 0; t <= 1; t += 0.01) {
      Utils.cubicBezier(p0, p1, p2, p3, t, pFinal);
      Draw.arc(ctx, [pFinal], 10, "black", "stroke");
    }
  };

  const episode19_curve_main2 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = {
        x: Utils.randomRange(0, width),
        y: Utils.randomRange(0, height),
      },
      p1 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      p2 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      p3 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      pFinal = { x: 0, y: 0 };

    let maxT = 0;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      for (let t = 0; t <= maxT; t += 0.01) {
        Utils.cubicBezier(p0, p1, p2, p3, t, pFinal);
        ctx.lineTo(pFinal.x, pFinal.y);
      }
      ctx.stroke();

      maxT += 0.01;
      if (maxT > 1) {
        maxT = 0;
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode19_curve_main3 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = {
        x: Utils.randomRange(0, width),
        y: Utils.randomRange(0, height),
      },
      p1 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      p2 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      p3 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      pFinal = { x: 0, y: 0 };

    let t = 0,
      dir = 0.01;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
      ctx.stroke();

      Utils.cubicBezier(p0, p1, p2, p3, t, pFinal);
      Draw.arc(ctx, [pFinal], 10);

      t += dir;
      if (t > 1 || t < 0) {
        dir = -dir;
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode20_curve_main1 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = {
        x: Utils.randomRange(0, width),
        y: Utils.randomRange(0, height),
      },
      p1 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      p2 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      cp = { x: 0, y: 0 };

    cp.x = p1.x * 2 - (p0.x + p2.x) / 2;
    cp.y = p1.y * 2 - (p0.y + p2.y) / 2;

    Draw.arc(ctx, [p0, p1, p2, cp]);
    Draw.stroke(ctx, [p0, cp, p2], "lightgray");

    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
    ctx.stroke();
  };

  const episode20_curve_main2 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const points = [],
      numPoints = 10;

    for (let i = 0; i < numPoints; i++) {
      const p = {
        x: Utils.randomRange(0, width),
        y: Utils.randomRange(0, height),
      };
      Draw.arc(ctx, [p], 3);
      points.push(p);
    }

    Draw.stroke(ctx, points, "lightgray");
    Utils.multiCurve(ctx, points, "black");
  };

  const episode20_curve_main3 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = {
        x: Utils.randomRange(0, width),
        y: Utils.randomRange(0, height),
      },
      p1 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      p2 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) },
      p3 = { x: Utils.randomRange(0, width), y: Utils.randomRange(0, height) };

    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    ctx.stroke();

    Utils.multiCurve(ctx, [p0, p1, p2, p3], "red");
  };

  const episode21_target_canvas = (
    ctx: CanvasRenderingContext2D,
    tCtx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p = new Particle(0, height / 2, 10, 0);

    Draw.arc(tCtx, [{ x: width / 2, y: height / 2 }], 200);

    const resetParticle = () => {
      p.x = 0;
      p.y = height / 2;
      p.angle = Utils.randomRange(-0.1, 0.1);
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      p.update();
      Draw.arc(ctx, [p], 50, "red");

      const imgData = tCtx.getImageData(p.x, p.y, 1, 1);
      if (imgData.data[3] > 0) {
        tCtx.globalCompositeOperation = "destination-out";
        Draw.arc(tCtx, [p], 20);

        resetParticle();
      } else if (p.x > width) {
        resetParticle();
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode22_perspective1 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const fl = 300,
      shapePos = { x: 500, y: 300, z: 1000 };

    ctx.translate(width / 2, height / 2);

    const perspective = fl / (fl + shapePos.z);
    ctx.translate(shapePos.x * perspective, shapePos.y * perspective);
    ctx.scale(perspective, perspective);
    ctx.fillRect(-100, -100, 200, 200);
  };

  const episode22_perspective2 = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const fl = 300,
      shapes: Array<{ x: number; y: number; z: number; char: string }> = [],
      numShapes = 100;

    for (let i = 0; i < numShapes; i++) {
      shapes[i] = {
        x: Utils.randomRange(-1000, 1000),
        y: Utils.randomRange(-1000, 1000),
        z: Utils.randomRange(0, 10000),
        char: String.fromCharCode(Utils.randomRange(65, 91)),
      };
    }

    ctx.translate(width / 2, height / 2);
    ctx.font = "200px Arial";

    const update = () => {
      ctx.clearRect(-width / 2, -height / 2, width, height);

      for (const shape of shapes) {
        const perspective = fl / (fl + shape.z);

        ctx.save();
        ctx.translate(shape.x * perspective, shape.y * perspective);
        ctx.scale(perspective, perspective);

        // square
        // ctx.fillRect(-100, -100, 200, 200);

        // circle
        // ctx.beginPath();
        // ctx.arc(0, 0, 100, 0, Math.PI * 2, false);
        // ctx.fill();

        // letter
        ctx.fillText(shape.char, -100, -100);
        ctx.restore();

        // move away
        // shape.z += 5;
        // if (shape.z > 10000) {
        //   shape.z = 0;
        // }

        shape.z -= 5;
        if (shape.z < 0) {
          shape.z = 10000;
        }
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode22_postcards = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const fl = 300,
      cards: Array<{
        x: number;
        y: number;
        z: number;
        img: CanvasImageSource;
      }> = [],
      numCards = 21;

    for (let i = 0; i < numCards; i++) {
      const card = {
        x: Utils.randomRange(-1000, 1000),
        y: Utils.randomRange(-1000, 1000),
        z: Utils.randomRange(0, 5000),
        img: new Image(),
      };

      card.img.src = `/postcard${i % 7}.jpg`;

      card.img.onload = function () {
        cards.push(card);
      };
    }

    ctx.translate(width / 2, height / 2);
    ctx.font = "200px Arial";

    const update = () => {
      ctx.clearRect(-width / 2, -height / 2, width, height);

      for (const card of cards) {
        const perspective = fl / (fl + card.z);

        ctx.save();
        ctx.translate(card.x * perspective, card.y * perspective);
        ctx.scale(perspective, perspective);

        ctx.translate(-card.img.width / 2, -card.img.height / 2);
        ctx.drawImage(card.img, 0, 0);
        ctx.restore();

        card.z -= 5;
        if (card.z < 0) {
          card.z = 5000;
        }
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode23_spiral = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const fl = 300,
      cards: Array<{
        x: number;
        y: number;
        z: number;
        angle: number;
        img: CanvasImageSource;
      }> = [],
      numCards = 200,
      centerZ = 2000;

    let yPos = 0,
      radius = 1000,
      baseAngle = 0,
      rotSpeed = 0.01;

    for (let i = 0; i < numCards; i++) {
      const card = {
        x: 0,
        y: 0,
        z: 0,
        angle: 0.2 * i,
        img: new Image(),
      };

      card.x = Math.cos(card.angle + baseAngle) * radius;
      card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
      cards.push(card);
    }

    ctx.translate(width / 2, height / 2);
    ctx.font = "200px Arial";

    const zsort = (
      cardA: { x: number; z: number; angle: number; img: CanvasImageSource },
      cardB: { x: number; z: number; angle: number; img: CanvasImageSource }
    ) => {
      return cardB.z - cardA.z;
    };

    const update = () => {
      ctx.clearRect(-width / 2, -height / 2, width, height);

      baseAngle += rotSpeed;
      cards.sort(zsort);

      for (const card of cards) {
        const perspective = fl / (fl + card.z);

        ctx.save();
        ctx.scale(perspective, perspective);
        ctx.translate(card.x, yPos);

        ctx.beginPath();
        ctx.arc(0, 0, 40, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.restore();

        card.x = Math.cos(card.angle + baseAngle) * radius;
        card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
      }

      requestAnimationFrame(update);
    };
    update();

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!client) return;

      rotSpeed = (client.x - width / 2) * 0.00005;
      yPos = (client.y - height / 2) * 2;
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);
  };

  const episode23_stars = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const fl = 300,
      cards: Array<{
        x: number;
        z: number;
        angle: number;
        img: CanvasImageSource;
      }> = [],
      numCards = 20,
      centerZ = 1000;

    let yPos = 0,
      radius = 1000,
      baseAngle = 0,
      rotSpeed = 0.01;

    for (let i = 0; i < numCards; i++) {
      const card = {
        x: 0,
        z: 0,
        angle: ((Math.PI * 2) / numCards) * i,
        img: new Image(),
      };

      card.x = Math.cos(card.angle + baseAngle) * radius;
      card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
      card.img.src = "/star.png";

      card.img.onload = function () {
        cards.push(card);
      };
    }

    ctx.translate(width / 2, height / 2);
    ctx.font = "200px Arial";

    const zsort = (
      cardA: { x: number; z: number; angle: number; img: CanvasImageSource },
      cardB: { x: number; z: number; angle: number; img: CanvasImageSource }
    ) => {
      return cardB.z - cardA.z;
    };

    const update = () => {
      ctx.clearRect(-width / 2, -height / 2, width, height);

      baseAngle += rotSpeed;
      cards.sort(zsort);

      for (const card of cards) {
        const perspective = fl / (fl + card.z);

        ctx.save();
        ctx.scale(perspective, perspective);
        ctx.translate(card.x, yPos);

        ctx.translate(-card.img.width / 2, -card.img.height / 2);
        ctx.drawImage(card.img, 0, 0);
        ctx.restore();

        card.x = Math.cos(card.angle + baseAngle) * radius;
        card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
      }

      requestAnimationFrame(update);
    };
    update();

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!client) return;

      rotSpeed = (client.x - width / 2) * 0.00005;
      yPos = (client.y - height / 2) * 2;
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);
  };

  const episode23_final = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const fl = 300,
      cards: Array<{
        x: number;
        y: number;
        z: number;
        angle: number;
        radius: number;
      }> = [],
      numCards = 200,
      centerZ = 1000;

    let yPos = 0,
      baseAngle = 0,
      rotSpeed = 0.01;

    for (let i = 0; i < numCards; i++) {
      const card = {
        x: 0,
        y: Utils.randomRange(2000, -2000),
        z: 0,
        angle: Utils.randomRange(0, Math.PI * 2),
        radius: Utils.randomRange(100, 1100),
      };

      card.x = Math.cos(card.angle + baseAngle) * card.radius;
      card.z = centerZ + Math.sin(card.angle + baseAngle) * card.radius;
      cards.push(card);
    }

    ctx.translate(width / 2, height / 2);

    const zsort = (
      cardA: { x: number; y: number; z: number; angle: number; radius: number },
      cardB: { x: number; y: number; z: number; angle: number; radius: number }
    ) => {
      return cardB.z - cardA.z;
    };

    const update = () => {
      ctx.clearRect(-width / 2, -height / 2, width, height);

      baseAngle += rotSpeed;
      cards.sort(zsort);

      for (const card of cards) {
        const perspective = fl / (fl + card.z);

        ctx.save();
        ctx.scale(perspective, perspective);
        ctx.translate(card.x, card.y);
        ctx.globalAlpha = Utils.map(card.y, 2000, -2000, 1, 0);

        ctx.beginPath();
        ctx.arc(0, 0, 40, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();

        card.x = Math.cos(card.angle + baseAngle) * card.radius;
        card.z = centerZ + Math.sin(card.angle + baseAngle) * card.radius;
        card.y -= 10;

        if (card.y < -2000) {
          card.y = 2000;
        }
      }

      requestAnimationFrame(update);
    };
    update();

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!client) return;

      rotSpeed = (client.x - width / 2) * 0.00005;
      yPos = (client.y - height / 2) * 2;
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);
  };

  const episode24_spiral = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const fl = 300,
      points: Array<{ x: number; y: number; z: number; angle: number }> = [],
      numPoints = 200,
      centerZ = 2000;

    let yPos = 0,
      radius = 1000,
      baseAngle = 0,
      rotSpeed = 0.01;

    for (let i = 0; i < numPoints; i++) {
      const point = {
        x: 0,
        y: 2000 - (4000 / numPoints) * i + Math.random() * 500,
        z: 0,
        angle: 0.2 * i,
      };

      point.x = Math.cos(point.angle + baseAngle) * radius;
      point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
      points.push(point);
    }

    ctx.translate(width / 2, height / 2);

    const update = () => {
      ctx.clearRect(-width / 2, -height / 2, width, height);

      baseAngle += rotSpeed;

      ctx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const point = points[i],
          perspective = fl / (fl + point.z);

        ctx.save();
        ctx.scale(perspective, perspective);
        ctx.translate(point.x, yPos);

        if (i === 0) {
          ctx.moveTo(0, 0);
        } else {
          ctx.lineTo(0, 0);
        }
        ctx.restore();

        point.x = Math.cos(point.angle + baseAngle) * radius;
        point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
      }
      ctx.stroke();

      requestAnimationFrame(update);
    };
    update();

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!client) return;

      rotSpeed = (client.x - width / 2) * 0.00005;
      yPos = (client.y - height / 2) * 2;
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);
  };

  const episode25_polygon = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const fl = 300,
      points: Array<{
        x: number;
        y: number;
        z: number;
        sx: number;
        sy: number;
      }> = [];

    let needsUpdate = true;

    ctx.translate(width / 2, height / 2);

    points[0] = { x: -500, y: -500, z: 1000, sx: 1, sy: 1 };
    points[1] = { x: 500, y: -500, z: 1000, sx: 1, sy: 1 };
    points[2] = { x: 500, y: -500, z: 500, sx: 1, sy: 1 };
    points[3] = { x: -500, y: -500, z: 500, sx: 1, sy: 1 };
    points[4] = { x: -500, y: 500, z: 1000, sx: 1, sy: 1 };
    points[5] = { x: 500, y: 500, z: 1000, sx: 1, sy: 1 };
    points[6] = { x: 500, y: 500, z: 500, sx: 1, sy: 1 };
    points[7] = { x: -500, y: 500, z: 500, sx: 1, sy: 1 };

    const project = () => {
      for (let i = 0; i < points.length; i++) {
        const p = points[i],
          scale = fl / (fl + p.z);

        p.sx = p.x * scale;
        p.sy = p.y * scale;
      }
    };

    const drawLine = (arg: Array<number>) => {
      let p = points[arg[0]];

      ctx.moveTo(p.sx, p.sy);
      for (let i = 1; i < points.length; i++) {
        p = points[arg[i]];
        ctx.lineTo(p?.sx, p?.sy);
      }
    };

    const translateModel = (x: number, y: number, z: number) => {
      for (const point of points) {
        point.x += x;
        point.y += y;
        point.z += z;
      }

      needsUpdate = true;
    };

    const update = () => {
      if (needsUpdate) {
        ctx.clearRect(-width / 2, -height / 2, width, height);

        project();

        ctx.beginPath();
        drawLine([0, 1, 2, 3, 0]);
        drawLine([4, 5, 6, 7, 4]);
        drawLine([0, 4]);
        drawLine([1, 5]);
        drawLine([2, 6]);
        drawLine([3, 7]);
        ctx.stroke();
        needsUpdate = false;
      }

      requestAnimationFrame(update);
    };
    update();

    const hKeyDown = (e: KeyboardEvent | MouseEvent) => {
      switch ((e as KeyboardEvent).key) {
        case "a":
          translateModel(-20, 0, 0);
          break;
        case "d":
          translateModel(20, 0, 0);
          break;
        case "w":
          if (e.shiftKey) {
            translateModel(0, 0, 20);
          } else {
            translateModel(0, -20, 0);
          }
          break;
        case "s":
          if (e.shiftKey) {
            translateModel(0, 0, -20);
          } else {
            translateModel(0, 20, 0);
          }
          break;
        default:
          break;
      }
    };

    canvasRef?.current?.addEventListener("keydown", hKeyDown);
    canvasRef?.current?.removeEventListener("mouseout", hKeyDown);
  };

  const episode26_2d = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const point = { x: 300, y: 200 },
      delta = 0.05;

    ctx.translate(width / 2, height / 2);

    const update = () => {
      ctx.clearRect(-width / 2, -height / 2, width, height);

      Draw.arc(ctx, [point], 20);

      const cos = Math.cos(delta),
        sin = Math.sin(delta),
        x = point.x * cos - point.y * sin,
        y = point.x * sin + point.y * cos;

      point.x = x;
      point.y = y;

      requestAnimationFrame(update);
    };
    update();
  };

  const episode26_polygon = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const fl = 300,
      centerZ = 1500,
      verties: Array<{
        x: number;
        y: number;
        z: number;
        sx: number;
        sy: number;
      }> = [];

    let needsUpdate = true;

    ctx.translate(width / 2, height / 2);

    verties[0] = { x: -500, y: -500, z: 1000, sx: 1, sy: 1 };
    verties[1] = { x: 500, y: -500, z: 1000, sx: 1, sy: 1 };
    verties[2] = { x: 500, y: -500, z: 500, sx: 1, sy: 1 };
    verties[3] = { x: -500, y: -500, z: 500, sx: 1, sy: 1 };
    verties[4] = { x: -500, y: 500, z: 1000, sx: 1, sy: 1 };
    verties[5] = { x: 500, y: 500, z: 1000, sx: 1, sy: 1 };
    verties[6] = { x: 500, y: 500, z: 500, sx: 1, sy: 1 };
    verties[7] = { x: -500, y: 500, z: 500, sx: 1, sy: 1 };

    const model = new Model(verties);

    const update = () => {
      if (needsUpdate) {
        ctx.clearRect(-width / 2, -height / 2, width, height);

        model.project(fl, centerZ);

        model.edge(ctx, [0, 1, 2, 3, 0], "black", "stroke");
        model.edge(ctx, [4, 5, 6, 7, 4], "black", "stroke");
        model.edge(ctx, [0, 4], "black", "stroke");
        model.edge(ctx, [1, 5], "black", "stroke");
        model.edge(ctx, [2, 6], "black", "stroke");
        model.edge(ctx, [3, 7], "black", "stroke");

        needsUpdate = false;
      }

      requestAnimationFrame(update);
    };
    update();

    const hKeyDown = (e: KeyboardEvent | MouseEvent) => {
      switch ((e as KeyboardEvent).key) {
        case "a":
          if (e.ctrlKey) {
            model.rotateY(0.05);
            needsUpdate = true;
          } else {
            model.translate(-20, 0, 0);
            needsUpdate = true;
          }
          break;
        case "d":
          if (e.ctrlKey) {
            model.rotateY(-0.05);
            needsUpdate = true;
          } else {
            model.translate(20, 0, 0);
            needsUpdate = true;
          }
          break;
        case "w":
          if (e.shiftKey) {
            model.translate(0, 0, 20);
            needsUpdate = true;
          } else if (e.ctrlKey) {
            model.rotateX(0.05);
            needsUpdate = true;
          } else {
            model.translate(0, -20, 0);
            needsUpdate = true;
          }
          break;
        case "s":
          if (e.shiftKey) {
            model.translate(0, 0, -20);
            needsUpdate = true;
          } else if (e.ctrlKey) {
            model.rotateX(-0.05);
            needsUpdate = true;
          } else {
            model.translate(0, 20, 0);
            needsUpdate = true;
          }
          break;
        default:
          break;
      }
    };

    canvasRef?.current?.addEventListener("keydown", hKeyDown);
    canvasRef?.current?.removeEventListener("mouseout", hKeyDown);
  };

  const episode27_ease = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const target = {
        x: width,
        y: Math.random() * height,
      },
      position = {
        x: 0,
        y: Math.random() * height,
      },
      ease = 0.1;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      Draw.arc(ctx, [position], 10);

      const dx = target.x - position.x,
        dy = target.y - position.y,
        vx = dx * ease,
        vy = dy * ease;

      position.x += vx;
      position.y += vy;

      requestAnimationFrame(update);
    };
    update();

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!client) return;

      target.x = client.x;
      target.y = client.y;
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);
  };

  const episode28_leader_stroke = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const target = {
        x: width,
        y: Math.random() * height,
      },
      points: Array<{ x: number; y: number }> = [],
      numPoints = 50,
      ease = 0.25;

    for (let i = 0; i < numPoints; i++) {
      points.push({ x: 0, y: 0 });
    }

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      const leader = {
        x: target.x,
        y: target.y,
      };

      ctx.beginPath();
      ctx.moveTo(leader.x, leader.y);
      for (let i = 0; i < numPoints; i++) {
        const point = points[i];
        point.x += (leader.x - point.x) * ease;
        point.y += (leader.y - point.y) * ease;

        ctx.lineTo(point.x, point.y);

        leader.x = point.x;
        leader.y = point.y;
      }
      ctx.stroke();

      requestAnimationFrame(update);
    };
    update();

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!client) return;

      target.x = client.x;
      target.y = client.y;
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);
  };

  const episode28_click = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const target = { x: width, y: Math.random() * height },
      position = { x: 0, y: Math.random() * height },
      ease = 0.1;

    let easing = true;

    const easeTo = (
      position: { x: number; y: number },
      target: { x: number; y: number },
      ease: number
    ) => {
      const dx = target.x - position.x,
        dy = target.y - position.y;

      position.x += dx * ease;
      position.y += dy * ease;

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        position.x = target.x;
        position.y = target.y;
        console.log("Stop");
        return false;
      }
      return true;
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      Draw.arc(ctx, [position], 10);

      easing = easeTo(position, target, ease);
      if (easing) {
        requestAnimationFrame(update);
      }
    };
    update();

    const hClick = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!client) return;

      target.x = client.x;
      target.y = client.y;

      if (!easing) {
        easing = true;
        update();
      }
    };

    canvasRef?.current?.addEventListener("click", hClick);
    canvasRef?.current?.removeEventListener("mouseout", hClick);
  };

  const episode28_leader_fill = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const target = {
        x: width,
        y: Math.random() * height,
      },
      points: Array<{ x: number; y: number }> = [],
      numPoints = 100,
      ease = 0.5;

    for (let i = 0; i < numPoints; i++) {
      points.push({ x: 0, y: 0 });
    }

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      const leader = {
        x: target.x,
        y: target.y,
      };

      for (let i = 0; i < numPoints; i++) {
        const point = points[i];
        point.x += (leader.x - point.x) * ease;
        point.y += (leader.y - point.y) * ease;

        Draw.arc(ctx, [point], 10);

        leader.x = point.x;
        leader.y = point.y;
      }
      ctx.stroke();

      requestAnimationFrame(update);
    };
    update();

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!client) return;

      target.x = client.x;
      target.y = client.y;
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);
  };

  const episode28_steering = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    let angle = 0,
      tAngle = 0,
      ease = 0.05,
      wheel = new Image();

    wheel.src = "/wheel.png";
    wheel.onload = function () {
      update();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      angle += (tAngle - angle) * ease;

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(angle);

      ctx.drawImage(wheel, -wheel.width / 2, -wheel.height / 2);
      ctx.restore();

      requestAnimationFrame(update);
    };

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!client) return;

      tAngle = Utils.map(client.x, 0, width, -Math.PI, Math.PI);
    };

    canvasRef?.current?.addEventListener("mousemove", hMouseMove);
    canvasRef?.current?.removeEventListener("mouseout", hMouseMove);
  };

  const episode29_easing = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const start = { x: 100, y: 100 },
      target = { x: 0, y: 0 },
      change = { x: 0, y: 0 },
      duration = 1000;

    let startTime: Date;

    Draw.arc(ctx, [start], 20);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      const time = Number(new Date()) - Number(startTime);
      if (time < duration) {
        const x = Easing.easeInOutQuad(time, start.x, change.x, duration);
        const y = Easing.easeInOutQuad(time, start.y, change.y, duration);
        Draw.arc(ctx, [{ x, y }], 20);
        requestAnimationFrame(update);
      } else {
        Draw.arc(ctx, [target], 20);
        start.x = target.x;
        start.y = target.y;
      }
    };

    const hClick = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!client) return;

      target.x = client.x;
      target.y = client.y;
      change.x = target.x - start.x;
      change.y = target.y - start.y;
      startTime = new Date();

      update();
    };

    canvasRef?.current?.addEventListener("click", hClick);
    canvasRef?.current?.removeEventListener("mouseout", hClick);
  };

  const episode30_tweenX = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const ball = { x: 100, y: 100 };

    const tweenX = (
      obj: typeof ball,
      targetX: number,
      duration: number,
      easingFunc: typeof Easing.easeInOutQuad,
    ) => {
      const startX = obj.x,
        changeX = targetX - startX,
        startTime = new Date();

      const update = () => {
        let time = Number(new Date()) - Number(startTime);
        if (time < duration) {
          obj.x = easingFunc(time, startX, changeX, duration);
          requestAnimationFrame(update);
        } else {
          time = duration;
          obj.x = easingFunc(time, startX, changeX, duration);
        }

        ctx.clearRect(0, 0, width, height);
        Draw.arc(ctx, ball, 20);
      };
      update();
    };

    tweenX(ball, 800, 1000, Easing.easeInOutQuad);
  };

  const episode30_tweenBasic = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    type Obj = {
      [index: string]: number,
      x: number,
      y: number,
      alpha: number,
    }

    const ball = { x: 100, y: 100, alpha: 1 };

    const tween = (
      obj: Obj,
      prop: string,
      target: number,
      duration: number,
      easingFunc: typeof Easing.easeInOutQuad,
    ) => {
      const start = obj[prop],
        change = target - start,
        startTime = new Date();

      const update = () => {
        let time = Number(new Date()) - Number(startTime);
        if (time < duration) {
          obj[prop] = easingFunc(time, start, change, duration);
          requestAnimationFrame(update);
        } else {
          time = duration;
          obj[prop] = easingFunc(time, start, change, duration);
        }

        ctx.clearRect(0, 0, width, height);
        ctx.globalAlpha = ball.alpha;
        Draw.arc(ctx, [ball], 20);
      };
      update();
    };

    tween(ball, "alpha", 0, 1000, Easing.easeInOutQuad);
  };

  const episode30_tweenFull = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    type Obj = {
      [index: string]: number,
      x: number,
      y: number,
      alpha: number,
    }

    const ball = { x: 100, y: 100, alpha: 1 };

    const tween = (
      obj: Obj,
      tweenObj: Obj,
      duration: number,
      easingFunc: Function,
      onProgress: Function,
      onComplete: Function,
    ) => {
      let starts: Obj = { ...obj },
        changes: Obj = { ...tweenObj },
        startTime = new Date();

      for (const prop in tweenObj) {
        if (Object.prototype.hasOwnProperty.call(tweenObj, prop)) {
          starts[prop] = obj[prop];
          changes[prop] = tweenObj[prop] - starts[prop];
        }
      }

      const update = () => {
        let time = Number(new Date()) - Number(startTime);
        if (time < duration) {
          for (const prop in tweenObj) {
            if (Object.prototype.hasOwnProperty.call(tweenObj, prop)) {
              obj[prop] = easingFunc(time, starts[prop], changes[prop], duration);
            }
          }

          onProgress();
          requestAnimationFrame(update);
        } else {
          time = duration;
          for (const prop in tweenObj) {
            if (Object.prototype.hasOwnProperty.call(tweenObj, prop)) {
              obj[prop] = easingFunc(time, starts[prop], changes[prop], duration);
            }
          }

          onComplete();
        }
      };
      update();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = ball.alpha;
      Draw.arc(ctx, ball, 20);
    };

    const tweenBack = () => {
      tween(ball, {x: 100, y: 100, alpha: 1}, 1000, Easing.easeInOutQuad, render, render);
    };

    // tween(ball, {x: 900, y: 700, alpha: 0}, 1000, Easing.easeInOutQuad, render, tweenBack);
    Easing.tween(ball, {x: 900, y: 700, alpha: 0}, 1000, Easing.easeInOutQuad, render, tweenBack);
  };

  const episode32_intersect = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = { x: 100, y: 100 },
      p1 = { x: 500, y: 500 },
      p2 = { x: 600, y: 50 },
      p3 = { x: 80, y: 600 };

    Draw.lines(ctx, [{startPoint: p0, endPoint: p1}, {startPoint: p2, endPoint: p3}]);

    const intersect = Utils.lineIntersect({ startPoint: p0, endPoint: p1 }, { startPoint: p2, endPoint: p3 });
    if (intersect) {
      Draw.arc(ctx, intersect, 20);
    }
  };

  const episode32_interactive_intersect = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = { x: 100, y: 100 },
      p1 = { x: 500, y: 500 },
      p2 = { x: 600, y: 50 },
      p3 = { x: 80, y: 600 };

    let clickPoint: {x: number, y: number};

    const onMouseDown = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height)!;
      clickPoint = Utils.getSelectPoint([p0, p1, p2, p3], client.x, client.y)!;
      if (clickPoint) {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height)!;
      clickPoint.x = client.x;
      clickPoint.y = client.y;
      update();
    };

    const onMouseUp = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousedown", onMouseDown);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      Draw.arc(ctx, [p0, p1, p2, p3], 10);
      Draw.lines(ctx, [{startPoint: p0, endPoint: p1}, {startPoint: p2, endPoint: p3}]);

      const intersect = Utils.lineIntersect({startPoint: p0, endPoint: p1}, {startPoint: p2, endPoint: p3});
      if (intersect) {
        Draw.arc(ctx, intersect, 20);
      }
    };
    update();
  };

  const episode33_parallel = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = { x: 100, y: 100 },
      p1 = { x: 500, y: 100 },
      p2 = { x: 100, y: 200 },
      p3 = { x: 500, y: 200 };

    Draw.lines(ctx, [{startPoint: p0, endPoint:p1}, {startPoint:p2, endPoint: p3}]);

    const intersect = Utils.lineIntersect({startPoint: p0, endPoint:p1}, {startPoint:p2, endPoint: p3});
    if (intersect) {
      Draw.arc(ctx, intersect, 20);
    }
  };

  const episode33_interactive_intersect = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const p0 = { x: 100, y: 100 },
      p1 = { x: 500, y: 500 },
      p2 = { x: 600, y: 50 },
      p3 = { x: 80, y: 600 };

    let clickPoint: {x: number, y: number};

    const onMouseDown = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height)!;
      clickPoint = Utils.getSelectPoint([p0, p1, p2, p3], client.x, client.y)!;
      if (clickPoint) {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height)!;
      clickPoint.x = client.x;
      clickPoint.y = client.y;
      update();
    };

    const onMouseUp = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousedown", onMouseDown);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      Draw.arc(ctx, [p0, p1, p2, p3], 10);
      Draw.lines(ctx, [{startPoint: p0, endPoint: p1}, {startPoint: p2, endPoint: p3}]);

      const intersect = Utils.segementIntersect({startPoint: p0, endPoint: p1}, {startPoint: p2, endPoint: p3});
      if (intersect) {
        Draw.arc(ctx, intersect, 20);
      }
    };
    update();
  };

  const episode34_particle_line_collision = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const particle = {
      x: width / 2,
      y: height / 2,
      vx: Math.random() * 10 - 5,
      vy: Math.random() * 10 - 5,
    };

    const lines: Array<Line> = [];

    for (let i = 0; i < 10; i++) {
      lines[i] = {
        startPoint: {
          x: Math.random() * width,
          y: Math.random() * height,
        },
        endPoint: {
          x: Math.random() * width,
          y: Math.random() * height,
        }
      }
    }

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      Draw.lines(ctx, lines);

      const p0 = {
        x: particle.x,
        y: particle.y,
      };

      particle.x += particle.vx;
      particle.y += particle.vy;
      ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);

      const p1 = {
        x: particle.x,
        y: particle.y,
      };

      for (let i = 0; i < lines.length; i++) {
        const p2 = lines[i].startPoint;
        const p3 = lines[i].endPoint;

        const intersect = Utils.segementIntersect({ startPoint: p0, endPoint: p1 }, { startPoint: p2, endPoint: p3 });
        if (intersect) {
          Draw.arc(ctx, intersect, 20, "red", "stroke");
          return;
        }
      }

      requestAnimationFrame(update);
    };
    update();
  };

  const episode34_shape_collision = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const star1 = {
      x: 200,
      y: 200,
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      offset: [
        { x: 100, y: 0 },
        { x: 40, y: 29 },
        { x: 31, y: 95 },
        { x: -15, y: 48 },
        { x: -81, y: 59 },
        { x: -50, y: 0 },
        { x: -81, y: -59 },
        { x: -15, y: -48 },
        { x: 31, y: -95 },
        { x: 40, y: -29 },
      ],
    };

    const star2 = {
      x: 600,
      y: 500,
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      offset: [
        { x: 100, y: 0 },
        { x: 40, y: 29 },
        { x: 31, y: 95 },
        { x: -15, y: 48 },
        { x: -81, y: 59 },
        { x: -50, y: 0 },
        { x: -81, y: -59 },
        { x: -15, y: -48 },
        { x: 31, y: -95 },
        { x: 40, y: -29 },
      ],
    };

    const drawStar = (star: Shape) => {
        ctx.beginPath();
        ctx.moveTo(star.points[0].x, star.points[0].y);
        for (let i = 1; i < star.points.length; i++) {
          ctx.lineTo(star.points[i].x, star.points[i].y);
        }
        ctx.closePath();
        ctx.fill();
    };

    const updateStar = (star: Shape) => {
      for (let i = 0; i < star.points.length; i++) {
        star.points[i].x = star.x + star.offset[i].x;
        star.points[i].y = star.y + star.offset[i].y;
      }
    };

    const isCollision = (star: Shape, other: Shape) => {
      for (let i = 0; i < star.points.length; i++) {
        const p0 = star.points[i];
        const p1 = star.points[(i + 1) % star.points.length];

        for (let j = 0; j < other.points.length; j++) {
          const p2 = other.points[j];
          const p3 = other.points[(j + 1) % other.points.length];

          let line1 = { startPoint: p0, endPoint: p1 };
          let line2 = { startPoint: p2, endPoint: p3 };

          if (Utils.segementIntersect(line1, line2)) {
            return true;
          }
        }
      }

      return false;
    };

    const hMouseMove = (event: MouseEvent) => {
      ctx.clearRect(0, 0, width, height);
      
      const client = Utils.getClientPos(canvasRef.current, event, width, height);
      if (!client) return;

      star1.x = client.x;
      star1.y = client.y;
      updateStar(star1);
      updateStar(star2);

      if (isCollision(star1, star2)) {
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle = "black";
      }
      
      drawStar(star1);
      drawStar(star2);
    };

    document.addEventListener("mousemove", hMouseMove);
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight * 0.92);

    // if (!targetRef.current) return;
    // if (!targetRef.current.getContext("2d")) return;
    // const tCanvas = targetRef.current;
    // const tCtx = tCanvas.getContext("2d");
    // tCanvas.width = width;
    // tCanvas.height = height;

    // episode1_randomLine(ctx, width, height);
    // episode2_trigonometry(ctx, width, height);
    // episode3_moreTrigonometry(ctx, width, height);
    // episode4_code(ctx, width, height);
    // episode4_circle(ctx, width, height);
    // episode4_bees(ctx, width, height);
    // episode5_arctangent(ctx, width, height);
    // episode8_velocity(ctx, width, height);
    // episode9_main(ctx, width, height);
    // episode9_fireworks(ctx, width, height);
    // episode10_ship(ctx, width, height);
    // episode11_orbit(ctx, width, height);
    // episode12_wrapping(ctx, width, height);
    // episode12_bounce(ctx, width, height);
    // episode12_regen_extra(ctx, width, height);
    // episode12_removal(ctx, width, height);
    // episode13_ship2(ctx, width, height);
    // episode13_friction1(ctx, width, height);
    // episode13_friction2(ctx, width, height);
    // episode14_circle_circle(ctx, width, height);
    // episode14_circle_point(ctx, width, height);
    // episode14_rect_rect(ctx, width, height);
    // episode14_rect_point(ctx, width, height);
    // episode15_spring(ctx, width, height);
    // episode16_spring1(ctx, width, height);
    // episode16_triangle_spring(ctx, width, height);
    // episode17_spring(ctx, width, height);
    // episode17_orbit(ctx, width, height);
    // episode18_spring(ctx, width, height);
    // episode18_multigravity(ctx, width, height);
    // episode19_curve_demo1(ctx, width, height);
    // episode19_curve_demo2(ctx, width, height);
    // episode19_curve_demo3(ctx, width, height);
    // episode19_curve_demo4(ctx, width, height);
    // episode19_curve_demo5(ctx, width, height);
    // episode19_curve_demo6(ctx, width, height);
    // episode19_curve_main1(ctx, width, height);
    // episode19_curve_main2(ctx, width, height);
    // episode19_curve_main3(ctx, width, height);
    // episode20_curve_main1(ctx, width, height);
    // episode20_curve_main2(ctx, width, height);
    // episode20_curve_main3(ctx, width, height);
    // episode21_target_canvas(ctx, tCtx, width, height);
    // episode22_perspective1(ctx, width, height);
    // episode22_perspective2(ctx, width, height);
    // episode22_postcards(ctx, width, height);
    // episode23_spiral(ctx, width, height);
    // episode23_stars(ctx, width, height);
    // episode23_final(ctx, width, height);
    // episode24_spiral(ctx, width, height);
    // episode25_polygon(ctx, width, height);
    // episode26_2d(ctx, width, height);
    // episode26_polygon(ctx, width, height);
    // episode27_ease(ctx, width, height);
    // episode28_leader_stroke(ctx, width, height);
    // episode28_click(ctx, width, height);
    // episode28_leader_fill(ctx, width, height);
    // episode28_steering(ctx, width, height);
    // episode29_easing(ctx, width, height);
    // episode30_tweenX(ctx, width, height);
    // episode30_tweenBasic(ctx, width, height);
    // episode30_tweenFull(ctx, width, height);
    // episode32_intersect(ctx, width, height);
    // episode32_interactive_intersect(ctx, width, height);
    // episode33_parallel(ctx, width, height);
    // episode33_interactive_intersect(ctx, width, height);
    // episode34_particle_line_collision(ctx, width, height);
    episode34_shape_collision(ctx, width, height);
  }, []);

  return (
    <section className={styles.section}>
      <canvas ref={canvasRef} tabIndex={0}></canvas>
      {/* <canvas ref={targetRef} tabIndex={0}></canvas> */}
    </section>
  );
};

export default CoadingMath;
