import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// ------ services
import { getOneDay } from '../../services/daysService';

// ------ Components
import StandupForm from './Components/StandupForm';

// The purpose of this function is to show the details of a single day.
// (This is Landing in our wireframe)
const DayDetails = (props) => {
  const [day, setDay] =useState(props.currentDay)
  const [editing, setEditing] = useState(null)

  useEffect(()=> {
    setDay(props.currentDay)
  }, [props.currentDay])
  // toggle editing state depending on the button clicked
  const handleEditClick = (state) => setEditing(state)
  
  // Update the day in state
  const updateDay = (formData) => {
    for(let key in formData) {
      setDay({...day, [key]: formData[key]})
    }
    formData["day_id"] = day.id
    handleEditClick(null)
    // This will update the day in app. Same name kinda confusing
    props.updateDay(formData)
  }

  // Nav to forms
  const navigate = useNavigate()
  const navToJobForm = () => navigate(`/days/${day.id}/jerbs`)

  // Display message while loading state.
  if (!day) return <></>

  return (
    <div>
      {/* created_at will need to be repalced with date */}
      <p>{day.date}</p>
      {editing === 'stand_up'
        ? <StandupForm 
            name= {"stand_up"} 
            updateDay={updateDay} 
            initialValue={day.stand_up} 
            handleEditClick={handleEditClick}
          />
        : <>        
            <p>{day.stand_up}</p>
            <button onClick={()=> handleEditClick('stand_up')}>Edit stand up</button>
          </>
      }
      {editing === 'stand_down'
        ? <StandupForm 
            name={"stand_down"} 
            updateDay={updateDay} 
            initialValue={day.stand_down}
            handleEditClick={handleEditClick}
          />
        : <>
            <p>{day.stand_down}</p>
            <button onClick={()=> handleEditClick('stand_down')}>Edit stand down</button>
          </>
      }
      <p>Job #s:{day.jerbs?.length}</p>
      <button onClick={navToJobForm}>APPly yoself</button>
    </div>
  );
}
 
export default DayDetails;