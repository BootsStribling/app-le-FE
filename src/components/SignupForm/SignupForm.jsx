import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SignupForm.module.css'
import * as authService from '../../services/authService'

const SignupForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await authService.signup(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

  return (

    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
            <input
              className={styles.input}
              type="text"
              autoComplete="off"
              id="name"
              value={name}
              placeholder="Your Name"
              name="name"
              onChange={handleChange}
              />
            <input
              className={styles.input}
              type="text"
              autoComplete="off"
              id="email"
              value={email}
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="password"
              autoComplete="off"
              id="password"
              value={password}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="password"
              autoComplete="off"
              id="confirm"
              value={passwordConf}
              placeholder="Confirm Password"
              name="passwordConf"
              onChange={handleChange}
            />
        <div className={styles.inputContainer}>
          <button disabled={isFormInvalid()} className={styles.buttonconfirm}>
            Sign Up
          </button>
        </div>
    </form>
  )
}

export default SignupForm
