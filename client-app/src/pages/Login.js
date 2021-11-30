//import FormLogin from "./components/FormLogin"
import React, { useState } from "react";


const Login = ({Login, error}) => {
    const [details, setDetails] = useState({username: "", password: ""})

    const submitHandler = e => {
        e.preventDefault()

        Login(details)
    }

    return (
        <div className="bg-purple-400 w-full h-screen text-center">
            <h1 className="text-white text-7xl font-bold tracking-tight pt-52">MeetUp</h1>
            <h2 className="text-yellow-300 text-4xl font-medium tracking-wide py-10">Login</h2>

            <form onSubmit={submitHandler}> 
                <div className="flex-col space-y-10 container mx-auto">
                    {(error !== "") ? ( <div className="py-5 text-xl text-red-200">{error}</div>) : ""}
                    <input type="text" name="username" id="username" 
                        onChange={e => setDetails({...details, username: e.target.value})} value={details.username} 
                         placeholder="username" className="block border-b-2 
                        border-0 border-gray-500 text-3xl text-yellow-300 mx-auto py-0 px-4 focus:outline-none bg-purple-400"/> 
                    <input type="password" name="password" id="password"
                        onChange={e => setDetails({...details, password: e.target.value})} value={details.password}
                        placeholder="password" className="block border-b-2 
                        border-0 border-gray-500 text-3xl text-yellow-300 mx-auto py-0 px-4 focus:outline-none bg-purple-400"/>
                    <input type="submit" value="sign in" className="mt-10 text-3xl border-b-2 border-gray-500
                        text-gray-500 bg-purple-400 hover:border-gray-600 hover:text-gray-600 cursor-pointer"/>
                </div>
        </form>
        </div>
    )
}

export default Login