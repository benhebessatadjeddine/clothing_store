import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaHeadphones, FaRegEnvelope, FaHeart, FaBars, FaXmark, FaSun, FaMoon, FaBagShopping } from "react-icons/fa6";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import "../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../features/auth/authSlice";
import { store } from "../store";
import { clearWishlist, updateWishlist } from "../features/wishlist/wishlistSlice";
import { getUserById } from "../data/localDb";

const Header = () => {
  const { amount, total } = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.auth);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    setIsLoggedIn(loginState);
    if (loginState) {
      const userObj = getUserById(localStorage.getItem("id"));
      if (userObj) store.dispatch(updateWishlist({ userObj }));
    } else {
      store.dispatch(clearWishlist());
    }
  }, [loginState]);

  const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/shop", label: "Shop" },
    { to: "/about-us", label: "About" },
    { to: "/contact", label: "Contact" },
    ...(!isLoggedIn ? [{ to: "/login", label: "Login" }, { to: "/register", label: "Register" }] : []),
  ];

  return (
    <>
      <div className="topbar">
        <ul>
          <li><FaHeadphones /><span>+213 000 00 00 00</span></li>
          <li><FaRegEnvelope /><span>hello@luminathreads.com</span></li>
        </ul>
      </div>

      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="main-navbar"
        style={{ position: "sticky", top: 0, zIndex: 1000 }}
      >
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:"1280px", margin:"0 auto", padding:"0 24px", height:"64px" }}>

          <Link to="/" className="nav-logo" onClick={() => window.scrollTo(0,0)}>
            <span className="nav-logo-badge">K</span>
            Lumina Threads
          </Link>

          <div className="navlinks-container" style={{ display:"flex", alignItems:"center", gap:"4px" }}>
            {navLinks.map(({ to, label, end }) => {
              const isActive = location.pathname === to || (!end && location.pathname.startsWith(to) && to !== "/");
              return (
                <Link key={to} to={to} className="nav-link" style={{ position: "relative" }}>
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "10%",
                        right: "10%",
                        height: "2px",
                        background: "linear-gradient(90deg, #c9a84c, #e8c97a)",
                        borderRadius: "2px 2px 0 0",
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>

            <Link to="/wishlist" className="nav-icon-btn" title="Wishlist">
              <FaHeart size={14}/>
            </Link>

            <div style={{ position:"relative" }}>
              <button className="nav-icon-btn" onClick={() => setCartOpen(o => !o)} title="Cart">
                <FaBagShopping size={15}/>
                {amount > 0 && <span className="nav-cart-badge">{amount}</span>}
              </button>
              {cartOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{
                    position:"absolute", right:0, top:"calc(100% + 12px)", width:"260px",
                    background:"rgba(17,17,24,0.97)", backdropFilter:"blur(24px)",
                    border:"1px solid rgba(255,255,255,0.08)", borderRadius:"16px",
                    padding:"20px", boxShadow:"0 20px 60px rgba(0,0,0,0.7)", zIndex:9999,
                  }}>
                  <p style={{ fontSize:"0.75rem", color:"rgba(241,240,238,0.5)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"12px" }}>Cart summary</p>
                  <p style={{ fontSize:"1.3rem", fontWeight:"700", color:"#f1f0ee", marginBottom:"4px" }}>{amount} {amount===1?"item":"items"}</p>
                  <p style={{ fontSize:"0.95rem", color:"#e8c97a", marginBottom:"16px" }}>Subtotal: <strong>{total.toFixed(2)} DA</strong></p>
                  <Link to="/cart" className="btn-primary-custom" style={{ width:"100%", display:"flex" }} onClick={() => setCartOpen(false)}>
                    View Cart
                  </Link>
                </motion.div>
              )}
            </div>

            {isLoggedIn && (
              <div className="dropdown dropdown-end" style={{ marginLeft:"4px" }}>
                <label tabIndex={0} style={{
                  width:"38px", height:"38px", borderRadius:"50%",
                  background:"linear-gradient(135deg,#6c63ff,#a855f7)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", fontWeight:"700", color:"#fff",
                  border:"2px solid rgba(108,99,255,0.4)", fontSize:"0.85rem",
                }}>U</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-48"
                  style={{ background:"rgba(17,17,24,0.97)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.08)", marginTop:"10px" }}>
                  {[{to:"/user-profile",label:"Profile"},{to:"/order-history",label:"Order History"},{to:"/login",label:"Logout"}].map(({ to, label }) => (
                    <li key={to}><Link to={to} style={{ color:"rgba(241,240,238,0.8)", fontSize:"0.9rem", borderRadius:"8px" }}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            )}

            <button className="nav-icon-btn drawer-content" onClick={() => setMenuOpen(true)}>
              <FaBars size={16}/>
            </button>
          </div>
        </div>
      </motion.nav>

      {menuOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:9998, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)" }}
          onClick={() => setMenuOpen(false)}>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position:"absolute", top:0, left:0, bottom:0, width:"280px",
              background:"#111118", borderRight:"1px solid rgba(201,168,76,0.15)",
              padding:"24px 20px", display:"flex", flexDirection:"column", gap:"4px",
            }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"28px" }}>
              <span className="nav-logo"><span className="nav-logo-badge">L</span>LUMINA</span>
              <button className="nav-icon-btn" onClick={() => setMenuOpen(false)}><FaXmark size={16}/></button>
            </div>
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{label}</NavLink>
            ))}
          </motion.div>
        </div>
      )}

      {cartOpen && <div style={{ position:"fixed", inset:0, zIndex:9990 }} onClick={() => setCartOpen(false)}/>}
    </>
  );
};

export default Header;
