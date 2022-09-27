import { Engine, Scene, FreeCamera, HemisphericLight, MeshBuilder, Vector3, CubeTexture, PBRMaterial, Texture, Color3, GlowLayer } from "@babylonjs/core";

export class PBR {
  engine: Engine;
  scene: Scene;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();
    this.CreateEnvironment();
    
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;
    
    const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);
    hemiLight.intensity = 0;

    const texEnv = CubeTexture.CreateFromPrefilteredData("/textures/env/street.env", scene);
    scene.environmentTexture = texEnv;
    // scene.environmentIntensity = 0.25;
    scene.createDefaultSkybox(texEnv, true);

    return scene;
  }

  CreateEnvironment(): void {
    const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10}, this.scene);
    ground.material = this.CreateAsphaltMat();

    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    ball.material = this.CreateBallMat();
    ball.position = new Vector3(0, 1, 0);

    this.engine.hideLoadingUI();
  }

  CreateAsphaltMat(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene);
    // pbr.roughness = 1;

    pbr.albedoTexture = new Texture("/textures/asphalt/asphalt_02_diff_1k.jpg", this.scene);

    pbr.bumpTexture = new Texture("/textures/asphalt/asphalt_02_nor_gl_1k.jpg", this.scene);
    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY = true;

    pbr.useAmbientOcclusionFromMetallicTextureRed = true;
    pbr.useRoughnessFromMetallicTextureGreen = true;
    pbr.useMetallnessFromMetallicTextureBlue = true;
    pbr.metallicTexture = new Texture("/textures/asphalt/asphalt_02_arm_1k.jpg", this.scene);

    return pbr;
  }

  CreateBallMat(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene);
    pbr.roughness = 1;
    // pbr.environmentIntensity = 0.25;

    pbr.albedoTexture = new Texture("/textures/asphalt/asphalt_02_diff_1k.jpg", this.scene);

    pbr.bumpTexture = new Texture("/textures/asphalt/asphalt_02_nor_gl_1k.jpg", this.scene);
    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY = true;

    pbr.useAmbientOcclusionFromMetallicTextureRed = true;
    pbr.useRoughnessFromMetallicTextureGreen = true;
    pbr.useMetallnessFromMetallicTextureBlue = true;
    pbr.metallicTexture = new Texture("/textures/asphalt/asphalt_02_arm_1k.jpg", this.scene);

    pbr.emissiveColor = new Color3(1, 1, 1);
    pbr.emissiveTexture = new Texture("/textures/asphalt/asphalt_02_emissive_1k.jpg", this.scene);
    pbr.emissiveIntensity = 3;

    const glowLayer = new GlowLayer("glow", this.scene);
    glowLayer.intensity = 0.1;

    return pbr;
  }
}