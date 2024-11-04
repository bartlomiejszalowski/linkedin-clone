import Notification from "../components/notification/Notification";
import Sidebar from "../components/sidebar/Sidebar";
import {
  useGetAuthUser,
  useGetNotifications,
} from "../hooks/useGetQueryActions";

const NotificationsPage = () => {
  const { authUser } = useGetAuthUser();
  const { notifications, isLoading } = useGetNotifications();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="col-span-1 lg:col-span-1">
        <Sidebar user={authUser} />
      </div>
      <div className="col-span-1 lg:col-span-3">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>

          {isLoading ? (
            <p>Loading notifications...</p>
          ) : notifications && notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <Notification
                  key={notification._id}
                  notification={notification}
                />
              ))}
            </ul>
          ) : (
            <p>No notification at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
