import NavBar from "../Components/NavBar"
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

function Dashboard({ currentUserSet }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [checkAuth, setCheckAuth] = useState(true)






  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    if (location.state) {

      localStorage.setItem('currentUser', JSON.stringify(location.state));
      currentUserSet(true)
      setCheckAuth(false)

    } else if (!storedUser) {
      navigate('/login');
    }
    else {
      setCheckAuth(false);  // usser is already autheticated, like in case of reloading.

    }
  }, [location.state]);

  if (checkAuth) return null;   // return nothing until the checkauth is done and , it is set false when the state is identified.

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )

}
export default Dashboard