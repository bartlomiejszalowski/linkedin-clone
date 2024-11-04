import React from "react";
import ActionButton from "./ActionButton";
import { Link } from "react-router-dom";
import {
  useAcceptRequest,
  useRejectRequest,
} from "../../hooks/useGetQueryActions";

const FriendRequest = ({ connectionReq, user }) => {
  const { acceptRequest } = useAcceptRequest(user._id);
  const { rejectRequest } = useRejectRequest(user._id);

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <Link to={`/profile/${connectionReq.sender.username}`}>
          <img
            src={connectionReq.sender.profilePicture || "/avatar.png"}
            alt={connectionReq.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </Link>

        <div>
          <Link
            to={`/profile/${connectionReq.sender.username}`}
            className="font-semibold text-lg"
          >
            {connectionReq.sender.name}
          </Link>
          <p className="text-gray-600">{connectionReq.sender.headline}</p>
        </div>
      </div>

      <div className="space-x-2">
        <ActionButton
          type="accept"
          handleClick={() => acceptRequest(connectionReq._id)}
          label="Accept"
        />
        <ActionButton
          type="reject"
          handleClick={() => rejectRequest(connectionReq._id)}
          label="Reject"
        />
      </div>
    </div>
  );
};

export default FriendRequest;
