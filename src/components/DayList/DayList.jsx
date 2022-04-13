import { Link } from 'react-router-dom'
// The purpose of this component is to list all of the dates for the current user.
const DayList = (props) => {
  return (
    <>
      <h1>Week grid</h1>
      {props.days
      ? props.days.map((day, idx) => <div className='daysq'  key={idx}><Link to={`/days/${day.id}`}>{day.date}</Link></div>)
      : <></>
      }
    </>
  );
}
 
export default DayList;