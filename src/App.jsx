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

  const createMissingDays = ()=> {
    // on login we are determing what day it currently is with date constructor
    let now = new Date()
    let strNow = now.toString()
    let formattedNow = strNow.substring(4,15)
    //then we are determining what was the last day that was created
    let lastDay = days[days.length-1]?.date
    // if the user's day length is 0, it's their first login and they need a day.
    console.log('last day', lastDay)
    console.log('now', now)
    if(!lastDay) {
      console.log('FIRST TIME LOGIN. CREATE DAY AS NOW. SET CURRENT AS NOW')
      daysService.createDay( {'date': now.toString()} )
      .then(res => setDays([res]))
    } else if(lastDay === now) {
      console.log('LAST DAY AND CURRENT DAY ARE THE SAME. SET CURRENT DAY TO USERS LAST DAY. DO NOT CREATE A NEW DAY')
    } else {
      console.log('USER HAS DAYS BUT HAS A GAP IN THEIR DATES. SSET CURRENT DAY TO NOW. FILL IN GAPS')
    }
    // else user has days but has a gab in their log in.
    setCurrentDay(formattedNow)

    if (lastDay){
      let formattedLastDay = lastDay.substring(4,15)
      let desiredFormat = 'MMM DD YYYY'
      // Get the last login date and current date
      let parseLastDay = date.parse(formattedLastDay, desiredFormat)
      // we are subtracting current day from last day created
      let numOfMissingDays = Math.floor(date.subtract(now, parseLastDay).toDays())
      //pushing a date for number of missing days
      let datesToAdd = []
      for(let i = 0; i < numOfMissingDays; i++) {
        let missingDay = date.addDays(now, (i * -1))
        datesToAdd.push(missingDay)
      }
      //each date in missing days send date to create day services function
      datesToAdd.reverse().forEach(date => {
        let datePayload = date.toString()
        let jsonDate = {'date': datePayload}
        daysService.createDay(jsonDate)
      })

    }
}

  useEffect(()=> {
    if(user){
      daysService.getAllDays()
      .then(res => {
          setDays(res)
          createMissingDays()
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
