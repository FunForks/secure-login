/**
 * The Home component simply provides a parent to wrap any
 * child Routes. You could add a Header and a Footer to this
 * component, so that they will appear on all pages.
 * 
 * The components rendered by any of the Routes nested inside
 * the home path will be display in the place of the <Outlet />.
 */

 import { useContext } from 'react'
 import { Outlet } from 'react-router-dom'

 import { UserContext } from  '../contexts/UserContext'


 const Home = () => {
   return <>
     <h1>THIS IS YOUR SITE</h1>
     <Outlet />
   </>
 }
 
 
 export default Home