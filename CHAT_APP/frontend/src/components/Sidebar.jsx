
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { RiLogoutBoxLine } from "react-icons/ri";
import dp from '../assets/dp.jpg'
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';
import { serverUrl } from '../main';
import axios from 'axios';
import { setOtherUsers, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
function Sidebar() {
  
  let {userData,otherUsers,selectedUser} = useSelector(state=>state.user)
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
    <div className={`lg:w-[30%] ${!selectedUser?"block":"hidden"} w-full lg:block h-full overflow-hidden  bg-slate-200`}>
     
      <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] flex flex-col justify-center
        shadow-gray-400 shadow-lg ">  <div onClick={handleLogOut}  className='w-[40px] h-[40px] shadow-lg shadow-gray-500 fixed bottom-[30px] left-[15px]  rounded-full   overflow-hidden bg-[#20c7ff] flex justify-center items-center'>{<RiLogoutBoxLine className='text-3xl cursor-pointer'/>}</div>
          <div>
            <h1 className='text-white font-bold text-[19px] px-[20px]'>CHAT_APP</h1>
          </div>
          <div className='flex flex-row items-center justify-between'>
              <h1 className='text-gray-700 font-bold text-[19px] px-[20px]'>Hi , {userData.name || "user"}</h1>
            <div className='w-[60px] h-[60px] shadow-lg shadow-gray-500 rounded-full mr-5  overflow-hidden flex justify-center items-center'><img onClick={()=>Navigate("/profile")} src={userData.image || dp}  className="h-[100%] overflow-hidden rounded-full cursor-pointer" alt="profile pic" /></div>
          </div>
              <div className='flex ml-4 w-full '>
                {
!search && <div  className='w-[40px] h-[40px] hover:bg-gray-200 shadow-lg shadow-gray-500 bg-white rounded-full mr-5  overflow-hidden flex justify-center items-center'>{<IoIosSearch onClick={()=>setSearch(true)} className='text-3xl cursor-pointer'/>}</div>
                }
                
                  
                
                {
                  search && 
                  <form className='max-w-[80%] mt-[10px] rounded-full px-[5%] h-[40px] bg-white shadoww-gray-500 shadow-lg flex items-center gap-[10px]'>
                    <IoIosSearch className='w-[30px] h-[30px] cursor-pointer'/>
                    <input type="text" placeholder='search users...' className=' outlin-0 border-0'/>
                    <RxCross2 onClick={()=>setSearch(!search)} className='w-[30px] h-[30px] cursor-pointer'/>
                  </form>
                }
                    
                
              </div>
                 
                

        </div>

               <div className='flex w-[full] h-[60vh] overflow-auto flex-col '>
                {
                     otherUsers?.map((user)=>(
                      <div key={user._id} onClick={()=>dispatch(setSelectedUser(user))} className='w-[95%] bg-white shadow-gray-500 shadow-lg hover:bg-gray-200 cursor-pointer rounded-full flex items-center mt-[20px]'>
                         <div className='h-[50px] w-[50px] shadow-lg bg-gray-300 shadow-gray-500 rounded-full mr-5  overflow-hidden flex justify-center items-center'><img src={user.image || dp} alt="" /></div>
                         <h1 className='text-gray-600 font-semibold text-[20px]'>{user.name || user.userName}</h1>
                      </div>))
                    }     
                </div>
    </div>
  )
}

export default Sidebar