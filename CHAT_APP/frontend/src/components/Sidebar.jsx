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
 
  let { userData, otherUsers, selectedUser, onlineUsers } = useSelector(state => state.user)
  let [search, setSearch] = useState(false)
  let dispatch = useDispatch();
  let Navigate = useNavigate();
 
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(setUserData(null))
      dispatch(setOtherUsers(null))
      Navigate('/login')
    } catch (err) {
      console.log(err);
    }
  }
 
  return (
    <div
      className={`lg:w-[30%] w-full h-full flex-col relative overflow-hidden bg-slate-200
        ${!selectedUser ? "flex" : "hidden"} lg:flex`}
    >
      <div className="shrink-0 w-full bg-gradient-to-br from-[#20c7ff] to-[#1797c2] rounded-b-[40px] px-5 pt-5 pb-6 flex flex-col gap-4 shadow-lg shadow-gray-400/60">
 
        <h1 className="text-white font-extrabold text-[22px] tracking-widest">CHAT_APP</h1>
 
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-gray-800 font-bold text-[19px] truncate">
            Hi, {userData.name || "user"}
          </h2>
          <div className="w-[60px] h-[60px] shrink-0 rounded-full overflow-hidden ring-4 ring-white/70 shadow-lg shadow-gray-500/60 hover:scale-105 transition">
            <img
              onClick={() => Navigate("/profile")}
              src={userData.image || dp}
              className="w-full h-full object-cover cursor-pointer"
              alt="profile pic"
            />
          </div>
        </div>
 
        <div className="flex items-center h-[44px]">
          {!search ? (
            <button
              type="button"
              onClick={() => setSearch(true)}
              className="w-[44px] h-[44px] bg-white hover:bg-gray-100 active:scale-95 transition rounded-full shadow-lg shadow-gray-500/50 flex justify-center items-center"
              aria-label="Search users"
            >
              <IoIosSearch className="text-2xl text-gray-700" />
            </button>
          ) : (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full h-[44px] px-3 bg-white rounded-full shadow-lg shadow-gray-500/50 flex items-center gap-2"
            >
              <IoIosSearch className="w-[24px] h-[24px] text-gray-500 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search users..."
                className="flex-1 min-w-0 h-full bg-transparent outline-none border-0 text-gray-700 placeholder-gray-400"
              />
              <button type="button" onClick={() => setSearch(false)} aria-label="Close search">
                <RxCross2 className="w-[22px] h-[22px] text-gray-500 hover:text-gray-800 cursor-pointer" />
              </button>
            </form>
          )}
        </div>
      </div>
 
      <div className="flex-1 overflow-y-auto px-3 pt-2 pb-[90px] flex flex-col gap-3 scrollbar-none">
        {otherUsers?.map((user) => (
          <div
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className="w-full bg-white hover:bg-sky-50 active:scale-[0.99] transition cursor-pointer rounded-full flex items-center gap-3 p-1.5 pr-4 shadow-md shadow-gray-400/50"
          >
            <div className="relative shrink-0">
              <div className="h-[50px] w-[50px] bg-gray-300 rounded-full overflow-hidden shadow-md shadow-gray-500/50">
                <img src={user.image || dp} alt="" className="w-full h-full object-cover" />
              </div>
              {onlineUsers?.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
 
            <h1 className="flex-1 min-w-0 text-gray-700 font-semibold text-[18px] truncate">
              {user.name || user.userName}
            </h1>
          </div>
        ))}
      </div>
 
      <button
        type="button"
        onClick={handleLogOut}
        aria-label="Log out"
        className="absolute bottom-5 left-4 w-[48px] h-[48px] rounded-full bg-[#20c7ff] hover:bg-[#1797c2] active:scale-95 transition shadow-lg shadow-gray-500/60 flex justify-center items-center"
      >
        <RiLogoutBoxLine className="text-2xl text-white" />
      </button>
    </div>
  )
}
 
export default Sidebar
 