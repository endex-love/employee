import mongoose from "mongoose";


const connectToDatabase = async () =>{
    try{
        await mongoDB.connect(process.env.MONGODB_URL)

    }catch(error){
        console.log(error)
    }
}
export default connectToDatabase