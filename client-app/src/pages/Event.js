import dayjs from "dayjs";
//import weekday from "dayjs/plugin/weekday"
import dayOfYear from "dayjs/plugin/dayOfYear"
import { range } from "ramda";

dayjs.extend(dayOfYear);

//could store in db as YYYY-MM-DD but idk how to convert string to variables.
//YES YOU CAN. YAY!! use format: dayjs(dateString).year() => dayjs("2021-01-01").year() === 2021
//get: .year(), .month(), .date(), can also use set

//sample event object
const event = {
    eventName: "Holiday Reunion",
    firstDate: "2021-11-16", //can extract year, month, day from here
    lastDate: "2021-11-18", //after extracting days, implies 16-18 or 16, 17, 18
    collabNames: ["Aristos", "Krithik", "Alex"] //can find #of people based on array locally
    //will need to pass in objects for each collaborator showing their availablity.
}


const getMonth = (dateString) => {
    return dayjs(dateString).format("MMMM") 
}

const getDay = (dateString) => {
    return dayjs(dateString).format("D")
}

const TimeGrid = ({numCollabs = 3}) => {

    return (
        <div className={`grid h-full grid-cols-${numCollabs} border-2 border-gray-600 gap-1 w-full`}>
            <span>hello</span>
            <span>hello</span>
        </div>
    )
}


const TimeTable = ({eventz}) => { //I think it has to deal with props?
    //let { eventName, firstDate, lastDate, collabNames } = eventz
    
    const numCollabs = Array(event.collabNames).length;
    const year = dayjs(event.firstDate).year()
    const base =`${year}-01-01` 

    const startDay = dayjs(event.firstDate).dayOfYear()    
    const endDay = dayjs(event.lastDate).dayOfYear() + 1
    
    //returns range of dateStrings that can be parsed
    const days = range(startDay, endDay)
         .map((day) => {
             const a = dayjs(base).dayOfYear(day) //gives day.js object
             return a.format("YYYY-MM-DD") //format it to be in string format
         }) 

    return (
        <div>
            <div className="root flex w-3/4 mx-auto pt-20 flex-row justify-between space-x-20">
                {days.map((day) => (
                    <div key={day} className="text-center text-2xl">
                        {`${getMonth(day)} ${getDay(day)}`}
                    </div>
                ))}
            </div>
            <div className="root flex w-3/4 mx-auto py-8 flex-row justify-between space-x-20">
                {days.map((day) => (
                    <div key={day} className="">
                       <TimeGrid num={numCollabs}/>
                    </div>
                ))}
            </div>
        </div>
        //need to add grid here or inside of other div above.
    )
}


export default function Event() {
    //should be passed in year, month, range of days (eg. 1-4)
    //also, collaborators' names based on accounts (Aristos, Krithik, Alex) and number of people for grid divisions


    return (
        <div className="bg-purple-400 w-full h-screen text-center">
            <div className="w-1/2 mx-auto">
                <h1 className="text-white text-7xl font-bold tracking-tight pt-10">MeetUp</h1>
                <h2 className="text-yellow-300 text-4xl font-medium tracking-wide py-10 ">{event.eventName} | Nov 13-17, 2021</h2>
                <h3 className="text-blue-900 text-3xl tracking-wide py-10 border-b-2 ">By Aristos</h3>
            </div>
            <TimeTable event={event}/>
            <button className=" my-10 text-4xl border-b-2 border-blue-900 text-blue-900 hover:border-blue-800
             hover:text-gray-600 cursor-pointer">Back</button>
        </div>
    )
}