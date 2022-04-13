import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
      <h1>Stand up</h1>
      <p>and seize the day</p>
      <section>
        <form onSubmit={handleSubmit} >
          <textarea name="stand_up" type="text" onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </section>
      <button onClick={backtoLanding}>Back</button>
    </>
  );
}
 
export default StandupForm;