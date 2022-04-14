import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'
import * as authService from '../../services/authService'

const LoginForm = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = e => {
    props.updateMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      await authService.login(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
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
        id="email"
        value={formData.email}
        placeholder='Email'
        name="email"
        onChange={handleChange}
      />
      <input
        className={styles.input}
        type="password"
        autoComplete="off"
        placeholder='Password'
        id="password"
        value={formData.password}
        name="password"
        onChange={handleChange}
      />
      <div>
        <button className={styles.buttonconfirm}>Log In</button>
        <Link to="/">
          <button className={styles.buttonback}>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
