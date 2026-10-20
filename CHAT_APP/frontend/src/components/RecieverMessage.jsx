// import dp from '../assets/dp.jpg'
function RecieverMessage({time,image,message}) {
  const formattedTime = time
    ? new Date(time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true })
    : "";
     return (
         <div className="w-fit max-w-[500px] px-[20px] py-[10px] pt-[10px] mt-[10px] bg-[#1797c2] text-white text-[19px] rounded-2xl shadow-gray-400 shadow-lg  rounded-tl-none relative right-0 mr-auto flex flex-col gap-[10px]">

    {image && <img src={image}/>}
      
      {message && <span>{message}</span>}
         <span className="text-[11px] text-white/70 self-end leading-none">{formattedTime}</span>
      </div>
      )
  
}

export default RecieverMessage