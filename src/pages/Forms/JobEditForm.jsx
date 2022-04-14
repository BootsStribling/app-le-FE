import { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './Forms.module.css'
import { getOneDay } from '../../services/daysService'


// The purpose of this component is to create a job in a specific day
const JobEditForm = (props) => {
  const { day_id, jerb_id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  useEffect(()=> {
    getOneDay(day_id)
    .then(response => {
      let day = response.day
      let jerb = day.jerbs.find(j => j.id === parseInt(jerb_id))
      setForm( {"company":jerb.company, "title":jerb.title})
    })
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const backtoLanding = () => navigate(`/`)

  const handleSubmit = (e) => {
    e.preventDefault()
    form["day_id"] = day_id
    form["jerb_id"] = jerb_id
    props.editJerb(form)
    backtoLanding()
  }


  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.sansation}>Edit job</h1>
        <section>
          <form className={styles.container} onSubmit={handleSubmit} >
            <input
              className={styles.input}
              defaultValue={form.title} 
              name="title" 
              type="text" 
              onChange={handleChange} />
            <input
              className={styles.input}
              defaultValue={form.company} 
              name="Company" 
              type="text" 
              onChange={handleChange}
            />
            <div className={styles.inputContainer}>
              <button className={styles.buttonconfirm}type="submit">Submit</button>
              <button className={styles.buttonback}onClick={backtoLanding}>Back</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
 
export default JobEditForm;