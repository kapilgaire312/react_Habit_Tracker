import { useState } from "react"

function AddHabits({ habitAdd }) {
  const [habitData, setHabitData] = useState({ habit: '', goal: '' })

  return (
    <div className="flex justify-center my-6">
      <div>
        <div className="borer-2 ">
          <h2 className="text-2xl">Create New Habit</h2>
        </div>
        <hr className="my-2"></hr>
        <div>
          <div className="my-2">
            <p className="">Habit:</p>
            <input value={habitData.habit} className="border-2 p-1 mt-2" placeholder="Eg. Exercise" onChange={(e) => { setHabitData({ ...habitData, habit: e.target.value }) }}></input>
          </div>
        </div>

        <div>
          <div className="my-2">
            <p className="">Goal:</p>
            <input value={habitData.goal} className="border-2 p-1 mt-2" placeholder="No of times in a week" type="number" onChange={(e) => { setHabitData({ ...habitData, goal: e.target.value }) }}></input>
          </div>
        </div>
        <div className="text-center">
          <button className="border-0 p-1 px-2 bg-gray-600 text-white rounded " onClick={() => { habitAdd(habitData.habit, habitData.goal); setHabitData({ habit: '', goal: '' }) }}>ADD</button>

        </div>



      </div>

    </div>
  )

}
export default AddHabits