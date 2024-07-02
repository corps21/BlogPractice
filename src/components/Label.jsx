/* eslint-disable react/prop-types */


function Label({label="", className="", ...props}) {
  return (
    <label className={`text-bold text-xl cursor-pointer ${className}`} {...props}>{label}</label>
  )
}

export default Label