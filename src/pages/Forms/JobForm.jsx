import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// The purpose of this component is to create a job in a specific day
const JobForm = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(id)
    form["day_id"] = id
    props.addJerb(form)
  }

  return (
    <>
      <h1>Add a job</h1>
      <section>
        <form onSubmit={handleSubmit} >
          <label htmlFor="title">Title:</label>
          <input name="title" type="text" onChange={handleChange} />
          <label htmlFor="company">Company:</label>
          <input name="company" type="text" onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}
 
export default JobForm;