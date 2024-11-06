import { Camera } from "lucide-react";

const Banner = ({
  isEditing,
  editedBannerImg,
  userBannerImg,
  handleImageChange,
}) => {
  return (
    <div
      className="relative h-48 rounded-t-lg bg-cover bg-center"
      style={{
        backgroundImage: `url('${
          editedBannerImg || userBannerImg || "/banner.png"
        }')`,
      }}
    >
      {isEditing && (
        <label className="absolute top-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer">
          <Camera size={20} />
          <input
            type="file"
            className="hidden"
            name="bannerImg"
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>
      )}
    </div>
  );
};

export default Banner;
