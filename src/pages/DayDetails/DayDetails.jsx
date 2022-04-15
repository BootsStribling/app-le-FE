import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './DayDetails.module.css'

// The purpose of this function is to show the details of a single day.
// (This is Landing in our wireframe)
const DayDetails = (props) => {
  const [day, setDay] =useState(props.currentDay)

  useEffect(()=> {
    setDay(props.currentDay)
  }, [props.currentDay])
  // toggle editing state depending on the button clicked

  // Nav to forms
  const navigate = useNavigate()
  const navToJobForm = () => navigate(`/days/${day.id}/jerbs`)
  const navToJobEditForm = (jerb_id) => navigate(`/days/${day.id}/jerbs/${jerb_id}`)
  const navToStandUpEditForm = (jerb_id) => navigate(`/days/${day.id}/stand_up/edit`)
  const navToStandDownEditForm = (jerb_id) => navigate(`/days/${day.id}/stand_down/edit`)
  const navToStandDown = () => navigate(`/days/${day.id}/stand_down`)
  const navToStandUp = () => navigate(`/days/${day.id}/stand_up`)

  // Display message while loading state.
  if (!day) return <></>

  return (
    <>
      <h1 className={styles.heading}>{day ? day.date?.substring(4,15) : "..."}</h1>

      {/* Stand up */}
      <div className={styles.standupContainer}>
        <div className={styles.standheader}>
          <h2 className={styles.sansation}>Stand Up</h2>
          {day.stand_up 
            ? <button className={styles.standeditbutton} onClick={navToStandUpEditForm}><i className="fa-solid fa-pencil"></i></button>
            : <></>
          }
        </div>
        <div className={styles.standHeight}>
          {day.stand_up
            ? <p className={styles.standtext}>{day.stand_up}</p>
            : <button className={styles.newstandbutton} onClick={navToStandUp}>+</button>
          }
        </div>
      </div>

      {/* Stand down */}
      <div className={styles.standupContainer}>
        <div className={styles.standheader}>
          <h2 className={styles.sansation}>Stand Down</h2>
          {day.stand_down
            ? <button className={styles.standeditbutton} onClick={navToStandDownEditForm}><i className="fa-solid fa-pencil"></i></button>
            : <></>
          }
        </div>
        <div className={styles.standHeight}>
          {day.stand_down
            ? <p className={styles.standtext}>{day.stand_down}</p>
            : <button className={styles.newstandbutton} onClick={navToStandDown}>+</button>
          }
        </div>
      </div>

      <div className={styles.jobarea}>
        {day.jerbs?.map((j, idx) => 
          <button 
            key={idx} 
            onClick={()=> navToJobEditForm(j.id)}
            className={styles.fadollarsign}
            >
            <i className="fa-solid fa-sack-dollar"></i>
          </button>
        )}
      </div>
      <button
        className={styles.buttonconfirm}
        onClick={navToJobForm}
      >
        APP-ly to Job
      </button>
    </>
  );
}
 
export default DayDetails;