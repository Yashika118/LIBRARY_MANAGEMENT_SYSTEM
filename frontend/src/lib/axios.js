import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:import.meta.env.MODE==="development"?"https://library-management-system-2-n81x.onrender.com/api" : "https://library-management-system-2-n81x.onrender.com/api",
    withCredentials:true,
})


// frontend requesting to backend base url