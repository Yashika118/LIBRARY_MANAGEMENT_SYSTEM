import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

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

}))
