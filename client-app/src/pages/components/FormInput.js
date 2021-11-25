const FormInput = (props) => {
    return (
        <input type={props.type === "password" ? props.type : "text"} name={props.type} id={props.type} defaultValue="" placeholder={props.type} className="block border-b-2 
        border-0 border-gray-500 text-3xl text-yellow-300 mx-auto py-0 px-4 focus:outline-none bg-purple-400"/>
    )
}

export default FormInput