import {
  Engine,
  Scene,
  Vector3,
  AbstractMesh,
  CubeTexture,
  ArcRotateCamera,
  SceneLoader,
} from "@babylonjs/core";

export class CameraMechanics {
  engine: Engine;
  scene: Scene;
  camera!: ArcRotateCamera;
  watch!: AbstractMesh;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateCamera();
    this.CreateWatch();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const texEnv = CubeTexture.CreateFromPrefilteredData(
      "/env/xmas_bg.env",
      scene
    );
    texEnv.gammaSpace = false;
    texEnv.rotationY = Math.PI;
    scene.environmentTexture = texEnv;
    scene.createDefaultSkybox(texEnv, true, 1000, 0.25);

    return scene;
  }

  CreateCamera(): void {
    this.camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2,
      5,
      Vector3.Zero(),
      this.scene
    );

    this.camera.attachControl(this.canvas, true);
    this.camera.wheelPrecision = 100;
    this.camera.minZ = 0.3;
    this.camera.lowerRadiusLimit = 1;
    this.camera.upperRadiusLimit = 5;
    this.camera.panningSensibility = 0;

    // this.camera.useBouncingBehavior = true;
    this.camera.useAutoRotationBehavior = true;
    if (this.camera.autoRotationBehavior) {
      this.camera.autoRotationBehavior.idleRotationSpeed = 0.5;
      this.camera.autoRotationBehavior.idleRotationSpinupTime = 1000;
      this.camera.autoRotationBehavior.idleRotationWaitTime = 2000;
      this.camera.autoRotationBehavior.zoomStopsAnimation = true;
    }

    this.camera.useFramingBehavior = true;
    if (this.camera.framingBehavior) {
      this.camera.framingBehavior.radiusScale = 0.7;
      this.camera.framingBehavior.framingTime = 4000;
    }
  }

  async CreateWatch(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "vintage_watch.glb"
    );

    this.watch = meshes[0];
    // meshes[1].showBoundingBox = true;
    // meshes[2].showBoundingBox = true;
    // meshes[3].showBoundingBox = true;

    this.camera.setTarget(meshes[2]);
    this.engine.hideLoadingUI();
  }
}
