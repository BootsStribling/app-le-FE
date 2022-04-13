import { Link } from 'react-router-dom'
import DayCard from '../DayCard/DayCard';
// The purpose of this component is to list all of the dates for the current user.
const DayList = (props) => {
  return (
    <>
      {props.days
      ? props.days.map((day, idx) => <DayCard updateCurrentDay={props.updateCurrentDay} key={day.id} day={day} />)
      : <></>
      }
    </>
  );
}
 
export default DayList;