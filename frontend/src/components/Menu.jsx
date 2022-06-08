import { useContext } from 'react'
import { UserContext } from  '../contexts/UserContext'


const Menu = () => {
  const { loggedInUser } = useContext(UserContext)

  const publicPages = ["public1", "public2"]
  const privatePages = ["private1", "private2"]

  const pages = loggedInUser
              ? [...publicPages, ...privatePages]
              : ["login", ...publicPages]

  const items = pages.map( page => (
    <li><a href={`/${page}`}>{page}</a></li>
  ))

  return <ul id="menu">{items}</ul>
}


export default Menu