import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import date from 'date-and-time';

// ------- Components
import NavBar from './components/NavBar/NavBar'
import DayList from './components/DayList/DayList'


// ------- Pages
import DayDetails from './pages/DayDetails/DayDetails'
import Landing from './pages/Landing/Landing'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'


// -------- Services
import * as authService from './services/authService'
import * as daysService from './services/daysService'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [days, setDays] = useState([])
  const [current, setCurrentDay] = useState({})
  console.log(days)
  useEffect(()=> {
    daysService.getAllDays()
    .then(res => setDays(res))
  }, [])
  
  useEffect(() => {
    let special = days[days.length-1]?.created_at
    if (special){
      let formattedSpecial = special.substr(5,11)
      let desiredFormat = 'DD MMM YYYY'
      // Get the last login date and current date
      let lastDay = date.parse(formattedSpecial, desiredFormat)
      // let testDay = date.addDays(lastDay, -5)
      let now = new Date()
      // Find how many days the user has been gone
      let numOfMissingDays = Math.floor(date.subtract(now, lastDay).toDays())
      // Create all the missing Date objects
      let datesToAdd = []
      for(let i = 0; i < numOfMissingDays; i++) {
        let missingDay = date.addDays(now, (i * -1))
        datesToAdd.push(missingDay)
      }
      // These are the days that need to be added to the user's profile
      datesToAdd.reverse().forEach(date => console.log(date))
    }
  },[days])

  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        {/* For now routing to the first day in the index. */}
        <Route path="/" element={<Landing user={user}/>} />
        <Route path="/day" element={<DayDetails user={user} day={days[0]} />}/>
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
      </Routes>
    </>
  )
}

export default App
