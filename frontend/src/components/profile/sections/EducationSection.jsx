import { useState } from "react";
import EditProfileInput from "../ui/EditProfileInput";
import EditProfileButton from "../ui/EditProfileButton";
import ProfileItem from "../ui/ProfileItem";
import { useUpdateProfile } from "../../../hooks/useGetQueryActions";
import { v4 as uuidv4 } from "uuid";

const EducationSection = ({ userData, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [education, setEducation] = useState(userData.education || []);
  const [newEducation, setNewEducation] = useState({
    school: "",
    fieldOfStudy: "",
    startYear: "",
    endYear: "",
  });

  const { updateProfile } = useUpdateProfile();

  const handleAddEducation = () => {
    const educationWithTempId = { ...newEducation, _id: `temp-${uuidv4()}` };
    if (
      newEducation.school &&
      newEducation.fieldOfStudy &&
      newEducation.startYear &&
      newEducation.endYear
    ) {
      setEducation([...education, educationWithTempId]);
      setNewEducation({
        school: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: "",
      });
    }
  };

  const handleDeleteEducation = (id) => {
    setEducation(education.filter((edu) => edu._id !== id));
  };
  const handleSave = () => {
    const educationToSave = education.map((edu) => {
      // Remove the temporary ID
      if (edu._id && edu._id.startsWith("temp-")) {
        const { _id, ...rest } = edu;
        return rest;
      }
      return edu;
    });
    updateProfile({ education: educationToSave });
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      {education.map((edu) => (
        <ProfileItem
          key={edu._id}
          handleClick={() => handleDeleteEducation(edu._id)}
          name={edu.fieldOfStudy}
          place={edu.school}
          isEditing={isEditing}
        />
      ))}
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
            <div className="flex mt-2 gap-4  justify-between">
              <EditProfileButton
                handleClick={handleSave}
                label="Save Changes"
              />
              <EditProfileButton
                handleClick={() => setIsEditing(false)}
                label="Cancel"
                isRed
              />
            </div>
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
