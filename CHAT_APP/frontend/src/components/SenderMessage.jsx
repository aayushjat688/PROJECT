// import dp from '../assets/dp.jpg'
function SenderMessage({image,message}) {

  return (
    <div className="w-fit max-w-[500px] px-[20px] py-[10px] pt-[10px] mt-[10px] bg-[#1797c2] text-white text-[19px] rounded-2xl shadow-gray-400 shadow-lg  rounded-tr-none relative right-0 ml-auto flex flex-col gap-[10px]">

    {image && <img src={image}/>}
      
      {message && <span>{message}</span>}
      
      </div>
  )
}

export default SenderMessage