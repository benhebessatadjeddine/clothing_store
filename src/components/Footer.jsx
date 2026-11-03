import React from "react";
import { Link } from "react-router-dom";
import { FaSquareXTwitter, FaSquareFacebook, FaSquareInstagram, FaSquareYoutube } from "react-icons/fa6";
import { useSelector } from "react-redux";

const footerLinks = {
  Shop: [
    { to: "/shop", label: "All Products" },
    { to: "/shop?category=shoes", label: "Shoes" },
    { to: "/shop?category=jackets", label: "Jackets" },
    { to: "/shop?category=sneakers", label: "Sneakers" },
  ],
  Company: [
    { to: "/about-us", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ],
};

const Footer = () => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);

  return (
    <footer style={{
      background: "linear-gradient(160deg,#09090e 0%,#0d0d16 100%)",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      marginTop: "80px",
    }}>
      {/* Top divider glow */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 32px 40px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "60px" }}>

          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: "linear-gradient(135deg,#c9a84c,#e8c97a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Space Grotesk',sans-serif", fontWeight: "900",
                fontSize: "1.1rem", color: "#0a0a0f",
              }}>L</div>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.4rem", fontWeight: "800", color: "#f1f0ee" }}>LUMINA MILANO</span>
            </div>
            <p style={{ fontSize: "0.88rem", color: "rgba(241,240,238,0.4)", lineHeight: "1.7", maxWidth: "280px", marginBottom: "24px" }}>
              L'apice dell'alta moda e dello stile contemporaneo. Curato e disegnato nel cuore di Milano.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[FaSquareXTwitter, FaSquareFacebook, FaSquareInstagram, FaSquareYoutube].map((Icon, i) => (
                <button key={i} style={{
                  width: "38px", height: "38px", borderRadius: "9px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(241,240,238,0.5)", cursor: "pointer",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#e8c97a"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; e.currentTarget.style.background = "rgba(201,168,76,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(241,240,238,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "20px" }}>{title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} onClick={() => window.scrollTo(0, 0)} style={{
                      fontSize: "0.9rem", color: "rgba(241,240,238,0.5)", textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(241,240,238,0.5)"}
                    >{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Account column */}
          <div>
            <h4 style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "20px" }}>Account</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {!loginState && (
                <>
                  <li><Link to="/login" onClick={() => window.scrollTo(0, 0)} style={{ fontSize: "0.9rem", color: "rgba(241,240,238,0.5)", textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(241,240,238,0.5)"}
                  >Login</Link></li>
                  <li><Link to="/register" onClick={() => window.scrollTo(0, 0)} style={{ fontSize: "0.9rem", color: "rgba(241,240,238,0.5)", textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(241,240,238,0.5)"}
                  >Register</Link></li>
                </>
              )}
              {loginState && (
                <>
                  <li><Link to="/user-profile" onClick={() => window.scrollTo(0, 0)} style={{ fontSize: "0.9rem", color: "rgba(241,240,238,0.5)", textDecoration: "none" }}>Profile</Link></li>
                  <li><Link to="/order-history" onClick={() => window.scrollTo(0, 0)} style={{ fontSize: "0.9rem", color: "rgba(241,240,238,0.5)", textDecoration: "none" }}>Orders</Link></li>
                </>
              )}
              <li><Link to="/cart" onClick={() => window.scrollTo(0, 0)} style={{ fontSize: "0.9rem", color: "rgba(241,240,238,0.5)", textDecoration: "none" }}>Cart</Link></li>
              <li><Link to="/wishlist" onClick={() => window.scrollTo(0, 0)} style={{ fontSize: "0.9rem", color: "rgba(241,240,238,0.5)", textDecoration: "none" }}>Wishlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: "28px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "12px",
        }}>
          <p style={{ fontSize: "0.82rem", color: "rgba(241,240,238,0.3)" }}>
            © 2026 Lumina Milano S.r.l. — Via Montenapoleone 8, 20121 Milano (MI), Italia • P.IVA IT09876543210
          </p>
          <p style={{ fontSize: "0.8rem", color: "rgba(241,240,238,0.25)" }}>
            Fatto con passione a Milano • Made in Italy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
