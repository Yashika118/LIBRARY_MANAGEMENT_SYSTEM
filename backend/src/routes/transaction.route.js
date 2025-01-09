import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { borrowBook, getAllTransactions, getUserTransactions, returnBook } from "../controllers/transaction.controller.js";


const router=express.Router();

router.post("/borrow",authMiddleware,borrowBook);
router.post("/:id/return",authMiddleware,returnBook);
router.get("/getUserTransactions",authMiddleware,getUserTransactions);



// admin only
router.get("/allTransaction",authMiddleware,roleMiddleware("admin"),getAllTransactions);

export default router;