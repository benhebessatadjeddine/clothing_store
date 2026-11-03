import React from "react";
import { motion } from "framer-motion";

const BackgroundShapes = () => {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Orb 1 */}
      <motion.div
        animate={{
          x: ["0%", "5%", "-5%", "0%"],
          y: ["0%", "-10%", "5%", "0%"],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      {/* Orb 2 */}
      <motion.div
        animate={{
          x: ["0%", "-10%", "5%", "0%"],
          y: ["0%", "5%", "-10%", "0%"],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />
       {/* Orb 3 */}
       <motion.div
        animate={{
          x: ["0%", "8%", "-3%", "0%"],
          y: ["0%", "8%", "2%", "0%"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          position: "absolute",
          top: "40%",
          left: "60%",
          width: "35vw",
          height: "35vw",
          background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
};

export default BackgroundShapes;
