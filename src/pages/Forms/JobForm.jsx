import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './Forms.module.css'

// The purpose of this component is to create a job in a specific day
const JobForm = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const backtoLanding = () => navigate(`/`)

  const handleSubmit = (e) => {
    e.preventDefault()
    form["day_id"] = id
    props.addJerb(form)
    backtoLanding()
  }


  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.sansation}>Add a job</h1>
        <section>
          <form
          autoComplete='off' 
          onSubmit={handleSubmit}
          className={styles.container} 
          >
            <input 
              className={styles.input}
              placeholder='Job Title'
              name="title" 
              type="text" 
              onChange={handleChange} 
            />
            <input
              className={styles.input}
              placeholder='Company Name'
              name="company" 
              type="text" 
              onChange={handleChange}
            />
            <div className={styles.inputContainer}>
              <button className={styles.buttonconfirm} type="submit">Submit</button>
              <button className={styles.buttonback}onClick={backtoLanding}>Back</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
 
export default JobForm;