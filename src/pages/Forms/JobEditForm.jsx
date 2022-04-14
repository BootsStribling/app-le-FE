import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// The purpose of this component is to create a job in a specific day
const JobEditForm = (props) => {
  const { day_id, jerb_id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})

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
            onChange={handleChange} />
          <label htmlFor="company">Company:</label>
          <input 
          name="company" 
          type="text" 
          onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </section>
      <button onClick={backtoLanding}>Back</button>
    </>
  );
}
 
export default JobEditForm;