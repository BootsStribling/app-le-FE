import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'

// -------- Services
import * as authService from './services/authService'
import * as daysService from './services/daysService'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [days, setDays] = useState()

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
        <Route path="/" element={<Landing user={user} />} />
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
