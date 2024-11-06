import { useState } from "react";
import EditProfileInput from "../ui/EditProfileInput";
import EditProfileButton from "../ui/EditProfileButton";

const EducationSection = ({ userData, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [education, setEducation] = useState(userData.education || []);
  const [newEducation, setNewEducation] = useState({
    school: "",
    fieldOfStudy: "",
    startYear: "",
    endYear: "",
  });

  const handleAddEducation = () => {};
  const handleDeleteEducation = () => {};
  const handleSave = () => {};

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      {/* {education.map((edu) => (
        <div key={edu._id} className="mb-4 flex justify-between items-start">
          <div className="flex items-start">
            <School size={20} className="mr-2 mt-1" />
            <div>
              <h3 className="font-semibold">{edu.fieldOfStudy}</h3>
              <p className="text-gray-600">{edu.school}</p>
              <p className="text-gray-500 text-sm">
                {edu.startYear} - {edu.endYear || "Present"}
              </p>
            </div>
          </div>
          {isEditing && (
            <button
              onClick={() => handleDeleteEducation(edu._id)}
              className="text-red-500"
            >
              <X size={20} />
            </button>
          )}
        </div>
      ))} */}
      //implement here ProfileItem.jsx
      {isEditing && (
        <div className="mt-4">
          <EditProfileInput
            type="text"
            placeholder="School"
            value={newEducation.school}
            onChange={(e) =>
              setNewEducation({ ...newEducation, school: e.target.value })
            }
          />
          <EditProfileInput
            type="text"
            placeholder="Field of Study"
            value={newEducation.fieldOfStudy}
            onChange={(e) =>
              setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })
            }
          />
          <EditProfileInput
            type="number"
            placeholder="Start Year"
            value={newEducation.startYear}
            onChange={(e) =>
              setNewEducation({ ...newEducation, startYear: e.target.value })
            }
          />
          <EditProfileInput
            type="number"
            placeholder="End Year"
            value={newEducation.endYear}
            onChange={(e) =>
              setNewEducation({ ...newEducation, endYear: e.target.value })
            }
          />

          <EditProfileButton
            handleClick={handleAddEducation}
            label="Add Education"
          />
        </div>
      )}
      {isOwnProfile && (
        <>
          {isEditing ? (
            <EditProfileButton handleClick={handleSave} label="Save Changes" />
          ) : (
            <EditProfileButton
              handleClick={() => setIsEditing(true)}
              label="Edit Education"
            />
          )}
        </>
      )}
    </div>
  );
};

export default EducationSection;
