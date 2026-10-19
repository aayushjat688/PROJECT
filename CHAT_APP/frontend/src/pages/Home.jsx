
import MessageArea from '../components/MessageArea';
import Sidebar from './../components/Sidebar';
function Home() {
  return (
    <div className='w-full h-[100vh] flex'>
      <Sidebar />
      <MessageArea />
    </div>
  )
}

export default Home