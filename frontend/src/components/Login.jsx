import { useContext } from 'react'
import { UserContext } from  '../contexts/UserContext'

import Form from './Form'
import LogOut from './LogOut'
import Menu from './Menu'


export default function Login() {
  const { token } = useContext(UserContext)


  const AlreadyLoggedIn = () => (
    <>
      <p>You are already logged in</p>
      <LogOut />
    </>
  )


  const display = token
                ? <AlreadyLoggedIn />
                : <Form />

  return <>
    <Menu
      noLogIn={true}
    />
    {display}
  </>
}