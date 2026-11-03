import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // give time for exit animation
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#050508",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.8rem",
                fontWeight: "900",
                color: "#050508",
                boxShadow: "0 0 40px rgba(201,168,76,0.5)",
              }}
            >
              L
            </motion.div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "2.6rem",
                fontWeight: "800",
                letterSpacing: "0.18em",
                color: "#f1f0ee",
              }}
            >
              LUMINA MILANO
            </span>
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            style={{
              height: "2px",
              background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
              marginTop: "40px",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
