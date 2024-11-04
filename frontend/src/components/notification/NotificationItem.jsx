import { ExternalLink, Link } from "lucide-react";
import NotificationRelatedPost from "./NotificationRelatedPost";
import { formatDistanceToNow } from "date-fns";

const NotificationItem = ({ Icon, content, notification }) => {
  const renderRelatedPost = (relatedPost) => {
    if (!relatedPost) return null;

    return <NotificationRelatedPost relatedPost={relatedPost} />;
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="p-1 bg-gray-100 rounded-full">{Icon}</div>
        <p className="text-sm">{content}</p>
      </div>
      {notification.createdAt && (
        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </p>
      )}

      {renderRelatedPost(notification.relatedPost)}
    </div>
  );
};

export default NotificationItem;
