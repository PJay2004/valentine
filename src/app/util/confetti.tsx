"use client";

import Confetti from "react-confetti";
import { useWindowSize } from "./use-window-size";

const Surprise = () => {
  const { innerHeight, innerWidth } = useWindowSize();
  return <Confetti width={innerWidth} height={innerHeight} />;
};

export default Surprise;
