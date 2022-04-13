import styles from './Landing.module.css'
import DayList from '../../components/DayList/DayList'

// The purpose of this landing is to set the current date and sho
const Landing = ({ user, days }) => {
  

  return (
    <main className={styles.container}>
      {user ? <DayList days={days} /> : <></> }
    </main>
  )
}

export default Landing
