import { useState } from "react";
import SkillIteam from "../ui/SkillIteam";
import { useUpdateProfile } from "../../../hooks/useGetQueryActions";

const SkillsSection = ({ userData, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(userData.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const { updateProfile } = useUpdateProfile();

  const handleAddSkill = () => {
    if (
      newSkill &&
      newSkill.trim() !== "" &&
      !skills.includes(newSkill.trim())
    ) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };
  const handleDeleteSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };
  const handleSave = () => {
    updateProfile({ skills: skills });
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      <div className="flex flex-wrap">
        {skills.map((skill, index) => (
          <SkillIteam
            key={index}
            skill={skill}
            isEditing={isEditing}
            handleClick={() => handleDeleteSkill(skill)}
          />
        ))}
      </div>

      {isEditing && (
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="New Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-grow p-2 border rounded-l"
          />

          <button
            onClick={handleAddSkill}
            className="bg-primary text-white py-2 px-4 rounded-r hover:bg-primary-dark transition duration-300"
          >
            Add Skill
          </button>
        </div>
      )}

      {isOwnProfile && (
        <>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 text-primary hover:text-primary-dark transition duration-300"
            >
              Edit Skills
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SkillsSection;
