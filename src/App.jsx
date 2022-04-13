import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

// ------- Components
import NavBar from './components/NavBar/NavBar'
import DayList from './components/DayList/DayList'

// ------ Pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import JobForm from './pages/Forms/JobForm'

// -------- Services
import * as authService from './services/authService'
import * as daysService from './services/daysService'
import DayDetails from './pages/DayDetails/DayDetails'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [days, setDays] = useState([])
  const [currentDay, setCurrentDay] = useState({})

  useEffect(()=> {
    daysService.getAllDays()
    .then(res => setDays(res))
  }, [])

  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  // Add a new jerb
  const addJerb = (formData) => {
    daysService.createJob(formData)
    .then(updatedDay => {
      // Update the current day
      setCurrentDay(updatedDay)
    })
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<DayList user={user} days={days} />} />
        {/* Show a day */}
        <Route path="/days/:id" element={<DayDetails user={user} />} />
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
