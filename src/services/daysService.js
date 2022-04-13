import * as tokenService from './tokenService'
const BASE_URL=`${process.env.REACT_APP_API_URL}/api/days/`

export const createDay = (formData) => {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(formData)
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