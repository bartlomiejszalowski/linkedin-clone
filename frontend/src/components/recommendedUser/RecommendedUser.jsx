import { Link } from "react-router-dom";
import { renderButton } from "../../utils/renderButton";
import { useGetConnectionStatus } from "../../hooks/useGetQueryActions";

const RecommendedUser = ({ recommendedUser }) => {
  const { connectionStatus, isLoading } = useGetConnectionStatus(
    recommendedUser._id
  );

  return (
    <div className="flex items-center justify-between mb-4">
      <Link
        to={`/profile/${recommendedUser.username}`}
        className="flex items-center flex-grow"
      >
        <img
          src={recommendedUser.profilePicture || "/avatar.png"}
          alt={recommendedUser.name}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold text-sm">{recommendedUser.name}</h3>
          <p className="text-xs text-info">{recommendedUser.headline}</p>
        </div>
      </Link>
      {renderButton(recommendedUser._id)}
    </div>
  );
};

export default RecommendedUser;
