import { useState } from 'react'
// The purpose of this component is to edit a stand up and stand down.
const StandupForm = (props) => {
  const [form, setForm] = useState({})
  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})

  const handleSubmit = (e) => {
    e.preventDefault()
    props.updateDay(form)

  }

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <textarea name={props.name} onChange={handleChange} defaultValue={props.initialValue}></textarea>
        <button type="submit">save</button>
      </form>
      <button onClick={()=> props.handleEditClick(null)}>Back</button>
    </div>
  );
}
 
export default StandupForm;