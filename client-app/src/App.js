import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import axios from "axios"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import CreateEvent1 from "./pages/CreateEvent1"
import CreateEvent2 from "./pages/CreateEvent2"
import Event from "./pages/Event"
import ErrorPage from "./pages/ErrorPage"

function App() {

  const adminUser = {
    username: "Aristos",
    password: "admin123"
  }

  /*--------------Login----------------*/

  let navigate = useNavigate()
  const [user, setUser] = useState({username: "", email: ""})
  const [error, setError] = useState("")

  const Loginx = details => {
      console.log(details)

      //check if credentials are correct
      //should send data to node js to see if logged in.
      //axios.post("http://localhost:3001/users/signin", {} )

      if (details.username === adminUser.username && details.password === adminUser.password) {
        console.log("Logged in");
        setUser ({
          username: details.username
          //could have email I guess? idk how to set it
          //email: comes from node js packet
        })  
        //React router redirect to dashboard
        navigate("/dashboard")   
      } else {
        console.log("Credentials do not match")
        setError("Credentials do not match")
      }
  }

  const Logout = () => {
      setUser({username: "", email: ""});
      navigate("/")
      console.log("Logout")
  }

  return (
    <div>
      <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/create-event-1">Create-Event-1</Link>
          </li>
          <li>
            <Link to="/create-event-2">Create-Event-2</Link>
          </li>
          <li>
            <Link to="/event">Event</Link>
          </li>
        </ul>
      <Routes>
        <Route path="/" element={<Login Login={Loginx} error={error}/>} />
        <Route path="/dashboard" element={<Dashboard Logout={Logout} navigate={navigate}/>} />
        <Route path="/create-event-1" element={<CreateEvent1 navigate={navigate}/>} />
        <Route path="/create-event-2" element={<CreateEvent2 navigate={navigate}/>} />
        <Route path="/event" element={<Event navigate={navigate}/>} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </div>    
  );
}

export default App
