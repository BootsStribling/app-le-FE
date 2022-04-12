import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

  if (!day) return <h1>Loading</h1>

  return (
    <div>
      <p>{day.day.created_at}</p>
      <p>{day.day.stand_up}</p>
      <p>{day.day.stand_down}</p>
      <p>Job #s:{day.day.jerbs.length}</p>
    </div>
  );
}
 
export default DayDetails;