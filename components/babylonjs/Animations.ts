import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  AbstractMesh,
  SceneLoader,
  CubeTexture,
  Animation,
  Mesh,
} from "@babylonjs/core";

export class Animations {
  engine: Engine;
  scene: Scene;
  target!: AbstractMesh;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreateTarget();

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
    await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "Prototype_Level.glb",
      this.scene
    );
  }

  async CreateTarget(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "target.glb",
      this.scene
    );

    meshes.shift();

    this.target = Mesh.MergeMeshes(
      meshes as Mesh[],
      true,
      true,
      undefined,
      false,
      true
    )!;
    this.target.position.y = 3;

    this.CreateAnimations();

    this.engine.hideLoadingUI();
  }

  CreateAnimations(): void {
    const rotateFrames = [];
    const slideFrames = [];
    const fadeFrames = [];
    const fps = 60;

    const rotateAnim = new Animation(
      "rotateAnim",
      "rotation.z",
      fps,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const slideAnim = new Animation(
      "slideAnim",
      "position",
      fps,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const fadeAnim = new Animation(
      "fadeAnim",
      "visibility",
      fps,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    rotateFrames.push({ frame: 0, value: 0 });
    rotateFrames.push({ frame: 180, value: Math.PI / 2 });

    slideFrames.push({ frame: 0, value: new Vector3(0, 3, 0) });
    slideFrames.push({ frame: 45, value: new Vector3(-3, 2, 0) });
    slideFrames.push({ frame: 90, value: new Vector3(0, 3, 0) });
    slideFrames.push({ frame: 135, value: new Vector3(3, 2, 0) });
    slideFrames.push({ frame: 180, value: new Vector3(0, 3, 0) });

    fadeFrames.push({ frame: 0, value: 1 });
    fadeFrames.push({ frame: 180, value: 0 });

    rotateAnim.setKeys(rotateFrames);
    slideAnim.setKeys(slideFrames);
    fadeAnim.setKeys(fadeFrames);

    this.target.animations.push(rotateAnim);
    this.target.animations.push(slideAnim);
    this.target.animations.push(fadeAnim);

    const onAnimationEnd = () => {
      console.log("Animation ended");
      this.target.setEnabled(false);
    };

    // this.scene.beginAnimation(this.target, 0, 180, true);
    const animCtrl = this.scene.beginDirectAnimation(
      this.target,
      [slideAnim, rotateAnim],
      0,
      180,
      true,
      1,
      onAnimationEnd
    );

    this.scene.onPointerDown = async (event) => {
      if (event.button === 1) {
        await this.scene.beginDirectAnimation(this.target, [fadeAnim], 0, 180, true).waitAsync;
        animCtrl.stop();
      }
    };
  }
}
