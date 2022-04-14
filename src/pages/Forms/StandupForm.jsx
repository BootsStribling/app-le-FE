import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './Forms.module.css'

// The purpose of this component is to create a job in a specific day
const StandupForm = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const backtoLanding = () => navigate(`/`)

  const handleSubmit = (e) => {
    e.preventDefault()
    form["day_id"] = id
    props.addStandUp(form)
    backtoLanding()
  }


  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.sansation}>Stand Up</h1>
        <p className={styles.slim}>Seize the Day!</p>
        <section>
          <form onSubmit={handleSubmit} >
            <textarea
              className={styles.textarea}
              placeholder='Tell us what you are working on today!'
              name="stand_up"
              type="text" 
              onChange={handleChange} 
            />
            <div className={styles.inputContainer}>
              <button className={styles.buttonconfirm} type="submit">Submit</button>
              <button className={styles.buttonback} onClick={backtoLanding}>Back</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default StandupForm;