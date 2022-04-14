import { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
      <h1>Edit job</h1>
      <section>
        <form onSubmit={handleSubmit} >
          <label htmlFor="title">Title:</label>
          <input 
            name="title" 
            type="text"
            defaultValue={form.title} 
            onChange={handleChange} />
          <label htmlFor="company">Company:</label>
          <input 
          name="company" 
          type="text"
          defaultValue={form.company} 
          onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </section>
      <button onClick={backtoLanding}>Back</button>
    </>
  );
}
 
export default JobEditForm;