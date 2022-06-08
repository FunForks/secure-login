import { useState, useEffect, useContext } from 'react'
import { UserContext } from  '../contexts/UserContext'
import { getId } from '../api/user'

import Menu from './Menu'

// Show a rotating throbber until the async call to getId returns
import Throbber from './Throbber/Throbber'


let render = 0

const GetId = () => {
  const { token } = useContext(UserContext)
  const [ hideThrobber, setHideThrobber ] = useState(false)
  const [ id, setId ] = useState("")


  console.log("render", ++render, "id:", id, "hideThrobber:", hideThrobber, "token:", token);
  
  

  useEffect(() => {
    // useEffect can't call an async function directly, because
    // that would return a promise, and useEffect can only return
    // a cleanup function. One solution is to wrap an async function
    // in an IIFE (Immediately Invoked Function Expression)
    ;(async () => {
      const _id = await getId({ token })
      setId(_id)
      setHideThrobber(true)
    })()
  
    // return () => {
    //   console.log(
    //     "Show the throbber next time this component is loaded"
    //   )
    //   setHideThrobber(false)
    // }
})


  const MenuPlusId = () => {
    return (
      <main>
        <Menu />
        <section>
          <p>_id retreived from backeend: <strong>{id}</strong></p>
        </section>
      </main>
    )
  }


  const Display = hideThrobber
                ? MenuPlusId
                : Throbber
     

  return <Display />
}


export default GetId