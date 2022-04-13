import styles from './Landing.module.css'
import DayList from '../../components/DayList/DayList'
import DayDetails from '../DayDetails/DayDetails'
import { useEffect, useState } from 'react'
// The purpose of this landing is to set the current date and sho
const Landing = ({ user, days, createDay, updateCurrentDay, currentDay, updateDay }) => {


  return (
    <main className="landing">
      {user ? 
        <>
          <DayList updateCurrentDay={updateCurrentDay} days={days} />
          <DayDetails updateDay={updateDay} updateCurrentDay={updateCurrentDay} currentDay={currentDay} />
          <button onClick={createDay}>A Brand New Day</button>
        </>
        : <></> 
      }
    </main>
  )
}

export default Landing
