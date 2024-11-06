const UserName = ({
  isEditing,
  editedName,
  userName,
  setEditedData,
  editedData,
}) => {
  return (
    <>
      {isEditing ? (
        <input
          type="text"
          value={editedName ?? userName} // Use editedName if available, otherwise use userName
          onChange={(e) =>
            setEditedData({ ...editedData, name: e.target.value })
          }
          className="text-2xl font-bold mb-2 text-center w-full"
        />
      ) : (
        <h1 className="text-2xl font-bold mb-2">{userName}</h1>
      )}
    </>
  );
};

export default UserName;
