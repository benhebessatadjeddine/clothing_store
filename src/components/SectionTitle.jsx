import React from "react";

const SectionTitle = ({ title, path }) => {
  return (
    <div style={{
      padding: "56px 24px 48px",
      background: "linear-gradient(160deg,rgba(10,10,15,1) 0%,rgba(17,17,24,1) 100%)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "600px", height: "200px",
        background: "radial-gradient(ellipse,rgba(108,99,255,0.08) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Path breadcrumb */}
      <p style={{
        fontSize: "0.72rem", fontWeight: "600", letterSpacing: "0.14em",
        textTransform: "uppercase", color: "rgba(201,168,76,0.6)",
        marginBottom: "14px", position: "relative",
      }}>
        {path.split(" | ").map((part, i, arr) => (
          <React.Fragment key={i}>
            <span style={{ color: i === arr.length - 1 ? "rgba(201,168,76,0.9)" : "rgba(241,240,238,0.35)" }}>
              {part}
            </span>
            {i < arr.length - 1 && (
              <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.15)" }}>›</span>
            )}
          </React.Fragment>
        ))}
      </p>

      {/* Title */}
      <h1 style={{
        fontFamily: "'Space Grotesk',sans-serif",
        fontSize: "clamp(2.4rem,6vw,4.5rem)",
        fontWeight: "800",
        letterSpacing: "-0.03em",
        color: "#f1f0ee",
        lineHeight: "1.05",
        position: "relative",
      }}>
        {title}
      </h1>

      {/* Gold underline */}
      <div style={{
        width: "48px", height: "3px", borderRadius: "99px",
        background: "linear-gradient(90deg,#c9a84c,#e8c97a)",
        margin: "20px auto 0",
        boxShadow: "0 0 16px rgba(201,168,76,0.4)",
      }} />
    </div>
  );
};

export default SectionTitle;