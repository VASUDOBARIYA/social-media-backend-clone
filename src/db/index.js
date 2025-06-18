import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async ()=>{
    try {
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("connect with mongoDB : ",connectionInstance.connection.host )
    } catch (error) {
        console.log("mongoDB connection error : ",error);
    }
}

export default connectDB;