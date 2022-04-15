import styles from './Landing.module.css'
import DayList from '../../components/DayList/DayList'
import DayDetails from '../DayDetails/DayDetails'
import { useEffect, useState } from 'react'
// The purpose of this landing is to set the current date and sho
const Landing = ({ toggleNav, user, days, createDay, updateCurrentDay, currentDay, updateDay }) => {
  const [week, setWeek] = useState([...days])
  useEffect(()=>{
    setWeek(days.slice(0,7))
  }, [days, currentDay])

  return (
    <main className="landing">
      {user ? 
        <>
          <div className={styles.weekcontainer}>
            <DayList updateCurrentDay={updateCurrentDay} days={week} />
          </div>
          <div className={styles.daydetailscontainer}>
            <DayDetails updateDay={updateDay} updateCurrentDay={updateCurrentDay} currentDay={currentDay} />
            <button className={styles.buttonconfirm} onClick={createDay}>New Day</button>
          </div>
        </>
        : 
        <>
          <div className={styles.container}>
            <img className={styles.logo} src="../../../assets/images/logo-text.png" alt="APP-le A Day Logo" />
          </div>
        </> 
      }
    </main>
  )
}

export default Landing
