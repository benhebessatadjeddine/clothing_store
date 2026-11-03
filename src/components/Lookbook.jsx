import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const LookbookItem = ({ title, image, reverse, speed }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="lookbook-item-row" style={{
      display: "flex",
      flexDirection: reverse ? "row-reverse" : "row",
      alignItems: "center",
      gap: "8vw",
      marginBottom: "120px",
      flexWrap: "wrap"
    }}>
      <div style={{ flex: "1 1 400px", position: "relative", height: "600px", overflow: "hidden", borderRadius: "24px" }}>
        <motion.div style={{ width: "100%", height: "130%", y }} >
          <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.6) contrast(1.1)" }} />
        </motion.div>
        {/* Glass overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,15,0.8), transparent)", pointerEvents: "none" }} />
      </div>

      <motion.div style={{ flex: "1 1 300px", opacity }} className="lookbook-text">
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(3rem, 6vw, 5rem)",
          fontWeight: "800",
          lineHeight: "1",
          color: "#f1f0ee",
          marginBottom: "24px",
          textTransform: "uppercase"
        }}>
          {title}
        </h3>
        <p style={{ fontSize: "1.1rem", color: "rgba(241,240,238,0.5)", marginBottom: "40px", lineHeight: "1.6" }}>
          Discover the ultimate selection of {title.toLowerCase()}. Engineered for performance, designed for the streets. Step into the new era of modern luxury.
        </p>
        <Link to={`/shop?category=${title.toLowerCase()}`} onClick={() => window.scrollTo(0,0)} className="btn-ghost-custom" style={{ padding: "16px 32px", fontSize: "0.9rem" }}>
          Explore Collection
        </Link>
      </motion.div>
    </div>
  );
};

const Lookbook = () => {
  return (
    <section className="lookbook-section" style={{ padding: "120px 24px", maxWidth: "1400px", margin: "0 auto", overflow: "hidden" }}>
      <div className="lookbook-header" style={{ textAlign: "center", marginBottom: "100px" }}>
        <motion.span 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.2em", color: "rgba(201,168,76,0.8)", textTransform: "uppercase", marginBottom: "16px" }}
        >
          The Lookbook
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: "800", color: "#f1f0ee" }}
        >
          Curated <span style={{ color: "#e8c97a" }}>Aesthetics.</span>
        </motion.h2>
      </div>

      <LookbookItem 
        title="Sneakers" 
        image="/imgs/download (8).jpeg" 
        reverse={false} 
      />
      <LookbookItem 
        title="Jackets" 
        image="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=2000&auto=format&fit=crop" 
        reverse={true} 
      />
      <LookbookItem 
        title="Accessories" 
        image="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=2000&auto=format&fit=crop" 
        reverse={false} 
      />
    </section>
  );
};

export default Lookbook;
