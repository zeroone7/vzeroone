import {
  Engine,
  Scene,
  FreeCamera,
  HemisphericLight,
  Vector3,
  SceneLoader,
  CannonJSPlugin,
  MeshBuilder,
  PhysicsImpostor,
  AbstractMesh,
  StandardMaterial,
  Color3,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import * as CANNON from "cannon";

export class CollisionTriggers {
  engine: Engine;
  scene: Scene;
  sphere!: AbstractMesh;
  box!: AbstractMesh;
  ground!: AbstractMesh;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreateImposter();
    this.DetectTrigger();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(true, 10, CANNON)
    );

    new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);

    const camera = new FreeCamera(
      "camera",
      new Vector3(0, 10, -20),
      this.scene
    );
    camera.attachControl();
    camera.setTarget(Vector3.Zero());
    camera.minZ = 0.5;

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

  CreateImposter(): void {
    // this.box = MeshBuilder.CreateBox("box", { size: 2 });
    // this.box.position = new Vector3(0, 3, 0);
    // this.box.physicsImpostor = new PhysicsImpostor(
    //   this.box,
    //   PhysicsImpostor.BoxImpostor,
    //   { mass: 1, restitution: 1 }
    // );

    this.ground = MeshBuilder.CreateGround("ground", { width: 40, height: 40 });
    this.ground.isVisible = false;
    this.ground.position.y = 0.25;
    this.ground.physicsImpostor = new PhysicsImpostor(
      this.ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 1 }
    );

    this.sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 });
    this.sphere.position = new Vector3(0, 8, 0);
    this.sphere.physicsImpostor = new PhysicsImpostor(
      this.sphere,
      PhysicsImpostor.SphereImpostor,
      { mass: 1, restitution: 1, friction: 1 }
    );

    // this.box.physicsImpostor.registerOnPhysicsCollide(
    //   this.sphere.physicsImpostor,
    //   this.DetectCollisions
    // );

    // this.sphere.physicsImpostor.registerOnPhysicsCollide(
    //   [this.box.physicsImpostor, this.ground.physicsImpostor],
    //   this.DetectCollisions
    // );

    // this.sphere.physicsImpostor.unregisterOnPhysicsCollide(
    //   this.box.physicsImpostor,
    //   this.DetectCollisions
    // );

    this.engine.hideLoadingUI();
  }

  DetectCollisions(
    collide: PhysicsImpostor,
    other: PhysicsImpostor | Array<PhysicsImpostor>
  ): void {
    const matRed = new StandardMaterial("mat", this.scene);
    matRed.diffuseColor = new Color3(1, 0, 0);

    // collide.object.scaling = new Vector3(3, 3, 3);
    // collide.setScalingUpdated();

    // (other.object as AbstractMesh).material = matRed;
  }

  DetectTrigger(): void {
    const box = MeshBuilder.CreateBox("box", { width: 4, height: 1, depth: 4 });
    box.position.y = 0.5;
    box.visibility = 0.25;

    let counter = 0;
    this.scene.registerBeforeRender(() => {
      if (box.intersectsMesh(this.sphere)) {
        counter++;
      }

      if (counter === 1) {
        console.log("Entered Trigger");
      }
    });
  }
}
