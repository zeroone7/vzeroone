import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  AbstractMesh,
  PBRMaterial,
  CubeTexture,
  Color3,
  SceneLoader,
  ActionManager,
  SetValueAction,
  InterpolateValueAction,
  IncrementValueAction,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class MeshActions {
  engine: Engine;
  scene: Scene;
  cube!: AbstractMesh;
  spere!: AbstractMesh;
  cylinder!: AbstractMesh;
  spereMat!: PBRMaterial;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateMeshes();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    new FreeCamera("camera", new Vector3(0, 0, -8), this.scene);
    // camera.attachControl();
    // camera.speed = 0.25;

    const texEnv = CubeTexture.CreateFromPrefilteredData(
      "/env/xmas_bg.env",
      scene
    );
    scene.environmentTexture = texEnv;
    scene.createDefaultSkybox(texEnv, true, 1000, 0.2, true);
    scene.environmentIntensity = 1.5;

    return scene;
  }

  async CreateMeshes(): Promise<void> {
    this.spereMat = new PBRMaterial("spereMat", this.scene);
    this.spereMat.albedoColor = new Color3(1, 0, 0);
    this.spereMat.roughness = 1;

    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "gifts.glb",
      this.scene
    );
    this.cube = meshes[1];
    this.spere = meshes[2];
    this.cylinder = meshes[3];

    this.cylinder.rotation = new Vector3(-Math.PI / 4, 0, 0);
    this.spere.material = this.spereMat;

    this.engine.hideLoadingUI();

    this.CreateActions();
  }

  CreateActions(): void {
    this.cube.actionManager = new ActionManager(this.scene);
    this.spere.actionManager = new ActionManager(this.scene);
    this.scene.actionManager = new ActionManager(this.scene);

    this.cube.actionManager.registerAction(
      new SetValueAction(
        ActionManager.OnPickDownTrigger,
        this.cube,
        "scaling",
        new Vector3(1.5, 1.5, 1.5)
      )
    );

    this.spere.actionManager
      .registerAction(
        new InterpolateValueAction(
          ActionManager.OnPickDownTrigger,
          this.spereMat,
          "roughtness",
          0,
          3000
        )
      )
      ?.then(
        new InterpolateValueAction(
          ActionManager.NothingTrigger,
          this.spereMat,
          "roughness",
          1,
          1000
        )
      );

    this.scene.actionManager.registerAction(
      new IncrementValueAction(
        ActionManager.OnEveryFrameTrigger,
        this.cylinder,
        "rotation.x",
        0.01
      )
    );
  }
}
