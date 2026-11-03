import React from "react";
import { motion } from "framer-motion";

const brands = [
  "GUCCI", "PRADA", "GIORGIO ARMANI", "VERSACE", "BOTTEGA VENETA", 
  "FENDI", "VALENTINO", "LORO PIANA", "ZEGNA", "STONE ISLAND", 
  "DOLCE & GABBANA", "OFF-WHITE", "MONCLER", "MARNI"
];

const BrandCarousel = () => {
  return (
    <div style={{ 
      padding: "60px 0", 
      background: "#050508", 
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      overflow: "hidden",
      display: "flex",
      whiteSpace: "nowrap",
      position: "relative"
    }}>
      {/* Gradient masks for fading edges */}
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "15%", background: "linear-gradient(to right, #050508, transparent)", zIndex: 2 }} />
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "15%", background: "linear-gradient(to left, #050508, transparent)", zIndex: 2 }} />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "80px", paddingRight: "80px" }}
      >
        {/* Render twice for seamless loop */}
        {[...brands, ...brands].map((brand, i) => (
          <div key={i} style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "2rem",
            fontWeight: "800",
            color: "rgba(241,240,238,0.2)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            transition: "color 0.3s",
            cursor: "pointer"
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(241,240,238,0.2)"}
          >
            {brand}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default BrandCarousel;
