import { Check, X } from "lucide-react";
import RecommendedUserButton from "../components/recommendedUser/RecommendedUserButton";
import RecommendedUserReceivedButton from "../components/recommendedUser/RecommendedUserReceivedButton";
import {
  useGetConnectionStatus,
  useSendConnectionRequest,
} from "../hooks/useGetQueryActions";

export const renderButton = (userId) => {
  const { connectionStatus, isLoading } = useGetConnectionStatus(userId);
  const { sendConnectionRequest, isPending: isRequestPending } =
    useSendConnectionRequest();

  if (isLoading) {
    <RecommendedUserButton connectionStatus="loading" label="Loading..." />;
  }

  const handleConnect = () => {
    if (connectionStatus?.status === "not_connected") {
      sendConnectionRequest(userId);
    }

    return;
  };

  switch (connectionStatus?.status) {
    case "pending":
      return (
        <RecommendedUserButton connectionStatus="pending" label="Pending" />
      );

    case "received":
      return (
        <div className="flex gap-2 justify-center">
          <RecommendedUserReceivedButton
            type="accept"
            Icon={Check}
            connectionId={connectionStatus?.requestId}
            recommendedUserId={userId}
          />
          <RecommendedUserReceivedButton
            type="reject"
            Icon={X}
            connectionId={connectionStatus?.requestId}
            recommendedUserId={userId}
          />
        </div>
      );
    case "connected":
      return (
        <RecommendedUserButton connectionStatus="connected" label="Connected" />
      );

    default:
      return (
        <RecommendedUserButton label="Connect" handleOnClick={handleConnect} />
      );
  }
};
