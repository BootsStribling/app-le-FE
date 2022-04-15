import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOneDay } from '../../services/daysService'
import styles from './Forms.module.css'

// The purpose of this component is to create a job in a specific day
const StandupEditForm = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  useEffect(()=> {
    getOneDay(id)
    .then(response => {
      let day = response.day
      setForm( {"stand_up":day.stand_up} )
    })
  }, [id])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const backtoLanding = () => navigate(`/`)

  const handleSubmit = (e) => {
    e.preventDefault()
    form["day_id"] = id
    props.editStandUp(form)
    backtoLanding()
  }


  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.sansation}>Stand Up</h1>
        <p className={styles.slim}>Seize the Day!</p>
        <form className='stand-form' onSubmit={handleSubmit} >
          <textarea 
            className={styles.textarea}
            defaultValue={form.stand_up}
            name="stand_up" 
            type="text" 
            onChange={handleChange} 
          />
          <div className={styles.inputContainer}>
            <button className={styles.buttonconfirm} type="submit">Submit</button>
            <button className= {styles.buttonback} onClick={backtoLanding}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default StandupEditForm;