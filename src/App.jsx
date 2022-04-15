import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// ------- Components
import NavBar from './components/NavBar/NavBar'
import StanddownForm from './pages/Forms/StanddownForm'
import StandupForm from './pages/Forms/StandupForm'

// ------- Pages
import Landing from './pages/Landing/Landing'
import JobForm from './pages/Forms/JobForm'
import JobEditForm from './pages/Forms/JobEditForm'
import StandupEditForm from './pages/Forms/StandupEditForm'
import StanddownEditForm from './pages/Forms/StanddownEditForm'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'


// -------- Services
import * as authService from './services/authService'
import * as daysService from './services/daysService'
import Welcome from './pages/Welcome/Welcome'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [days, setDays] = useState([])
  const [currentDay, setCurrentDay] = useState([])
  const [showNav, setShowNav] = useState(true)
  // nav state
  useEffect(()=> {
    if(user){
      daysService.getAllDays()
      .then(res => {
        setDays(res)
      })
    }
  }, [user])

  useEffect(()=> {
    setCurrentDay(days[0])
  }, [days])

  const navigate = useNavigate()
  
  const toggleNav = () => setShowNav(!showNav)

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/login')
  }

  const handleSignupOrLogin = () => setUser(authService.getUser())

  const updateDaysInStateAfterFormSubmit = (updatedDay) => {
    let index = days.findIndex(day => day.id === updatedDay.id)
    days[index] = updatedDay
    setCurrentDay(updatedDay)
    setDays([...days])
  }

  // Add a new jerb
  const addJerb = (formData) => {
    daysService.createJob(formData)
    .then(updatedDay => updateDaysInStateAfterFormSubmit(updatedDay))
  }

  const editJerb = (formData) => {
    daysService.editJerb(formData)
    .then(updatedDay => updateDaysInStateAfterFormSubmit(updatedDay))
  }

  const editDay = (formData) => {
    console.log(formData)
    daysService.editDay(formData)
    .then(updatedDay => updateDaysInStateAfterFormSubmit(updatedDay))
  }

  const updateCurrentDay = (day) => setCurrentDay(day) 

  const createDay = () => {
    let day = new Date().toString()
    daysService.createDay({"date": day })
    .then(res => {
      setDays([res, ...days])
      setCurrentDay(res)
    })
  }

  // Update day
  const updateDay = (formData) => {
    console.log(formData)
    daysService.editDay(formData)
    // .then(updatedDay => setCurrentDay(updatedDay))
    .then(updatedDay => {
      let index = days.findIndex(day => day.id === updatedDay.id)
      days[index] = updatedDay
      setDays([...days])
    })
  }

  return (
    <>
      <div className='phone-overlay'>
        <div className='app-area'>
          {/* Wrap in condition if nav state is true */}
          {showNav
            ? <NavBar user={user} handleLogout={handleLogout} />
            : <></>
          }
          <Routes>
            <Route path="/" element={<Landing updateDay={updateDay} currentDay={currentDay} updateCurrentDay={updateCurrentDay} createDay={createDay} user={user} days={days} />} />
            <Route path="/profile" element={<Profile updateCurrentDay={updateCurrentDay} user={user} />} />
            <Route path="/welcome" element={<Welcome toggleNav={toggleNav} user={user} />} />
            <Route path="/days/:id/jerbs" element={<JobForm addJerb={addJerb} user={user} />} />
            <Route path="/days/:day_id/jerbs/:jerb_id" element={<JobEditForm editJerb={editJerb} currentDay={currentDay} user={user} />} />
            <Route path="/days/:id/stand_down" element={<StanddownForm addStandDown={editDay} user={user} />} />
            <Route path="/days/:id/stand_up" element={<StandupForm addStandUp={editDay} user={user} />} />
            <Route path="/days/:id/stand_down/edit" element={<StanddownEditForm editStandDown={editDay} user={user} />} />
            <Route path="/days/:id/stand_up/edit" element={<StandupEditForm editStandUp={editDay} user={user} />} />
            <Route
              path="/signup"
              element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
            />
            <Route
              path="/login"
              element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
            />
          </Routes>
        </div>
      </div>
      <div className='background'>
        <div className='btm-nav'></div>
      </div>
    </>
  )
}

export default App
