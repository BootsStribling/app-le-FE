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
      <h1>{jerbs.length} Applications over {days.length} days!</h1>
      <div className={styles.jobsFlex}>
        {jerbs.map((j, idx) => <button key={idx} onClick={()=> navToJobEditForm(j.day_id, j.id)}><i className="fa-solid fa-dollar-sign"></i></button>)}
        {jerbs.map((j, idx) => <button key={idx} onClick={()=> navToJobEditForm(j.day_id, j.id)}><i className="fa-solid fa-dollar-sign"></i></button>)}
        {jerbs.map((j, idx) => <button key={idx} onClick={()=> navToJobEditForm(j.day_id, j.id)}><i className="fa-solid fa-dollar-sign"></i></button>)}
      </div>
    </>
  );
}
 
export default Profile;