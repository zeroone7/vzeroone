import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  SceneLoader,
  CubeTexture,
  AnimationGroup,
  AnimationEvent,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class AniEvent {
  engine: Engine;
  scene: Scene;
  cheer!: AnimationGroup;
  aniZombies!: AnimationGroup[];

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreateCharacter();
    this.CreateZombies();

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

    const camera = new FreeCamera("camera", new Vector3(0, 2, -10), this.scene);
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
      "character_attack.glb"
    );

    meshes[0].rotate(Vector3.Up(), -Math.PI / 2);
    meshes[0].position = new Vector3(3, 0, 0);

    this.cheer = animationGroups[0];
    const idle = animationGroups[1];
    const attack = animationGroups[2];

    this.cheer.stop();
    idle.play(true);

    const aniAttack = animationGroups[2].targetedAnimations[0].animation;
    const evtAttack = new AnimationEvent(100, () => {
      this.aniZombies[1].stop();
      this.aniZombies[0].play();
    }, false);

    aniAttack.addEvent(evtAttack);
    this.scene.onPointerDown = (evt) => {
      if (evt.button === 2) {
        attack.play();
      }
    }
  }

  async CreateZombies(): Promise<void> {
    const { meshes, animationGroups} = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "zombie_death.glb"
    );

    this.aniZombies = animationGroups;

    meshes[0].rotate(Vector3.Up(), Math.PI / 2);
    meshes[0].position = new Vector3(-3, 0, 0);

    this.aniZombies[0].stop();
    this.aniZombies[1].play(true);

    const aniDeath = this.aniZombies[0].targetedAnimations[0].animation;
    const evtDeath = new AnimationEvent(150, () => {
      this.cheer.play(true);
    }, false);

    aniDeath.addEvent(evtDeath);

    this.engine.hideLoadingUI();
  }
}
