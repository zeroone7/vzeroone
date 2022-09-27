import {
  Engine,
  Scene,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Vector3,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";

export class StdMaterials {
  engine: Engine;
  scene: Scene;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;

    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    hemiLight.intensity = 1;

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      this.scene
    );
    ground.material = this.CreateGroundMaterial();

    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    ball.material = this.CreateBallMaterial();
    ball.position = new Vector3(0, 1, 0);

    this.engine.hideLoadingUI();

    return scene;
  }

  CreateGroundMaterial(): StandardMaterial {
    const uvScale = 4;
    const texArray: Array<Texture> = [];

    const matGround = new StandardMaterial("matGroud", this.scene);

    const texDiffuse = new Texture(
      "/textures/stone/cobblestone_05_diff_1k.jpg",
      this.scene
    );
    const texNormal = new Texture(
      "/textures/stone/cobblestone_05_nor_gl_1k.jpg",
      this.scene
    );
    const texAO = new Texture(
      "/textures/stone/cobblestone_05_ao_1k.jpg",
      this.scene
    );
    const texSpec = new Texture(
      "/textures/stone/cobblestone_05_spec_1k.jpg",
      this.scene
    );

    texArray.push(texDiffuse);
    texArray.push(texNormal);
    texArray.push(texAO);
    texArray.push(texSpec);

    texArray.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    matGround.diffuseTexture = texDiffuse;
    matGround.bumpTexture = texNormal;
    matGround.ambientTexture = texAO;
    matGround.specularTexture = texSpec;

    return matGround;
  }

  CreateBallMaterial(): StandardMaterial {
    const uvScale = 1;
    const texArray: Array<Texture> = [];

    const matBall = new StandardMaterial("matBall", this.scene);

    const texDiffuse = new Texture(
      "/textures/metal/metal_plate_diff_1k.jpg",
      this.scene
    );
    const texNormal = new Texture(
      "/textures/metal/metal_plate_nor_gl_1k.jpg",
      this.scene
    );
    const texAO = new Texture(
      "/textures/metal/metal_plate_ao_1k.jpg",
      this.scene
    );
    const texSpec = new Texture(
      "/textures/metal/metal_plate_spec_1k.jpg",
      this.scene
    );

    texArray.push(texDiffuse);
    texArray.push(texNormal);
    texArray.push(texAO);
    texArray.push(texSpec);

    texArray.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    matBall.diffuseTexture = texDiffuse;
    matBall.bumpTexture = texNormal;
    matBall.invertNormalMapX = true;
    matBall.invertNormalMapY = true;
    matBall.ambientTexture = texAO;
    matBall.specularTexture = texSpec;
    matBall.specularPower = 1;

    return matBall;
  }
}
