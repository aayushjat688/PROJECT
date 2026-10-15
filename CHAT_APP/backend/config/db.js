import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();
const connectDb = async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  }catch(err){
    console.log("Db error",err);
  }
}
export default connectDb;