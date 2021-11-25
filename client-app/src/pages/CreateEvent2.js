import StepHeader from "./components/StepHeader"
import FormInput from "./components/FormInput"

const CreateEvent2 = () => {
    return (
        <div className="bg-purple-400 w-full h-screen text-center">
            <div className="w-1/2 mx-auto">
                <h1 className="text-white text-7xl font-bold tracking-tight pt-10">MeetUp</h1>
                <h2 className="text-yellow-300 text-4xl font-medium tracking-wide py-10 border-b-2 ">Create Event</h2>
            </div>
            <div className="flex flex-row justify-between mx-auto w-5/6">
                <div>
                    <StepHeader num="2" text="Name your event"/>
                    <FormInput type="name"/> 
                </div>
                <div>
                    <StepHeader num="3" text="Add collaborators"/>
                    <FormInput type="email"/>
                    <button className=" my-10 text-3xl border-b-2 border-blue-900 text-blue-900 hover:border-blue-800
                        hover:text-gray-600 cursor-pointer">Add
                    </button> 
                    <div className="w-full h-32 bg-gray-500">List of Collaborator's Names and If Pending/Accepted</div>
                </div>
            </div>
            <button className=" my-10 text-3xl border-b-2 border-yellow-300 text-yellow-300 hover:border-yellow-400
                hover:text-yellow-400 cursor-pointer">Submit
            </button>
        </div>
    )
}

export default CreateEvent2