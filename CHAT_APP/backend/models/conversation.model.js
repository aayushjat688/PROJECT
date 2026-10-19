import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participants:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  message:[
    {type:String}
  ]
},{timeStamps:true})

const conversation = mongoose.model("conversation",conversationSchema);
export default conversation