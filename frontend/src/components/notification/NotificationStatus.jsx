import { Eye, Trash2 } from "lucide-react";
import {
  useDeleteNotification,
  useMarkAsRead,
} from "../../hooks/useGetQueryActions";
import NotificationStatusButton from "./NotificationStatusButton";

const NotificationStatus = ({ notification }) => {
  const { deleteNotification } = useDeleteNotification();
  const { markAsRead } = useMarkAsRead();

  return (
    <div className="flex gap-2">
      {!notification.read && (
        <NotificationStatusButton
          onClick={() => markAsRead(notification._id)}
          Icon={Eye}
          textColor="text-blue-600"
          text="Mark as read"
          hoverBackground="bg-blue-200"
        />
      )}
      <NotificationStatusButton
        onClick={() => deleteNotification(notification._id)}
        Icon={Trash2}
        textColor="text-red-600"
        text="Delete notification"
        hoverBackground="bg-red-200"
      />
    </div>
  );
};

export default NotificationStatus;
