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
    setCurrentDay(formattedNow)
    console.log(formattedNow, 'THIS IS FORMATTED NOW')
    console.log(now.toString(), 'now')
    //then we are determining what was the last day that was created
    let lastDay = days[days.length-1]?.date
    
    console.log(lastDay, 'lastDay baby!', typeof lastDay)
    console.log(days)
    if (lastDay){
      let formattedLastDay = lastDay.substring(4,15)
      console.log(formattedLastDay)
      let desiredFormat = 'MMM DD YYYY'
      // Get the last login date and current date
      let parseLastDay = date.parse(formattedLastDay, desiredFormat)
      console.log(parseLastDay)
      // we are subtracting current day from last day created
      let numOfMissingDays = Math.floor(date.subtract(now, parseLastDay).toDays())
      console.log(numOfMissingDays)
      //pushing a date for number of missing days
      let datesToAdd = []
      for(let i = 0; i < numOfMissingDays; i++) {
        let missingDay = date.addDays(now, (i * -1))
        datesToAdd.push(missingDay)
      }
      console.log(datesToAdd);
      //each date in missing days send date to create day services function
      datesToAdd.reverse().forEach(date => {
        console.log(date.toString(), 'date as a string')
        let datePayload = date.toString()
        let jsonDate = {'date': datePayload}
        console.log(jsonDate, 'JSON datePayload')
        daysService.createDay(jsonDate)
      })

    }
}

  useEffect(()=> {
    daysService.getAllDays()
    .then(res => {
      setDays(res)
      createMissingDays()
      console.log(currentDay, 'this is states currentDay after set')
    })
    // .then(() => {
    //   //checking if there are any days
    //   // if(days){}
    //   // on login we are determing what day it currently is with date constructor
    //   let now = new Date()
    //   console.log(now.toString(), 'now')
    //   //then we are determining what was the last day that was created
    //   let lastDay = days[days.length-1]?.date
    //   console.log(lastDay, 'lastDay baby!', typeof lastDay)
    //   console.log(days)
    //   if (lastDay){
    //     let formattedLastDay = lastDay.substring(4,15)
    //     console.log(formattedLastDay)
    //     let desiredFormat = 'MMM DD YYYY'
    //     // Get the last login date and current date
    //     let parseLastDay = date.parse(formattedLastDay, desiredFormat)
    //     console.log(parseLastDay)
    //     // we are subtracting current day from last day created
    //     let numOfMissingDays = Math.floor(date.subtract(now, parseLastDay).toDays())
    //     console.log(numOfMissingDays)
    //     //pushing a date for number of missing days
    //     let datesToAdd = []
    //     for(let i = 0; i < numOfMissingDays; i++) {
    //       let missingDay = date.addDays(now, (i * -1))
    //       datesToAdd.push(missingDay)
    //     }
    //     console.log(datesToAdd);
    //     //each date in missing days send date to create day services function
    //     datesToAdd.reverse().forEach(date => {
    //       console.log(date.toString(), 'date as a string')
    //       let datePayload = date.toString()
    //       let jsonDate = {'date': datePayload}
    //       console.log(jsonDate, 'JSON datePayload')
    //       daysService.createDay(jsonDate)
    //     })
    //     //create day services function packages date as json data
    //     //backend receives json data and creates new day with Day model and sets
    //     // Tue Apr 07 2022 20:27:05 GMT-0500 (Central Daylight Time) 
    //     // let testDay = date.addDays(lastDay, -5)
    //     // Find how many days the user has been gone
    //     // Create all the missing Date objects
    //     // console.log(numOfMissingDays)
    //     // console.log(datesToAdd, 'dates to add')
    //     // // These are the days that need to be added to the user's profile
    //   }
    // })
  }, [currentDay])
  


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
        <Route path="/days/:id" element={<DayDetails updateDay={updateDay} user={user} />} />
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
