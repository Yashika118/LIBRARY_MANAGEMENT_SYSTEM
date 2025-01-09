import express from "express";
import { addBook, deleteBook, getBooks, updateBook, viewBook } from "../controllers/book.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";



const router=express.Router();

// for all users

router.get("/getBooks",authMiddleware,getBooks); 
router.get("/viewBook/:id",authMiddleware,viewBook); 



// admin only

router.post("/addBook",authMiddleware,roleMiddleware("admin"),addBook); //login, user===admin

router.put("/updateBook/:id",authMiddleware,roleMiddleware("admin"),updateBook);

router.delete("/deleteBook/:id",authMiddleware,roleMiddleware("admin"),deleteBook);


export default router;
