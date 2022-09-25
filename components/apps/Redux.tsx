import styles from "../../styles/Default.module.css";

import type { NextPage } from "next";

// import { useAppSelector, useAppDispatch } from "../../pages/store";
// import { increment, decrement } from "../../slices/counter";

import Button from "@mui/material/Button";

const Loader: NextPage = () => {
  // const count = useAppSelector((state) => state.counter.value);
  // const dispatch = useAppDispatch();

  return (
    <section className={styles.section}>
      {/* <Button variant="contained" onClick={() => dispatch(increment())}>Increment</Button>
      <Button variant="outlined">{count}</Button>
      <Button variant="contained" onClick={() => dispatch(decrement())}>Decrement</Button> */}
    </section>
  );
};

export default Loader;
