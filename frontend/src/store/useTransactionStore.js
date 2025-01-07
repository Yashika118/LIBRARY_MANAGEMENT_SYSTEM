import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";


export const useTransactionStore=create((set,get)=>({
    transactions:[],
    isLoading:false,
    error:null,
    getUserTransactions:async()=>{
        // set({isLoading:true,error:null})
        try {
            const res=await axiosInstance.get("/transaction/getUserTransactions");
            set({transactions:res.data});
        } catch (error) {
            console.error("Error getting user transactions:", error.message);
            set({ error: "Failed to getting user transaction" });
        }
    },
    returnBook: async (transactionId) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.post(`/transaction/${transactionId}/return`);
            console.log(`Transaction ${transactionId} returned successfully.`);
            
            // Refresh transactions after returning the book
            get().getUserTransactions();
        } catch (error) {
            console.error("Error returning the book:", error.message);
            set({ error: "Failed to return the book", isLoading: false });
        } finally {
            set({ isLoading: false });
        }
    }






}))