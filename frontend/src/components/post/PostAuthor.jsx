import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const PostAuthor = ({
  authorUsername,
  authorName,
  authorHeadline,
  createdAt,
}) => {
  return (
    <div>
      <Link to={`/profile/${authorUsername}}`}>
        <h3 className="font-semibold">{authorName}</h3>
      </Link>
      <p className="text-xs text-info">{authorHeadline}</p>
      <p className="text-xs text-info">
        {formatDistanceToNow(new Date(createdAt))}
      </p>
    </div>
  );
};

export default PostAuthor;
