import { formatDate } from "../../../utils/formatDate";
import { Briefcase, X } from "lucide-react";

const ProfileItem = ({ handleClick, experience, isEditing }) => {
  return (
    <div className="mb-4 flex justify-between items-start">
      <div className="flex items-start">
        <Briefcase size={20} className="mr-2 mt-1" />
        <div>
          <h3 className="font-semibold">{experience.title}</h3>
          <p className="text-gray-600">{experience.company}</p>
          <p className="text-gray-500 text-sm">
            {formatDate(experience.startDate)} -{" "}
            {experience.endDate ? formatDate(experience.endDate) : "Present"}
          </p>
          <p className="text-gray-700">{experience.description}</p>
        </div>
      </div>
      {isEditing && (
        <button onClick={handleClick} className="text-red-500">
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default ProfileItem;
