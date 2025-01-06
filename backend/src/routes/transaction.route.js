import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { borrowBook, getAllTransactions, returnBook } from "../controllers/transaction.controller.js";


const router=express.Router();

router.post("/borrow",authMiddleware,borrowBook);
router.post("/return",authMiddleware,returnBook);

// admin only
router.get("/allTransaction",authMiddleware,roleMiddleware("admin"),getAllTransactions);

export default router;