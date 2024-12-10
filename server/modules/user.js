import mongoose from "mongoose";


const userSchema = new mongoose.shema({
    name :{type:string, required:true},
    email:{type:string,required:true},
    password:{type:string,required:true},
    role:{type:string,enu:["admin,employee"],required:true},
    profileImage:{type:string},
    createat:{type:date,defualt:date.now},
    updatedat:{type:date,defualt:date.now},
})
const user =mongoose.model("user",schema)
export default user