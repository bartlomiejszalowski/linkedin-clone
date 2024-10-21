import { Link } from "react-router-dom";

const NavbarItem = ({ linkTo, label, Icon, iconSize, unreadItems }) => {
  return (
    <Link
      to={linkTo}
      className="text-neutral flex flex-col items-center relative"
    >
      {Icon && <Icon size={iconSize} />}
      <span className="text-xs hidden md:block">{label}</span>
      {unreadItems && unreadItems > 0 && (
        <span
          className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center"
        >
          {unreadItems}
        </span>
      )}
    </Link>
  );
};

export default NavbarItem;
