import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

export const useAuthStore = create(
    persist(
        (set) => ({
            authUser: null,
            isAuthLoading: false, // To manage initial auth state validation

            // Check authentication status
            checkAuth: async () => {
                set({ isAuthLoading: true });
                try {
                    const res = await axiosInstance.get("/auth/check");
                    set({ authUser: res.data });
                } catch (error) {
                    console.error("Error in checkAuth:", error.message);
                    set({ authUser: null });
                } finally {
                    set({ isAuthLoading: false });
                }
            },

            // User login
            login: async (data) => {
                try {
                    const res = await axiosInstance.post("/auth/login", data);
                    set({ authUser: res.data });
                    toast.success("Login successful");
                } catch (error) {
                    toast.error(error.response?.data?.message || "Login failed");
                }
            },

            // User signup
            signup: async (data) => {
                try {
                    const res = await axiosInstance.post("/auth/signup", data);
                    set({ authUser: res.data });
                    toast.success("Account created successfully");
                } catch (error) {
                    toast.error(error.response?.data?.message || "Signup failed");
                }
            },

            // User logout
            logout: async () => {
                try {
                    await axiosInstance.post("/auth/logout");
                    set({ authUser: null });
                    toast.success("Logout successful");
                } catch (error) {
                    toast.error(error.response?.data?.message || "Logout failed");
                }
            },
        }),
        {
            name: "auth-storage", // Name of the persisted storage
            storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
        }
    )
);
