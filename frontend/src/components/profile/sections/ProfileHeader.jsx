import { useState } from "react";
import {
  useAcceptRequest,
  useGetConnectionStatus,
  useRejectRequest,
  useSendConnectionRequest,
  useUpdateProfile,
} from "../../../hooks/useGetQueryActions";
import Banner from "../ui/Banner";
import UserPhoto from "../ui/UserPhoto";
import UserName from "../ui/UserName";
import Headline from "../ui/Headline";
import Location from "../ui/Location";
import ActionButton from "../ui/ActionButton";
import { renderConnectionButton } from "../../../utils/renderConnectionButton";

const ProfileHeader = ({ userData, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const { updateProfile } = useUpdateProfile();
  const { sendConnectionRequest } = useSendConnectionRequest();
  const { acceptRequest } = useAcceptRequest();
  const { rejectRequest } = useRejectRequest();

  const { connectionStatus, isLoading, refetchConnectionStatus } =
    useGetConnectionStatus(userData._id);

  const handleSave = () => {
    updateProfile(editedData);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData((prev) => ({
          ...prev,
          [e.target.name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    console.log("remove");
  };

  return (
    <div className="bg-white shadow rounded-lg mb-6">
      <Banner
        handleImageChange={handleImageChange}
        isEditing={isEditing}
        editedBannerImg={editedData.bannerImg}
        userBannerImg={userData.bannerImg}
      />

      <div className="p-4">
        <UserPhoto
          handleImageChange={handleImageChange}
          isEditing={isEditing}
          editedProfilePicture={editedData.profilePicture}
          userProfilePicture={userData.profilePicture}
          userName={userData.name}
        />

        <div className="text-center mb-4">
          <UserName
            editedData={editedData}
            setEditedData={setEditedData}
            isEditing={isEditing}
            editedName={editedData.name}
            userName={userData.name}
          />

          <Headline
            editedData={editedData}
            setEditedData={setEditedData}
            isEditing={isEditing}
            editedHeadline={editedData.headline}
            userHeadline={userData.headline}
          />

          <Location
            editedData={editedData}
            setEditedData={setEditedData}
            isEditing={isEditing}
            editedLocation={editedData.location}
            userLocation={userData.location}
          />
        </div>

        {isOwnProfile ? (
          isEditing ? (
            <ActionButton handleClick={handleSave} label="Save Profile" />
          ) : (
            <ActionButton
              handleClick={() => setIsEditing(true)}
              label="Edit Profile"
            />
          )
        ) : (
          <div className="flex justify-center">
            {renderConnectionButton(
              connectionStatus?.status,
              sendConnectionRequest,
              acceptRequest,
              rejectRequest,
              handleRemove
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
