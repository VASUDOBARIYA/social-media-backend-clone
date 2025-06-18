import connectDB from './db/index.js'
import dotenv from 'dotenv'
import app from './app.js' 


dotenv.config()

connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.log("server error",err);
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log("server is running on port : ",process.env.PORT || 8000)
    })
})
.catch((err)=>{
    console.log("MongoDB connection error")
})