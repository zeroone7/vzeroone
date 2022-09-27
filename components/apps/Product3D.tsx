import styles from "../../styles/Canvas.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";

import { CameraMechanics } from "../babylonjs/CameraMechanics";

const BabylonJS: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.92;
    // canvas.style.background = "black";

    new CameraMechanics(canvas);
  }, []);

  return (
    <section className={styles.section}>
      <canvas ref={canvasRef} tabIndex={0}></canvas>
      <div id="productDetails">
        <h3>Avventura Vintage Gold Pocket Watch</h3>
        <p id="price">$1,195</p>

        <div id="description">
          <h4>Description</h4>

          <p>
            Beautiful 9 Karat Gold pocket watch suitable for any occasion. This
            vintage piece was made in 1910 and includes an inscription of the
            watch maker on the back for added authenticity.
          </p>

          <p>
            Original glass face with intricate ornamental design and classic
            Roman numerals. The perfect gift to be handed down through the ages.
          </p>
          <br />

          <b>Dimensions</b>
          <p>1.25 width of the watch 1.75 height with bow 23.52 grams weight</p>
        </div>

        <Button
          variant="outlined"
          size="large"
          startIcon={<AddShoppingCartIcon />}
          onClick={() => alert("상품을 장바구니에 담으셨습니다.")}
        >
          ADD TO CART
        </Button>
      </div>
    </section>
  );
};
export default BabylonJS;
