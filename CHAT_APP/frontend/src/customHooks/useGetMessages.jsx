import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        // console.log(selectedUser);

        const result = await axios.get(
          `${serverUrl}/api/message/get/${selectedUser._id}`,
          { withCredentials: true }
        );
          console.log(result)
        dispatch(setMessages(result.data));
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);
};

export default useGetMessages;