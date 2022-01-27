import { useState, useEffect } from "react";
import Calendar, { CalendarDayHeader } from "./components/Calendar";
import StepHeader from "./components/StepHeader"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { getRangeOfDates } from "./components/EventHelpers"
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";

dayjs.extend(dayOfYear)

const CreateEvent1 = ({navigate, setError, error, user}) => {
    const [yearAndMonth, setYearAndMonth] = useState([2021, 11]);
    const [nextpage, setNextPage] = useState(false)
    const [eid, setEid] = useState(0)
    const [collaborator, setCollaborator] = useState("") //email
    const [eventDetails, setEventDetails] = useState({
        name: "", //name of event
        collaborators: [user.email], //array of users //added owner by default
        dates: []
    })

    //-------date selection state -------///
    const [dateCount, setDateCount] = useState(0) 
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [middleDateRange, setMiddleDateRange] = useState([])   

    const selection = (dateString) => {
         if (dateCount === 2) {
            console.log("Removed date selections")
            setDateCount(0)
            setStartDate("")
            setEndDate("")
            setMiddleDateRange([])
         }
         else if (dateCount === 0) {
            console.log("FirstDate Selected: " + dateString)
            setDateCount(1)
            setStartDate(dateString)
            console.log("In CreateEvent: startDate= " + startDate) //outputs not set?
         }
         else {
            console.log("SecondDate Selected: " + dateString)
            setDateCount(2)
            setEndDate(dateString)
            console.log("In CreateEvent: endDate= " + endDate)
            if(startDate === endDate) { //if only one day selected
                setEventDetails({...eventDetails, dates: [startDate]})
            }
            else {
                let dateRange = getRangeOfDates(startDate, dateString)
                //setEventDetails({...eventDetails, dates: dateRange}) //doesn't work in here why? some async thing with useState?
                console.log(eventDetails.dates)
                //make middle date range
                //console.log(dateRange)
                dateRange.shift()
                dateRange.pop()
                setMiddleDateRange(dateRange) //remove first and last date
                //console.log(middleDateRange) //these are not coming in on time
            }   
         }
    }

    useEffect(() => {
        const dateRange = getRangeOfDates(startDate, endDate)
        setEventDetails({...eventDetails, dates: dateRange}) 

    }, [startDate, endDate])  //how to get ride of error? 

    const nextClickHandler = e => {
        e.preventDefault()
        
        if (dateCount !== 2) {
            setError("Must pick start and end dates. For only one day, reselect it and continue")
        }
        else {
            setError("")
            // const dateRange = getRangeOfDates(startDate, endDate)
            // setEventDetails({...eventDetails, dates: dateRange})

            console.log("next " + eventDetails.dates)
            
            setNextPage(!nextpage)
        }        
    }
    
    const addClickHandler = e => {
        e.preventDefault()

        const email = { email: collaborator}
        
        axios.post("http://localhost:4000/api/validate-email", email)
        .then(response => {
            if (response.data) {
                console.log("Correct Collaborator email");
                setError("")
                console.log(response.data.data.email)
                let userEmails = eventDetails.collaborators //array of emails
                userEmails.push(response.data.data.email) //add user email to array
                setEventDetails({...eventDetails, collaborators: userEmails}) //reassign collaborators with correct
                
                console.log("List of Collaborators: " + userEmails)    
                //user is the full record of user, so use this info to make <div> to display name in chart
                

            } else {
                console.log("No email match")
                setError("Email does not exist")
            }
            setCollaborator("") //clears email text-field
        })
    }

    const submitClickHandler = () => {

        const event = {
           eventname: eventDetails.name,
           userid: user.id,
           owner:  user.username,
           collaborators: eventDetails.collaborators,
           dates: eventDetails.dates
        }
        
        console.log(event)
        axios.post("http://localhost:4000/api/create-event", event)
        .then(response => {
            if (response.data) {
                console.log("Event created");
                setError("")
                console.log(response.data)

                setEid(response.data.eventId)
                //not being set in time
                console.log("eid: " + eid)

                //do post in here for timeslots//
                const timeslotData = {
                    eventid: response.data.eventId,
                    collaborators: eventDetails.collaborators,
                    dates: eventDetails.dates 
                }
                console.log("timeslotData.eventid= " + timeslotData.eventid)
                axios.post("http://localhost:4000/api/create-timeslots", timeslotData)
                .then(response => {
                    if (response.data) {
                        console.log("Timeslots Created!");
                        setError("")
                        console.log(response.data)
                        navigate("/dashboard")
                    } else {
                        console.log("Timeslots couldn't be set")
                        setError("Timeslots couldn't be set")
                    }
                }) 

                //post for timeslots in here conditionally

            } else {
                console.log("Event couldn't be created")
                setError("Event couldn't be created")
            }
        }) 

         
    }

    return (
        <div className="bg-purple-400 w-full h-full text-center">
            <div className="w-1/2 mx-auto">
                <h1 className="text-white text-7xl font-bold tracking-tight pt-10">MeetUp</h1>
                <h2 className="text-yellow-300 text-4xl font-medium tracking-wide py-10 border-b-2 ">Create Event</h2>
            </div>
            
            {/* may want to use if statement with css visbility */}
            {!nextpage &&   
            <div>        
                <StepHeader num="1" text="Select up to 7 days"/> 
                {/* <h3>{ if(dateCount) {
                } From Nov 16 - Nov 18 //trying to display that
                }</h3>  */}
                <div className="lg:min-w-auto mx-auto container">
                    <Calendar
                        startDate = {startDate}
                        middleDateRange = {middleDateRange}
                        endDate = {endDate}
                        selection = {selection}
                        yearAndMonth={yearAndMonth}
                        onYearAndMonthChange={setYearAndMonth}
                        renderDay={(calendarDayObject) => (
                            <div>
                                <CalendarDayHeader calendarDayObject={calendarDayObject} />
                            </div>
                        )}
                    />
                </div>
                {(error !== "") ? ( <div className="py-5 text-xl text-red-200">{error}</div>) : ""}
                <button onClick={() => { navigate("/dashboard")}} className=" my-10 mx-10 text-4xl border-b-2 border-blue-900 text-blue-900 hover:border-blue-800
                hover:text-gray-600 cursor-pointer">Cancel</button>
                <button onClick={nextClickHandler} className=" my-10 text-4xl border-b-2 border-blue-900 text-blue-900 hover:border-blue-800
                hover:text-gray-600 cursor-pointer">Next</button>
             </div>
            }
            {nextpage &&
                <div>
                    <div className="flex flex-row justify-between mx-auto w-5/6">
                        <div>
                            <StepHeader num="2" text="Name your event"/>
                            <input onChange={e => setEventDetails({...eventDetails, name: e.target.value})} value={eventDetails.name}
                                type="text" name="name" id="name" placeholder="name" className="block border-b-2 
                                border-0 border-gray-500 text-3xl text-yellow-300 mx-auto py-0 px-4 focus:outline-none bg-purple-400"/> 
                        </div>
                        <div>
                            <StepHeader num="3" text="Add collaborators"/>
                            {/* <FormInput type="email"/> */}
                            <input onChange={e => setCollaborator(e.target.value)} value={collaborator}
                                type="email" name="email" id="email" placeholder="email" className="block border-b-2 
                                border-0 border-gray-500 text-3xl text-yellow-300 mx-auto py-0 px-4 focus:outline-none bg-purple-400"/> 
                            {(error !== "") ? ( <div className="py-5 text-xl text-red-200">{error}</div>) : ""}
                            <button onClick={addClickHandler} className=" my-10 text-3xl border-b-2 border-blue-900 text-blue-900 hover:border-blue-800
                                hover:text-gray-600 cursor-pointer">Add
                            </button> 
                            <div className="w-full h-32 rounded-md shadow-md bg-gray-700 mb-10">
                                {eventDetails.collaborators.map((user) => (
                                  <div key={user} className="text-white text-2xl">
                                      {user}
                                  </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button onClick={nextClickHandler} className=" my-10 mx-10 text-3xl border-b-2 border-yellow-300 text-yellow-300 hover:border-yellow-400
                        hover:text-yellow-400 cursor-pointer">Back
                    </button>
                    <button onClick={submitClickHandler}className=" my-10 text-3xl border-b-2 border-yellow-300 text-yellow-300 hover:border-yellow-400
                        hover:text-yellow-400 cursor-pointer">Submit
                    </button>
                </div>
            }
        </div>
    )
}

export default CreateEvent1