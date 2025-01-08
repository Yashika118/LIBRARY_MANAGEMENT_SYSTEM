import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "https://library-management-system-2-n81x.onrender.com/api" : "/api";


export const useTransactionStore=create((set,get)=>({
    transactions:[],
    isLoading:false,
    error:null,

    //get all the users transactions
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


    //Borrow a book
    borrowBook: async (bookId) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.post("/transaction/borrow", { bookId });
            console.log(`Book ${bookId} borrowed successfully.`);
            get().getUserTransactions();
        } catch (error) {
            console.error("Error borrowing the book:", error.message);
            set({ error: "Failed to borrow the book", isLoading: false });
        } finally {
            set({ isLoading: false });
        }
    },
    
    //return a book
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
    },

    getAllTransactions:async()=>{
        try {
            const response=await axiosInstance.get("/transaction/allTransaction");
            set({transactions:response.data});
        } catch (error) {
            console.error('Error fetching transactions:', error.message);
            set({ error: 'Failed to fetch transactions. Please try again.' });
        }
    }






}))