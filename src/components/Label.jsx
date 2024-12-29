/* eslint-disable react/prop-types */

function Label({label, className="", ...props}) {
  return (
    <label className={`font-semibold ${className}`} {...props}>{label}</label>
  )
}

export default Label