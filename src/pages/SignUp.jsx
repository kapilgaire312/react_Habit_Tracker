import Login from "../Components/Login"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



function SignUp({ users, setUsers }) {
  const navigate = useNavigate();

  function signUp(email, pass, first, last, confirmPass) {
    if (email.trim() === '' || pass === '' || first.trim() === '' || last.trim() === '') {
      return 'Input all the fields!'

    }
    if (pass != confirmPass) {
      return "Passwords don't match!"
    }
    const user = {
      email,
      pass,
      name: {
        first,
        last
      }
    }
    setUsers([...users, user])
    navigate('/login')
    return 'sucess'

  }


  return (
    <div className="flex justify-center ">
      <div className="border-2 m-10 text-center">
        <Login isLogin={false} register={signUp} />


      </div>

    </div>
  )


}
export default SignUp