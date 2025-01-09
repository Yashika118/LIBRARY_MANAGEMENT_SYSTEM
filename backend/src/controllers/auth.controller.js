import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";


// signup
export const signup=async(req,res)=>{
    const {fullname,email,password,contact,role}=req.body;
    try {
        if(!fullname || !email || !contact || !password || !role){
            return res.status(400).json({message:"All fields are required."});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password should be atleast 6 character long."});
        }

        // if user has already account 
        const user=await User.findOne({email}); 
        if(user){
            return res.status(400).json({message:"Email already exists."});
        }

        // if user is newuser then we bcrypt its password
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);
        
        // making new user
        const newUser=new User({
            fullname,
            email,
            password:hashedPassword,
            contact,
            role,
        });

        if(newUser){
            generateToken(newUser._id,newUser.role,res);                // from lib/utli.js
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                email:newUser.email,
                contact:newUser.contact,
                role:newUser.role,
                
            })
        }
        else{
            res.status(500).json({message:"Invalid user data"});
        }
        
    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }    
}




// login
export const login=async(req,res)=>{
    const {email,password}=req.body;

    try {
        
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }    
        
        const isPassCorrect=await bcryptjs.compare(password,user.password);
        if(!isPassCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        
        generateToken(user._id,user.role,res);                  // lib/utils.js
        res.status(201).json({
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            contact:user.contact,
            role:user.role,
        })

    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}





// logout
export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out Successfully"});
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}


// checkauth
export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user);             // it tells us ki user browser pe hai ya nahi
    } catch (error) {
        console.log("Error in checkAuth controller ",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}