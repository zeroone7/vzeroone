import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  SceneLoader,
  CannonJSPlugin,
  MeshBuilder,
  PhysicsImpostor,
  CubeTexture,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import * as Cannon from "cannon";

export class PhysicsVelocity {
  engine: Engine;
  scene: Scene;
  camera!: FreeCamera;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreateImposter();
    this.CreateRocket();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(true, 10, Cannon)
    );

    const texEnv = CubeTexture.CreateFromPrefilteredData(
      "/env/street.env",
      scene
    );
    texEnv.gammaSpace = false;
    texEnv.rotationY = Math.PI / 2;
    scene.environmentTexture = texEnv;
    scene.createDefaultSkybox(texEnv, true, 1000, 0.25);

    const camera = new FreeCamera("camera", new Vector3(0, 2, -5), this.scene);
    camera.attachControl();
    camera.minZ = 0.5;
    this.camera = camera;

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "Prototype_Level.glb",
      this.scene
    );
  }

  CreateImposter(): void {
    const ground = MeshBuilder.CreateGround("ground", {
      width: 40,
      height: 40,
    });
    ground.isVisible = false;
    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 1 }
    );
  }

  async CreateRocket(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "toon_rocket.glb",
      this.scene
    );

    const colRocket = MeshBuilder.CreateBox("colRocket", {
      width: 1,
      height: 1.7,
      depth: 1,
    });
    colRocket.position.y = 0.85;
    colRocket.visibility = 0;
    colRocket.physicsImpostor = new PhysicsImpostor(
      colRocket,
      PhysicsImpostor.BoxImpostor,
      { mass: 1 }
    );

    meshes[0].setParent(colRocket);
    colRocket.rotate(Vector3.Forward(), 1.5);

    const rocketPhysics = () => {
      if (colRocket.physicsImpostor) {
        this.camera.position = new Vector3(
          colRocket.position.x,
          colRocket.position.y,
          this.camera.position.z
        );
        colRocket.physicsImpostor.setLinearVelocity(colRocket.up.scale(5));
        colRocket.physicsImpostor.setAngularVelocity(colRocket.up);
      }
    };

    let gameOver = false;

    if (!gameOver) this.scene.registerBeforeRender(rocketPhysics);

    this.scene.onPointerDown = () => {
      gameOver = true;
      this.scene.unregisterBeforeRender(rocketPhysics);
    };

    this.engine.hideLoadingUI();
  }
}
