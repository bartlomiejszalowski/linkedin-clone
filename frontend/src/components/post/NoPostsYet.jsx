import { Users } from "lucide-react";

const NoPostsYet = () => {
  return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <div className="mb-6">
        <Users size={64} className="mx-auto text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">No Posts Yet</h2>
      <p className="text-gray-600 mb-6">
        Connect with others to start seeing posts in your feed!
      </p>
    </div>
  );
};

export default NoPostsYet;
