import User from "../model/user.model.js";
import {z} from "zod";
import bycrypt from "bcryptjs";
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

const userSchema= z.object({
    email: z.string().email({message:"invalide email"}),
    username: z.string().min(3),
    password: z.string().min(6, {message:"password must atleast 6 letters"}).max(20),
})

export const register= async (req, res) =>{
    // console.log("signup function called");
    
    try {
        const {username,email,password} = req.body;
        // console.log(username,email,password)

        if(!email || !username || !password){
            return res.status(400).json({message:"all are requerd"})
        }
        const validation= userSchema.safeParse({username,email,password});
        if(!validation.success){
            const errorMsg= validation.error.errors.map((err) => err.message);
            return res.status(400).json({error:errorMsg})
        }

        const user= await User.findOne({email})
        if(user){
            return res.status(201).json({message:"already exist"});
        }
        const hashpassword = await bycrypt.hash(password,10)

        const newUser = new User({email,username,password:hashpassword});   
        await newUser.save();
        if(newUser){
            const token=await generateTokenAndSaveInCookies(newUser._id, res);
            return res.status(201).json({message:"user registerd successfully", newUser});
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error has been occered in singup"})
    }
}

export const login= async(req, res) =>{
    // console.log("login function called");

    const {email,password} = req.body;

    try {
        if(!email || !password){
            return res.status(400).json({message:"all are requerd"})
        }
        const user=await User.findOne({email}).select("+password");
        if(!user || ! await (bycrypt.compare(password,user.password))){
            return res.status(400).json({message:"invalide email or password "})
        }
        const token=await generateTokenAndSaveInCookies(user._id, res);
        return res.status(200).json({message:"logged in successfully",user,token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error has been occered in login"} )
    }
}

export const logout= async(req, res) =>{
    // console.log("logout function called");
    try {
        res.clearCookie("jwt",{
            path:"/",
        });
        return res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error has been occered in login"} )
    }
}