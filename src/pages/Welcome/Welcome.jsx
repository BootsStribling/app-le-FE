import { useState } from 'react'
const Welcome = () => {
  const panels = [
    {
      "img_source" : "developer_solid II.svg",
      "messageA" : "Welcome",
      "messageB" : "Welcome",
    },
    {
      "img_source" : "developer_solid I.svg",
      "messageA" : "Welcome",
      "messageB" : "Welcome",
    },
    {
      "img_source" : "message sent_solid III.svg",
      "messageA" : "Welcome",
      "messageB" : "Welcome",
    },
    {
      "img_source" : "workspace_solid II.svg",
      "messageA" : "Welcome",
      "messageB" : "Welcome",
    },
  ]
  
  const [panelState, setPanelState] = useState(0)
  const handleButtonClick = () => {
    if(panelState < panels.length - 1) setPanelState(panelState + 1)
    else console.log('redirect to landing')
  }

  return (
    <>
      <h1>{panels[panelState].messageA}</h1>
      <img alt ="dev" src={`../../../assets/images/lotties/${panels[panelState].img_source}`} />
      <h1>{panels[panelState].messageB}</h1>
      <button onClick={handleButtonClick}>nexrt</button>
    </>
  );
}
 
export default Welcome;