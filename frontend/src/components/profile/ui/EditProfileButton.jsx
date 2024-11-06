const EditProfileButton = ({ handleClick, label, ...props }) => {
  return (
    <button
      onClick={() => handleClick()}
      className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
      {...props}
    >
      {label}
    </button>
  );
};

export default EditProfileButton;
