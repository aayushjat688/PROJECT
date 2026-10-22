import { useEffect, useRef } from "react";

function SenderMessage({ time, image, message }) {
  let scroll = useRef();
  useEffect(()=>{
      scroll.current.scrollIntoView({behavior:"smooth"})
  },[time])
  const formattedTime = time
    ? new Date(time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true })
    : "";
  const handleImageScroll = ()=>{
scroll.current.scrollIntoView({behavior:"smooth"})
  }
  return (
    <div className="w-fit max-w-[75%] md:max-w-[500px] px-[14px] py-[8px] mt-[10px] bg-[#1797c2] text-white text-[17px] rounded-2xl rounded-tr-none shadow-md ml-auto flex flex-col gap-[6px]">
      {image && (
        <img onLoad={handleImageScroll} src={image} alt="sent" className="max-w-[260px] max-h-[300px] w-full object-cover rounded-xl" />
      )}
      {message && <span className="break-words">{message}</span>}
      <span ref={scroll} className="text-[11px] text-white/70 self-end leading-none">{formattedTime}</span>
    </div>
  );
}

export default SenderMessage;