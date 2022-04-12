import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ------ services
import { getOneDay, createJob } from '../../services/daysService';

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

  // Add a new jerb
  const addJerb = (e) => {
    e.preventDefault()
    createJob(id, {"title": "testT", "company":"testC"})
    .then(updatedDay => {
      setDay({"day": {...updatedDay}}) // Not sure why It's an object in an object 😭
    })
  }

  if (!day) return <h1>Loading</h1>

  return (
    <div>
      {/* Why day.day?! 😭😭 */}
      <p>{day.day.created_at}</p> 
      <p>{day.day.stand_up}</p>
      <p>{day.day.stand_down}</p>
      <p>Job #s:{day.day.jerbs.length}</p>
      <button onClick={addJerb}>APPly yoself</button>
    </div>
  );
}
 
export default DayDetails;