import { formatDistanceToNow } from "date-fns";

const Comment = ({ comment }) => {
  return (
    <div
      key={comment._id}
      className="mb-2 bg-base-100 p-2 rounded flex items-start"
    >
      <img
        src={comment.user.profilePicture || "/avatar.png"}
        alt={comment.user.name}
        className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
      />
      <div className="flex-grow">
        <div className="flex items-center mb-1">
          <span className="font-semibold mr-2">{comment.user.name}</span>
          <span className="text-xs text-info">
            {formatDistanceToNow(new Date(comment.createdAt))}
          </span>
        </div>
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
