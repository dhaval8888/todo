import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const authanticate= async (req, res, next) =>{
    const token= req.cookies.jwt;
    console.log(token)      
    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }
    try {
        const decode= jwt.verify(token,'faEf7gANax21+FIAAUqYJSGu4L5PdFOc1rWAuMOnk58=')
        console.log(decode)     
        req.user = await User.findById(decode.userId)
        next(); 
    } catch (error) {
        return res.status(401).json({message:error.message})
    }
};

export default authanticate;