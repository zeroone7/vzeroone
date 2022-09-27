import {
  Engine,
  Scene,
  FreeCamera,
  MeshBuilder,
  Vector3,
  CubeTexture,
  PBRMaterial,
  Texture,
  SceneLoader,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class CustomModels {
  engine: Engine;
  scene: Scene;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    // this.CreateEnvironment();
    // this.CreateBarrel();
    this.CreateCampfire();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const camera = new FreeCamera("camera", new Vector3(0, 0.75, -8), this.scene);
    camera.attachControl();
    camera.speed = 0.25;

    const texEnv = CubeTexture.CreateFromPrefilteredData(
      "/env/street.env",
      scene
    );
    scene.environmentTexture = texEnv;
    scene.environmentIntensity = 0.5;
    scene.createDefaultSkybox(texEnv, true);

    return scene;
  }

  CreateEnvironment(): void {
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      this.scene
    );
    ground.material = this.CreateAsphaltMat();
  }

  CreateAsphaltMat(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene);
    // pbr.roughness = 1;

    pbr.albedoTexture = new Texture(
      "/textures/asphalt/asphalt_02_diff_1k.jpg",
      this.scene
    );

    pbr.bumpTexture = new Texture(
      "/textures/asphalt/asphalt_02_nor_gl_1k.jpg",
      this.scene
    );
    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY = true;

    pbr.useAmbientOcclusionFromMetallicTextureRed = true;
    pbr.useRoughnessFromMetallicTextureGreen = true;
    pbr.useMetallnessFromMetallicTextureBlue = true;
    pbr.metallicTexture = new Texture(
      "/textures/asphalt/asphalt_02_arm_1k.jpg",
      this.scene
    );

    return pbr;
  }

  async CreateBarrel(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync("", "/models/", "Barrel_01_2k.glb");

    this.engine.hideLoadingUI();
    // sync 버전
    // SceneLoader.ImportMesh(
    //   "",
    //   "/models/",
    //   "Barrel_01_2k.glb",
    //   this.scene,
    //   (meshes) => {
    //     console.log(meshes);
    //   }
    // );
  }

  async CreateCampfire(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync("", "/models/", "campfire.glb");

    this.engine.hideLoadingUI();
  }
}
