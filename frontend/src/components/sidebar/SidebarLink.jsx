import { Link } from "lucide-react";
import React from "react";

const SidebarLink = ({ linkTo, Icon, iconSize, label }) => {
  return (
    <li>
      <Link
        to={linkTo}
        className="flex items-center py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors"
      >
        {Icon && <Icon size={iconSize} className="mr-2" />} {label}
      </Link>
    </li>
  );
};

export default SidebarLink;
