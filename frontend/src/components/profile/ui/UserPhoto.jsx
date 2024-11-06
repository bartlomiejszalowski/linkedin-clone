import { Camera } from "lucide-react";

const UserPhoto = ({
  editedProfilePicture,
  userProfilePicture,
  userName,
  isEditing,
  handleImageChange,
}) => {
  return (
    <div className="relative -mt-20 mb-4">
      <img
        className="w-32 h-32 rounded-full mx-auto object-cover"
        src={editedProfilePicture || userProfilePicture || "/avatar.png"}
        alt={userName}
      />

      {isEditing && (
        <label className="absolute bottom-0 right-1/2 transform translate-x-16 bg-white p-2 rounded-full shadow cursor-pointer">
          <Camera size={20} />
          <input
            type="file"
            className="hidden"
            name="profilePicture"
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>
      )}
    </div>
  );
};

export default UserPhoto;
