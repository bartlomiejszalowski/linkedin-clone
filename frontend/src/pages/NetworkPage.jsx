import FriendRequest from "../components/network/FriendRequest";
import NoConnectionsFound from "../components/network/NoConnectionsFound";
import UserCard from "../components/network/Usercard";
import Sidebar from "../components/sidebar/Sidebar";

import {
  useGetAuthUser,
  useGetConnections,
  useGetConnectionsRequests,
} from "../hooks/useGetQueryActions";

const NetworkPage = () => {
  const { authUser: user } = useGetAuthUser();
  const { connectionsRequests } = useGetConnectionsRequests();
  const { connections } = useGetConnections();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="col-span-1 lg:col-span-1">
        <Sidebar user={user} />
      </div>
      <div className="col-span-1 lg:col-span-3">
        <div className="bg-secondary rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">My Network</h1>

          {connectionsRequests?.length > 0 ? (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Connection Request</h2>
              <div className="space-y-4">
                {connectionsRequests.map((request) => (
                  <FriendRequest
                    key={request._id}
                    connectionReq={request}
                    user={user}
                  />
                ))}
              </div>
            </div>
          ) : (
            <NoConnectionsFound />
          )}
          {connections?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">My Connections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connections.map((connection) => (
                  <UserCard
                    key={connection._id}
                    user={connection}
                    isConnection={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
