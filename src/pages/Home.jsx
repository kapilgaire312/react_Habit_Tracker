import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react'


function Home({ currentHabits, user, handleCompleted, setCurrentHabits }) {
  // const date = new Date(2025, 7, 20) // gives the last day of previous month and month is 0 based index
  // console.log(date.getDay()) gives weeks days in 0 index oredr

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const todayDay = getToday().weekDay
  const today = getToday();


  const [dates, setDates] = useState(getDates())
  const [selectedMonthLeft, setSelectedMonthLeft] = useState(today.month)
  const [selectedMonthRight, setSelectedMonthRight] = useState(today.month)
  const [topMessage, setTopMessage] = useState('');
  const [isPresentWeekSelected, setIsPresentWeekSelected] = useState(true)
  const [currWeekCompDates, setCurrWeekCompDates] = useState([currentHabits.map((item) => { return item.completionDays })])



  useEffect(() => {
    setInitialSelectedMonth()

  }, [])


  function setInitialSelectedMonth() {
    if (today.day > 20) {
      setSelectedMonthLeft(today.month)
      if (dates[6] < 7) {
        setSelectedMonthRight(today.month + 1)
      }
      else {
        setSelectedMonthRight(today.month)
      }

    }
    else if (today.day < 7) {
      setSelectedMonthRight(today.month)
      if (dates[0] > 20) {
        setSelectedMonthLeft(today.month - 1)
      }
      else {
        setSelectedMonthLeft(today.month)
      }
    }
    else {

      setSelectedMonthLeft(today.month)
      setSelectedMonthRight(today.month)
    }

  }



  function getDates() {
    const today = getToday();


    let dates = []
    let count = 0;

    let todayDay = today.day
    for (let i = today.weekDay; i > -1; i--) {


      if (todayDay - count < 1) {
        todayDay = getTotalDays(today.month) + 1

      }
      dates[i] = todayDay - count;
      count += 1;

    }
    count = 1
    todayDay = today.day
    for (let i = today.weekDay + 1; i < 7; i++) {


      if (todayDay + count > getTotalDays(today.month + 1)) {
        todayDay = 1
        count = 0
      }

      dates[i] = todayDay + count;
      count += 1;

    }


    return dates

  }



  function getToday() {
    const date = new Date();
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      weekDay: date.getDay()

    }

  }

  function getTotalDays(month) {
    const today = getToday();
    const date = new Date(today.year, month, 0);
    const totaldays = date.getDate()



    return totaldays

  }


  function handleChangeDates(val) {


    const newDates = []
    let updatedDates = []

    if (val === 'pre') {
      let firstDay = dates[0]
      let count = 7
      if (selectedMonthLeft != selectedMonthRight) {
        setSelectedMonthRight(selectedMonthLeft);
      }
      while (count) {
        firstDay--;
        if (firstDay < 1) {
          if (count === 7) {
            setSelectedMonthRight(selectedMonthRight - 1);
          }


          const preMonthDays = getTotalDays(selectedMonthRight)
          firstDay = preMonthDays;
          setSelectedMonthLeft(selectedMonthLeft - 1)

        }
        newDates.push(firstDay);

        count--;


      }

      while (newDates.length) {
        updatedDates.push(newDates.pop())
      }


    }
    else if (val === 'next') {
      let lastDay = dates[6]
      let count = 7

      if (selectedMonthLeft != selectedMonthRight) {
        setSelectedMonthLeft(selectedMonthRight);
      }


      const thisMonthDays = getTotalDays(selectedMonthLeft + 1)
      while (count) {

        lastDay++;
        if (lastDay > thisMonthDays) {
          if (count === 7) {
            setSelectedMonthLeft(selectedMonthLeft + 1);
          }
          setSelectedMonthRight(selectedMonthRight + 1)


          lastDay = 1;

        }
        newDates.push(lastDay);

        count--;


      }
      updatedDates = newDates




    }

    setDates(updatedDates)




  }


  function handleReload(completedDays, dateToCheck) {
    const isTrue = completedDays?.filter((item) => {
      if (item === dateToCheck) {

        return true

      }
      else return false

    })

    if (isTrue?.length) {

      return true
    }
    return false

  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTopMessage('')

    }, 1000)
    return (() => { clearTimeout(timeout) })

  }, [topMessage])


  function storeCompletedDates() {
    let completedArr;
    const storeName = `${user?.name?.first}${months[selectedMonthLeft]}_${dates[0]}_${months[selectedMonthRight]}_${dates[6]}`

    let isPresentWeek = false
    console.log(dates)
    dates.map((item) => {
      console.log(item === today.day)

      if ((item === today.day) && (selectedMonthLeft === today.month || selectedMonthRight === today.month)) {
        isPresentWeek = true

      }


    })


    if (isPresentWeek) {
      completedArr = currentHabits.map((item) => {


        return item.completionDays

      })


    }
    else {
      console.log('not current week')

      const stored = localStorage.getItem(storeName);
      console.log(stored)
      completedArr = stored ? JSON.parse(stored) : [];

    }



    localStorage.setItem(storeName, JSON.stringify(completedArr))
    console.log(completedArr)
    setCurrWeekCompDates(completedArr)

  }
  useEffect(() => {
    storeCompletedDates();

  }, [dates, currentHabits])

  useEffect(() => {
    let isPresentWeek = false
    dates.map((item) => {
      console.log(item === today.day)

      if ((item === today.day) && (selectedMonthLeft === today.month || selectedMonthRight === today.month)) {
        isPresentWeek = true

      }


    })

    setIsPresentWeekSelected(isPresentWeek)
    // storeCompletedDates();



  }, [dates])


  function completedHandle(e, index, dayIndex, today, date) {

    if (isPresentWeekSelected) {
      const { isSelected, isInvalid } = handleCompleted(index, dayIndex, today);
      isSelected ? e.target.classList.add('bg-green-300') : e.target.classList.remove('bg-green-300');
      isInvalid ? setTopMessage('Cannot mark days in future or before the habit was added.') : setTopMessage('')
    }


  }

  useEffect(() => {
    console.log(currWeekCompDates)
  }, [currWeekCompDates])

  useEffect(() => {
    let newHabits
    const storeName = `is_adjusted_${user?.name?.first}_${months[selectedMonthLeft]}_${dates[0]}_${months[selectedMonthRight]}_${dates[6]}`

    if (isPresentWeekSelected) {

      if (today.day === dates[0]) {
        const value = localStorage.getItem(storeName) || ''
        if (value === '') {
          console.log('not updated')
          newHabits = currentHabits.map((item) => {
            return ({ ...item, completionDays: [] })


          })
          setCurrentHabits(newHabits)
          localStorage.setItem(storeName, 'updated')

        }
      }
    }
  }, [])




  return (
    <div>
      {topMessage && <div className='flex  justify-center absolute top-0 sm:left-[40%]  left-[20%] bg-gray-600 rounded fade-in  '><div className='w-64  text-center shadow-lg'><p className='text-red-400 '> ⚠️ {topMessage} </p></div></div>}


      <div className='text-center my-6 font-bold text-2xl'>
        <h1>Welcome {user?.name?.first} </h1>
        <hr></hr>

      </div>



      <div className='flex justify-end sm:pr-[20%] pr-[5%] my-4 opacity-80 select-none ' >
        <div className='flex  shadow-xl px-2 justify-end-safe '>
          <button className='hover:opacity-70 hover:bg-gray-100' onClick={() => { handleChangeDates('pre') }}>{'<'}</button>
          <p className='mx-2 min-w-32 max-w-32 text-center'>{months[selectedMonthLeft]} {dates[0]} - {months[selectedMonthRight]} {dates[6]}</p>
          <button className='hover:opacity-70 hover:bg-gray-100' onClick={() => { handleChangeDates('next') }}>{'>'}</button>

        </div>

      </div>
      <div className=' overflow-x-auto'>
        <div className='grid grid-cols-[150px_repeat(7,1fr)_45px_75px] text-center gap-4 px-10 '>
          <p className='bg-gray-100'>Habits</p>
          {dates.map((item, index) => {


            return <div key={index} className={`${todayDay === index && isPresentWeekSelected ? 'border-2 border-green-300 ' : null} bg-gray-100`}> <p>{days[index]}</p> <p>{item}</p> </div>

          })}
          <p className='bg-gray-100 '>Goal</p>
          <p className='bg-gray-100 '>Achieved</p>


          {currentHabits.map((item, index) => {
            return (
              <div key={index} className='contents text-center'>
                <p className='self-center'>{item.habit}</p>
                {dates.map((date, dayIndex) => <button key={dayIndex} className={`border-2 h-10 w-10 justify-self-center ${handleReload(currWeekCompDates[index], date) ? ' bg-green-300' : null}`} onClick={(e) => { completedHandle(e, index, dayIndex, today, date) }}>   </button>)}
                <p className='justify-self-center self-center'>{item.goal}</p>

                <p className={`justify-self-center self-center  ${item.goal <= currWeekCompDates[index]?.length ? 'bg-green-500' : null} w-full`}>{currWeekCompDates[index] ? currWeekCompDates[index].length : 0}</p>

              </div>)



          })}

        </div>

      </div>

    </div>
  )
}

export default Home