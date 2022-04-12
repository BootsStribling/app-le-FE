import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// The purpose of this component is to create a job in a specific day
const JobForm = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.updateJob(form)
      
  }

  return (
    <>
      <h1>Add a job</h1>
      <section>
        <form onSubmit={handleSubmit}>

        </form>
      </section>
    </>
  );
}
 
export default JobForm;