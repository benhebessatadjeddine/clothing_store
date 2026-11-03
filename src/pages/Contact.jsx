import React from "react";
import { SectionTitle } from "../components";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", background: "rgba(10,10,15,0.6)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px",
    color: "#f1f0ee", fontSize: "0.95rem", outline: "none",
    transition: "all 0.2s"
  };

  const labelStyle = {
    display: "block", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.1em",
    textTransform: "uppercase", color: "rgba(241,240,238,0.5)", marginBottom: "8px"
  };

  const focusProps = {
    onFocus: e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.08)"; },
    onBlur: e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }
  };

  return (
    <>
      <SectionTitle title="Contact Us" path="Home | Contact" />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "60px", alignItems: "start"
        }} className="contact-grid">
          
          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ position: "sticky", top: "120px" }}
          >
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 3vw, 3rem)",
              fontWeight: "800", color: "#f1f0ee", lineHeight: "1.1", marginBottom: "24px"
            }}>
              Let's Start a <br/>
              <span style={{
                background: "linear-gradient(135deg,#c9a84c,#e8c97a)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>Conversation.</span>
            </h2>
            <p style={{
              fontSize: "1.05rem", color: "rgba(241,240,238,0.6)", lineHeight: "1.7", marginBottom: "40px"
            }}>
              Hai una domanda sul tuo ordine o desideri una consulenza di stile personalizzata? Il nostro concierge team a Milano ti risponderà entro 24 ore.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(201,168,76,0.8)", marginBottom: "4px" }}>Email</p>
                <a href="mailto:concierge@luminamilano.it" style={{ fontSize: "1.1rem", fontWeight: "600", color: "#f1f0ee", textDecoration: "none" }}>concierge@luminamilano.it</a>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(201,168,76,0.8)", marginBottom: "4px" }}>Telefono</p>
                <a href="tel:+390289013456" style={{ fontSize: "1.1rem", fontWeight: "600", color: "#f1f0ee", textDecoration: "none" }}>+39 02 8901 3456</a>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(201,168,76,0.8)", marginBottom: "4px" }}>Sede Principale</p>
                <p style={{ fontSize: "1.1rem", fontWeight: "600", color: "#f1f0ee", lineHeight: "1.5" }}>Via Montenapoleone, 8<br/>20121 Milano (MI), Italia</p>
              </div>
            </div>
          </motion.div>

          {/* Right form panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{
              background: "linear-gradient(145deg, rgba(26,26,38,0.8) 0%, rgba(17,17,24,0.9) 100%)",
              border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px",
              padding: "40px", backdropFilter: "blur(20px)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.5)"
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input type="text" required style={inputStyle} {...focusProps} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input type="text" required style={inputStyle} {...focusProps} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" required style={inputStyle} {...focusProps} />
              </div>

              <div>
                <label style={labelStyle}>Phone Number (Optional)</label>
                <input type="tel" style={inputStyle} {...focusProps} />
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea required rows="5" style={{ ...inputStyle, resize: "vertical" }} {...focusProps}></textarea>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginTop: "8px" }}>
                <input type="checkbox" required style={{ marginTop: "4px", accentColor: "#c9a84c", width: "16px", height: "16px" }} />
                <label style={{ fontSize: "0.85rem", color: "rgba(241,240,238,0.5)", lineHeight: "1.5" }}>
                  By checking this box, you agree to our <a href="#" style={{ color: "#e8c97a" }}>Privacy Policy</a> and consent to being contacted by our support team.
                </label>
              </div>
              
              <button type="submit" className="btn-primary-custom" style={{ width: "100%", marginTop: "12px", padding: "14px 24px" }}>
                Send Message &rarr;
              </button>
            </form>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </>
  );
};

export default Contact;
