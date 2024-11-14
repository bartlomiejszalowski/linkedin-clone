const ExperienceTextarea = ({ value, handleChange }) => {
  return (
    <textarea
      placeholder="Description"
      value={value}
      onChange={handleChange}
      className="w-full p-2 border rounded mb-2"
    />
  );
};

export default ExperienceTextarea;
