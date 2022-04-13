import { Link } from 'react-router-dom'
import DayCard from '../DayCard/DayCard';
// The purpose of this component is to list all of the dates for the current user.
const DayList = (props) => {
  return (
    <>
      <h1>Week grid</h1>
      {props.days
      ? props.days.map((day, idx) => <DayCard key={day.id} day={day} day_id={day.id}/>)
      : <></>
      }
    </>
  );
}
 
export default DayList;