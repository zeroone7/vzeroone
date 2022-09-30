import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  SceneLoader,
  CubeTexture,
  AnimationGroup,
  AsyncCoroutine,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class AniBlending {
  engine: Engine;
  scene: Scene;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreateCharacter();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const texEnv = CubeTexture.CreateFromPrefilteredData(
      "/env/street.env",
      scene
    );
    texEnv.gammaSpace = false;
    texEnv.rotationY = Math.PI / 2;
    scene.environmentTexture = texEnv;
    scene.createDefaultSkybox(texEnv, true, 1000, 0.25);

    const camera = new FreeCamera("camera", new Vector3(0, 2, -6), this.scene);
    camera.attachControl();
    camera.minZ = 0.5;
    camera.speed = 0.5;

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    await SceneLoader.ImportMeshAsync("", "/models/", "Prototype_Level.glb");
  }

  async CreateCharacter(): Promise<void> {
    const { meshes, animationGroups } = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "character_blending.glb"
    );

    meshes[0].rotate(Vector3.Up(), -Math.PI);

    const idle = animationGroups[0];
    const run = animationGroups[1];

    this.scene.onPointerDown = (evt) => {
      if (evt.button === 1) {
        this.scene.onBeforeRenderObservable.runCoroutineAsync(
          this.animationBlending(run, idle)
        );
      }

      if (evt.button === 0) {
        this.scene.onBeforeRenderObservable.runCoroutineAsync(
          this.animationBlending(idle, run)
        );
      }
    };

    this.engine.hideLoadingUI();
  }

  *animationBlending(
    aniTo: AnimationGroup,
    aniFrom: AnimationGroup
  ): AsyncCoroutine<void> {
    let currentWeight = 1;
    let newWeight = 0;

    aniTo.play(true);

    while (newWeight < 1) {
      newWeight += 0.01;
      currentWeight -= 0.01;
      aniTo.setWeightForAllAnimatables(newWeight);
      aniFrom.setWeightForAllAnimatables(currentWeight);
      yield;
    }
  }
}
