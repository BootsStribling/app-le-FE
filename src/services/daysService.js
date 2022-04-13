import * as tokenService from './tokenService'
const BASE_URL=`${process.env.REACT_APP_API_URL}/api/days/`

export const createDay = (date) => {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(date)
  })
  .then(res => res.json())
  .catch(error => console.log(error))
}


export const getAllDays = () => {
  return fetch(`${BASE_URL}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  .then(res => res.json())
  .catch(error => console.log(error))
}

export const getOneDay = (day_id) => {
  return fetch(`${BASE_URL}${day_id}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }    
  })
  .then(res => res.json())
  .catch(error => {
    console.log(error)
  })
}

export const createJob = (formData) => {
  return fetch(`${BASE_URL}${formData.day_id}/jerbs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .catch(error => {
    console.log(error)
  })
}

// put /:dayId
export const editDay = (formData) => {
  return fetch(`${BASE_URL}${formData.day_id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .catch(error => {
    console.log(error)
  })
}