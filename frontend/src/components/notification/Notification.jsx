import { Link } from "react-router-dom";
import { renderNotification } from "../../utils/renderNotification";
import NotificationStatus from "./NotificationStatus";

const Notification = ({ notification }) => {
  return (
    <li
      className={`bg-white border rounded-lg p-4 my-4 transition-all hover:shadow-md ${
        !notification.read ? "border-blue-500" : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/profile/${notification.relatedUser.username}`}>
            <img
              src={notification.relatedUser.profilePicture || "/avatar.png"}
              alt={notification.relatedUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </Link>
          {renderNotification(notification)}
        </div>

        <NotificationStatus notification={notification} />
      </div>
    </li>
  );
};

export default Notification;
