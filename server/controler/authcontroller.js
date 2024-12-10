import jwt from 'jsonwebtoken';
import user from '../modules/user.js'
import bcrypt from 'bcrypt'
const login = async (req,res)=>{
    try{
        const{email,password} =req.body;
        const user = await user.fondOne({email})
        if(!user){
            res.status(404).json({success:false, error:"user not Found"})

        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!noMatch){
            res.status(404).json({success:false, error:"error password"})

        }
        const token =jwt.sign({_id:user._id, role:user.role})
        process.env.JWT_KEY, {expriresin: "10d"}
        res
        .status(200)
        .json({
            success:true, 
            token, 
            user:{_id: user._id, name: user.name, role: user.role}})


    }catch(error){
        console.log(error.message)
    }

}
export{login}