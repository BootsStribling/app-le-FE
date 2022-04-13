import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// The purpose of this component is to create a job in a specific day
const StanddownForm = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const backtoLanding = () => navigate(`/`)

  const handleSubmit = (e) => {
    e.preventDefault()
    form["day_id"] = id
    props.addStandDown(form)
    backtoLanding()
  }


  return (
    <>
      <h1>Stand Down</h1>
      <p>you deserve a rest</p>
      <section>
        <form onSubmit={handleSubmit} >
          <textarea name="stand_down" type="text" onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </section>
      <button onClick={backtoLanding}>Back</button>
    </>
  );
}
 
export default StanddownForm;