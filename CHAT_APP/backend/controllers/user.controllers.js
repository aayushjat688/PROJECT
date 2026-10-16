import User from "../models/user.model";

export const getCurrentUser = async(req,res)=>{
  try{
    let userId = req.userId;
    let user = await User.findById(userId).select("-password");
    if(!user) return "user not found";
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({message:`current user error ${error}`});
  }
}