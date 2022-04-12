import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

// ------- Components
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import DayList from './components/DayList/DayList'
import DayDetails from './pages/DayDetails/DayDetails'


// -------- Services
import * as authService from './services/authService'
import * as daysService from './services/daysService'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [days, setDays] = useState([])

  useEffect(()=> {
    daysService.getAllDays()
    .then(res => setDays(res))
  }, [])

  const navigate = useNavigate()
  console.log(user)

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
        <Route path="/" element={<DayDetails user={user} day={days[0]} />} />
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
