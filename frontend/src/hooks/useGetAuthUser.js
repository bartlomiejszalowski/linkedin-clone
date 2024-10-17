import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const useGetAuthUser = () => {
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

export default useGetAuthUser;
