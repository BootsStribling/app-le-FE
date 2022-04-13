import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import date from 'date-and-time';

// ------- Components
import NavBar from './components/NavBar/NavBar'

// ------- Pages
import DayDetails from './pages/DayDetails/DayDetails'
import Landing from './pages/Landing/Landing'
import JobForm from './pages/Forms/JobForm'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'


// -------- Services
import * as authService from './services/authService'
import * as daysService from './services/daysService'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [days, setDays] = useState([])
  const [currentDay, setCurrentDay] = useState([])

  useEffect(()=> {
    if(user){
      daysService.getAllDays()
      .then(res => {
        console.log('RECIEVED', res)
        setDays(res)
      })
    }
  }, [user])
  
  
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => setUser(authService.getUser())

  // Add a new jerb
  const addJerb = (formData) => {
    daysService.createJob(formData)
    .then(updatedDay => setCurrentDay(updatedDay))
  }

  // Update day
  const updateDay = (formData) => {
    daysService.editDay(formData)
    .then(updatedDay => setCurrentDay(updatedDay))
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        {/* For now routing to the first day in the index. */}
        <Route path="/" element={<Landing user={user} days={days} />} />
        {/* Show a day */}
        <Route path="/days/:id" element={<DayDetails updateDay={updateDay} key={currentDay} user={user} />} />
        {/* Create a new job */}
        <Route path="/days/:id/jerbs" element={<JobForm addJerb={addJerb} user={user} />} />
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
