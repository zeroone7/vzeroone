import {
  Engine,
  Scene,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Vector3,
  SceneLoader,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class FirstPersonCtrl {
  engine: Engine;
  scene: Scene;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreateController();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);

    scene.onPointerDown = (event) => {
      if (event.button === 0) this.engine.enterPointerlock();
      if (event.button === 1) this.engine.exitPointerlock();
    };

    const fps = 60;
    const gravity = -9.81;
    scene.gravity = new Vector3(0, gravity / fps, 0);
    scene.collisionsEnabled = true;

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "Prototype_Level.glb",
      this.scene
    );

    meshes.map((mesh) => {
      mesh.checkCollisions = true;
    });
  }

  CreateController(): void {
    const camera = new FreeCamera("camera", new Vector3(0, 10, 0), this.scene);
    camera.attachControl();
    camera.speed = 0.75;
    camera.applyGravity = true;
    camera.checkCollisions = true;
    camera.ellipsoid = new Vector3(1, 1, 1);
    camera.minZ = 0.45;
    camera.angularSensibility = 4000;

    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysRight.push(83);
    camera.keysDown.push(68);

    this.engine.hideLoadingUI();
  }
}
