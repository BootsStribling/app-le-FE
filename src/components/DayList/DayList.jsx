// The purpose of this component is to list all of the dates for the current user.
const DayList = (props) => {
  return (
    <>
      <h1>Week grid</h1>
      {props.days
      ? props.days.map((day, idx) => <div key={idx}>{day.created_at}</div>)
      : <></>
      }
    </>
  );
}
 
export default DayList;