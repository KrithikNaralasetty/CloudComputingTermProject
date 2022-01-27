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
  const [event, setEvent] = useState()
  const [timeslots, setTimeslots] = useState() //nested object array

  const loadEvent = eventDetails => {

    setEvent(eventDetails) //pass event details to event page

    axios.post("http://localhost:4000/api/retrieve-timeslots", eventDetails)
      .then(response => {
        if (response.data) {
          console.log("Timeslot Array Object received");
          setError("")
          setTimeslots(response.data)  

          console.log(timeslots) 
          navigate(`/events/${eventDetails.eventname}`) //can later add /event/49 (:id)
        } else {
          console.log("Couldn't retrieve-timeslots")
          setError("Couldn't retrieve-timeslots")
        }
      })
      .catch(error => {
        console.log(error)
        setError(error.message)
      }) 
  }

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
            <Link to="/events">Event</Link>
          </li>
        </ul>
      <Routes>
        <Route path="/" element={<Login Login={Loginx} error={error}/>} />
        <Route path="/dashboard" element={<Dashboard error={error} setError={setError} user={user} Logout={Logout} navigate={navigate} loadEvent={loadEvent}/>} />
        <Route path="/create-event-1" element={<CreateEvent1 user={user} setError={setError}error={error} navigate={navigate}/>} />
        <Route path="/events/:name" element={<Event navigate={navigate} event={event} timeslots={timeslots}/>} />
        {/* <Route element={<ErrorPage />} /> */}
      </Routes>
    </div>    
  );
}

export default App
