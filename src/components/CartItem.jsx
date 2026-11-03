import { useDispatch } from "react-redux";
import { removeItem, updateCartAmount } from "../features/cart/cartSlice";

const CartItem = ({ cartItem }) => {
  const { id, title, price, image, amount, brandName, selectedSize } = cartItem;
  const dispatch = useDispatch();

  return (
    <article style={{
      display: "flex", gap: "20px", flexWrap: "wrap",
      padding: "20px 0",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      alignItems: "center",
    }}>
      {/* Image */}
      <div style={{
        width: "88px", height: "88px", borderRadius: "12px", overflow: "hidden",
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
      }}>
        <img src={image?.startsWith('/imgs/') ? image : `https://${image}`} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: "160px" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: "600", color: "#f1f0ee", marginBottom: "6px", lineHeight: "1.4" }}>{title}</h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {brandName && (
            <span style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(241,240,238,0.35)", padding: "2px 8px", background: "rgba(255,255,255,0.05)", borderRadius: "6px" }}>
              {brandName}
            </span>
          )}
          {selectedSize && (
            <span style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(241,240,238,0.35)", padding: "2px 8px", background: "rgba(255,255,255,0.05)", borderRadius: "6px" }}>
              Size: {selectedSize}
            </span>
          )}
        </div>
      </div>

      {/* Quantity */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(241,240,238,0.35)" }}>Qty</span>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => dispatch(updateCartAmount({ id, amount: e.target.value }))}
          style={{
            width: "64px", textAlign: "center", padding: "6px 10px",
            background: "rgba(10,10,15,0.8)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "9px", color: "#f1f0ee", fontSize: "0.95rem", fontWeight: "700",
            outline: "none",
          }}
        />
      </div>

      {/* Price */}
      <div style={{ textAlign: "right", minWidth: "90px" }}>
        <p style={{
          fontSize: "1.15rem", fontWeight: "800", fontFamily: "'Space Grotesk',sans-serif",
          background: "linear-gradient(135deg,#c9a84c,#e8c97a)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          marginBottom: "6px",
        }}>
          {(price * amount).toFixed(2)} DA
        </p>
        <button
          onClick={() => dispatch(removeItem(id))}
          style={{
            fontSize: "0.72rem", fontWeight: "600", letterSpacing: "0.06em",
            textTransform: "uppercase", color: "rgba(255,77,109,0.7)",
            background: "none", border: "none", cursor: "pointer", padding: "0",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#ff4d6d"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,77,109,0.7)"}
        >
          Remove
        </button>
      </div>
    </article>
  );
};

export default CartItem;
