import React from "react";

const Input = ({ type, placeholder, value, onChange, required }) => {
  return (
    <input
      className="input input-border w-full"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;
