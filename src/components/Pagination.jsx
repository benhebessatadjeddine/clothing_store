import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Pagination = () => {
  const { page, productsLength } = useLoaderData();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const btnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "rgba(201,168,76,0.08)",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "#e8c97a",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.2s"
  };

  const disabledStyle = {
    ...btnStyle,
    opacity: 0.4,
    cursor: "not-allowed",
    background: "transparent",
    borderColor: "rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.3)"
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "60px", marginBottom: "40px" }}>
      
      <motion.button
        whileHover={page > 1 ? { scale: 1.1, backgroundColor: "rgba(201,168,76,0.2)" } : {}}
        whileTap={page > 1 ? { scale: 0.95 } : {}}
        style={page > 1 ? btnStyle : disabledStyle}
        onClick={() => {
          if (page === 1) return;
          handlePageChange(page - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={page === 1}
      >
        &larr;
      </motion.button>

      <div style={{
        padding: "8px 24px",
        borderRadius: "99px",
        background: "rgba(10,10,15,0.8)",
        border: "1px solid rgba(255,255,255,0.06)",
        fontSize: "0.85rem",
        fontWeight: "700",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "rgba(241,240,238,0.8)",
        boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
      }}>
        Page <span style={{ color: "#e8c97a" }}>{page}</span>
      </div>

      <motion.button
        whileHover={productsLength >= 12 ? { scale: 1.1, backgroundColor: "rgba(201,168,76,0.2)" } : {}}
        whileTap={productsLength >= 12 ? { scale: 0.95 } : {}}
        style={productsLength >= 12 ? btnStyle : disabledStyle}
        onClick={() => {
          if (productsLength < 12) return;
          handlePageChange(page + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={productsLength < 12}
      >
        &rarr;
      </motion.button>
      
    </div>
  );
};

export default Pagination;
