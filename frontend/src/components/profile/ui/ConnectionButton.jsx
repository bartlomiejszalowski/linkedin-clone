const ConnectionButton = ({
  Icon,
  bgColor,
  label,
  isDisabled,
  handleClick,
}) => {
  let baseClass =
    "text-white py-2 px-4 rounded-full transition duration-300 flex items-center justify-center";

  if (bgColor === "green") {
    baseClass += " bg-green-500 hover:bg-green-600";
  }

  if (bgColor === "red") {
    baseClass += " bg-red-500 hover:bg-red-600 text-sm";
  }

  if (bgColor === "yellow") {
    baseClass += " bg-yellow-500 hover:bg-yellow-600";
  }

  if (bgColor === "primary") {
    baseClass += " bg-primary hover:bg-primary-dark";
  }

  return (
    <button
      className={`${baseClass}`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {Icon && <Icon size={20} className="mr-2" />}
      {label}
    </button>
  );
};

export default ConnectionButton;
