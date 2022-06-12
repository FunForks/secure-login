import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from  '../contexts/UserContext'


export default function LogOut() {
  const { setToken } = useContext(UserContext)
  const navigate = useNavigate()

  const logOut = (event) => {
    event.preventDefault()
    setToken("")
    navigate("/", {replace: true})
  }

  return (
    <button
      className="out"
      onClick={logOut}
    >
      Log Out
    </button>
  )
}