import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  SceneLoader,
  CubeTexture,
  AnimationGroup,
  Animation,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class CutScene {
  engine: Engine;
  scene: Scene;
  camera!: FreeCamera;
  characterAnimations!: AnimationGroup[];

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreateCharacter();
    this.CreateZombies();
    this.CreateCutScene();

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

    this.camera = new FreeCamera("camera", new Vector3(8, 2, -10), this.scene);
    this.camera.minZ = 0.5;
    this.camera.speed = 0.5;

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    await SceneLoader.ImportMeshAsync("", "/models/", "Prototype_Level.glb");
  }

  async CreateCharacter(): Promise<void> {
    const { meshes, animationGroups } = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "character.glb"
    );

    meshes[0].rotate(Vector3.Up(), -Math.PI / 2);
    meshes[0].position = new Vector3(8, 0, -4);

    this.characterAnimations = animationGroups;
    this.characterAnimations[0].stop();
    this.characterAnimations[1].play();
  }

  async CreateZombies(): Promise<void> {
    const zombie1 = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "zombie_1.glb"
    );

    const zombie2 = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "zombie_2.glb"
    );

    zombie1.meshes[0].rotate(Vector3.Up(), Math.PI / 2);
    zombie1.meshes[0].position = new Vector3(-8, 0, -4);
    zombie2.meshes[0].rotate(Vector3.Up(), Math.PI / 2);
    zombie2.meshes[0].position = new Vector3(-6, 0, -2);

    this.engine.hideLoadingUI();
  }

  async CreateCutScene(): Promise<void> {
    const camKeys = [];
    const fps = 60;
    const camAnim = new Animation(
      "camAnim",
      "position",
      fps,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CONSTANT,
    );

    camKeys.push({ frame: 0, value: new Vector3(10, 2, -10) });
    camKeys.push({ frame: fps * 5, value: new Vector3(-6, 2, -10) });
    camKeys.push({ frame: fps * 8, value: new Vector3(-6, 2, 10) });
    camKeys.push({ frame: fps * 12, value: new Vector3(0, 3, -16) });

    camAnim.setKeys(camKeys);

    this.camera.animations.push(camAnim);
    await this.scene.beginAnimation(this.camera, 0, fps * 12).waitAsync();
    this.EndCutScene();
  }

  EndCutScene(): void {
    this.camera.attachControl();
    this.characterAnimations[1].stop();
    this.characterAnimations[0].play();
  }
}
