import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useGetAuthUser = () => {
  const {
    data: authUser,
    isLoading,
    error,
  } = useQuery({
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

  return { authUser, isLoading, error };
};

export const useGetNotifications = () => {
  const { authUser } = useGetAuthUser();

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
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

  return { notifications, isLoading, error };
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
    isLoading,
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

  return { logoutUser, isLoading, error };
};

export const useSignUp = () => {
  const { queryClient } = useGetQueryClient();

  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries(["authUser"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { signUpMutation, isLoading };
};

export const useLoginUser = () => {
  const { queryClient } = useGetQueryClient();

  const { mutate: loginUserMutation, isLoading } = useMutation({
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

  return { loginUserMutation, isLoading };
};
