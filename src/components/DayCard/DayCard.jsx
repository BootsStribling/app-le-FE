import { Link } from "react-router-dom";
// the purpose of this component is to show the day as a clicable div
const DayCard = (props) => {
  return (
      <div className='daysq'>
        <button onClick={()=> props.updateCurrentDay(props.day)}></button>
      </div>
  );
}
 
export default DayCard;