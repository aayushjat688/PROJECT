import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch } from "react-redux"
import { setOtherUsers } from "../redux/userSlice"

const useGetOtherUsers = ()=>{
  let dispatch = useDispatch();
  // let {userData} = useSelector(state=>state.user)
  useEffect(()=>{ 
    const fetchUser = async ()=>{
      try{
        let result = await axios.get(`${serverUrl}/api/user/others`,
          {withCredentials:true})
          console.log(result.data)
        dispatch(setOtherUsers(result.data));
      } catch (err) {
          console.log(err);    
      }
    }
    fetchUser()
  },[])
}
export default useGetOtherUsers;