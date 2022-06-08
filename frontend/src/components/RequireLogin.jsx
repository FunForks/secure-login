/**
 * 
 */

 import { useContext } from 'react'
 import { Navigate } from 'react-router-dom'
 import { UserContext } from  '../contexts/UserContext'
 
 
 const RequireLogin = ({ children, redirectTo }) => {
   const { loggedInUser } = useContext(UserContext);
      
   return loggedInUser
        ? children
        : <Navigate to={redirectTo} />;
 }
 
 
 export default RequireLogin