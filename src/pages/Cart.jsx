import React from "react";
import { CartItemsList, CartTotals, SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { cartItems } = useSelector((state) => state.cart);

  const isCartEmpty = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
    } else {
      navigate("/thank-you");
    }
  };

  return (
    <>
      <SectionTitle title="Cart" path="Home | Cart" />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}>
        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontSize: "4rem", marginBottom: "24px" }}>🛒</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2rem", fontWeight: "700", color: "#f1f0ee", marginBottom: "12px" }}>
              Your cart is empty
            </h2>
            <p style={{ color: "rgba(241,240,238,0.4)", marginBottom: "32px" }}>Looks like you haven't added anything yet.</p>
            <Link to="/shop" className="btn-primary-custom">Browse Shop →</Link>
          </div>
        ) : (
          <div className="cart-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px", alignItems: "start" }}>
            {/* Cart items */}
            <div style={{
              background: "linear-gradient(145deg,rgba(22,22,32,0.95) 0%,rgba(15,15,22,0.95) 100%)",
              border: "1px solid rgba(255,255,255,0.07)", borderRadius: "18px", padding: "28px",
            }}>
              <h2 style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "8px" }}>
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </h2>
              <CartItemsList />
            </div>

            {/* Sidebar */}
            <div>
              <CartTotals />
              {loginState ? (
                <button
                  onClick={isCartEmpty}
                  className="btn-primary-custom"
                  style={{ width: "100%", marginTop: "16px" }}
                >
                  Place Order →
                </button>
              ) : (
                <Link to="/login" className="btn-primary-custom" style={{ width: "100%", marginTop: "16px", display: "flex" }}>
                  Login to Checkout
                </Link>
              )}
              <Link to="/shop" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                marginTop: "12px", padding: "12px", borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)", color: "rgba(241,240,238,0.5)",
                fontSize: "0.85rem", fontWeight: "500", textDecoration: "none", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#e8c97a"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(241,240,238,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;