import { Link } from "react-router-dom";
import { Home, UserPlus, Bell } from "lucide-react";
import SidebarLink from "./SidebarLink";

export default function Sidebar({ user }) {
  return (
    <div className="bg-secondary rounded-lg shadow">
      <div className="p-4 text-center">
        <div
          className="h-16 rounded-t-lg bg-cover bg-center"
          style={{
            backgroundImage: `url("${user.bannerImg || "/banner.png"}")`,
          }}
        />
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture || "/avatar.png"}
            alt={user.name}
            className="w-20 h-20 rounded-full mx-auto mt-[-40px]"
          />
          <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
        </Link>
        <p className="text-info">{user.headline}</p>
        <p className="text-info text-xs">
          {user.connections.length} connections
        </p>
      </div>
      <div className="border-t border-base-100 p-4">
        <nav>
          <ul className="space-y-2">
            <SidebarLink linkTo="/" Icon={Home} iconSize={20} label="Home" />

            <SidebarLink
              to="/network"
              Icon={UserPlus}
              iconSize={20}
              label="My Network"
            />

            <SidebarLink
              to="/notifications"
              Icon={Bell}
              iconSize={20}
              label="Notifications"
            />
          </ul>
        </nav>
      </div>
      <div className="border-t border-base-100 p-4">
        <Link
          to={`/profile/${user.username}`}
          className="text-sm font-semibold"
        >
          Visit your profile
        </Link>
      </div>
    </div>
  );
}
