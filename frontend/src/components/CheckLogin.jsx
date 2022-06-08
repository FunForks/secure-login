/**
 * 
 */

import { useState, useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from  '../contexts/UserContext'
import Throbber from './Throbber/Throbber'
import { checkLogin } from '../api/user'


let render = 0

const CheckLogin = () => {
  const [ checked, setChecked ] = useState(false) 
  const { loggedInUser, logIn } = useContext(UserContext);

  console.log("render", ++render, "checked:", checked);
  


  const resetCheckedToFalse = () => {
    setChecked(false)
  }


  const checkStatusOnBackend = async () => {
    const user = await checkLogin() // may be ""
    logIn(user)
    setChecked(true)

    return resetCheckedToFalse
  }


  useEffect(() => {
    checkStatusOnBackend()
  })
     

  return checked
       ? <Navigate to="/" />
       : <Throbber />
}


export default CheckLogin