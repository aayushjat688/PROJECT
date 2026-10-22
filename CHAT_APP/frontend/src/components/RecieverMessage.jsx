import { useEffect, useRef } from "react";

// import dp from '../assets/dp.jpg'
function RecieverMessage({time,image,message}) {
  let scroll = useRef();
  useEffect(()=>{
scroll.current.scrollIntoView({behavior:"smooth"})
  },[time])
  const handleImageScroll = ()=>{
scroll.current.scrollIntoView({behavior:"smooth"})
  }
  const formattedTime = time
    ? new Date(time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true })
    : "";
     return (
         <div className="w-fit max-w-[75%] md:max-w-[500px] px-[14px] py-[8px] mt-[10px] bg-sky-400 text-white text-[17px] rounded-2xl rounded-tl-none shadow-md mr-auto flex flex-col gap-[6px]">

    {image  && <img onLoad={handleImageScroll} src={image}/>}
      
      {message && <span>{message}</span>}
         <span ref={scroll} className="text-[11px] text-white/70 self-end leading-none">{formattedTime}</span>
      </div>
      )
  
}

export default RecieverMessage