import { register, logIn } from '../api/user.js'
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext"

// For demonstration only. If the default form "action" url
// is triggered, then the current page will be replaced with
// the response from the call. If, instead, preventDefault()
// is used in association with a `fetch` action, then current
// page will remain in the browser and the response from the
// `fetch` action can be used to alter the page rather than
// replace it.
const FORM_ACTION = "http://localhost:3000/user/register"


export default function Form() {
  const [ showPassword, setShowPassword ] = useState(false)
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ registerMessage, setRegisterMessage ] = useState()

  const { setToken, preLoginURL } = useContext(UserContext)
  const navigate = useNavigate()

  const setMessage = (source, text) => {
    setRegisterMessage({
      source,
      text
    })
  }

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
    setMessage("Register", message)
  }


  const prepareToLogIn = async (event) => {
    event.preventDefault()

    const formData = {
      email,
      password
    }

    const result = await logIn(formData)

    // console.log("result", result);
    // { status: <200 | 406>
    //   text:   < `User ${email} logged in.`
    //           | "Invalid email address or password."
    //           >
    //   token: < "" | "veryL0ng5tring" >
    // }

    const { token, text } = result
  if (token) {
      setToken(result.token)
      navigate(preLoginURL, { replace: true })

    } else {
      setMessage("Login", text)
    }
  }


  const message = () => {
    let message = ""

    if (registerMessage) {
      let { source, text } = registerMessage
      if (text.substring(0,4) === "http") {
        text = <span>Check your <a
            href={text}
            target="_blank"
            rel="noreferrer"
          >
            email
          </a>
        </span>
      }

      message = <><strong>{source} message: </strong>{text}</>
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
        // Comment out the following line to check what happens if
        // the default form "action" is triggered
        onClick={prepareToRegister}
      >
        Register
      </button>
      <span>or</span>
      <button
        onClick={prepareToLogIn}
      >
        Log in
      </button>
    </form>

    <p id="message">{message()}</p>
  </>;
}