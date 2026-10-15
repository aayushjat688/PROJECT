import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { serverUrl } from "../main";
import axios from "axios";
function Login() {
    let navigate = useNavigate();
  let [email,setEmail] = useState("");
  let [password,setPassword] = useState("");

  const handleLogin = async(e)=>{
e.preventDefault();
    try{
      let result = await axios.post(`${serverUrl}/api/auth/login`,{
        email,password
       },{withCredentials:true})
       console.log(result);
       setEmail("")
      setPassword("")

    }   catch (err) {
  console.log("Error:", err);
  console.log("Message:", err.message);
  console.log("Response:", err.response);
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
            <form onSubmit={handleLogin}  className="w-full flex flex-col items-center mt-3 gap-[20px]">

        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="w-[90%] h-[60px] cursor-pointer
        outline-none border-2 hover:shadow-inner border-[#20c7ff] px-[20px] py-[10px] bg-white
        rounded-lg hadow-gray-400 shadow-lg text-gray-700 text-[19px]"/>

        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="w-[90%] h-[60px] cursor-pointer
        outline-none border-2 hover:shadow-inner border-[#20c7ff] px-[20px] py-[10px] bg-white
        rounded-lg hadow-gray-400 shadow-lg text-gray-700 text-[19px]"/>
        <button className="px-[20px] w-[200px] cursor-pointer mt-4 py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-300 shadow-lg
        hover:shadow-inner">login</button>

        <p onClick={()=>navigate('/signup')} className="cursor-pointer">Already have an Account ? <span className="text-[#20c7ff] text-[semibold]">Signup</span></p>
      </form>
      </div>
  
    </div>
  )
}

export default Login