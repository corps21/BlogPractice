
function Button({text="Button", className="", ...props}) {
  return (
    <button className={` bg-blue-600 rounded-lg text-xl text-bold p-[.65rem] text-white hover:text-blue-600 hover:bg-white ${className}`} {...props} >{text}</button>
  )
}

export default Button
