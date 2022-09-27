import { Engine, Scene, FreeCamera, HemisphericLight, MeshBuilder, Vector3 } from "@babylonjs/core";

export class BasicScene {
  engine: Engine;
  scene: Scene;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const camera = new FreeCamera("camera", new Vector3(0, 0.5, -4), this.scene);
    camera.attachControl();
    camera.speed = 0.25;
    
    const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);
    hemiLight.intensity = 0.5;

    const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10}, this.scene);
    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    ball.position = new Vector3(0, 1, 0);

    this.engine.hideLoadingUI();

    return scene;
  }
}