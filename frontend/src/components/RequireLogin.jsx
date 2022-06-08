/**
 * 
 */

 import { useContext } from 'react'
 import { Navigate } from 'react-router-dom'
 import { UserContext } from  '../contexts/UserContext'
 
 
 const RequireLogin = ({ children, redirectTo }) => {
   const { token } = useContext(UserContext);
      
   return token
        ? children
        : <Navigate to={redirectTo} />;
 }
 
 
 export default RequireLogin