import { Clock, UserCheck, UserPlus } from "lucide-react";

const RecommendedUserButton = ({ connectionStatus, label, handleOnClick }) => {
  let buttonColor = "";
  let Icon = UserPlus;
  let additionalClass =
    "border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 text-blue-500";

  if (connectionStatus === "connected") {
    buttonColor = "bg-green-500";
    additionalClass = "text-white";
    Icon = UserCheck;
  }

  if (connectionStatus === "pending") {
    buttonColor = "bg-yellow-500";
    additionalClass = "text-white";
    Icon = Clock;
  }

  if (connectionStatus === "loading") {
    buttonColor = "bg-gray-200";
  }

  return (
    <button
      onClick={handleOnClick ? handleOnClick : undefined}
      className={`px-2 py-1 rounded-full text-sm   flex items-center" ${buttonColor} ${additionalClass}`}
      disabled={!handleOnClick}
    >
      {Icon && <Icon size={16} className="mr-1" />}
      {label}
    </button>
  );
};

export default RecommendedUserButton;
