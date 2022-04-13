import { Link } from "react-router-dom";
// the purpose of this component is to show the day as a clicable div
const DayCard = (props) => {
  return (
    <Link to={`/days/${props.day_id}`}>
      <div className='daysq'>
      </div>
    </Link>
  );
}
 
export default DayCard;