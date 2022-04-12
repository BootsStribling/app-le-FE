// The purpose of this function is to show the details of a single day.
// (This is Landing in our wireframe)
const DayDetails = (props) => {
  return (
    <>
      {props.day
        ?
          <div>
            <p>{props.day.created_at}</p>
            <p>{props.day.stand_up}</p>
            <p>{props.day.stand_down}</p>
            <p>Job #s:{props.day.jerbs.length}</p>
          </div>
        : <div>Loading</div>
      }
    </>
  );
}
 
export default DayDetails;