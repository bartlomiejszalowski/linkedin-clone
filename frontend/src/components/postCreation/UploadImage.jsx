import { Image, Loader } from "lucide-react";
import React from "react";

const UploadImage = ({ onChange, handlePostCreation, isPending }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex space-x-4">
        <label className="flex items-center text-info hover:text-info-dark transition-colors duration-200 cursor-pointer">
          <Image size={20} className="mr-2" />
          <span>Photo</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChange}
          />
        </label>
      </div>

      <button
        className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors duration-200"
        onClick={handlePostCreation}
        disabled={isPending}
      >
        {isPending ? <Loader className="size-5 animate-spin" /> : "Share"}
      </button>
    </div>
  );
};

export default UploadImage;
