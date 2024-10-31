import { Link } from "react-router-dom";

const NotificationInfo = ({ username, name, type }) => {
  return (
    <span>
      <Link to={`/profile/${username}`} className="font-bold">
        {name}
      </Link>
      {type === "comment" && " commented on your post"}
      {type === "connectioAccepted" && "accepted your connection request"}
    </span>
  );
};

export default NotificationInfo;
