import React from "react";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";

import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isSignin: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  signin: async (data) => {
    set({ isSignin: true });
    try {
      const res = await axiosInstance.post("/auth/signin", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSignin: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
        username: authUser.fullName,
      },
    });

    socket.connect();
    set({ socket: socket });
    socket.on("getActiveFriends", (userIds) => {
      set({ onlineUsers: userIds });
    });
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

  updateAvatar: async (data) => {
    set({ isUpdatingAvatar: true });
    try {
      const res = await axiosInstance.put("/auth/update-avatar", data);
      set({ authUser: res.data });
      toast.success("Avatar updated");
    } catch (error) {
      console.log("error in update avatar:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingAvatar: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("See you soon Dude!");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
