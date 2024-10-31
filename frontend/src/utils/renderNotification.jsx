import { MessageSquare, ThumbsUp, UserPlus } from "lucide-react";
import NotificationItem from "../components/notification/NotificationItem";
import NotificationInfo from "../components/notification/NotificationInfo";

export const renderNotification = (notification) => {
  switch (notification.type) {
    case "like":
      return (
        <NotificationItem
          notification={notification}
          Icon={<ThumbsUp className="text-blue-500" />}
          content={
            <span>
              <strong>{notification.relatedUser.name}</strong> liked your post
            </span>
          }
        />
      );

    case "comment":
      return (
        <NotificationItem
          notification={notification}
          Icon={<MessageSquare className="text-green-500" />}
          content={
            <NotificationInfo
              username={notification.relatedUser.username}
              name={notification.relatedUser.name}
              type="comment"
            />
          }
        />
      );

    case "connectionAccepted":
      return (
        <NotificationItem
          notification={notification}
          Icon={<UserPlus className="text-purple-500" />}
          content={
            <NotificationInfo
              username={notification.relatedUser.username}
              name={notification.relatedUser.name}
              type="connectioAccepted"
            />
          }
        />
      );

    default:
      return null;
  }
};
