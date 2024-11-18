import { useState } from "react";
import { useUpdateProfile } from "../../../hooks/useGetQueryActions";
import EditProfileButton from "../ui/EditProfileButton";

const AboutSection = ({ userData, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData.about || "");

  const { updateProfile } = useUpdateProfile();

  const handleSave = () => {
    setIsEditing(false);
    updateProfile({ about: about });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">About</h2>
      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              />
              <div className="flex mt-2 gap-4  justify-between ">
                <button
                  onClick={handleSave}
                  className="mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark 
								transition duration-300"
                >
                  Save
                </button>
                <EditProfileButton
                  handleClick={() => setIsEditing(false)}
                  label="Cancel"
                  isRed
                />
              </div>
            </>
          ) : (
            <>
              <p>{userData.about}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 text-primary hover:text-primary-dark transition duration-300"
              >
                Edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AboutSection;
