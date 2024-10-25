import { Loader, Trash2 } from "lucide-react";
import React from "react";
import { useDeletePost } from "../../hooks/useGetQueryActions";

const DeletePostButton = ({ postId }) => {
  const { deletePost, isPending: isDeletingPost } = useDeletePost();

  const handleDeletePost = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    deletePost(postId);
  };

  return (
    <button
      onClick={handleDeletePost}
      className="text-red-500 hover:text-red-700"
    >
      {isDeletingPost ? (
        <Loader size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
};

export default DeletePostButton;
