import { Clock, UserCheck, UserPlus, X } from "lucide-react";
import ConnectionButton from "../components/profile/ui/ConnectionButton";

export const renderConnectionButton = (
  connectionStatus,
  handleConnect,
  handleAccept,
  handleReject,
  handleRemove
) => {
  console.log(connectionStatus);

  switch (connectionStatus) {
    case "connected":
      return (
        <div className="flex gap-2 justify-center">
          <ConnectionButton
            isDisabled={true}
            label="Connected"
            bgColor="green"
            Icon={UserCheck}
          />
          <ConnectionButton
            label="Remove Connection"
            bgColor="red"
            Icon={X}
            handleClick={handleRemove}
          />
        </div>
      );

    case "pending":
      return <ConnectionButton label="Pending" bgColor="yellow" Icon={Clock} />;

    case "received":
      return (
        <div className="flex gap-2 justify-center">
          <ConnectionButton
            label="Accept"
            bgColor="green"
            handleClick={handleAccept}
          />

          <ConnectionButton
            label="Reject"
            bgColor="red"
            handleClick={handleReject}
          />
        </div>
      );
    default:
      return (
        <ConnectionButton
          label="Connect"
          bgColor="primary"
          Icon={UserPlus}
          handleClick={handleConnect}
        />
      );
  }
};
