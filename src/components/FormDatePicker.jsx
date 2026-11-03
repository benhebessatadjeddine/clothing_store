import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormDatePicker = ({ name, label }) => {
  const [startDate, setStartDate] = useState(new Date("05 October 2010 14:48 UTC"));
  return (
    <div>
      <label htmlFor={name} style={{
        display: "block", fontSize: "0.68rem", fontWeight: "700",
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "rgba(241,240,238,0.4)", marginBottom: "6px",
      }}>
        {label}
      </label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        id={name}
        name={name}
        className="date-picker-custom"
        calendarClassName="date-picker-calendar"
      />
    </div>
  );
};

export default FormDatePicker;
