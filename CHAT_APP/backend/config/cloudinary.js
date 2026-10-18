import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
const uploadOnCloudinary = async (filePath)=>{

cloudinary.config({
  cloud_name:"qfbvhdja",
  api_key:"769665577612334",
  api_secret:"yTIPblNLpKAEQxJec-n7dYNiWBM"
})

  try{
    const uploadResult = await cloudinary.uploader.upload(filePath)
  fs.unlinkSync(filePath)
   return uploadResult.secure_url
  } catch (err) {
    fs.unlinkSync(filePath)
      console.log(err);
  }


}
export default uploadOnCloudinary;