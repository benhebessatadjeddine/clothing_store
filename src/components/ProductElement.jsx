import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const stars = (rating) =>
  Array.from({ length: 5 }, (_, i) => (
    <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i < rating ? "#c9a84c" : "none"}
      stroke={i < rating ? "#c9a84c" : "rgba(255,255,255,0.2)"} strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111 5.429.44c.527.04.74.684.36 1.03l-4.101 3.545 1.257 5.273c.126.529-.408.95-.878.679L12 17.347l-4.71 2.73c-.47.271-1.004-.15-.878-.679l1.257-5.273L3.57 10.08c-.38-.346-.167-.99.36-1.03l5.43-.44L11.48 3.5z" />
    </svg>
  ));

const ProductElement = ({ id, title, image, rating, price, brandName }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Set CSS variables for the spotlight effect
    ref.current.style.setProperty("--mouse-x", `${mouseX}px`);
    ref.current.style.setProperty("--mouse-y", `${mouseY}px`);

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="product-card-wrapper"
    >
      {/* Spotlight layer */}
      <div 
        className="product-spotlight"
        style={{
          position: "absolute",
          inset: "-1px",
          borderRadius: "19px",
          background: "radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(201,168,76,0.3), transparent 40%)",
          zIndex: 0,
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />

      <div style={{
        background: "linear-gradient(145deg,rgba(26,26,38,0.95) 0%,rgba(17,17,24,0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "18px",
        overflow: "hidden",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transform: "translateZ(0)",
        zIndex: 1,
        backdropFilter: "blur(20px)",
      }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.15)";
          e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)";
          const spotlight = ref.current.querySelector(".product-spotlight");
          if(spotlight) spotlight.style.opacity = "1";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          const spotlight = ref.current.querySelector(".product-spotlight");
          if(spotlight) spotlight.style.opacity = "0";
        }}
      >
        {/* Brand tag */}
        {brandName && (
          <div style={{
            position: "absolute", top: "14px", left: "14px", zIndex: 2,
            background: "rgba(10,10,15,0.75)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
            padding: "3px 10px", fontSize: "0.65rem", fontWeight: "700",
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: "rgba(241,240,238,0.6)",
            transform: "translateZ(30px)", 
          }}>
            {brandName}
          </div>
        )}

        {/* Image */}
        <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}
          style={{ display: "block", overflow: "hidden", background: "rgba(255,255,255,0.03)" }}>
          <img
            src={image?.startsWith('/imgs/') ? image : `https://${image}`}
            alt={title}
            style={{
              width: "100%", aspectRatio: "1/1", objectFit: "cover",
              transition: "transform 0.5s ease",
              display: "block",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            onError={e => { e.currentTarget.style.minHeight = "200px"; e.currentTarget.style.background = "#1a1a26"; }}
          />
        </Link>

        {/* Content */}
        <div style={{ padding: "16px 18px 20px", display: "flex", flexDirection: "column", gap: "10px", flex: 1, transform: "translateZ(20px)" }}>
          {/* Stars */}
          <div style={{ display: "flex", gap: "2px" }}>{stars(rating)}</div>

          {/* Title */}
          <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: "none" }}>
            <h3 style={{
              fontSize: "0.9rem", fontWeight: "600", lineHeight: "1.4",
              color: "rgba(241,240,238,0.9)",
              display: "-webkit-box", WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {title}
            </h3>
          </Link>

          {/* Price row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
            <span style={{
              fontSize: "1.25rem", fontWeight: "800", fontFamily: "'Space Grotesk',sans-serif",
              background: "linear-gradient(135deg,#c9a84c,#e8c97a)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {price} €
            </span>
            <Link
              to={`/shop/product/${id}`}
              onClick={() => window.scrollTo(0, 0)}
              style={{
                padding: "7px 14px", borderRadius: "9px", fontSize: "0.75rem",
                fontWeight: "700", letterSpacing: "0.05em",
                background: "rgba(201,168,76,0.12)", color: "#e8c97a",
                border: "1px solid rgba(201,168,76,0.25)", textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(201,168,76,0.22)";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(201,168,76,0.12)";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
              }}
            >
              View →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductElement;
