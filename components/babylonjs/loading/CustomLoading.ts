import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  CubeTexture,
  SceneLoader,
} from "@babylonjs/core";
// import { CustomLoadingScreen } from "./CustomLoadingScreen";

export class CustomLoading {
  engine: Engine;
  scene: Scene;
  // loadingScreen: CustomLoadingScreen;

  constructor(
    private canvas: HTMLCanvasElement,
    private loadingBar: HTMLElement,
    private percentLoaded: HTMLElement,
    private loader: HTMLElement
  ) {
    this.engine = new Engine(this.canvas, true);
    // this.loadingScreen = new CustomLoadingScreen();
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateEnvironment();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;

    const texEnv = CubeTexture.CreateFromPrefilteredData(
      "/textures/env/street.env",
      scene
    );
    scene.environmentTexture = texEnv;
    scene.environmentIntensity = 0.5;
    scene.createDefaultSkybox(texEnv, true);

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    await SceneLoader.ImportMeshAsync("", "/models/", "LightingScene.glb");
    this.engine.hideLoadingUI();
  }
}
