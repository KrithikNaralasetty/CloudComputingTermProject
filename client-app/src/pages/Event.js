











//could store in db as YYYY-MM-DD but idk how to convert string to variables.
//YES YOU CAN. YAY!! use format: dayjs(dateString).year() => dayjs("2021-01-01").year() === 2021
//get: .year(), .month(), .date(), can also use set

//sample event object
const event = {
    eventName: "Holiday Reunion",
    firstDate: "2021-11-16", //can extract year, month, day from here
    lastDate: "2021-11-18", //after extracting days, implies 16-18 or 16, 17, 18
    collabNames: ["Aristos", "Krithik", "Alex"] //can find #of people based on array locally
}



export default function Event() {
    //should be passed in year, month, range of days (eg. 1-4)
    //also, collaborators' names based on accounts (Aristos, Krithik, Alex) and number of people for grid divisions


    return (
        <div className="bg-purple-400 w-full h-screen text-center">
            <div className="w-1/2 mx-auto">
                <h1 className="text-white text-7xl font-bold tracking-tight pt-10">MeetUp</h1>
                <h2 className="text-yellow-300 text-4xl font-medium tracking-wide py-10 ">Holiday Reunion | Nov 13-17, 2021</h2>
                <h3 className="text-blue-900 text-3xl tracking-wide py-10 border-b-2 ">By Aristos</h3>
            </div>
        </div>
    )
}