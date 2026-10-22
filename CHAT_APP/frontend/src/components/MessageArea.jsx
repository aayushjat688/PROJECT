

import { IoIosArrowRoundBack } from "react-icons/io";
import dp from '../assets/dp.jpg'
import EmojiPicker from 'emoji-picker-react';
import { IoSend } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import { MdEmojiEmotions, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { useEffect, useRef, useState } from "react";
import SenderMessage from "./SenderMessage";
import RecieverMessage from './RecieverMessage';
import { serverUrl } from "../main";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";
 
function MessageArea() {
  let { userData, selectedUser, socket } = useSelector(state => state.user);
  let { messages } = useSelector(state => state.message)
  let dispatch = useDispatch()
  let [input, setInput] = useState("")
  let [frontendImage, setFrontendImage] = useState(null)
  let [backendImage, setBackendImage] = useState(null)
  let image = useRef();
  let bottomRef = useRef(null);
  let [showPicker, setShowPicker] = useState(false)
  let [loading, setLoading] = useState(false);
 
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (!file) return;
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
 
  const removeImage = () => {
    setFrontendImage(null)
    setBackendImage(null)
    if (image.current) image.current.value = ""
  }
 
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && !backendImage) return;
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("message", input)
      if (backendImage) {
        formData.append("image", backendImage)
      }
      let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData, { withCredentials: true })
      dispatch(setMessages([...messages, result.data]))
      removeImage()
      setInput("")
      setShowPicker(false)
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
    } finally {
      setLoading(false)
    }
  }
 
  useEffect(() => {
    socket.on("newMessage", (mess) => {
      dispatch(setMessages([...messages, mess]))
    })
    return () => socket.off("newMessage")
  }, [messages, setMessages])
 

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, selectedUser])
 
  return (
  
    <div
      className={`lg:w-[70%] w-full h-full flex-col relative border-l-2 border-gray-300 bg-slate-200 overflow-hidden
        ${selectedUser ? "flex" : "hidden"} lg:flex`}
    >
   
      {selectedUser && (
        <div className="sticky top-0 z-20 shrink-0 w-full h-[60px] md:h-[90px] px-3 bg-[#1797c2] rounded-b-[30px] flex items-center gap-3 shadow-lg shadow-gray-400/60">
          <button
            type="button"
            onClick={() => dispatch(setSelectedUser(null))}
            className="cursor-pointer rounded-full hover:bg-white/20 active:scale-95 transition"
            aria-label="Back"
          >
            <IoIosArrowRoundBack className="w-[40px] h-[40px] text-white" />
          </button>
 
          <div className="h-[50px] w-[50px] shrink-0 shadow-lg shadow-gray-500/60 bg-gray-300 rounded-full overflow-hidden flex justify-center items-center ring-2 ring-white/60">
            <img src={selectedUser?.image || dp} alt="" className="w-full h-full object-cover" />
          </div>
 
          <h1 className="text-white font-semibold text-[20px] truncate">
            {selectedUser?.name || "user"}
          </h1>
        </div>
      )}
 

      {!selectedUser && (
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-600">
              Welcome to
            </h1>
            <h2 className="mt-3 text-4xl md:text-6xl font-black bg-gradient-to-r from-violet-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              CHAT APP
            </h2>
            <p className="mt-5 text-zinc-600 text-lg max-w-xl mx-auto">
              Connect instantly with friends and enjoy seamless real-time conversations.
            </p>
          </div>
        </div>
      )}
 
  
      {selectedUser && (
        <div className="flex-1 overflow-y-auto scroll-smooth px-3 md:px-6 py-4 flex flex-col gap-2 scrollbar-thin">
          {messages.map((mess) => (
            mess.sender === userData._id
              ? <SenderMessage key={mess._id} time={mess.createdAt} image={mess.image} message={mess.message} />
              : <RecieverMessage key={mess._id} time={mess.createdAt} image={mess.image} message={mess.message} />
          ))}
          <div ref={bottomRef} />
        </div>
      )}
 
      {selectedUser && (
        <div className="shrink-0 relative w-full px-3 pb-4 pt-2 flex justify-center items-center">
  
          {showPicker && (
            <div className="absolute bottom-[85px] left-4 z-30 shadow-xl rounded-xl">
              <EmojiPicker
                width={280}
                height={350}
                onEmojiClick={(emojiData) => {
                  setInput(prev => prev + emojiData.emoji)
                  setShowPicker(false)
                }}
              />
            </div>
          )}

          {frontendImage && (
            <div className="absolute bottom-[85px] right-6 z-30">
              <img className="w-[100px] rounded-lg shadow-lg shadow-gray-400" src={frontendImage} alt="" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-white rounded-full shadow p-0.5"
                aria-label="Remove image"
              >
                <MdClose className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          )}
 
          <form
            onSubmit={handleSendMessage}
            className="w-full max-w-3xl bg-[#1797c2] h-[60px] flex items-center gap-3 px-4 rounded-full shadow-lg shadow-gray-400/60"
          >
            <button type="button" onClick={() => setShowPicker(prev => !prev)} aria-label="Emoji">
              <MdEmojiEmotions className="w-[25px] h-[25px] cursor-pointer text-white hover:scale-110 transition" />
            </button>
 
            <input type="file" accept="image/*" hidden ref={image} onChange={handleImage} />
 
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Message"
              type="text"
              className="flex-1 min-w-0 h-full bg-transparent px-2 text-white outline-none border-0 placeholder-white/80"
            />
 
            <button type="button" onClick={() => image.current.click()} aria-label="Attach image">
              <FaImages className="w-[25px] h-[25px] text-white cursor-pointer hover:scale-110 transition" />
            </button>
 
            <button type="submit" disabled={loading} className="disabled:opacity-50" aria-label="Send">
              <IoSend className="w-[25px] h-[25px] text-white cursor-pointer hover:scale-110 transition" />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
export default MessageArea