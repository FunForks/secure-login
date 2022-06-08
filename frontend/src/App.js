import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "./App.css";
import Home         from './components/Home'
import Welcome      from './components/Welcome'
import Login        from './components/Login'
import RequireLogin from './components/RequireLogin'
import Public       from './components/Public'
import Private      from './components/Private'
import ShowId       from './components/ShowId'


// Provide global access to loggedInUser, logIn,
// urlUser and setUrlUser
import { UserProvider } from './contexts/UserContext'


function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} >
            {/* All paths are wrapped by Home */}
            <Route index element={<Welcome />} />

            <Route path="/login" element={<Login />} />

            <Route path="/public1" element={<Public text="Public #1"/>}/>

            <Route path="/public2" element={<Public text="Public #2"/>}/>

            <Route
              path="/private1"
              element={
                <RequireLogin redirectTo="/login">
                  <Private
                    text="Private Page #1"
                  />
                </RequireLogin >
              }
            />

            <Route
              path="/private2"
              element={
                <RequireLogin redirectTo="/login">
                  <Private
                    text="Private Page #2"
                  />
                </RequireLogin >
              }
            />

            <Route
              path="/ShowId"
              element={
                <RequireLogin redirectTo="/login">
                  <ShowId/>
                </RequireLogin >
              }
            />
          </Route>

          {/* Go to Welcome page if the path is unknown */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
