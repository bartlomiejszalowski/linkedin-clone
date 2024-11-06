import { MapPin } from "lucide-react";
import React from "react";

const Location = ({
  isEditing,
  editedLocation,
  userLocation,
  editedData,
  setEditedData,
}) => {
  return (
    <div className="flex justify-center items-center mt-2">
      <MapPin size={16} className="text-gray-500 mr-1" />
      {isEditing ? (
        <input
          type="text"
          value={editedLocation ?? userLocation}
          onChange={(e) =>
            setEditedData({ ...editedData, location: e.target.value })
          }
          className="text-gray-600 text-center"
        />
      ) : (
        <span className="text-gray-600">{userLocation}</span>
      )}
    </div>
  );
};

export default Location;
