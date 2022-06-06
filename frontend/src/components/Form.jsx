import { register } from '../api/user.js'
import { useState } from "react";

const FORM_ACTION = "http://localhost:3000/user/register"

export default function Form() {
  const [ showPassword, setShowPassword ] = useState(false)
  const [ email, setEmail ] = useState("user@example.com")
  const [ password, setPassword ] = useState("mySecretPassword")
  const [ registerMessage, setRegisterMessage ] = useState("")
  
  
  const updateEmail = (event) => {
    setEmail(event.target.value)
  }

  const updatePassword = (event) => {
    setPassword(event.target.value)
  }


  const toggleVisibility = (event) => {
    event.preventDefault()
    setShowPassword(!showPassword)
  }


  const prepareToRegister = async (event) => {
    event.preventDefault()

    const formData = {
      email,
      password
    }

    const message = await register(formData)
    setRegisterMessage(message)
  }


  const message = () => {
    let message = ""

    if (registerMessage) {
      if (registerMessage.substring(0,4) === "http") {
        message = <span>Check your <a href={registerMessage} target="_blank">email</a></span>
      } else {
        message = registerMessage
      }
    
      message = <><strong>Register message: </strong>{message}</>
    }

    return message
  }


  return <>
    <form
      className="register"
      method="POST"
      action={FORM_ACTION}
    >
      <label htmlFor="email">
        <span>Email address:</span>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={updateEmail}
        >
        </input>
      </label>

      <label htmlFor="password">
        <span>Password:</span>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={password}
          onChange={updatePassword}
        >
        </input>
        <button
          onClick={toggleVisibility}
        >
          {showPassword ? "👁" :"🚫"}
        </button>
      </label>

      <button
        onClick={prepareToRegister}
      >
        Register
      </button>
    </form>

    <p id="message">{message()}</p>
  </>;
}