import { formatDate } from "../../../utils/formatDate";
import { Briefcase, X } from "lucide-react";

const ProfileItem = ({
  handleClick,
  name,
  place,
  description,
  isEditing,
  children,
}) => {
  return (
    <div className="mb-4 flex justify-between items-start">
      <div className="flex items-start">
        <Briefcase size={20} className="mr-2 mt-1" />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-gray-600">{place}</p>
          <p className="text-gray-500 text-sm">{children}</p>
          {description && <p className="text-gray-600 mt-2">{description}</p>}
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
