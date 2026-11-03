import React from "react";
import { useSelector } from "react-redux";

const row = (label, value, highlight = false) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  }}>
    <span style={{ fontSize: "0.85rem", color: "rgba(241,240,238,0.5)", fontWeight: "500" }}>{label}</span>
    <span style={{
      fontSize: highlight ? "1.2rem" : "0.95rem",
      fontWeight: highlight ? "800" : "600",
      fontFamily: highlight ? "'Space Grotesk',sans-serif" : "inherit",
      color: highlight ? "#e8c97a" : "rgba(241,240,238,0.85)",
    }}>{value}</span>
  </div>
);

const CartTotals = () => {
  const { total, amount } = useSelector((state) => state.cart);
  const tax = total / 5;
  const shipping = 50;

  return (
    <div style={{
      background: "linear-gradient(145deg,rgba(22,22,32,0.98) 0%,rgba(15,15,22,0.98) 100%)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "18px",
      padding: "24px",
      position: "sticky",
      top: "120px",
    }}>
      <h3 style={{
        fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.14em",
        textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "16px",
      }}>
        Order Summary
      </h3>

      {row(`Items (${amount})`, `${Math.round(total)} DA`)}
      {row("Shipping", `${shipping} DA`)}
      {row("Tax (20%)", `${Math.round(tax)} DA`)}

      <div style={{ padding: "16px 0 0" }}>
        {row("Total", `${Math.round(total + shipping + tax)} DA`, true)}
      </div>
    </div>
  );
};

export default CartTotals;