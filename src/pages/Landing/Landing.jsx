import styles from './Landing.module.css'
import DayList from '../../components/DayList/DayList'
import DayDetails from '../DayDetails/DayDetails'
import { useEffect, useState } from 'react'
// The purpose of this landing is to set the current date and sho
const Landing = ({ user, days, createDay, updateCurrentDay, currentDay, updateDay }) => {
  const [week, setWeek] = useState([...days])
  useEffect(()=>{
    setWeek(days.slice(0,7))
  }, [days, currentDay])

  return (
    <main className="landing">
      {user ? 
        <>
          <div>
            <div className='week'>
              <DayList updateCurrentDay={updateCurrentDay} days={week} />
            </div>
          </div>
          <div>
            <DayDetails updateDay={updateDay} updateCurrentDay={updateCurrentDay} currentDay={currentDay} />
            <button className='new-day-btn' onClick={createDay}>A Brand New Day</button>
          </div>
        </>
        : 
        <>
          <div className={styles.container}>
            <div>
              <img src="../../../assets/images/logo-text.png" alt="APP-le A Day Logo" />
            </div>
          </div>
        </> 
      }
    </main>
  )
}

export default Landing
