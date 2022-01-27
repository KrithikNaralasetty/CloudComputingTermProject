import React, { useState, useEffect } from "react";
import axios from "axios"

const Dashboard = ({Logout, navigate, error, setError, user, loadEvent }) => {
    
    const [events, setEvents] = useState([])

    const data = { email: user.email}
    //console.log(data.userid)

    const eventPageHandler = (event) => {
        loadEvent(event)
    }


    useEffect(() => {
        axios.post("http://localhost:4000/api/retrieve-events", data) //always post when sending data
        .then(response => {
            if (response.data) {
                console.log("Events retrieved!");
                setError("")
                //console.log(response.data)

                setEvents(response.data)
                console.log(events)
            } else {
                console.log("Events could not be retrieved")
                setError("Events could not be retrieved")
            }
        })
    }, []) //don't know how to only run this once asnychrnously
    


    return (
        <div className="bg-purple-400 w-full h-screen text-center">
            <h1 className="text-white text-7xl font-bold tracking-tight pt-52">MeetUp</h1>
            <h2 className="text-yellow-300 text-4xl font-medium tracking-wide py-10">Dashboard</h2>
            <div className="flex flex-row justify-center space-x-32 mx-auto">
                <div>
                    <button onClick={() => {navigate("/create-event-1")}}className="block rounded-lg p-10 bg-yellow-300 
                    text-white text-4xl shadow-md">Set Up Event</button>
                    <button onClick={Logout} className=" my-10 block mr-20 text-3xl border-b-2 border-yellow-300 text-yellow-300 hover:border-yellow-400
                    hover:text-yellow-400 cursor-pointer">Log out
                    </button>
                </div>
                <div className=" w-96">
                    <h3 className="text-white text-3xl font-semibold text-left mb-4">Events</h3>
                    <div className="w-full h-full rounded-md shadow-md bg-blue-900">
                        {events.map((event) => (
                            <div key={event.id} className="text-white text-left ">
                                <div className="p-4">
                                    <button onClick={() => {eventPageHandler(event)}} className="text-2xl underline">{event.eventname}</button>
                                    <p className="text-xl">By {event.owner}</p>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Dashboard