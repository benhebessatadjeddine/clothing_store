const FormCheckbox = ({ label, name }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "20px" }}>
    <input
      type="checkbox"
      name={name}
      id={name}
      defaultChecked={false}
      style={{ width: "18px", height: "18px", accentColor: "#c9a84c", cursor: "pointer", borderRadius: "4px" }}
    />
    <label htmlFor={name} style={{
      fontSize: "0.82rem", fontWeight: "600", color: "rgba(241,240,238,0.6)",
      cursor: "pointer", userSelect: "none",
    }}>
      {label}
    </label>
  </div>
);

export default FormCheckbox;