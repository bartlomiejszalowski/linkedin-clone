import {
  useAcceptRequest,
  useRejectRequest,
} from "../../hooks/useGetQueryActions";

const RecommendedUserReceivedButton = ({
  type,
  Icon,
  connectionId,
  recommendedUserId,
}) => {
  let acceptBg = "bg-green-500 hover:bg-green-600";
  let rejectBg = "bg-red-500 hover:bg-red-600";

  console.log("CONNECTION ID", connectionId);

  const { acceptRequest } = useAcceptRequest(recommendedUserId);
  const { rejectRequest } = useRejectRequest(recommendedUserId);

  return (
    <button
      onClick={
        () =>
          type === "accept"
            ? acceptRequest(connectionId) // Call this function only on click
            : rejectRequest(connectionId) // Call this function only on click
      }
      className={`rounded-full p-1 flex items-center justify-center ${
        type === "accept" ? acceptBg : rejectBg
      } text-white`}
    >
      {Icon && <Icon size={16} className="mr-2" />}
    </button>
  );
};

export default RecommendedUserReceivedButton;
