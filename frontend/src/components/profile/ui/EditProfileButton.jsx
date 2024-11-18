const EditProfileButton = ({ handleClick, label, isRed }) => {
  return (
    <button
      onClick={() => handleClick()}
      className={`bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 ${
        isRed ? "bg-red-400" : "bg-primary"
      }`}
    >
      {label}
    </button>
  );
};

export default EditProfileButton;
