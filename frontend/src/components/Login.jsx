import { useContext } from 'react'
import { UserContext } from  '../contexts/UserContext'

import Form from './Form'

export default function Login() {
  const { loggedInUser, logIn } = useContext(UserContext)

  const logOut = () => {
    logIn()
  }

  const button = (
    <button
      onClick={logOut}
    >
      Log out
    </button>
  )

  const Display = loggedInUser
                ? button
                : <Form />
  
  return Display
}