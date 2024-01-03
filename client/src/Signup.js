import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import './signup.css'

const Signup = (props) => {
  const { userName, setUserName, email, setEmail, setIsAuthenticated } = props
  const [userExists, setUserExists] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
  const navigate = useNavigate()
  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    if (email.length === 0) {
      setEmailError('Enter a valid email')
      return
    }
    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email, password }),
      })

      const data = await response.json()
      console.log(data)
      if (data.message === 'User already exists') {
        setIsAuthenticated(false)
        setUserExists(true)
      } else if (data.message === 'Signup successful') {
        setIsAuthenticated(true)
        navigate(`/users/${userName}`)
      }
    } catch (error) {
      console.error('Error during form submission:', error)
    }
  }
  return (
    <div className="signup-page">
      <div className="signup-navbar">
        <div className="title">Book Tracker</div>
        <p className="login-instead">
          Already have an account? <a href="/login">Login instead</a>
        </p>
      </div>
      <div className="signup-form">
        <form onSubmit={(e) => handleSignupSubmit(e)}>
          <label htmlFor="signup-username">Username:</label>
          <input
            value={userName}
            type="text"
            id="signup-username"
            name="signup-username"
            placeholder="Enter a username"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <label htmlFor="signup-email">Email:</label>
          <input
            type="email"
            value={email}
            id="signup-email"
            placeholder="Enter your Email here"
            name="signup-email"
            onChange={(e) => {
              setEmail(e.target.value)
              if (!emailRegex.test(e.target.value)) {
                setEmailError('Enter a valid email')
              } else {
                setEmailError('')
              }
            }}
          />
          <label className="errorLabel">{emailError}</label>
          <br />
          <label htmlFor="signup-password">Password:</label>
          <input
            type="password"
            value={password}
            id="signup-password"
            name="signup-password"
            placeholder="Enter a strong password"
            onChange={(e) => {
              setPassword(e.target.value)
              if (e.target.value.length === 0) {
                setPasswordError('Please enter a password')
              } else if (e.target.value.length < 8) {
                setPasswordError('The password must be 8 characters or longer')
              } else {
                setPasswordError('')
              }
            }}
          />
          <label className="errorLabel">{passwordError}</label>
          <br />
          {userExists && (
            <p className="user-exists">User already exists. Please Login.</p>
          )}
          <button type="submit" className="signup-button">
            Confirm Sign Up
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Signup
