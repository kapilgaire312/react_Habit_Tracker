import { useState, useEffect } from 'react'

function MyHabits({ currentHabits, remove, setCurrentHabits }) {
  const [taskEditIndex, setTaskEditIndex] = useState(-1)
  const [updatedHabit, setUpdatedHabit] = useState('')
  const [updatedGoal, setUpdatedGoal] = useState(1)

  function handleEdit() {

    setTaskEditIndex(-1)
    const updatedHabits = currentHabits.map((item, index) => {
      if (taskEditIndex === index) {
        return { ...item, habit: updatedHabit, goal: updatedGoal }
      }

      return item


    })

    setCurrentHabits(updatedHabits)



  }



  useEffect(() => {
    currentHabits.map((item, index) => {
      if (taskEditIndex === index) {
        setUpdatedHabit(item.habit)
        setUpdatedGoal(item.goal)

      }
    })

  }, [taskEditIndex])

  return (
    <div className="flex justify-center mt-6 ">
      <div className="w-[70%]">
        <div className="text-center" >
          <p className="text-2xl">Your Ongoing Habits:</p>
        </div>
        <hr className="my-3"></hr>
        <div>
          <ul>

            {currentHabits?.map((item, index) => {
              return <li key={index} className="flex justify-between gap-[15%] my-6 items-center">


                {taskEditIndex === index ?
                  <div className='overflow-hidden'> <p className='opacity-60'>Habit:</p> <input value={updatedHabit} className='border-2 mb-1' onChange={(e) => { setUpdatedHabit(e.target.value) }} /> <p className='opacity-60'>Goal:</p> <input value={updatedGoal} className='border-2' onChange={(e) => { setUpdatedGoal(e.target.value) }} /> </div>
                  : item.habit}


                <div className="flex gap-3">
                  <button className="bg-yellow-100 min-w-8 h-8" onClick={(e) => { taskEditIndex === index ? handleEdit() : setTaskEditIndex(index) }}>{taskEditIndex === index ? '✅' : '✎'}</button>
                  <button className="bg-red-500 min-w-8 h-8  " id={index} onClick={(e) => { remove(e.target.id) }} >X</button>

                </div>
              </li>
            })}

          </ul>

        </div>




      </div>



    </div>
  )

}

export default MyHabits