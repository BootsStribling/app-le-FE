const StandupForm = (props) => {
  return (
    <>
      I'm a standup form. Yay!
      <button onClick={()=> props.handleEditClick(null)}>Back</button>
    </>
  );
}
 
export default StandupForm;