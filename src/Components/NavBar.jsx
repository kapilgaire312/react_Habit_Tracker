import { Link, useParams, useLocation } from 'react-router-dom'
import exit from '../assets/exit-logout.png'
import { useState } from 'react'
function NavBar() {

  const location = useLocation()
  const [selected, setSelected] = useState(location.pathname)




  return (<>

    <nav className='flex justify-between px-2 bg-green-400 px-[10%]'>
      <Link to='/dashboard' className={`border-2 ${selected === '/dashboard' ? 'bg-gray-200' : 'bg-blue-300'}  px-2 py-1`} onClick={(e) => { setSelected('/dashboard') }}>Home</Link>

      <Link to='myHabits' className={`border-2 ${selected === '/dashboard/myHabits' ? 'bg-gray-200' : 'bg-blue-300'}  px-2 py-1`} onClick={(e) => { setSelected('/dashboard/myHabits') }}>My Habits</Link>
      <Link to='addHabits' className={`border-2 ${selected === '/dashboard/addHabits' ? 'bg-gray-200' : 'bg-blue-300'}  px-2 py-1`} onClick={(e) => { setSelected('/dashboard/addHabits') }}>Add Habits</Link>


    </nav>
    <Link to='/login' className=' px-2 py-1 absolute right-0 top-0' onClick={() => { localStorage.removeItem('currentUser'); window.location.reload(); }}><img src={exit} className='h-8 pl-6 '></img></Link>


  </>

  )
}
export default NavBar