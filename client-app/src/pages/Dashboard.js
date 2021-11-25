const Dashboard = () => {
    return (
        <div className="bg-purple-400 w-full h-screen text-center">
            <h1 className="text-white text-7xl font-bold tracking-tight pt-52">MeetUp</h1>
            <h2 className="text-yellow-300 text-4xl font-medium tracking-wide py-10">Dashboard</h2>
            <div className="flex flex-row justify-center space-x-32 mx-auto">
                <button className="rounded-lg p-10 bg-yellow-300 text-white text-4xl shadow-md">Set Up Event</button>
                <div className=" w-96">
                    <h3 className="text-white text-3xl font-semibold text-left mb-4">Invites</h3>
                    <div className="w-full h-full bg-gray-500">Inivitations Here<br></br> Can accept/decline</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard