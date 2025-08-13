/* eslint-disable react/prop-types */

function Label({label, className="", ...props}) {
  return (
    <label className={`mb-1 ${className}`} {...props}>{label}</label>
  )
}

export default Label