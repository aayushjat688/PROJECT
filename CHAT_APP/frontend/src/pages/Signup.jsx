import { useNavigate } from "react-router-dom"
import { serverUrl } from "../main";
import axios from 'axios'

import { useState } from "react";
function Signup() {
let navigate = useNavigate();
let [userName , setUserName] = useState("");
let [email , setEmail] = useState("");
let [password , setPassword] = useState("");
let [loading,setLoading]=useState(false);
  let[err,setErr] = useState("");
const handleSignUp = async (e)=>{
  e.preventDefault();
  setLoading(true);
  try{

       let result = await axios.post(`${serverUrl}/api/auth/signup`,{
        userName,email,password
       },{withCredentials:true})
       console.log(result);
       setUserName("")
       setEmail("")
      setPassword("")
      setLoading(false);
  } 
  catch (err) {
    
  console.log("Error:", err);
  console.log("Message:", err.message);
  console.log("Response:", err.response);
  setErr(err.response.data.message)
  setLoading(false);
  if(err.response.status==500){
      setErr('Check Internet connection')
      
    }
}

}
   return (
    <div className="w-full h-[100vh] bg-slate-200 flex flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg
      shadow-gray-400 shadow-lg">
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] flex items-center justify-center
        shadow-gray-400 shadow-lg ">
          <h1 className="text-gray-600 font-bold text-[30px]">Welcome to <span className="text-white">Chat APP</span></h1>
        </div>
            <form className="w-full flex flex-col items-center mt-3 gap-[20px]" onSubmit={handleSignUp} >
        <input type="text" onChange={(e)=>setUserName(e.target.value)} value={userName} placeholder="username" className="w-[90%] h-[60px] cursor-pointer
        outline-none border-2 border-[#20c7ff] hover:shadow-inner px-[20px] py-[10px] bg-white
        rounded-lg hadow-gray-400 shadow-lg text-gray-700 text-[19px]"/>

        <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="email" className="w-[90%] h-[60px] cursor-pointer
        outline-none border-2 hover:shadow-inner border-[#20c7ff] px-[20px] py-[10px] bg-white
        rounded-lg hadow-gray-400 shadow-lg text-gray-700 text-[19px]"/>

        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="password" className="w-[90%] h-[60px] cursor-pointer
        outline-none border-2 hover:shadow-inner border-[#20c7ff] px-[20px] py-[10px] bg-white
        rounded-lg hadow-gray-400 shadow-lg text-gray-700 text-[19px]"/>
        {err && <p className="text-center text-red-500">{err}</p>}
        <button className="px-[20px] w-[200px] cursor-pointer mt-4 py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-300 shadow-lg
        hover:shadow-inner" disabled={loading}>{loading ? "Loading...":"Sign up"}</button>

        <p onClick={()=>navigate('/login')} className="cursor-pointer">Already have an Account ? <span className="text-[#20c7ff] text-[semibold]">Login</span></p>
      </form>
      </div>
  
    </div>
  )
}

export default Signup