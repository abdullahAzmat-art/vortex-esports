import mongoose from "mongoose";
import colors from "colors"
export let mongooseconnection  = async()=>{
    try {
    await mongoose.connect(process.env.mongoconnect  ,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // optional
})
    console.log("mongodb connected".bgGreen)
        
    } catch (error) {
    console.log(error)
    }
}