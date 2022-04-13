import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// ------ services
import { getOneDay } from '../../services/daysService';

// The purpose of this function is to show the details of a single day.
// (This is Landing in our wireframe)
const DayDetails = (props) => {
  const { id } = useParams() // Include this once links are setup. For development id will be hard coded
  const [day, setDay] =useState(null)

  // get the day into state
  useEffect(()=> {
    getOneDay(id)
    .then(res => setDay(res))
  }, [id])

  // Nav to forms
  const navigate = useNavigate()
  const navToJobForm = () => navigate(`/days/${id}/jerbs`)

  // Display message while loading state.
  if (!day) return <h1>Loading</h1>

  return (
    <div>
      {/* Why day.day?! 😭😭 */}
      <p>{day.day.created_at}</p> 
      <p>{day.day.stand_up}</p>
      <p>{day.day.stand_down}</p>
      <p>Job #s:{day.day.jerbs?.length}</p>
      <button onClick={navToJobForm}>APPly yoself</button>
    </div>
  );
}
 
export default DayDetails;