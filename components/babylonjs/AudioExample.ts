import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  CubeTexture,
  SceneLoader,
  Sound,
  AnimationEvent,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class AudioExample {
  engine: Engine;
  scene: Scene;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreateCharacter();
    this.CreateZombie();

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

    const bgMusic = new Sound(
      "bgMusic",
      "/audio/terror_ambience.mp3",
      this.scene,
      null,
      { volume: 0, autoplay: true }
    );

    bgMusic.setVolume(0.75, 30);
  }

  async CreateCharacter(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "character_scared.glb"
    );

    meshes[0].rotate(Vector3.Up(), -Math.PI / 2);
    meshes[0].position = new Vector3(7, 0, 0);
  }

  async CreateZombie(): Promise<void> {
    const { meshes, animationGroups } = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "zombie_growl.glb"
    );

    meshes[0].rotate(Vector3.Up(), Math.PI / 2);
    meshes[0].position = new Vector3(-7, 0, 0);

    animationGroups[0].stop();

    const growlFx = new Sound("growlFx", "/audio/growl.mp3", this.scene, null, {
      spatialSound: true,
      maxDistance: 10,
    });

    // growlFx.attachToMesh(meshes[0]);
    growlFx.setPosition(new Vector3(-7, 0, 0));
    growlFx.setPlaybackRate(1.87);

    const aniGrowl = animationGroups[0].targetedAnimations[0].animation;
    const evtGrowl = new AnimationEvent(
      70,
      () => {
        if (!growlFx.isPlaying) growlFx.play();
      },
      false
    );

    aniGrowl.addEvent(evtGrowl);
    animationGroups[0].play(true);

    this.engine.hideLoadingUI();
  }
}
