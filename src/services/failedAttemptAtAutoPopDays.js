  // .then(days => {
  //   console.log(days)
  //   // on login we are determing what day it currently is with date constructor
  //   let now = new Date()
  //   // If the user has days...
  //   if(days.length) {
  //     let lastDay = days[days.length-1].date
  //     let lastDayAsDate = new Date(lastDay)
  //     console.log('last day', lastDay)
  //     console.log('now', now)
  //     if(date.isSameDay(lastDayAsDate, now)) { // User logged in today
  //       console.log('LAST DAY AND CURRENT DAY ARE THE SAME. SET CURRENT DAY TO USERS LAST DAY. DO NOT CREATE A NEW DAY')
  //       console.log('RETURNING', days)
  //       return days
  //     } else { // There is a gap in login history
  //       console.log('USER HAS DAYS BUT HAS A GAP IN THEIR DATES. SSET CURRENT DAY TO NOW. FILL IN GAPS')
  //       let formattedLastDay = lastDay.substring(4,15)
  //       let desiredFormat = 'MMM DD YYYY'
  //       // Get the last login date and current date
  //       let parseLastDay = date.parse(formattedLastDay, desiredFormat)
  //       // we are subtracting current day from last day created
  //       let numOfMissingDays = Math.floor(date.subtract(now, parseLastDay).toDays())
  //       //pushing a date for number of missing days
  //       let datesToAdd = []
  //       for(let i = 0; i < numOfMissingDays; i++) {
  //         let missingDay = date.addDays(now, (i * -1))
  //         datesToAdd.push(missingDay)
  //       }
  //       //each date in missing days send date to create day services function
  //       const promises = []
  //       datesToAdd.reverse().forEach(date => {
  //         let datePayload = date.toString()
  //         let jsonDate = {'date': datePayload}
  //         promises.push(createDay(jsonDate))
  //       })
  //       Promise.all(promises)
  //       .then(updatedDays => {
  //         let returnVals = days.concat(updatedDays)
  //         console.log('RETURNING', returnVals)
  //         return returnVals
  //       }) // returns the updated list to the original caller
  //     }
  //   } else { // First time login
  //     console.log('FIRST TIME LOGIN. CREATE DAY AS NOW. SET CURRENT AS NOW')
  //     createDay( {'date': now.toString()} )
  //     .then(newDay => {
  //       console.log('RETURNING', newDay)
  //       return newDay
  //     }) // returns the new day to the original  caller
  //   }
  // })