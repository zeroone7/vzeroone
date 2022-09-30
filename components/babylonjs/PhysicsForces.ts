import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  SceneLoader,
  MeshBuilder,
  PhysicsImpostor,
  CubeTexture,
  Mesh,
  PBRMaterial,
  Color3,
  ActionManager,
  ExecuteCodeAction,
  CannonJSPlugin,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import * as Cannon from "cannon";

export class PhysicsForces {
  engine: Engine;
  scene: Scene;
  camera!: FreeCamera;
  cannonball!: Mesh;
  ground!: Mesh;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreatePhysics();

    this.scene.onPointerDown = (e) => {
      if (e.button === 2) {
        this.ShootCannonBall();
      }
    };

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
    this.camera = camera;

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

  async CreatePhysics(): Promise<void> {
    const physics = new CannonJSPlugin(true, 10, Cannon);
    this.scene.enablePhysics(new Vector3(0, -9.81, 0), physics);

    this.CreateImposter();
    this.CreateImpulse();
    this.CreateCannonBall();
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

    this.ground = ground;
  }

  CreateImpulse(): void {
    const box = MeshBuilder.CreateBox("box", { height: 4 });
    const matBox = new PBRMaterial("matBox", this.scene);
    matBox.roughness = 1;
    matBox.albedoColor = new Color3(1, 0.5, 0);

    box.position.y = 3;
    box.material = matBox;

    box.physicsImpostor = new PhysicsImpostor(
      box,
      PhysicsImpostor.BoxImpostor,
      { mass: 0.5, friction: 1 }
    );

    box.actionManager = new ActionManager(this.scene);

    box.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickDownTrigger, () => {
        box.physicsImpostor?.applyImpulse(
          new Vector3(-3, 0, 0),
          box.getAbsolutePosition().add(new Vector3(0, 2, 0))
        );
      })
    );
  }

  CreateCannonBall(): void {
    this.cannonball = MeshBuilder.CreateSphere("cannonball", { diameter: 0.5 });

    const matBall = new PBRMaterial("matBall", this.scene);
    matBall.roughness = 1;
    matBall.albedoColor = new Color3(0, 1, 0);

    this.cannonball.physicsImpostor = new PhysicsImpostor(
      this.cannonball,
      PhysicsImpostor.SphereImpostor,
      { mass: 1, friction: 1 }
    );

    this.cannonball.material = matBall;
    this.cannonball.position = this.camera.position;
    this.cannonball.setEnabled(false);

    this.engine.hideLoadingUI();
  }

  ShootCannonBall(): void {
    const clone = this.cannonball.clone("clone");
    clone.position = this.camera.position;
    clone.setEnabled(true);

    clone.physicsImpostor?.applyForce(
      this.camera.getForwardRay().direction.scale(1000),
      clone.getAbsolutePosition()
    );

    if (this.ground.physicsImpostor) {
      clone.physicsImpostor?.registerOnPhysicsCollide(
        this.ground.physicsImpostor,
        () => {
          setTimeout(() => {
            clone.dispose();
          }, 3000);
        }
      );
    }
  }
}
