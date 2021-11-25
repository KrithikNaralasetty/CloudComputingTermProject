import FormInput from "./components/FormInput"


const FormLogin = () => {
    return ( //will need to fix form action
        <form action="/" method="post"> 
            <div className="flex-col space-y-10 container mx-auto">
                <FormInput type="username"/> 
                <FormInput type="password"/>
                <input type="submit" value="sign in" className="mt-10 text-3xl border-b-2 border-gray-500
                    text-gray-500 bg-purple-400 hover:border-gray-600 hover:text-gray-600 cursor-pointer"/>
            </div>
        </form>
    )
}



const Login = () => {
    return (
        <div className="bg-purple-400 w-full h-screen text-center">
            <h1 className="text-white text-7xl font-bold tracking-tight pt-52">MeetUp</h1>
            <h2 className="text-yellow-300 text-4xl font-medium tracking-wide py-10">Login</h2>
            <FormLogin />
        </div>
    )
}

export default Login