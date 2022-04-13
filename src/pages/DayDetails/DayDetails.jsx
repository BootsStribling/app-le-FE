import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// ------ services
import { getOneDay } from '../../services/daysService';

// ------ Components
import StandupForm from './Components/StandupForm';

// The purpose of this function is to show the details of a single day.
// (This is Landing in our wireframe)
const DayDetails = (props) => {
  const { id } = useParams() // Include this once links are setup. For development id will be hard coded
  const [day, setDay] =useState(null)
  const [editing, setEditing] = useState(null)

  // toggle editing state depending on the button clicked
  const handleEditClick = (state) => setEditing(state)

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
      {/* created_at will need to be repalced with date */}
      <p>{day.day.created_at}</p>
      <p>{day.day.stand_up}</p>
      {editing === 'stand_up'
        ? <StandupForm handleEditClick={handleEditClick} />
        : <button onClick={()=> handleEditClick('stand_up')}>Edit stand up</button>
      }
      <p>{day.day.stand_down}</p>
      {editing === 'stand_down'
        ? <StandupForm handleEditClick={handleEditClick} />
        : <button onClick={()=> handleEditClick('stand_down')}>Edit stand down</button>
      }
      <p>Job #s:{day.day.jerbs?.length}</p>
      <button onClick={navToJobForm}>APPly yoself</button>
    </div>
  );
}
 
export default DayDetails;