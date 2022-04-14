import { useEffect, useState } from "react";

// the purpose of this component is to show the day as a clicable div
const DayCard = (props) => {
  const [colorClass, setColorClass] = useState()

  useEffect(()=> {
    let counter = 0
    if(props.day.stand_up) counter++
    if(props.day.stand_down) counter++
    if(props.day.jerbs.length) counter++

    if(counter === 0) setColorClass('daysq')
    if(counter === 1) setColorClass('daysq_1')
    if(counter === 2) setColorClass('daysq_2')
    if(counter === 3) setColorClass('daysq_3')

  }, [props.day])

  return (
    <button className={colorClass} onClick={()=> props.updateCurrentDay(props.day)}>{props.day.date.substring(4,10)}</button>
  );
}
 
export default DayCard;