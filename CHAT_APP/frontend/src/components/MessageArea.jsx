import { IoIosArrowRoundBack } from "react-icons/io";
import dp from '../assets/dp.jpg'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
function MessageArea() {
let {selectedUser}= useSelector(state=>state.user)
let dispatch = useDispatch()
  return (
    <div className={`lg:w-[70%] p-[20px] ${selectedUser?"flex":"hidden"} lg:block w-full h-full border-l-2 border-gray-300 bg-slate-200`}>
      {selectedUser && <div className="w-full h-[100px] bg-[#1797c2] rounded-b-[30px] flex items-center flex-row
              shadow-gray-400 shadow-lg "> 
               <div   className='cursor-pointer'>{<IoIosArrowRoundBack onClick={()=>dispatch(setSelectedUser(null))}   className='w-[40px] h-[40px] text-white'/>}</div>
                    
                                            <div className=''>
                                               <div className='h-[50px] w-[50px] shadow-lg bg-gray-300 shadow-gray-500 rounded-full mr-5  overflow-hidden flex justify-center items-center'><img src={selectedUser?.image || dp} alt="" /></div>
                                            </div>
                                              <h1 className='text-white font-semibold text-[20px]'>{selectedUser?.name || "user"}</h1>
        </div> }
        {!selectedUser && <div class="min-h-[350px] flex items-center justify-center rounded-3xl p-10">
  <div class="text-center">
    <h1 class="text-5xl text-zinc-600 md:text-7xl font-extrabold text-white">
      Welcome to
    </h1>

    <h2 class="mt-3 text-4xl md:text-6xl font-black bg-gradient-to-r from-violet-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
      CHAT APP
    </h2>

    <p class="mt-5 text-zinc-600 text-lg max-w-xl mx-auto">
      Connect instantly with friends and enjoy seamless real-time conversations.
    </p>


  </div>
</div>}
           
    </div>
  )
}
export default MessageArea