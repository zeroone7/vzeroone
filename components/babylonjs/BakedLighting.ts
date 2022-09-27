import { Engine, Scene, FreeCamera, Vector3, SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders";

export class BakedLighting {
  engine: Engine;
  scene: Scene;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateEnvironment();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const camera = new FreeCamera("camera", new Vector3(0, 0.2, -1), this.scene);
    camera.attachControl();
    camera.speed = 0.25;
    camera.minZ = 0.01;

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync("", "/models/", "bust_demo.glb");

    this.engine.hideLoadingUI();
  }
}