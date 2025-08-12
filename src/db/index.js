import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


//RESPONSE AANE KE BAAD HOLD KR RHE HAI CONNECTIONINSTANCE MAI\\
const connectDB=async()=>{
    try{
      const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log(`\nMongoDB connected !! DB HOST:${connectionInstance.connection.host}`);


    }
    //agr .env mnai kuch glt kiye tb catch mai jyega
    catch(error){
        console.log("MONGODB connection error ",error);
        process.exit(1)
    }
}
export default connectDB