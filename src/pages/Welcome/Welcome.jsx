import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import lottie from "lottie-web"
import lottie0 from './lotties/developer_02_solid.json'
import lottie1 from './lotties/developer_01_solid.json'
import lottie2 from './lotties/message sent_03_solid.json'
import lottie3 from './lotties/product launch_01_solid.json'
import styles from './Welcome.module.css'

const Welcome = (props) => {
  const panels = [
    {
      "lottie" : lottie0,
      "messageA" : "Set your Daily Goals in Stand Ups",
    },
    {
      "lottie" : lottie1,
      "messageA" : "Write what you Achieved in Stand Downs",
    },
    {
      "lottie" : lottie2,
      "messageA" : "Track Job Applications\n",
    },
    {
      "lottie" : lottie3,
      "messageA" : "Launch your Dev Career\n",
    },
  ]

  const [panelState, setPanelState] = useState(0)
  const navigate = useNavigate()
  const handleButtonClick = () => {
    if(panelState < panels.length - 1) setPanelState(panelState + 1)
    else {
      props.toggleNav()
      navigate('/')
    }
  }

  useEffect(()=> {
    props.toggleNav()
  }, [])

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
    <div className={styles.container}>
      <h1 className={styles.message}>{panels[panelState].messageA}</h1>
      <div key={panelState} id="lottie" />
      {panelState < panels.length - 1
        ? <button className={styles.btn} onClick={handleButtonClick}><i class="fa-solid fa-arrow-right"></i></button>
        : <button className={styles.lastBtn} onClick={handleButtonClick}>Onward and Upward!</button>
      }
      
    </div>
  );
}
 
export default Welcome;