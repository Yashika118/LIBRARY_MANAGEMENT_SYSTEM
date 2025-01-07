import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


const BASE_URL=import.meta.env.MODE==="development"? "http://localhost:3000/api" : "/api";

export const useAuthStore=create((set,get)=>({
    authUser:null,

    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data});

        } catch (error) {
            console.log("Error in checkAuth",error.message);
            set({authUser:null})
        }
    },

    login:async(data)=>{
        try {
            // console.log(data);
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("Login successfull");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    signup:async(data)=>{
        try {
            const res=await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },


}))