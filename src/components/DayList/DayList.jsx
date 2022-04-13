import DayCard from '../DayCard/DayCard';
import { useState, useEffect } from 'react';
// The purpose of this component is to list all of the dates for the current user.
const DayList = (props) => {

  return (
    <div className='week'>
      {props.days
      ? props.days.map((day, idx) => <DayCard updateCurrentDay={props.updateCurrentDay} key={day.id} day={day} />)
      : <></>
      }
    </div>
  );
}
 
export default DayList;