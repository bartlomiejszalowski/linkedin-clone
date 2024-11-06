const Headline = ({
  isEditing,
  editedHeadline,
  userHeadline,
  editedData,
  setEditedData,
}) => {
  return (
    <>
      {isEditing ? (
        <input
          type="text"
          value={editedHeadline ?? userHeadline} // Use editedHeadline if it exists, otherwise use userHeadline
          onChange={(e) =>
            setEditedData({ ...editedData, headline: e.target.value })
          }
          className="text-gray-600 text-center w-full"
        />
      ) : (
        <p className="text-gray-600">{userHeadline}</p>
      )}
    </>
  );
};

export default Headline;
