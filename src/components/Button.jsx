/* eslint-disable react/prop-types */

function Button({text="Button", className="", ...props}) {
  return (
    <button className={` bg-blue-600 text-bold p-[.65rem] text-white hover:text-blue-600 hover:bg-white ${className}`} {...props} >{text}</button>
  )
}

export default Button
