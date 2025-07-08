import Login from "../Components/Login"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function LoginPage({ users }) {
  const navigate = useNavigate();








  function checkCredentials(email, pass) {
    const user = users.filter((item) => {
      if (email.toLowerCase() === item.email && pass === item.pass) {
        console.log('correct')
        return true
      }
      else
        return false

    })
    console.log(user)
    if (user.length === 1) {

      navigate('/dashboard', { state: user[0] })
      return true
    }
    else {
      return false
    }


  }




  return (
    <div className="flex justify-center ">
      <div className="border-2 m-10 text-center">
        <Login isLogin={true} checkLogin={checkCredentials} />


      </div>

    </div>
  )

}

export default LoginPage