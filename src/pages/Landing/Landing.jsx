import styles from './Landing.module.css'
import DayList from '../../components/DayList/DayList'

// The purpose of this landing is to set the current date and sho
const Landing = ({ user, days, createDay }) => {
  

  return (
    <main className={styles.container}>
      {user ? 
        <>
          <DayList days={days} />
          <button onClick={createDay}>A Brand New Day</button>
        </>
        : <></> 
      }
    </main>
  )
}

export default Landing
