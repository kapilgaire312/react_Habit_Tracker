import { useState, useEffect } from 'react'

import './App.css'
import LoginPage from './pages/LoginPage'
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import RedirectStart from './Hooks/RedirectStart.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import MyHabits from './pages/MyHabits.jsx'
import AddHabits from './pages/AddHabits.jsx'
function App() {
  const [userHabits, setUserHabits] = useState([])
  const [currentUser, setCurrentUser] = useState([])
  const [isCurrentUserSet, setIsCurrentUserSet] = useState(false)


  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [{
    email: 'kapilgaire312@gmail.com',
    pass: 'kap123',
    name: {
      first: 'Kapil',
      last: 'Gaire'
    }
  }]
  )

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currUser) {

      setCurrentUser(currUser)
      let mailId = getTrimmedMail(currUser.email)

      const currentUserHabits = JSON.parse(localStorage.getItem(`userHabits_${mailId}`)) || []

      setUserHabits(currentUserHabits)

    }
  }, [isCurrentUserSet])

  useEffect(() => {

    let mailId = getTrimmedMail(currentUser.email)

    localStorage.setItem(`userHabits_${mailId}`, JSON.stringify(userHabits))
  }, [userHabits])


  function getTrimmedMail(email) {
    let newId = ''
    for (let i = 0; i < email?.length; i++) {
      if (email[i] != '@') {
        newId += email[i]
      }
      else return newId
    }
    return newId

  }




  function addHabit(habit, goal) {
    if (habit.trim() === '' || goal === '') {
      alert('Input both fields!')
      return
    }
    if (goal < 0 || goal > 7) {
      alert('Add a realistic goal!')
      return
    }
    const date = new Date()


    const habitToAdd = {
      habit,
      goal,
      completionDays: [],
      failedDays: [],
      addedDate: {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      }
    }

    setUserHabits([...userHabits, habitToAdd])




  }

  function removeHabit(id) {

    const newHabits = userHabits.filter((item, index) => {

      if (Number(id) === index) {


        return false
      }
      else {

        return true
      }

    })
    setUserHabits(newHabits);

  }
  function handleCompletion(habitIndex, weekIndex, today) {
    let markedDate;
    let isSelected = false
    let isInvalid = false
    const updatedHabits = userHabits.map((item, index) => {
      if (habitIndex === index) {
        if (weekIndex === today.weekDay) {
          markedDate = today.day
        }
        else if (weekIndex < today.weekDay) {

          let todayWeekIndex = today.weekDay;
          let todayDay = today.day
          while (weekIndex != todayWeekIndex) {

            todayWeekIndex--;
            todayDay--;

          }
          markedDate = todayDay;
        }
        else {
          isInvalid = true
          return item
        }

        if (markedDate < item.addedDate.day) {
          isInvalid = true
          return item
        }
        const completedArray = item.completionDays;
        let isAlreadyThere = false
        let newCompletedArray = completedArray?.filter((arrItem) => {
          if (markedDate === arrItem) {
            isSelected = false
            isAlreadyThere = true
            return false


          }
          else return true
        })

        if (!isAlreadyThere) {
          completedArray?.push(markedDate)
          newCompletedArray = completedArray;
          isSelected = true
        }
        return { ...item, completionDays: newCompletedArray }


      }
      else {
        return item
      }
    })

    setUserHabits(updatedHabits);
    return { isSelected, isInvalid };


  }



  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<RedirectStart />} />
          <Route path='/login' element={<LoginPage users={users} />} />
          <Route path='/signup' element={<SignUp users={users} setUsers={setUsers} />} />
          <Route path='/dashboard' element={<Dashboard currentUserSet={setIsCurrentUserSet} />}>
            <Route index element={<Home currentHabits={userHabits} user={currentUser} handleCompleted={handleCompletion} />} />
            <Route path='myhabits' element={<MyHabits currentHabits={userHabits} remove={removeHabit} setCurrentHabits={setUserHabits} />} />
            <Route path='addhabits' element={<AddHabits habitAdd={addHabit} />} />
          </Route>

        </Routes>



      </HashRouter>



    </>
  )
}

export default App
