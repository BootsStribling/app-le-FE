import DayCard from '../DayCard/DayCard';

// The purpose of this component is to list all of the dates for the current user.
const DayList = (props) => {

  return (
    <div className='week'>
      {props.days
      ? props.days.map((day) => <DayCard updateCurrentDay={props.updateCurrentDay} key={day.id} day={day} />).reverse()
      : <></>
      }
    </div>
  );
}
 
export default DayList;