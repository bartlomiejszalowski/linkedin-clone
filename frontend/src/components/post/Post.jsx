import { Loader, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import {
  useCreateComment,
  useDeletePost,
  useGetAuthUser,
  useLikePost,
} from "../../hooks/useGetQueryActions";

import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import DeletePostButton from "./DeletePostButton";
import { useState } from "react";
import PostAction from "./PostAction";
import PostComment from "../comment/Comment";
import CreateComment from "../comment/CreateComment";
import Comment from "../comment/Comment";

const Post = ({ post }) => {
  const { authUser } = useGetAuthUser();

  const [showComments, setShowComments] = useState(false);

  const { likePost, isPending: isLikingPost } = useLikePost(post._id);

  const isOwner = authUser._id === post.author._id;
  const isLiked = post.likes.includes(authUser._id);

  const handleLikePost = () => {
    if (isLikingPost) {
      return;
    }

    likePost();
  };

  if (!post) {
    return null;
  }

  return (
    <div className="bg-secondary rounded-lg shadow mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to={`/profile/${post?.author?.username}`}>
              <img
                src={post.author.profilePicture || "/avatar.png"}
                alt={post.author.name}
                className="size-10 rounded-full mr-3"
              />
            </Link>

            <PostAuthor
              authorName={post.author.name}
              authorHeadline={post.author.headline}
              authorUsername={post.author?.username}
              createdAt={post.createdAt}
            />
          </div>
          {isOwner && <DeletePostButton postId={post._id} />}
        </div>
        <p className="mb-4">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="rounded-lg w-full mb-4"
          />
        )}

        <div className="flex justify-between text-info">
          <PostAction
            icon={
              <ThumbsUp
                size={18}
                className={isLiked ? "text-blue-500  fill-blue-300" : ""}
                onClick={handleLikePost}
              />
            }
            text={`Like (${post.likes.length})`}
          />

          <PostAction
            icon={<MessageCircle size={18} />}
            text={`Comment (${post.comments.length})`}
            onClick={() => setShowComments(!showComments)}
          />
          <PostAction icon={<Share2 size={18} />} text="Share" />
        </div>
      </div>

      {showComments && post.comments && (
        <div className="px-4 pb-4">
          <div className="mb-4 max-h-60 overflow-y-auto">
            {post.comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>
          <CreateComment postId={post._id} authUser={authUser} />
        </div>
      )}
    </div>
  );
};

export default Post;
