const NotificationStatusButton = ({
  onClick,
  textColor,
  Icon,
  text,
  hoverBackground,
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-1 bg-blue-100  rounded ${textColor} hover:${hoverBackground} transition-colors`}
      aria-label={text}
    >
      {Icon && <Icon size={16} className="mr-1" />}
    </button>
  );
};

export default NotificationStatusButton;
