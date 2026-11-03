const selectStyle = {
  width: "100%",
  padding: "8px 12px",
  background: "rgba(10,10,15,0.8)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#f1f0ee",
  fontSize: "0.85rem",
  outline: "none",
  cursor: "pointer",
  transition: "border-color 0.2s",
};
const labelStyle = {
  display: "block",
  fontSize: "0.68rem",
  fontWeight: "700",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(241,240,238,0.4)",
  marginBottom: "6px",
};

const FormSelect = ({ label, name, list, defaultValue }) => (
  <div>
    <label htmlFor={name} style={labelStyle}>{label}</label>
    <select
      name={name}
      id={name}
      defaultValue={defaultValue}
      style={selectStyle}
      onFocus={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; }}
      onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
    >
      {list.map((item) => (
        <option key={item} value={item} style={{ background: "#111118" }}>{item}</option>
      ))}
    </select>
  </div>
);

export default FormSelect;