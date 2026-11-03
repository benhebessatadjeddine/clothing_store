import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import "../styles/Stats.css";

const Counter = ({ from, to, duration = 2, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(from, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (current) => {
    // Determine formatting based on the 'to' value (e.g. if it includes M or K we parse it)
    let parsedTo = parseFloat(to.toString().replace(/[^0-9.]/g, ""));
    let rounded = Math.round(current);
    
    // Add prefix if any
    const prefix = to.toString().startsWith("DA") ? "DA " : "";
    // Add original suffix and passed suffix
    const originalSuffix = to.toString().replace(/[0-9.DA]/g, "");

    return `${prefix}${rounded.toLocaleString()}${originalSuffix}${suffix}`;
  });

  useEffect(() => {
    if (inView) {
      const parsedTo = parseFloat(to.toString().replace(/[^0-9.]/g, ""));
      springValue.set(parsedTo);
    }
  }, [inView, springValue, to]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const statItems = [
  { value: "10", suffix: "+", label: "Years on the Market", icon: "🏆" },
  { value: "12", suffix: "M DA", label: "Annual Revenue Growth", icon: "📈" },
  { value: "2600", suffix: "+", label: "Global Partners", icon: "🌍" },
  { value: "180", suffix: "K+", label: "Daily Visitors", icon: "👥" },
];

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-inner">
        <div className="stats-label">Trusted worldwide</div>
        <div className="stats-grid">
          {statItems.map(({ value, label, icon, suffix }, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="stat-card"
              key={label}
            >
              <div className="stat-icon">{icon}</div>
              <div className="stat-value">
                <Counter from={0} to={value} suffix={suffix} />
              </div>
              <div className="stat-label">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
