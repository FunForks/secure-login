import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from  '../contexts/UserContext'

import LogOut from './LogOut'

const Menu = ({noLogIn}) => {
  const { token } = useContext(UserContext)

  const publicPages = ["", "public1", "public2"]
  const privatePages = ["private1", "private2", "showid"]


  // Include private pages if token indicates logged-in state
  const pages = token
              ? [...publicPages, ...privatePages]
              : publicPages


  // Generate menu items including "" -> "/" (for Home)
  const items = pages.map( page => (
    <li
      key={page}
    >
      <NavLink to={`/${page}`}>
        {page || "Home"}
      </NavLink>
    </li>
  ))


  // Include Log In or Log Out button, depending on the current state
  const button = token
    ? <LogOut />
    : <NavLink
        to="/login"
        className="in"
      >
        Log In
      </NavLink>


  return (
    <aside>
      <ul id="menu">{items}</ul>
      {noLogIn ? "" : button}
    </aside>
  )
}


export default Menu