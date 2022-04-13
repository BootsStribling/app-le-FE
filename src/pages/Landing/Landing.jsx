import styles from './Landing.module.css'
import DayList from '../../components/DayList/DayList'
import DayDetails from '../DayDetails/DayDetails'
import { useEffect, useState } from 'react'
// The purpose of this landing is to set the current date and sho
const Landing = ({ user, days, createDay, updateCurrentDay, currentDay, updateDay }) => {
  const [week, setWeek] = useState([...days])
  useEffect(()=>{
    setWeek(days.reverse().slice(0,7))
  }, [days])

  return (
    <main className="landing">
      {user ? 
        <>
          <DayList updateCurrentDay={updateCurrentDay} days={week} />
          <DayDetails updateDay={updateDay} updateCurrentDay={updateCurrentDay} currentDay={currentDay} />
          <button onClick={createDay}>A Brand New Day</button>
        </>
        : <></> 
      }
    </main>
  )
}

export default Landing
