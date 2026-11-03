import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { loginUser, logoutUser } from "../features/auth/authSlice";
import { findUser } from "../data/localDb";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);

  React.useEffect(() => {
    if (loginState) {
      localStorage.clear();
      store.dispatch(logoutUser());
    }
  }, []);

  const isValidate = () => {
    let isProceed = true;
    if (email.length === 0) {
      isProceed = false;
      toast.warn("Please enter an email");
    } else if (password.length < 6) {
      isProceed = false;
      toast.warn("Password must be minimum 6 characters");
    }
    return isProceed;
  };

  const proceedLogin = (e) => {
    e.preventDefault();
    if (isValidate()) {
      const foundUser = findUser(email, password);
      if (foundUser) {
        toast.success("Login successful");
        localStorage.setItem("id", foundUser.id);
        store.dispatch(loginUser());
        navigate("/");
      } else {
        toast.error("Email or password is incorrect");
      }
    }
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

  return (
    <>
      <SectionTitle title="Login" path="Home | Login" />
      <div style={{ padding: "80px 24px", display: "flex", justifyContent: "center" }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            width: "100%", maxWidth: "440px",
            background: "linear-gradient(145deg, rgba(26,26,38,0.8) 0%, rgba(17,17,24,0.9) 100%)",
            border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px",
            padding: "40px 32px", backdropFilter: "blur(20px)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)"
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ width: "48px", height: "48px", background: "linear-gradient(135deg,#c9a84c,#e8c97a)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.5rem", fontWeight: "900", color: "#0a0a0f" }}>
              L
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.8rem", fontWeight: "700", color: "#f1f0ee" }}>Welcome Back</h2>
            <p style={{ color: "rgba(241,240,238,0.4)", fontSize: "0.9rem", marginTop: "6px" }}>Sign in to continue to Lumina Milano.</p>
          </div>

          <form onSubmit={proceedLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={labelStyle}>E-mail</label>
              <input
                type="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.08)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.08)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            
            <button type="submit" className="btn-primary-custom" style={{ width: "100%", marginTop: "12px", padding: "14px 24px" }}>
              Sign In
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Link to="/register" onClick={() => window.scrollTo(0,0)} style={{
              fontSize: "0.85rem", color: "rgba(241,240,238,0.5)", textDecoration: "none", transition: "color 0.2s"
            }} onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"} onMouseLeave={e => e.currentTarget.style.color = "rgba(241,240,238,0.5)"}>
              Don't have an account? <span style={{ color: "#e8c97a", fontWeight: "600" }}>Register here.</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
