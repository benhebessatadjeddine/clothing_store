import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { registerUser } from "../data/localDb";
import { motion } from "framer-motion";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");

  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "";

    if (name.length === 0) { isProceed = false; errorMessage = "Please enter your first name"; }
    else if (lastname.length === 0) { isProceed = false; errorMessage = "Please enter your last name"; }
    else if (email.length === 0) { isProceed = false; errorMessage = "Please enter your email"; }
    else if (phone.length < 4) { isProceed = false; errorMessage = "Please enter a valid phone number"; }
    else if (adress.length < 4) { isProceed = false; errorMessage = "Please enter a valid address"; }
    else if (password.length < 6) { isProceed = false; errorMessage = "Password must be at least 6 characters"; }
    else if (password !== confirmPassword) { isProceed = false; errorMessage = "Passwords do not match"; }

    if (!isProceed) toast.warn(errorMessage);
    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let regObj = {
      id: nanoid(),
      name, lastname, email, phone, adress, password,
      userWishlist: [],
    };

    if (isValidate()) {
      try {
        registerUser(regObj);
        toast.success("Registration Successful");
        navigate("/login");
      } catch (err) {
        toast.error("Failed: " + err.message);
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

  const focusProps = {
    onFocus: e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.08)"; },
    onBlur: e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }
  };

  return (
    <>
      <SectionTitle title="Register" path="Home | Register" />
      <div style={{ padding: "80px 24px", display: "flex", justifyContent: "center" }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            width: "100%", maxWidth: "700px",
            background: "linear-gradient(145deg, rgba(26,26,38,0.8) 0%, rgba(17,17,24,0.9) 100%)",
            border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px",
            padding: "40px 32px", backdropFilter: "blur(20px)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)"
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.8rem", fontWeight: "700", color: "#f1f0ee" }}>Create Account</h2>
            <p style={{ color: "rgba(241,240,238,0.4)", fontSize: "0.9rem", marginTop: "6px" }}>Join the Lumina Milano community today.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} style={inputStyle} {...focusProps} />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input type="text" required value={lastname} onChange={e => setLastname(e.target.value)} style={inputStyle} {...focusProps} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>E-mail</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} {...focusProps} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} {...focusProps} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Address</label>
              <input type="text" required value={adress} onChange={e => setAdress(e.target.value)} style={inputStyle} {...focusProps} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} {...focusProps} />
              </div>
              <div>
                <label style={labelStyle}>Confirm Password</label>
                <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={inputStyle} {...focusProps} />
              </div>
            </div>
            
            <button type="submit" className="btn-primary-custom" style={{ width: "100%", marginTop: "12px", padding: "14px 24px" }}>
              Register Account
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Link to="/login" onClick={() => window.scrollTo(0,0)} style={{
              fontSize: "0.85rem", color: "rgba(241,240,238,0.5)", textDecoration: "none", transition: "color 0.2s"
            }} onMouseEnter={e => e.currentTarget.style.color = "#e8c97a"} onMouseLeave={e => e.currentTarget.style.color = "rgba(241,240,238,0.5)"}>
              Already have an account? <span style={{ color: "#e8c97a", fontWeight: "600" }}>Login here.</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
