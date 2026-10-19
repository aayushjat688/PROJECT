
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { RiLogoutBoxLine } from "react-icons/ri";
import dp from '../assets/dp.jpg'
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';
import { serverUrl } from '../main';
import axios from 'axios';
import { setOtherUsers, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
function Sidebar() {
  
  let {userData,otherUsers} = useSelector(state=>state.user)
  let[search , setSearch] = useState(false)
  let dispatch = useDispatch();
  let Navigate = useNavigate();
  const handleLogOut = async ()=>{
    try{
      await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      dispatch(setUserData(null))
      dispatch(setOtherUsers(null))
      Navigate('/login')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="lg:w-[30%] w-full h-full bg-slate-200">
      <div onClick={handleLogOut}  className='w-[40px] h-[40px] shadow-lg shadow-gray-500 fixed bottom-[20px] left-[10px]  rounded-full mr-5  overflow-hidden bg-[#20c7ff] flex justify-center items-center'>{<RiLogoutBoxLine className='text-3xl cursor-pointer'/>}</div>
      <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] flex flex-col justify-center
        shadow-gray-400 shadow-lg ">
          <div>
            <h1 className='text-white font-bold text-[19px] px-[20px]'>CHAT_APP</h1>
          </div>
          <div className='flex flex-row items-center justify-between'>
              <h1 className='text-gray-700 font-bold text-[19px] px-[20px]'>Hi , {userData.name || "user"}</h1>
            <div className='w-[60px] h-[60px] shadow-lg shadow-gray-500 rounded-full mr-5  overflow-hidden flex justify-center items-center'><img src={userData.image || dp}  className="h-[100%] overflow-hidden rounded-full" alt="profile pic" /></div>
          </div>
              <div className='flex ml-4 w-full items-center'>
                {
!search && <div  className='w-[40px] h-[40px] shadow-lg shadow-gray-500 bg-white rounded-full mr-5  overflow-hidden flex justify-center items-center'>{<IoIosSearch onClick={()=>setSearch(true)} className='text-3xl cursor-pointer'/>}</div>
                }
                {
                  search && 
                  <form className='w-[30px] mt-[10px] rounded-full overflow-hidden px-[20px] h-[30px] bg-white shadoww-gray-500 shadow-lg flex items-center gap-[10px]'>
                    <IoIosSearch className='text-3xl cursor-pointer'/>
                    <input type="text" placeholder='search users...' className='w-full h-full outlin-0 border-0'/>
                    <RxCross2 onClick={()=>setSearch(!search)} className='text-3xl cursor-pointer'/>
                  </form>
                }
                    {
                      otherUsers?.map((user)=>(
                         <div className='h-[30px] w-[30px] shadow-lg shadow-gray-500 rounded-full mr-5  overflow-hidden flex justify-center items-center'>{user.image}</div>
                      ))
                    }
                
              </div>
                 


        </div>
    </div>
  )
}

export default Sidebar