import { useDispatch, useSelector } from 'react-redux';
import dp from '../assets/dp.jpg'
import { IoMdArrowRoundBack } from "react-icons/io";
import { CiCamera } from "react-icons/ci";
import { useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';
import axios from 'axios';


function Profile() {
  let Navigate = useNavigate();
   let {userData} = useSelector(state=>state.user);
   let dispatch = useDispatch();
   let [saving,setSaving] = useState(false);
  let [name,setName] = useState(userData.name || "")
  let [frontendImage,setFrontendImage]= useState(userData.image || dp)
  let [backendImage,setBackendImage]= useState(null)
  let image = useRef()
 const handleImage=(e)=>{

  let file = e.target.files[0];
  if(!file) return;
  setBackendImage(file);
  setFrontendImage(URL.createObjectURL(file))

 }
 async function handleProfile  (e){
  e.preventDefault();
  setSaving(true);

try{
  let formData = new FormData();
  formData.append("name",name)
  if(backendImage){
    formData.append("image",backendImage);
  }
  let result = await axios.put(`${serverUrl}/api/user/profile`,formData,{withCredentials:true})
  setSaving(false)
  dispatch(setUserData(result.data))
} catch (error) {
console.log(error);
setSaving(false)
 }
}
  return (
    <div className="w-full gap-[20px] h-[100vh] bg-slate-200 flex flex-col justify-center items-center">
      <div className='fixed top-[20px] left-[20px]'><IoMdArrowRoundBack onClick={()=>Navigate("/")} className='cursor-pointer w-[30px] h-[30px]'/></div>
      <div  className="w-[200px] h-[200px] bg-white rounded-full border-2 border-[#20c7ff]
      shadow-gray-400 shadow-lg relative">
        <div onClick={()=>image.current.click()} className='w-[100%] h-[100%] overflow-hidden flex justify-center items-center'><img src={frontendImage} className="h-[100%] overflow-hidden rounded-full" alt="profile pic" /></div>
        <CiCamera onClick={()=>image.current.click()} className=' absolute cursor-pointer right-4 bottom-5 rounded-full bg-blue-400 text-2xl  text-black'/>
      </div> 
      <form onSubmit={handleProfile} className='w-[95%]   max-w-[500px] flex flex-col gap-[20px]
      items-center justify-center'>
          <input  type="file" hidden ref={image} accept='image/*' onChange={(e)=>handleImage(e)}/>

        <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder='Enter your name' className="w-[90%] h-[60px] cursor-pointer
        outline-none border-2 hover:shadow-inner border-[#20c7ff] px-[20px] py-[10px] bg-white
        rounded-lg hadow-gray-400 shadow-lg text-gray-700 text-[19px]"/>
        <input type="text" value={userData.userName} readOnly className="w-[90%] h-[60px] cursor-pointer
        outline-none border-2 hover:shadow-inner border-[#20c7ff] px-[20px] py-[10px] bg-white
        rounded-lg hadow-gray-400 shadow-lg text-gray-400 text-[19px]"/>
        <input type="email" value={userData.email} readOnly className="w-[90%] h-[60px] cursor-pointer
        outline-none border-2 hover:shadow-inner border-[#20c7ff] px-[20px] py-[10px] bg-white
        rounded-lg hadow-gray-400 shadow-lg text-gray-400 text-[19px]"/>
       <button  className="px-[20px] w-[200px] cursor-pointer mt-4 py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-300 shadow-lg
        hover:shadow-inner" disabled={saving}>{saving?"saving...":"Save profile"}</button>
       
      </form>
    </div>
  )
}

export default Profile