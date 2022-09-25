type Vertex = {
  x: number;
  y: number;
  z: number;
  sx: number;
  sy: number;
};

export default class Model {
  vertices: Array<Vertex>;

  constructor(vertices: Array<Vertex>) {
    this.vertices = vertices;
  }

  project(focalLength: number, centerZ: number) {
    for (let i = 0; i < this.vertices.length; i++) {
      const vertex = this.vertices[i],
        perspective = focalLength / (focalLength + vertex.z + centerZ);

      vertex.sx = vertex.x * perspective;
      vertex.sy = vertex.y * perspective;
    }
  }

  edge(ctx: CanvasRenderingContext2D, args: Array<number>, color: string = "black", mode: "fill" | "stroke" = "fill") {
    let vertex = this.vertices[args[0]];

    mode === "fill" ? ctx.fillStyle = color : ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(vertex.sx, vertex.sy);
    for (let i = 1; i < args.length; i++) {
      vertex = this.vertices[args[i]];
      ctx.lineTo(vertex.sx, vertex.sy);
    }
    mode === "fill" ? ctx.fill() : ctx.stroke();
  }

  translate(x: number, y: number, z: number) {
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i].x += x;
      this.vertices[i].y += y;
      this.vertices[i].z += z;
    }
  }

  rotateX(angle: number) {
    const cos = Math.cos(angle),
      sin = Math.sin(angle);

    for (let i = 0; i < this.vertices.length; i++) {
      const vertex = this.vertices[i],
        y = vertex.y * cos - vertex.z * sin,
        z = vertex.z * cos + vertex.y * sin;

      vertex.y = y;
      vertex.z = z;
    }
  }

  rotateY(angle: number) {
    const cos = Math.cos(angle),
      sin = Math.sin(angle);

    for (let i = 0; i < this.vertices.length; i++) {
      const vertex = this.vertices[i],
        x = vertex.x * cos - vertex.z * sin,
        z = vertex.z * cos + vertex.x * sin;

      vertex.x = x;
      vertex.z = z;
    }
  }

  rotateZ(angle: number) {
    const cos = Math.cos(angle),
      sin = Math.sin(angle);

    for (let i = 0; i < this.vertices.length; i++) {
      const vertex = this.vertices[i],
        x = vertex.x * cos - vertex.y * sin,
        y = vertex.y * cos + vertex.x * sin;

      vertex.x = x;
      vertex.y = y;
    }
  }
}
