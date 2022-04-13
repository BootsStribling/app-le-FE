import { Link } from "react-router-dom";
// the purpose of this component is to show the day as a clicable div
const DayCard = (props) => {
  return (
    <button className="daysq" onClick={()=> props.updateCurrentDay(props.day)}></button>
  );
}
 
export default DayCard;