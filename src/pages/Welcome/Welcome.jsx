import { useState, useEffect } from 'react'
import lottie from "lottie-web"
import lottie0 from './lotties/developer_02_solid.json'
import lottie1 from './lotties/developer_01_solid.json'
import lottie2 from './lotties/message sent_03_solid.json'
import lottie3 from './lotties/product launch_01_solid.json'

const Welcome = () => {
  const panels = [
    {
      "lottie" : lottie0,
      "messageA" : "Welcome",
      "messageB" : "Welcome",
    },
    {
      "lottie" : lottie1,
      "messageA" : "Welcome",
      "messageB" : "Welcome",
    },
    {
      "lottie" : lottie2,
      "messageA" : "Welcome",
      "messageB" : "Welcome",
    },
    {
      "lottie" : lottie3,
      "messageA" : "Welcome",
      "messageB" : "Welcome",
    },
  ]

  const [panelState, setPanelState] = useState(0)
  const handleButtonClick = () => {
    if(panelState < panels.length - 1) setPanelState(panelState + 1)
    else console.log('redirect to landing')
  }

  useEffect(()=> {
    lottie.loadAnimation({
      container: document.querySelector('#lottie'),
      animationData: panels[panelState].lottie,
      renderer: "svg",
      loop: true,
      autoplay: true,
    })
  }, [panelState])

  return (
    <>
      <h1>{panels[panelState].messageA}</h1>
      <div key={panelState} id="lottie" />
      <h1>{panels[panelState].messageB}</h1>
      <button onClick={handleButtonClick}>nexrt</button>
    </>
  );
}
 
export default Welcome;