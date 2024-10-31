import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const NotificationRelatedPost = ({ relatedPost }) => {
  return (
    <Link
      to={`/post/${relatedPost._id}`}
      className="mt-2 p-2 bg-gray-50 rounded-md flex items-center space-x-2 hover:bg-gray-100 transition-colors"
    >
      {relatedPost.image && (
        <img
          src={relatedPost.image}
          alt="Post preview"
          className="w-10 h-10 object-cover rounded"
        />
      )}
      <div className="flex-1 overflow-hidden">
        <p className="text-sm text-gray-600 truncate">{relatedPost.content}</p>
      </div>
      <ExternalLink size={14} className="text-gray-400" />
    </Link>
  );
};

export default NotificationRelatedPost;
