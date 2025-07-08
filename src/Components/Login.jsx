import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Login({ isLogin, checkLogin, register }) {
  const [loginValues, setLoginValues] = useState({ email: '', pass: '' })
  const [message, setMessage] = useState('')
  const [signUpInfo, setSignUpInfo] = useState({ name: { first: '', last: '' }, pass: '' })

  function submission() {
    if (isLogin) {
      const isCorrect = checkLogin(loginValues.email, loginValues.pass);
      isCorrect ? setMessage('') : setMessage('Incorrect email or password!')


    }
    else {
      const message = register(loginValues.email, loginValues.pass, signUpInfo.name.first, signUpInfo.name.last, signUpInfo.pass)
      setMessage(message)
    }
  }



  return (
    <div>
      <h1 className="text-2xl font-bold p-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submission}>

        <div className="flex flex-col">
          {isLogin ? null : <input placeholder="First Name" className="border-2 p-1 mx-8 my-4 " onChange={(e) => { setSignUpInfo({ ...loginValues, name: { ...signUpInfo.name, first: e.target.value } }) }} />}
          {isLogin ? null : <input placeholder="Last Name" className="border-2 p-1 mx-8 my-4 " onChange={(e) => { setSignUpInfo({ ...loginValues, name: { ...signUpInfo.name, last: e.target.value } }) }} />}

          <input value={loginValues.email} placeholder="Email" className="border-2 p-1 mx-8 my-4 " onChange={(e) => { setLoginValues({ ...loginValues, email: e.target.value }) }} />
          <input value={loginValues.pass} placeholder="Password" className="border-2 p-1 mx-8 my-4 " type="password" onChange={(e) => { setLoginValues({ ...loginValues, pass: e.target.value }) }} />
          {isLogin ? null : <input value={signUpInfo.pass} placeholder="Confirm Password" className="border-2 p-1 mx-8 my-4 " type="password" onChange={(e) => { setSignUpInfo({ ...signUpInfo, pass: e.target.value }) }} />}

        </div>
        <p className='text-red-400 text-xs mb-2 '>{message}</p>
        <button className=" p-1 px-2 bg-blue-400 mb-4 hover:opacity-80">{isLogin ? 'Login' : 'Sign Up'}</button>


      </form>
      <div className="my-3">
        {isLogin ? <p className="opacity-50 text-xs "> Not a member? <Link to='/signup' className='underline'>Sign up now</Link></p> : <p className="opacity-50 text-xs "> Already a member?<Link to='/login'>Login</Link></p>}
      </div>
    </div>
  )

}

export default Login