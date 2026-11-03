import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, #c9a84c, #e8c97a, #c9a84c)",
        backgroundSize: "200% auto",
        transformOrigin: "0%",
        scaleX,
        zIndex: 99999, // Above everything
        animation: "shimmer 3s linear infinite"
      }}
    />
  );
};

export default ScrollProgress;
