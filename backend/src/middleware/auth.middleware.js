//  we used this middleware to check user cookie is expired or not 
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware=async(req,res,next)=>{
    const token=req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:"Not authenticated"});
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({message:"User not found"});
        }

        req.user={
            id:user._id,
            role:decoded.role || user.role
        }
        next();

    } catch (error) {
        console.log("Error in auth middleware ",error.message);
        res.status(403).json({message:"Token is not valid"});
    }
}

export default authMiddleware;