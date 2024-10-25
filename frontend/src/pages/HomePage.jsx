import { useQuery } from "@tanstack/react-query";
import NoPostsYet from "../components/post/NoPostsYet";
import Post from "../components/post/Post";
import PostCreation from "../components/postCreation/PostCreation";
import RecommendedUser from "../components/recommendedUser/RecommendedUser";
import Sidebar from "../components/sidebar/Sidebar";
import {
  useGetAuthUser,
  useGetPosts,
  useGetRecommendedUsers,
} from "../hooks/useGetQueryActions";

const HomePage = () => {
  const { posts } = useGetPosts();
  const { recommendedUsers } = useGetRecommendedUsers();
  const { authUser } = useGetAuthUser();

  if (!recommendedUsers) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>
      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <PostCreation user={authUser} />
        {posts && posts.map((post) => <Post key={post._id} post={post} />)}
        {posts?.length === 0 && <NoPostsYet />}
      </div>
      {recommendedUsers?.length > 0 ? (
        <div className="col-span-1 lg:col-span-1 hidden lg:block">
          <div className="bg-secondary rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">People you may know</h2>
            {recommendedUsers?.map((user) => (
              <RecommendedUser key={user._id} recommendedUser={user} />
            ))}
          </div>
        </div>
      ) : (
        <p>No contacts suggestions..</p>
      )}
    </div>
  );
};

export default HomePage;
