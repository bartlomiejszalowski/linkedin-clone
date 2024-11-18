import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import ExperienceCheckbox from "../ui/ExperienceCheckbox";
import ExperienceTextarea from "../ui/ExperienceTextarea";
import { useUpdateProfile } from "../../../hooks/useGetQueryActions";
import EditProfileInput from "../ui/EditProfileInput";
import EditProfileButton from "../ui/EditProfileButton";
import ProfileItem from "../ui/ProfileItem";
import { formatDate } from "../../../utils/formatDate";

const ExperienceSection = ({ userData, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [experience, setExperience] = useState(userData.experience || []);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    currentlyWorking: false,
  });

  const { updateProfile } = useUpdateProfile();

  const handleAddExperience = () => {
    const experienceWithTempId = { ...newExperience, _id: `temp-${uuidv4()}` };
    if (
      newExperience.title &&
      newExperience.company &&
      newExperience.startDate
    ) {
      setExperience([...experience, experienceWithTempId]);

      setNewExperience({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        currentlyWorking: false,
      });
    }
  };

  const handleDeleteExperience = (id) => {
    console.log(id, "ID");
    setExperience(experience.filter((exp) => exp._id !== id));
  };

  const handleSave = () => {
    // Save the experience to the database
    const experienceToSave = experience.map((exp) => {
      // Remove the temporary ID
      if (exp._id && exp._id.startsWith("temp-")) {
        const { _id, ...rest } = exp;
        return rest;
      }
      return exp;
    });

    updateProfile({ experience: experienceToSave });
    setIsEditing(false);
  };

  const handleCurrentlyWorkingChange = (e) => {
    setNewExperience({
      ...newExperience,
      currentlyWorking: e.target.checked,
      endDate: e.target.checked ? "" : newExperience.endDate,
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      {experience.map((exp) => (
        <ProfileItem
          key={exp._id}
          name={exp.title}
          place={exp.company}
          description={exp.description}
          handleClick={() => handleDeleteExperience(exp._id)}
          isEditing={isEditing}
        >
          {formatDate(exp.startDate)} -{" "}
          {exp.endDate ? formatDate(exp.endDate) : "Present"}
        </ProfileItem>
      ))}

      {isEditing && (
        <div className="mt-4">
          <EditProfileInput
            type="text"
            placeholder="Title"
            value={newExperience.title}
            onChange={(e) =>
              setNewExperience({ ...newExperience, title: e.target.value })
            }
          />

          <EditProfileInput
            type="text"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) =>
              setNewExperience({ ...newExperience, company: e.target.value })
            }
          />
          <EditProfileInput
            type="date"
            placeholder="Start Date"
            value={newExperience.startDate}
            onChange={(e) =>
              setNewExperience({ ...newExperience, startDate: e.target.value })
            }
          />
          <ExperienceCheckbox
            checked={newExperience.currentlyWorking}
            handleChange={handleCurrentlyWorkingChange}
          />
          {!newExperience.currentlyWorking && (
            <EditProfileInput
              type="date"
              placeholder="End Date"
              value={newExperience.endDate}
              onChange={(e) =>
                setNewExperience({ ...newExperience, endDate: e.target.value })
              }
            />
          )}
          <ExperienceTextarea
            value={newExperience.description}
            handleChange={(e) =>
              setNewExperience({
                ...newExperience,
                description: e.target.value,
              })
            }
          />
          <EditProfileButton
            handleClick={() => handleAddExperience()}
            label="Add Experience"
          />
        </div>
      )}

      {isOwnProfile && (
        <>
          {isEditing ? (
            <div className="flex mt-2 gap-4  justify-between">
              <EditProfileButton handleClick={handleSave} label="Save" />
              <EditProfileButton
                handleClick={() => setIsEditing(false)}
                label="Cancel"
                isRed
              />
            </div>
          ) : (
            <EditProfileButton
              handleClick={() => setIsEditing(true)}
              label="Edit Experiences"
            />
          )}
        </>
      )}
    </div>
  );
};

export default ExperienceSection;
