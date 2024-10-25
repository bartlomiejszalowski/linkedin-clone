import { Link } from "react-router-dom";
import {
  useGetAuthUser,
  useGetConnectionsRequests,
  useGetNotifications,
  useLogoutUser,
} from "../../hooks/useGetQueryActions";
import { Bell, Home, LogOut, User, Users } from "lucide-react";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  const { authUser } = useGetAuthUser();
  const { notifications } = useGetNotifications();
  const { connectionsRequests } = useGetConnectionsRequests();
  const { logoutUser } = useLogoutUser();

  const unreadNotificationsCount = notifications?.filter(
    (notification) => !notification.read
  ).length;

  const unreadConnectionRequestsCount = connectionsRequests?.length;

  return (
    <nav className="bg-secondary shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                className="h-8 rounded"
                src="/small-logo.png"
                alt="LinkedIn"
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            {authUser ? (
              <>
                <NavbarItem linkTo="/" Icon={Home} iconSize={20} label="Home" />

                <NavbarItem
                  linkTo="/network"
                  Icon={Users}
                  iconSize={20}
                  label="My Network"
                  unreadItems={unreadConnectionRequestsCount}
                />

                <NavbarItem
                  linkTo="/notifications"
                  Icon={Bell}
                  iconSize={20}
                  label="Notifications"
                  unreadItems={unreadNotificationsCount}
                />

                <NavbarItem
                  linkTo={`/profile/${authUser.username}`}
                  Icon={User}
                  iconSize={20}
                  label="Me"
                />
                <button
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
                  onClick={() => logoutUser()}
                >
                  <LogOut size={20} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Join now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
