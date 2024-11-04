import { UserPlus } from "lucide-react";

const NoConnectionsFound = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center mb-6">
      <UserPlus size={48} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Connection Requests</h3>
      <p className="text-gray-600">
        You don&apos;t have any pending connection requests at the moment.
      </p>
      <p className="text-gray-600 mt-2">
        Explore suggested connections below to expand your network!
      </p>
    </div>
  );
};

export default NoConnectionsFound;
