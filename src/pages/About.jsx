import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <SectionTitle title="About Us" path="Home | About" />
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 24px" }}>
        
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center"
        }} className="about-grid">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: "800", color: "#f1f0ee", lineHeight: "1.1", marginBottom: "24px"
            }}>
              L'Arte della <br/>
              <span style={{
                background: "linear-gradient(135deg,#c9a84c,#e8c97a)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>Moda Italiana.</span>
            </h2>
            <p style={{
              fontSize: "1.05rem", color: "rgba(241,240,238,0.6)", lineHeight: "1.7", marginBottom: "20px"
            }}>
              Born in the heart of Milan's Quadrilatero della Moda, Lumina Milano embodies the pinnacle of Italian sartorial craftsmanship and contemporary luxury. We meticulously curate exceptional clothing and footwear from world-renowned fashion houses.
            </p>
            <p style={{
              fontSize: "1.05rem", color: "rgba(241,240,238,0.6)", lineHeight: "1.7", marginBottom: "40px"
            }}>
              From handcrafted leather sneakers to bespoke Italian tailoring, our collections celebrate those who live with uncompromising passion and timeless elegance.
            </p>
            
            <Link to="/contact" className="btn-primary-custom" onClick={() => window.scrollTo(0,0)}>
              Get in Touch &rarr;
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            style={{ perspective: "1000px" }}
          >
            <div style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
              aspectRatio: "4/5",
              background: "linear-gradient(145deg, rgba(26,26,38,1) 0%, rgba(17,17,24,1) 100%)"
            }}>
              {/* Decorative gradients */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 30%, rgba(201,168,76,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 80%, rgba(108,99,255,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
              
              <div style={{
                position: "absolute", inset: "20px", borderRadius: "16px",
                border: "1px dashed rgba(201,168,76,0.3)",
                display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center",
                flexDirection: "column", gap: "20px"
              }}>
                 <span style={{ fontSize: "5rem" }}>✨</span>
                 <div style={{ textAlign: "center" }}>
                   <p style={{ fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8c97a" }}>Milano • Est. 2026</p>
                   <p style={{ fontSize: "1.5rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: "800", color: "#f1f0ee", marginTop: "8px" }}>LUMINA MILANO</p>
                 </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      <style>{`
        @media(max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </>
  );
};

export default About;
