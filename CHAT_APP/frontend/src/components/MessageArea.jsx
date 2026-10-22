import { IoIosArrowRoundBack } from "react-icons/io";
import dp from '../assets/dp.jpg'
import EmojiPicker from 'emoji-picker-react';
import { IoSend } from "react-icons/io5";

import { FaImages } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { useEffect, useRef, useState } from "react";
import SenderMessage from "./SenderMessage";
import RecieverMessage from './RecieverMessage';
import { serverUrl } from "../main";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";

function MessageArea() {
  let {userData,selectedUser,socket} = useSelector(state=>state.user);
  let {messages} = useSelector(state=>state.message)
  // console.log(messages)
let dispatch = useDispatch()
let [input,setInput] = useState("")
let [frontendImage,setFrontendImage]= useState(null)
let [backendImage,setBackendImage]= useState(null)
let image = useRef();
let [showPicker , setShowPicker] = useState(false)
let [loading , setLoading] = useState(false);
const handleImage = (e)=>{

  let file = e.target.files[0];
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))
}
const handleSendMessage=async(e)=>{
  setLoading(true);
  e.preventDefault(); 
  try{
    let formData = new FormData();
    formData.append("message",input)

    if(backendImage){
      formData.append("image",backendImage)
    }
// console.log(selectedUser._id);
    let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,formData,{withCredentials:true})
    // console.log(result)
    dispatch(setMessages([...messages,result.data]))
    // console.log(messages);
      setFrontendImage(null)
            setBackendImage(null)
            setInput("")
            setLoading(false)
  } catch (err){
    console.log(err);
    console.log(err.response.data);
    setLoading(false)
  }
}
useEffect(()=>{
socket.on("newMessage",(mess)=>{
  // console.log('hello i am mess',mess)
  dispatch(setMessages([...messages,mess]))
})
return ()=>socket.off("newMessage")
},[messages,setMessages])

  return (
    <div  className={`lg:w-[70%] pb-[120px] p-[20px] ${selectedUser?"block":"hidden"} lg:block overflow-auto w-full h-full border-l-2 border-gray-300 bg-slate-200 relative`}>

      {selectedUser && <div className=" w-full h-[100px] bg-[#1797c2] rounded-b-[30px] flex items-center flex-row
              shadow-gray-400 shadow-lg "> 
               <div   className='cursor-pointer'>{<IoIosArrowRoundBack onClick={()=>dispatch(setSelectedUser(null))}   className='w-[40px] h-[40px] text-white'/>}</div>
                    
                                            <div className=''>
                                               <div className='h-[50px] w-[50px] shadow-lg bg-gray-300 shadow-gray-500 rounded-full mr-5  overflow-hidden flex justify-center items-center'><img src={selectedUser?.image || dp} alt="" /></div>
                                            </div>
                                              <h1 className='text-white font-semibold text-[20px]'>{selectedUser?.name || "user"}</h1>
        </div> }
        {!selectedUser && <div className="min-h-[350px] flex items-center justify-center rounded-3xl p-10">
  <div className="text-center">
    <h1 className="text-5xl text-zinc-600 md:text-7xl font-extrabold text-white">
      Welcome to
    </h1>

    <h2 className="mt-3 text-4xl md:text-6xl font-black bg-gradient-to-r from-violet-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
      CHAT APP
    </h2>

    <p className="mt-5 text-zinc-600 text-lg max-w-xl mx-auto">
      Connect instantly with friends and enjoy seamless real-time conversations.
    </p>


  </div>
</div>}
          <div className="px-[20px] overflow-auto">
                
            {selectedUser && messages.map((mess) => (
              // console.log(mess.createdAt),
  mess.sender === userData._id
    ? <SenderMessage key={mess._id} time={mess.createdAt} image={mess.image} message={mess.message} />
    : <RecieverMessage key={mess._id} time={mess.createdAt} image={mess.image} message={mess.message} />
))
}
               {
                showPicker && <div className="mb-[-400px]"><EmojiPicker width={250} height={350}  onEmojiClick={(emojiData) =>{ setInput(prevInput=>prevInput+emojiData.emoji) 
                  setShowPicker(false)}
                } />

                </div>
               }  
          </div>
          {selectedUser && 
          <div className="w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex justify-center items-center" >
            <img className="w-[100px] absolute bottom-[100px] right-[20%] shadow-gray-400 shadow-lg" src={frontendImage} alt="" />
            <form onSubmit={handleSendMessage} className="w-[95%] max-w-[70%] bg-[#1797c2] h-[60px] flex items-center gap-[10px] p-4 rounded-full">
              
            <div className="fixed" onClick={()=>setShowPicker(prev=>!prev)} >
              <MdEmojiEmotions className="w-[25px] h-[25px] cursor-pointer text-white"/>
               
            </div>
            <input type="file" accept="/*" hidden ref={image} onChange={handleImage}/>
            <input onChange={(e)=>setInput(e.target.value)} value={input} placeholder="Message" type="text" className="w-full pl-8 h-full px-2 text-white border-0  placeholder-white"/>
          
            <div>
              <FaImages onClick={()=>image.current.click()} className="w-[25px] h-[25px] text-white cursor-pointer"/>
            </div>
            <button disabled={loading}>
              <IoSend  className="w-[25px] h-[25px] text-white cursor-pointer" />
            </button>
            </form>
          </div>
}
    </div>
          
  )
}
export default MessageArea