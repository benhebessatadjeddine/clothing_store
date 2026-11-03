import { useState } from "react";

const FormRange = ({ label, name, price }) => {
  const maxPrice = 500;
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);
  const pct = (selectedPrice / maxPrice) * 100;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <label htmlFor={name} style={{ fontSize: "0.68rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(241,240,238,0.4)" }}>
          {label}
        </label>
        <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#e8c97a" }}>{selectedPrice} €</span>
      </div>
      <input
        type="range"
        name={name}
        id={name}
        min={0}
        max={maxPrice}
        step={5}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        style={{
          width: "100%", height: "4px", appearance: "none", WebkitAppearance: "none",
          background: `linear-gradient(to right, #c9a84c ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
          borderRadius: "99px", outline: "none", cursor: "pointer",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
        <span style={{ fontSize: "0.7rem", color: "rgba(241,240,238,0.25)" }}>0 €</span>
        <span style={{ fontSize: "0.7rem", color: "rgba(241,240,238,0.25)" }}>{maxPrice} €</span>
      </div>
    </div>
  );
};

export default FormRange;
