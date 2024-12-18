import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { da } from "date-fns/locale";

export const useGetAuthUser = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null; // User not authenticated
        }
        // Show a toast notification for other errors
        toast.error(error.response?.data?.message || "Something went wrong");
        throw error; // Rethrow the error to make it available in the query result
      }
    },
  });

  return { authUser, isLoading };
};

export const useGetNotifications = () => {
  const { authUser } = useGetAuthUser();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/notifications");
        return res.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null; // did't get notifications
        }
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
    enabled: !!authUser, // Only fetch notifications if authUser is available
  });

  return { notifications, isLoading };
};

export const useGetConnectionsRequests = () => {
  const { authUser } = useGetAuthUser();

  const {
    data: connectionsRequests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["connectionsRequests"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/connections/requests");
        return res.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null; // did't get connections requests
        }
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
    enabled: !!authUser, // Only fetch connections requests if authUser is available
  });

  return { connectionsRequests, isLoading, error };
};

export const useGetQueryClient = () => {
  const queryClient = useQueryClient();
  return { queryClient };
};

export const useLogoutUser = () => {
  const { queryClient } = useGetQueryClient();

  const {
    mutate: logoutUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/auth/logout");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  return { logoutUser, isPending, error };
};

export const useSignUp = () => {
  const { queryClient } = useGetQueryClient();

  const { mutate: signUpMutation, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries(["authUser"]);
    },
    onError: (error) => {
      const errors = error.response?.data?.errors;

      if (Array.isArray(errors)) {
        errors.forEach((err) => {
          toast.error(err.msg || "Something went wrong");
        });
      } else {
        // Fallback if no specific errors are returned
        toast.error("Something went wrong");
      }
    },
  });

  return { signUpMutation, isPending };
};

export const useLoginUser = () => {
  const { queryClient } = useGetQueryClient();

  const { mutate: loginUserMutation, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { loginUserMutation, isPending };
};

export const useGetRecommendedUsers = () => {
  const { data: recommendedUsers, isLoading } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  return { recommendedUsers, isLoading };
};

export const useGetPosts = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });
  return { posts, isLoading };
};

export const useCreatePost = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async (postData) => {
      const res = await axiosInstance.post("/posts/create", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries(["posts"]);

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { createPost, isPending };
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async (postId) => {
      const res = await axiosInstance.delete(`/posts/delete/${postId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { deletePost, isPending };
};

export const useCreateComment = (postId, authUser) => {
  const queryClient = useQueryClient();
  const { mutate: createComment, isPending } = useMutation({
    mutationFn: async (newComment) => {
      const res = await axiosInstance.post(
        `/posts/${postId}/comment`,
        {
          content: newComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    },
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(["posts"]);
      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (oldData) =>
        oldData.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  content: newComment,
                  user: {
                    _id: authUser._id,
                    name: authUser.name,
                    profilePicture: authUser.profilePicture,
                  },
                  createdAt: new Date(),
                },
              ],
            };
          }
          return post; // Ensure unchanged posts are returned
        })
      );

      return { previousPosts };
    },

    onSuccess: () => {
      toast.success("Comment created successfully");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error, context) => {
      queryClient.setQueryData(["posts"], context.previousEvent);
      toast.error(error.response.data.message || "Failed to add comment");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return { createComment, isPending };
};

export const useLikePost = (postId) => {
  const queryClient = useQueryClient();
  const { mutate: likePost, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post(`/posts/${postId}/like`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { likePost, isPending };
};

export const useGetConnectionStatus = (userId) => {
  const {
    data: connectionStatus,
    isLoading,
    refetch: refetchConnectionStatus,
  } = useQuery({
    queryKey: ["connectionStatus", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/connections/status/${userId}`);
      return res.data;
    },
  });

  return { connectionStatus, isLoading, refetchConnectionStatus };
};

export const useSendConnectionRequest = () => {
  const queryClient = useQueryClient();
  const { mutate: sendConnectionRequest, isPending } = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosInstance.post(`/connections/request/${userId}`);
      return {
        response: res.data,
        userId,
      };
    },
    onSuccess: (data) => {
      toast.success("Connection request sent successfully");
      queryClient.invalidateQueries(["connectionStatus", data.userId]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { sendConnectionRequest, isPending };
};

export const useAcceptRequest = (userId) => {
  const queryClient = useQueryClient();
  const { mutate: acceptRequest, isPending } = useMutation({
    mutationFn: async (connectionId) => {
      const res = await axiosInstance.put(
        `/connections/accept/${connectionId}`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Connection request accepted successfully");
      queryClient.invalidateQueries(["connectionStatus", userId]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { acceptRequest, isPending };
};

export const useRejectRequest = (userId) => {
  const queryClient = useQueryClient();
  const { mutate: rejectRequest, isPending } = useMutation({
    mutationFn: async (connectionId) => {
      const res = await axiosInstance.put(
        `/connections/reject/${connectionId}`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Connection request rejected successfully");
      queryClient.invalidateQueries(["connectionStatus", userId]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { rejectRequest, isPending };
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  const { mutate: markAsRead, isPending } = useMutation({
    mutationFn: async (notificationId) => {
      const res = await axiosInstance.put(
        `/notifications/${notificationId}/read`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { markAsRead, isPending };
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteNotification, isPending } = useMutation({
    mutationFn: async (notificationId) => {
      const res = await axiosInstance.delete(
        `/notifications/${notificationId}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return { deleteNotification, isPending };
};

export const useGetConnections = () => {
  const queryClient = useQueryClient();
  const { data: connections, isLoading } = useQuery({
    queryKey: ["connections"],
    queryFn: async () => {
      const res = await axiosInstance.get("/connections");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["connections"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return { connections, isLoading };
};

export const useGetPostById = (postId) => {
  const queryClient = useQueryClient();
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      // Timeout after 5 seconds if the request hangs
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      try {
        const res = await axiosInstance.get(`/posts/${postId}`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return res.data;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error; // Pass the error to isError
      }
    },
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries(["post", postId]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  return { post, isLoading, isError };
};

export const useGetProfileByUsername = (username) => {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${username}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile", username]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return { profile, isLoading };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (updatedProfileData) => {
      const res = await axiosInstance.put("/users/profile", updatedProfileData);
      return res.data;
    },
    onSuccess: () => {
      console.log("hello");
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["authUser"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return { updateProfile, isPending };
};

export const removeConnection = (refetchFn) => {
  const queryClient = useQueryClient();
  const { mutate: removeConnection, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.delete(
        `/connections/${data.connectionId}`
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Connection removed successfully");
      data.refetchFn();
      queryClient.invalidateQueries(["connections"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return { removeConnection, isPending };
};
