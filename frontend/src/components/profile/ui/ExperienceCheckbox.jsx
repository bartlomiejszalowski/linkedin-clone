const ExperienceCheckbox = ({ checked, handleChange }) => {
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        id="currentlyWorking"
        checked={checked}
        onChange={handleChange}
        className="mr-2"
      />
      <label htmlFor="currentlyWorking">I currently work here</label>
    </div>
  );
};

export default ExperienceCheckbox;
