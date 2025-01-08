import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "https://library-management-system-2-n81x.onrender.com/api" : "/api";

export const useBookStore = create((set,get) => ({
    books: [],
    isLoading: false,
    error: null,
    bookDetails:null,
    currentBookId:"",
    setCurrentBookId:(id)=>set({currentBookId:id}),
    getBooks: async () => {
        set({
            isLoading: true,
            error: null,
        })

        try {
            const res = await axiosInstance.get("/book/getBooks");
            set({ books: res.data });
        } catch (error) {
            console.error("Error fetching books:", error.message);
            set({ error: "Failed to load books." });
        }
        finally {
            set({ isLoading: false });
        }
    },
    viewBook:async()=>{

        const currentBookId=get().currentBookId;
        // console.log(currentBookId);
        if (!currentBookId) {
            console.error("No book ID provided");
            set({ error: "No book ID provided." });
            return;
        }
        set({isLoading:true,error:null});
        try {
            const res=await axiosInstance.get(`/book/viewBook/${currentBookId}`);
            // console.log(res);
            set({bookDetails:res.data});
            
        } catch (error) {
            console.error("Error fetching book details:", error.message);
            set({ error: "Failed to load book details." });
        }finally{
            set({isLoading:false});
        }
    },
    addBook:async(data)=>{
        try {
            
            const res=await axiosInstance.post("/book/addBook",data);
            set({bookDetails:res.data});
        } catch (error) {
            console.error("Error adding book:", error.message);
            set({ error: error.response?.data?.message || "Failed to add book." });
        }
    },
    deleteBook:async()=>{
        const currentBookId=get().currentBookId;
        // console.log(currentBookId);
        if (!currentBookId) {
            console.error("No book ID provided");
            set({ error: "No book ID provided." });
            return;
        }
        try {
            const res=await axiosInstance.delete(`book/deleteBook/${currentBookId}`)
            set({bookDetails:res.data});
        } catch (error) {
            console.error("Error deleting book:", error.message);
            set({ error: error.response?.data?.message || "Failed to delete book." });
        }
    },
    updateBook:async(data,id)=>{
        
        console.log(data);
        console.log(id);
        try {
            const res=await axiosInstance.put(`book/updateBook/${id}`,data);
            console.log(res.data);
            set({bookDetails:res.data});
        } catch (error) {
            console.error("Error deleting book:", error.message);
            set({ error: error.response?.data?.message || "Failed to delete book." });
        }

    }

}))
