import express from "express";
import { addBook, deleteBook, getBooks, updateBook } from "../controllers/book.controller";

const router=express.Router();

router.get("/getBooks",getBooks); //login cahiye



// admin only

router.post("/addBook",addBook); //login, user===admin

router.put("/updateBook",updateBook);

router.delete("/deleteBook",deleteBook);


export default router;
