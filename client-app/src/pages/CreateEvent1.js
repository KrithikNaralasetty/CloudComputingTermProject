import { useState } from "react";
import Calendar, { CalendarDayHeader } from "../components/Calendar";

const CreateEvent1 = () => {
    const [yearAndMonth, setYearAndMonth] = useState([2021, 11]);
    return (
        <div className="bg-purple-400 w-full h-full text-center">
            <div className="w-1/2 mx-auto">
                <h1 className="text-white text-7xl font-bold tracking-tight pt-10">MeetUp</h1>
                <h2 className="text-yellow-300 text-4xl font-medium tracking-wide py-10 border-b-2 ">Create Event</h2>
                <h3 className="text-blue-900 text-4xl my-10">Select up to 7 days</h3>
            </div>
            <div className="text-4xl font-semibold text-white rounded-full py-4 px-7 text-left ml-20 border-4 w-min">1</div>
            <div className="max-w-1/2 mx-auto container">
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