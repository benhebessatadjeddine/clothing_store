import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email) {
      toast.success("Welcome to the club!");
      setEmail("");
    }
  };

  return (
    <section style={{ padding: "80px 24px", maxWidth: "1280px", margin: "0 auto 80px" }}>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "relative",
          background: "linear-gradient(145deg, #1a1a26 0%, #111118 100%)",
          borderRadius: "32px",
          padding: "80px 40px",
          textAlign: "center",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.8)"
        }}
        className="newsletter-card"
      >
        {/* Glowing orbs inside the card */}
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "800", color: "#f1f0ee", lineHeight: "1.1", marginBottom: "20px"
          }}>
            Unlock Exclusive <span style={{ color: "#e8c97a" }}>Access.</span>
          </h2>
          <p style={{ fontSize: "1.1rem", color: "rgba(241,240,238,0.5)", marginBottom: "40px", lineHeight: "1.6" }}>
            Join the Lumina Threads inner circle. Get early access to limited drops, exclusive sales, and curated style guides delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="newsletter-form" style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: "1 1 300px",
                padding: "18px 24px",
                background: "rgba(10,10,15,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                color: "#f1f0ee",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s"
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(201,168,76,0.1)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
            />
            <button type="submit" className="btn-primary-custom" style={{ padding: "18px 40px", fontSize: "1rem", borderRadius: "16px" }}>
              Subscribe
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
