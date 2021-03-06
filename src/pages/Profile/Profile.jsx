import styles from './Profile.module.css'
import { useEffect, useState } from 'react'
import { getAllDays } from '../../services/daysService'
import { useNavigate } from 'react-router-dom'
import DayList from '../../components/DayList/DayList'
const Profile = (props) => {

  const [days, setDays] = useState([])
  const [jerbs, setJerbs] = useState([])
  const navigate = useNavigate()
  useEffect(()=> {
    if(props.user){
      getAllDays()
      .then(res => {
        setDays(res)
        let jerbArray = []
        res.forEach(day => jerbArray.push(day.jerbs))
        setJerbs([...jerbArray.flat()])
      })
    }
  }, [props.user])

  const navToJobEditForm = (day_id, jerb_id) => navigate(`/days/${day_id}/jerbs/${jerb_id}`)

  return (
    <>
      <div className={styles.daysFlex}>
        <DayList updateCurrentDay={props.updateCurrentDay} days={days} />
      </div>
      <h2 className={styles.message}>{jerbs.length} Applications over {days.length} days!</h2>
      <div className={styles.jobsFlex}>
        {jerbs.map((j, idx) => <button className={styles.fadollarsign} key={idx} onClick={()=> navToJobEditForm(j.day_id, j.id)}><i className="fa-solid fa-sack-dollar"></i></button>)}
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.backBtn} onClick={()=> navigate("/")}>Back</button>
      </div>
    </>
  );
}
 
export default Profile;