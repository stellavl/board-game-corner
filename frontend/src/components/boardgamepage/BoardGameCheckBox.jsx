import React from "react";

const BoardGameCheckBox = ({ checkboxText, checked, onChange, className }) => {
  return (
    <div className={className}>
      <label>
        <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
        />
        <span className="ms-2" style={{ color: "var(--color-gray-purple)" }}>{checkboxText}</span>
        </label>
    </div>
  );
};

export default BoardGameCheckBox;
