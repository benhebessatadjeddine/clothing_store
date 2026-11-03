import React from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormDatePicker from "./FormDatePicker";
import FormCheckbox from "./FormCheckbox";
import { motion } from "framer-motion";

const categoryList = ["all","shoes","slippers","heels","t-shirts","jackets","caps","shorts","sweaters","sneakers","shirts","boots","overshirts","pants","jeans","socks","belts","trainers"];
const brandList = ["all","WALK LONDON","Reebok","Nike","Jack & Jones","Crocs","Vans","Puma","New Balance","Tommy Jeans","Tommy Hilfiger","Bershka","New Look","AllSaints","Columbia","The North Face","Collusion","ASOS DESIGN","Topman","Dr Denim","Polo Ralph Lauren","Levi's","Calvin Klein","Timberland","Pull and Bear","adidas performance","Nike Running","Dr Martens","River Island"];

const Filters = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        background: "linear-gradient(145deg, rgba(26,26,38,0.6) 0%, rgba(17,17,24,0.8) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "24px",
        padding: "32px 24px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        position: "sticky",
        top: "100px", // Just below header
        height: "max-content",
        maxHeight: "calc(100vh - 120px)",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
      className="custom-scrollbar"
    >
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "1.2rem" }}>⚙</span>
        <h3 style={{ fontSize: "1.1rem", fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", color: "#f1f0ee" }}>Refine Search</h3>
      </div>

      <Form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        
        <FormInput type="search" label="Search Products" name="search" size="input-sm" defaultValue="" />
        
        <FormSelect label="Category" name="category" list={categoryList} size="select-sm" defaultValue="all" />
        <FormSelect label="Brand" name="brand" list={brandList} size="select-sm" defaultValue="all" />
        <FormSelect label="Gender" name="gender" list={["all","male","female"]} size="select-sm" defaultValue="all" />
        <FormSelect label="Sort By" name="order" list={["asc","desc","price high","price low"]} size="select-sm" defaultValue="asc" />
        
        <div style={{ padding: "16px", background: "rgba(10,10,15,0.5)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.03)" }}>
          <FormRange name="price" label="Max Price" size="range-sm" price={300} />
        </div>
        
        <FormDatePicker label="Min Production Date" name="date" />
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(10,10,15,0.5)", padding: "12px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)" }}>
          <FormCheckbox label="In Stock Only" name="stock" defaultValue="false" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
          <button type="submit" className="btn-primary-custom" style={{ width: "100%", padding: "14px" }}>
            Apply Filters
          </button>
          
          <Link to="/shop?page=1" style={{
            display: "block", textAlign: "center",
            padding: "12px", borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)", color: "rgba(241,240,238,0.6)",
            fontWeight: "600", fontSize: "0.85rem", letterSpacing: "0.06em", textTransform: "uppercase",
            textDecoration: "none", background: "rgba(255,255,255,0.02)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; e.currentTarget.style.color = "#e8c97a"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(241,240,238,0.6)"; }}
          >
            Reset All
          </Link>
        </div>
      </Form>
    </motion.div>
  );
};

export default Filters;
