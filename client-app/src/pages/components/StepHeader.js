const StepHeader = (props) => {
    return (
        <div className="flex flex-row justify-center space-x-10 items-center">
            {/* I need to find a way to make a circle that responds to size of text, right now, it's fixed to text size 4xl*/}
            <div className="text-4xl font-semibold text-white rounded-full w-20 h-20 text-center p-3.5 border-4 my-10">{props.num}</div>
            <h3 className="text-blue-900 text-4xl my-10">{props.text}</h3>
        </div>
    )
}

export default StepHeader