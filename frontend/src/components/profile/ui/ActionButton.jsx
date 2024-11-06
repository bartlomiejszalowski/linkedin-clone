const ActionButton = ({ handleClick, label }) => {
  return (
    <button
      className="w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark
							 transition duration-300"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;
