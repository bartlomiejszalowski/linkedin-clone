import React from "react";

const SignupInput = ({ type, placeholder, value, onChange, required }) => {
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

export default SignupInput;
