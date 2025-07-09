import { create } from "zustand";
import { axiosInstance } from "./lib/axios";
import toast from "react-hot-toast";

export const dashboardContext = create((set) => ({
  isLoading: false,
  isCommentsLoading: false,
  userData: null,
  comments: null,
  getUsersData: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/users");
      const users = res.data;
      console.log(res);
      set({ userData: users[0] });
    } catch (error) {
      console.log("Error in getting users data: ", error);
      toast.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  getComments: async () => {
    set({ isCommentsLoading: true });
    try {
      const res = await axiosInstance.get("/comments");
      const comments = res.data;
      set({ comments: comments });
    } catch (error) {
      console.log("Error in getting comments data: ", error);
      toast.error(error);
    } finally {
      set({ isCommentsLoading: false });
    }
  },
}));
