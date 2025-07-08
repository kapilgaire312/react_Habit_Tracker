import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function RedirectStart() {

  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login')

  }, [])


}

export default RedirectStart