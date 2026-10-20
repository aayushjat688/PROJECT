import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participants:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  message:[{type:mongoose.Schema.Types.ObjectId,
    ref:"Message",
    default:""}],

  image:{type:String,default:""}
  
},{timestamps:true})

const Conversation = mongoose.model("conversation",conversationSchema);
export default Conversation