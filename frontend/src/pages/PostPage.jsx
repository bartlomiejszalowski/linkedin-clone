import { useParams } from "react-router-dom";
import { useGetAuthUser, useGetPostById } from "../hooks/useGetQueryActions";
import Post from "../components/post/Post";
import Sidebar from "../components/sidebar/Sidebar";

const PostPage = () => {
  const { postId } = useParams();
  const { authUser } = useGetAuthUser();
  const { post, isLoading, isError } = useGetPostById(postId);

  console.log("Component states - isLoading:", isLoading, "post:", post);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>

      <div className="col-span-1 lg:col-span-3">
        <Post post={post} />
      </div>
    </div>
  );
};

export default PostPage;
