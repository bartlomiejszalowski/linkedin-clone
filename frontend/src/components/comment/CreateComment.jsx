import { Loader, Send } from "lucide-react";
import { useState } from "react";
import { useCreateComment } from "../../hooks/useGetQueryActions";

const CreateComment = ({ postId, authUser }) => {
  const [newComment, setNewComment] = useState("");

  const { createComment, isPending: isCreatingComment } = useCreateComment(
    postId,
    authUser
  );

  const handleAddComment = (e) => {
    e.preventDefault();

    if (newComment.trim()) {
      // check if the comment is not empty
      createComment(newComment);
      setNewComment("");
    }
  };

  return (
    <form onSubmit={handleAddComment} className="flex items-center">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-grow p-2 rounded-l-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button
        type="submit"
        className="bg-primary text-white p-2 rounded-r-full hover:bg-primary-dark transition duration-300"
        disabled={isCreatingComment}
      >
        {isCreatingComment ? (
          <Loader size={18} className="animate-spin" />
        ) : (
          <Send size={24} />
        )}
      </button>
    </form>
  );
};

export default CreateComment;
