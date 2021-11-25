import { useState } from "react";
import Calendar, { CalendarDayHeader } from "./components/Calendar";
import StepHeader from "./components/StepHeader"

const CreateEvent1 = () => {
    const [yearAndMonth, setYearAndMonth] = useState([2021, 11]);
    return (
        <div className="bg-purple-400 w-full h-full text-center">
            <div className="w-1/2 mx-auto">
                <h1 className="text-white text-7xl font-bold tracking-tight pt-10">MeetUp</h1>
                <h2 className="text-yellow-300 text-4xl font-medium tracking-wide py-10 border-b-2 ">Create Event</h2>
                <StepHeader num="1" text="Select up to 7 days"/> 
            </div>
            
            <div className="lg:min-w-auto mx-auto container">
                <Calendar
                    yearAndMonth={yearAndMonth}
                    onYearAndMonthChange={setYearAndMonth}
                    renderDay={(calendarDayObject) => (
                        <div>
                            <CalendarDayHeader calendarDayObject={calendarDayObject} />
                        </div>
                    )}
                />
            </div>
            <button className=" my-10 text-4xl border-b-2 border-blue-900 text-blue-900 hover:border-blue-800
             hover:text-gray-600 cursor-pointer">Next</button>
        </div>
    )
}

export default CreateEvent1