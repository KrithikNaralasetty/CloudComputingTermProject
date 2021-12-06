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
  const [timeslots, setTimeslots] = useState()

  const loadEvent = eventDetails => {

    
    //axios post to get timeslots json object
    //need to restructure object to be:
    // collaborator0: [timeslot0, timeslot1, ...]
    // collaborator1
    // let server handle parsing the data and making object

    setEvent(eventDetails) //pass event details to event page


    // axios.post("http://localhost:4000/api/retrieve-timeslots", {eventDetails})
    //   .then(response => {
    //     if (response.data) {
    //       console.log("Timeslots received");
    //       setError("")
    //       setTimeslots(response.data)  

    //       console.log("Timeslots" + response.data) 
    //       navigate(`/event/${eventDetails.userid}`)
    //     } else {
    //       console.log("Couldn't retrieve-timeslots")
    //       setError("Couldn't retrieve-timeslots")
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     setError(error.message)
    //   }) 

    
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
          {/* <li>
            <Link to="/create-event-2">Create-Event-2</Link>
          </li> */}
          <li>
            <Link to="/event">Event</Link>
          </li>
        </ul>
      <Routes>
        <Route path="/" element={<Login Login={Loginx} error={error}/>} />
        <Route path="/dashboard" element={<Dashboard error={error} setError={setError} user={user} Logout={Logout} navigate={navigate} loadEvent={loadEvent}/>} />
        <Route path="/create-event-1" element={<CreateEvent1 user={user} setError={setError}error={error} navigate={navigate}/>} />
        {/* <Route path="/create-event-2" element={<CreateEvent2 navigate={navigate}/>} /> */}
        <Route path="/event" element={<Event navigate={navigate} event={event} timeslots={timeslots}/>} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </div>    
  );
}

export default App
