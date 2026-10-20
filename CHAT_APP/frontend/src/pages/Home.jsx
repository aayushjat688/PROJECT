
import MessageArea from '../components/MessageArea';
import useGetMessages from '../customHooks/useGetMessages';
import Sidebar from './../components/Sidebar';
function Home() {
  useGetMessages();
  return (
    <div className='w-full h-[100vh] flex'>
      <Sidebar />
      <MessageArea />
    </div>
  )
}

export default Home