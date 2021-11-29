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

  

  /*--------------Login----------------*/

  let navigate = useNavigate()
  const [user, setUser] = useState({username: "", email: "", id: 0})
  const [error, setError] = useState("")

  const Loginx = details => {
      console.log(details)

      //check if credentials are correct
      //should send data to noded js to see if logged in.
      //
      axios.post("http://localhost:4000/api/login", details)
      .then(response => {
        if (response.data.isValid) {
          console.log("Logged in");
          setError("")
          setUser ({ //all these work
            username: details.username,
            email: response.data.email,
            id: response.data.id
          })  
          console.log("User=" + response.data.id)
          //React router redirect to dashboard
          navigate("/dashboard")   
        } else {
          console.log("Credentials do not match")
          setError("Credentials do not match")
        }
      })
      .catch(error => {
        console.log(error)
        setError(error.message)
      })    
  }

  const Logout = () => {
      setUser({username: "", email: ""});
      navigate("/")
      console.log("Logout")
  }

  
  // const addCollaborator = user_data => {
  //     console.log("Checking if email valid:" + user_email)
  //     //email good up here
  //     const email = { email: user_email}
  //     axios.post("http://localhost:4000/api/validate-email", email)
  //     .then(response => {
  //       if (response.data) {
  //         console.log("Correct Collaborator email");
  //         setError("")
  //         console.log(response.data)
  //         //return response.data //returns an object record of user

  //       } else {
  //         console.log("No email match")
  //         setError("Email does not exist")

  //         //return false Doesn't work.
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       setError(error.message)
  //     }) 
  // }

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
          {/* <li>
            <Link to="/create-event-2">Create-Event-2</Link>
          </li> */}
          <li>
            <Link to="/event">Event</Link>
          </li>
        </ul>
      <Routes>
        <Route path="/" element={<Login Login={Loginx} error={error}/>} />
        <Route path="/dashboard" element={<Dashboard Logout={Logout} navigate={navigate}/>} />
        <Route path="/create-event-1" element={<CreateEvent1 user={user} setError={setError}error={error} navigate={navigate}/>} />
        {/* <Route path="/create-event-2" element={<CreateEvent2 navigate={navigate}/>} /> */}
        <Route path="/event" element={<Event navigate={navigate}/>} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </div>    
  );
}

export default App
