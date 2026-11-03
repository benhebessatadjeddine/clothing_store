import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "../styles/Hero.css";
import React, { useRef } from "react";

const SplitText = ({ text, delay = 0, style, className }) => {
  return (
    <span style={{ display: "inline-block", ...style }} className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: delay + index * 0.04, ease: [0.2, 0.65, 0.3, 0.9] }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="hero" ref={ref}>
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 0.25 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="hero-bg-image"
        style={{ y: bgY }}
      />
      {/* Decorative gradient orb for depth */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <motion.div
        className="hero-content-wrap"
        style={{ y: textY, opacity }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="hero-label"
          style={{ border: "1px solid rgba(201,168,76,0.3)", padding: "4px 16px", borderRadius: "99px", background: "rgba(201,168,76,0.05)", backdropFilter: "blur(4px)" }}
        >
          ✨ Collezione Milano 2026
        </motion.div>

        <h1 className="hero-title" style={{ perspective: "1000px" }}>
          <SplitText text="L'Eleganza " delay={0.8} />
          <SplitText text="Senza Tempo." delay={1.1} className="accent" />
          <br />
          <SplitText text="Made in Italy." delay={1.5} />
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
          className="hero-subtitle"
        >
          Curated luxury collections inspired by Italian haute couture and modern streetwear. Handcrafted excellence from Milan to the world.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
          className="hero-buttons"
        >
          <Link
            to="/shop"
            className="btn-primary-custom"
            onClick={() => window.scrollTo(0, 0)}
            style={{ position: "relative", overflow: "hidden" }}
          >
            {/* Shimmer sweep effect */}
            <motion.div 
              animate={{ x: ["-100%", "200%"] }} 
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
              style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "30%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)", transform: "skewX(-20deg)" }}
            />
            Shop Now &rarr;
          </Link>
          <Link
            to="/about-us"
            className="btn-ghost-custom"
            onClick={() => window.scrollTo(0, 0)}
          >
            Our Story
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="hero-scroll-indicator"
      >
        <span>Scroll</span>
        <div className="hero-scroll-arrow" />
      </motion.div>
    </div>
  );
};

export default Hero;