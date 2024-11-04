import React from "react";

const ActionButton = ({ type, handleClick, label }) => {
  return (
    <button
      className={`${
        type === "accept"
          ? "bg-primary text-white hover:bg-primary-dark"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }  px-4 py-2 rounded-md transition-colors`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;
