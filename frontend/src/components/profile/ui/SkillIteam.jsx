import { X } from "lucide-react";

const SkillIteam = ({ skill, isEditing, handleClick }) => {
  return (
    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center">
      {skill}
      {isEditing && (
        <button onClick={handleClick} className="ml-2 text-red-500">
          <X size={14} />
        </button>
      )}
    </span>
  );
};

export default SkillIteam;
