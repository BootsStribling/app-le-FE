import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOneDay } from '../../services/daysService'
import styles from './Forms.module.css'

// The purpose of this component is to create a job in a specific day
const StanddownForm = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  useEffect(()=> {
    getOneDay(id)
    .then(response => {
      let day = response.day
      setForm( {"stand_down":day.stand_down} )
    })
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const backtoLanding = () => navigate(`/`)

  const handleSubmit = (e) => {
    e.preventDefault()
    form["day_id"] = id
    props.editStandDown(form)
    backtoLanding()
  }


  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.sansation}>Stand Down</h1>
        <p className={styles.slim}>You Deserve a Rest!</p>
        <form className='stand-form' onSubmit={handleSubmit} >
          <textarea 
            className={styles.textarea}
            placeholder="Tell us what you learned and/or accomplished today!"
            name="stand_down" 
            defaultValue={form.stand_down}
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
 
export default StanddownForm;