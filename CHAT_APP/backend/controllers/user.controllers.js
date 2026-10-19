import User from "../models/user.model.js";
import uploadOnCloudinary from './../config/cloudinary.js';

export const getCurrentUser = async(req,res)=>{
  try{
    let userId = req.userId;
    let user = await User.findById(userId).select("-password");
    if(!user) return "user not found";
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({message:`current user error ${err}`});
  }
}

export const editProfile = async (req,res)=>{
  try{
    let user = await User.findById(req.userId)

    let name = user.name;
    
    if(req.body){
          name = req.body.name;
      }
  
      
      let image;
      if(req.file){
        image = await uploadOnCloudinary(req.file.path);
      }
       user = await User.findByIdAndUpdate(req.userId,{
        name,
        image
      })
      if(!user) return res.status(400).json({message:"user not found"})
      return res.status(200).json(user);
  } catch (err) {
      return res.status(400).json({message:"profile error"})
  }
}

export const getOtherUsers= async (req,res)=>{
  try {
    console.log(req.userId)
    let users = await User.find({
      _id:{$ne:req.userId}
    }).select("-password");
      return res.status(200).json(users)
  } catch (err){

    return res.status(500).json({message:"get other users error"})
  }
}