const FormInput = (props) => {
    return (
        <input type={props.type === "password" ? props.type : "text"} name={props.type} id={props.type} defaultValue="" placeholder={props.type} className="block border-b-2 
        border-0 border-gray-500 text-3xl text-yellow-300 mx-auto py-0 px-4 focus:outline-none bg-purple-400"/>
    )
}

const FormLogin = () => {


    return ( //will need to fix form action
        <form action="/" method="post"> 
            <div className="flex-col space-y-10 container mx-auto">
                <input type="text" name="username" id="username" defaultValue="" placeholder="username" className="block border-b-2 
        border-0 border-gray-500 text-3xl text-yellow-300 mx-auto py-0 px-4 focus:outline-none bg-purple-400"/> 
                <input type="password" name="password" id="password" defaultValue="" placeholder="password" className="block border-b-2 
        border-0 border-gray-500 text-3xl text-yellow-300 mx-auto py-0 px-4 focus:outline-none bg-purple-400"/>
                <input type="submit" value="sign in" className="mt-10 text-3xl border-b-2 border-gray-500
                    text-gray-500 bg-purple-400 hover:border-gray-600 hover:text-gray-600 cursor-pointer"/>
            </div>
        </form>
    )
}

export default FormLogin