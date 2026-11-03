import React from "react";
import { motion } from "framer-motion";

const Marquee = () => {
  const text = "PREMIUM CLOTHING • EXCLUSIVE FOOTWEAR • NEW ARRIVALS • LIMITED EDITIONS • ";

  return (
    <div style={{
      width: "100%",
      overflow: "hidden",
      background: "linear-gradient(90deg, #111118, #1a1a26, #111118)",
      borderTop: "1px solid rgba(201,168,76,0.1)",
      borderBottom: "1px solid rgba(201,168,76,0.1)",
      padding: "16px 0",
      display: "flex",
      whiteSpace: "nowrap",
    }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{
          fontSize: "1.2rem",
          fontWeight: "800",
          fontFamily: "'Space Grotesk', sans-serif",
          color: "rgba(201,168,76,0.6)",
          letterSpacing: "0.15em",
          paddingRight: "20px",
        }}>
          {text}{text}{text}{text}
        </span>
      </motion.div>
    </div>
  );
};

export default Marquee;
